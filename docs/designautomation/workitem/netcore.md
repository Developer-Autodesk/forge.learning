# Execute Workitem (.NET Core)

The following methods should be added to the `DesignAutomationController` class.

**1. StartWorkitem**

This is where we actually start the Design Automation. The `StartWorkitemInput` is just a data structure. This method also uploads the input file to an OSS Bucket and define that the output should be saved at the same bucket. To help you identify the files, both input and output uses the same original file name, but with a suffix (`input` or `output`) plus a time stamp.

```csharp
/// <summary>
/// Start a new workitem
/// </summary>
[HttpPost]
[Route("api/forge/designautomation/workitems")]
public async Task<IActionResult> StartWorkitem([FromForm]StartWorkitemInput input)
{
    // basic input validation
    JObject workItemData = JObject.Parse(input.data);
    string widthParam = workItemData["width"].Value<string>();
    string heigthParam = workItemData["height"].Value<string>();
    string activityName = string.Format("{0}.{1}", NickName, workItemData["activityName"].Value<string>());
    string browerConnectionId = workItemData["browerConnectionId"].Value<string>();

    // save the file on the server
    var fileSavePath = Path.Combine(_env.ContentRootPath, Path.GetFileName(input.inputFile.FileName));
    using (var stream = new FileStream(fileSavePath, FileMode.Create)) await input.inputFile.CopyToAsync(stream);

    // OAuth token
    dynamic oauth = await OAuthController.GetInternalAsync();

    // upload file to OSS Bucket
    // 1. ensure bucket existis
    string bucketKey = NickName.ToLower() + "-designautomation";
    BucketsApi buckets = new BucketsApi();
    buckets.Configuration.AccessToken = oauth.access_token;
    try
    {
        PostBucketsPayload bucketPayload = new PostBucketsPayload(bucketKey, null, PostBucketsPayload.PolicyKeyEnum.Transient);
        await buckets.CreateBucketAsync(bucketPayload, "US");
    }
    catch { }; // in case bucket already exists
    // 2. upload inputFile
    string inputFileNameOSS = string.Format("{0}_input_{1}", DateTime.Now.ToString("yyyyMMddhhmmss"), Path.GetFileName(input.inputFile.FileName)); // avoid overriding
    ObjectsApi objects = new ObjectsApi();
    objects.Configuration.AccessToken = oauth.access_token;
    using (StreamReader streamReader = new StreamReader(fileSavePath))
        await objects.UploadObjectAsync(bucketKey, inputFileNameOSS, (int)streamReader.BaseStream.Length, streamReader.BaseStream, "application/octet-stream");
    System.IO.File.Delete(fileSavePath);// delete server copy

    // prepare workitem arguments
    // 1. input file
    XrefTreeArgument inputFileArgument = new XrefTreeArgument()
    {
        Url = string.Format("https://developer.api.autodesk.com/oss/v2/buckets/{0}/objects/{1}", bucketKey, inputFileNameOSS),
        Headers = new Dictionary<string, string>()
        {
            { "Authorization", "Bearer " + oauth.access_token }
        }
    };
    // 2. input json
    dynamic inputJson = new JObject();
    inputJson.Width = widthParam;
    inputJson.Height = heigthParam;
    XrefTreeArgument inputJsonArgument = new XrefTreeArgument()
    {
        Url = "data:application/json, " + ((JObject)inputJson).ToString(Formatting.None).Replace("\"", "'")
    };
    // 3. output file
    string outputFileNameOSS = string.Format("{0}_output_{1}", DateTime.Now.ToString("yyyyMMddhhmmss"), Path.GetFileName(input.inputFile.FileName)); // avoid overriding
    XrefTreeArgument outputFileArgument = new XrefTreeArgument()
    {
        Url = string.Format("https://developer.api.autodesk.com/oss/v2/buckets/{0}/objects/{1}", bucketKey, outputFileNameOSS),
        Verb = Verb.Put,
        Headers = new Dictionary<string, string>()
            {
                {"Authorization", "Bearer " + oauth.access_token }
            }
    };

    // prepare & submit workitem
    // the callback contains the connectionId (used to identify the client) and the outputFileName of this workitem
    string callbackUrl = string.Format("{0}/api/forge/callback/designautomation?id={1}&outputFileName={2}", OAuthController.GetAppSetting("FORGE_WEBHOOK_URL"), browerConnectionId, outputFileNameOSS);
    WorkItem workItemSpec = new WorkItem()
    {
        ActivityId = activityName,
        Arguments = new Dictionary<string, IArgument>()
        {
            { "inputFile", inputFileArgument },
            { "inputJson",  inputJsonArgument },
            { "outputFile", outputFileArgument },
            { "onComplete", new XrefTreeArgument { Verb = Verb.Post, Url = callbackUrl } }
        }
    };
    WorkItemStatus workItemStatus = await _designAutomation.CreateWorkItemAsync(workItemSpec);

    return Ok(new { WorkItemId = workItemStatus.Id });
}

/// <summary>
/// Input for StartWorkitem
/// </summary>
public class StartWorkitemInput
{
    public IFormFile inputFile { get; set; }
    public string data { get; set; }
}
```

> Note how the `StartWorkitemInput` class is defined **inside** de **DesignAutomationController**, this is correct and it's used as input parameter for `StartWorkitem` method.

**2. OnCallback**

When the workitem is done, Design Automation will callback our app (using the ngrok forwarding URL). This function will handle it and push a notification to the client (using SignalR Hub).

```csharp
/// <summary>
/// Callback from Design Automation Workitem (onProgress or onComplete)
/// </summary>
[HttpPost]
[Route("/api/forge/callback/designautomation")]
public async Task<IActionResult> OnCallback(string id, string outputFileName, [FromBody]dynamic body)
{
    try
    {
        // your webhook should return immediately! we can use Hangfire to schedule a job
        JObject bodyJson = JObject.Parse((string)body.ToString());
        await _hubContext.Clients.Client(id).SendAsync("onComplete", bodyJson.ToString());

        var client = new RestClient(bodyJson["reportUrl"].Value<string>());
        var request = new RestRequest(string.Empty);

        // send the result output log to the client
        byte[] bs = client.DownloadData(request);
        string report = System.Text.Encoding.Default.GetString(bs);
        await _hubContext.Clients.Client(id).SendAsync("onComplete", report);

        // generate a signed URL to download the result file and send to the client
        ObjectsApi objectsApi = new ObjectsApi();
        dynamic signedUrl = await objectsApi.CreateSignedResourceAsyncWithHttpInfo(NickName.ToLower() + "-designautomation", outputFileName, new PostBucketsSigned(10), "read");
        await _hubContext.Clients.Client(id).SendAsync("downloadResult", (string)(signedUrl.Data.signedUrl));
    }
    catch { }

    // ALWAYS return ok (200)
    return Ok();
}
```

**3. ClearAccount**

Last, but not least, to help you test, this function removes all appbundles and activities from your account. 

```csharp
/// <summary>
/// Clear the accounts (for debugging purpouses)
/// </summary>
[HttpDelete]
[Route("api/forge/designautomation/account")]
public async Task<IActionResult> ClearAccount()
{
    // clear account
    await _designAutomation.DeleteForgeAppAsync("me");
    return Ok();
}
```

Everything ready!

Next: [Run & Debug](environment/rundebug/2legged_da)