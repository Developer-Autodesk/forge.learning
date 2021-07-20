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

        byte[] bs = client.DownloadData(request);
        string report = System.Text.Encoding.Default.GetString(bs);
        await _hubContext.Clients.Client(id).SendAsync("onComplete", report);

        ObjectsApi objectsApi = new ObjectsApi();
        dynamic signedUrl = await objectsApi.CreateSignedResourceAsyncWithHttpInfo(NickName.ToLower() + "-designautomation", outputFileName, new PostBucketsSigned(10), "read");
        await _hubContext.Clients.Client(id).SendAsync("downloadResult", (string)(signedUrl.Data.signedUrl));
    }
    catch (Exception e) { }

    // ALWAYS return ok (200)
    return Ok();
}
