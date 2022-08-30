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

        using (var httpClient = new HttpClient())
        {
            byte[] bs = await httpClient.GetByteArrayAsync(bodyJson["reportUrl"].Value<string>());
            string report = System.Text.Encoding.Default.GetString(bs);
            await _hubContext.Clients.Client(id).SendAsync("onComplete", report);
        }

        // OAuth token
        dynamic oauth = await OAuthController.GetInternalAsync();

        ObjectsApi objectsApi = new ObjectsApi();
        objectsApi.Configuration.AccessToken = oauth.access_token;

        //finalize upload in the callback.
        ApiResponse<dynamic> res = await objectsApi.completeS3UploadAsyncWithHttpInfo(NickName.ToLower() + "-designautomation", outputFileName, S3UploadPayload, new Dictionary<string, object> {
        { "minutesExpiration", 2.0 },
        { "useCdn", true }
        });
        HttpErrorHandler(res, $"Failed to complete S3 posting");

        res = await objectsApi.getS3DownloadURLAsyncWithHttpInfo(NickName.ToLower() + "-designautomation", outputFileName, new Dictionary<string, object> {
        { "minutesExpiration", 15.0 },
        { "useCdn", true }
        });
        await _hubContext.Clients.Client(id).SendAsync("downloadResult", (string)(res.Data.url));
        Console.WriteLine("Congrats!");
    }
    catch (Exception ex)
    {
        Console.WriteLine(ex.Message);
    }

    // ALWAYS return ok (200)
    return Ok();
}
