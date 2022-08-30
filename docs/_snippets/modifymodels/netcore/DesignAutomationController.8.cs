public static bool HttpErrorHandler(ApiResponse<dynamic> response, string msg = "", bool bThrowException = true)
{
    if (response.StatusCode < 200 || response.StatusCode >= 300)
    {
        if (bThrowException)
            throw new Exception(msg + " (HTTP " + response.StatusCode + ")");
        return (true);
    }
    return (false);
}

private async static Task<string> PrepareInputUrl(string bucketKey, string objectKey, dynamic oauth, string fileSavePath)
{

    try
    {
        ObjectsApi objectsAPI = new ObjectsApi();
        objectsAPI.Configuration.AccessToken = oauth.access_token;
        ApiResponse<dynamic> response = await objectsAPI.getS3UploadURLAsyncWithHttpInfo(bucketKey, objectKey,
            new Dictionary<string, object> {
            { "minutesExpiration", 60.0 },
            { "useCdn", true }
            });
        HttpErrorHandler(response, $"Failed to get S3 upload url");
        // save the file on the server                
        using (var stream = new FileStream(fileSavePath, FileMode.Open))
        {
            HttpClient httpClient = new HttpClient();
            StreamContent streamContent = new StreamContent(stream);
            HttpResponseMessage res = await httpClient.PutAsync(response.Data["urls"][0], streamContent);
            res.EnsureSuccessStatusCode();
            var postCompleteS3UploadBody = new PostCompleteS3UploadPayload(response.Data.uploadKey, (int)stream.Length);
            response = await objectsAPI.completeS3UploadAsyncWithHttpInfo(bucketKey, objectKey, postCompleteS3UploadBody);
            HttpErrorHandler(response, $"Failed to complete S3 upload");
            Console.WriteLine($"Completed Posting to {response.Data.location}");
        }
        response = await objectsAPI.getS3DownloadURLAsyncWithHttpInfo(bucketKey, objectKey, new Dictionary<string, object> {
            { "minutesExpiration", 60.0 },
            { "useCdn", true }
        });
        HttpErrorHandler(response, $"Failed to get S3 download url");
        return response.Data.url;
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Exception when preparing input url:{ex.Message}");
        throw;
    }
}

private static async Task<string> PrepareOutputUrl(string bucketKey, string objectKey, dynamic oauth)
{

    try
    {
        ObjectsApi objectsAPI = new ObjectsApi();
        objectsAPI.Configuration.AccessToken = oauth.access_token;

        ApiResponse<dynamic> response = await objectsAPI.getS3UploadURLAsyncWithHttpInfo(bucketKey, objectKey,
                new Dictionary<string, object> {
            { "minutesExpiration", 60.0 },/*Kept large value intentionally*/
            { "useCdn", true } /*to get cloudfront url*/
                });
        HttpErrorHandler(response, $"Failed to get S3 upload url");
        //We need s3 upload payload to finalize the upload
        PostCompleteS3UploadPayload payload = new PostCompleteS3UploadPayload(response.Data.uploadKey, null);
        S3UploadPayload = payload;
        string url = response.Data["urls"][0];
        return (url);
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Failed to prepare output argument :{ex.Message}");
        throw;
    }
}

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
    string inputUrl = await PrepareInputUrl(bucketKey, inputFileNameOSS, oauth, fileSavePath);
    if (System.IO.File.Exists(fileSavePath))
    {
        System.IO.File.Delete(fileSavePath);
    }

    // prepare workitem arguments
    // 1. input file
    XrefTreeArgument inputFileArgument = new XrefTreeArgument()
    {
        Url = inputUrl
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
    string outputUrl = await PrepareOutputUrl(bucketKey, outputFileNameOSS, oauth);
    XrefTreeArgument outputFileArgument = new XrefTreeArgument()
    {
        Url = outputUrl,
        Verb = Verb.Put  
    };

    // prepare & submit workitem
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
