/// <summary>
/// Define a new appbundle
/// </summary>
[HttpPost]
[Route("api/forge/designautomation/appbundles")]
public async Task<IActionResult> CreateAppBundle([FromBody]JObject appBundleSpecs)
{
    // basic input validation
    string zipFileName = appBundleSpecs["zipFileName"].Value<string>();
    string engineName = appBundleSpecs["engine"].Value<string>();

    // standard name for this sample
    string appBundleName = zipFileName + "AppBundle";

    // check if ZIP with bundle is here
    string packageZipPath = Path.Combine(LocalBundlesFolder, zipFileName + ".zip");
    if (!System.IO.File.Exists(packageZipPath)) throw new Exception("Appbundle not found at " + packageZipPath);

    // get defined app bundles
    Page<string> appBundles = await _designAutomation.GetAppBundlesAsync();

    // check if app bundle is already define
    dynamic newAppVersion;
    string qualifiedAppBundleId = string.Format("{0}.{1}+{2}", NickName, appBundleName, Alias);
    if (!appBundles.Data.Contains(qualifiedAppBundleId))
    {
        // create an appbundle (version 1)
        AppBundle appBundleSpec = new AppBundle()
        {
            Package = appBundleName,
            Engine = engineName,
            Id = appBundleName,
            Description = string.Format("Description for {0}", appBundleName),

        };
        newAppVersion = await _designAutomation.CreateAppBundleAsync(appBundleSpec);
        if (newAppVersion == null) throw new Exception("Cannot create new app");

        // create alias pointing to v1
        Alias aliasSpec = new Alias() { Id = Alias, Version = 1 };
        Alias newAlias = await _designAutomation.CreateAppBundleAliasAsync(appBundleName, aliasSpec);
    }
    else
    {
        // create new version
        AppBundle appBundleSpec = new AppBundle()
        {
            Engine = engineName,
            Description = appBundleName
        };
        newAppVersion = await _designAutomation.CreateAppBundleVersionAsync(appBundleName, appBundleSpec);
        if (newAppVersion == null) throw new Exception("Cannot create new version");

        // update alias pointing to v+1
        AliasPatch aliasSpec = new AliasPatch()
        {
            Version = newAppVersion.Version
        };
        Alias newAlias = await _designAutomation.ModifyAppBundleAliasAsync(appBundleName, Alias, aliasSpec);
    }

    // upload the zip with .bundle            
    using (var client = new HttpClient())
    {
        using (var formData = new MultipartFormDataContent())
        {
            foreach (var kv in newAppVersion.UploadParameters.FormData)
            {
                if (kv.Value != null)
                {
                    formData.Add(new StringContent(kv.Value), kv.Key);
                }
            }
            using (var content = new StreamContent(new FileStream(packageZipPath, FileMode.Open)))
            {
                formData.Add(content, "file");
                using (var request = new HttpRequestMessage(HttpMethod.Post, newAppVersion.UploadParameters.EndpointURL) { Content = formData })
                {
                    var response = await client.SendAsync(request);
                    response.EnsureSuccessStatusCode();
                }
            }
        }
    }

    return Ok(new { AppBundle = qualifiedAppBundleId, Version = newAppVersion.Version });
}
