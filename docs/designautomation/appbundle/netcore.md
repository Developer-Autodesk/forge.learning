# Code for creating App Bundle (.NET Core)

Now the ZIP bundle is ready, let's upload to Design Automation.

## DesignAutomationController.cs

Under **Controllers** folder create a `DesignAutomationController.cs` with the following content. This is just the class, we'll define the endpoints later, but note the `DesignAutomationHub` at the end, which allow us push notifications to the client via [SignalR](https://docs.microsoft.com/en-us/aspnet/core/signalr/introduction?view=aspnetcore-2.2).

```csharp
using Autodesk.Forge;
using Autodesk.Forge.DesignAutomation.v3;
using Autodesk.Forge.Model;
using Autodesk.Forge.Model.DesignAutomation.v3;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RestSharp;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using ActivitiesApi = Autodesk.Forge.DesignAutomation.v3.ActivitiesApi;
using Activity = Autodesk.Forge.Model.DesignAutomation.v3.Activity;
using EnginesApi = Autodesk.Forge.DesignAutomation.v3.EnginesApi;
using WorkItem = Autodesk.Forge.Model.DesignAutomation.v3.WorkItem;
using WorkItemsApi = Autodesk.Forge.DesignAutomation.v3.WorkItemsApi;

namespace forgeSample.Controllers
{
    [ApiController]
    public class DesignAutomationController : ControllerBase
    {
        // Used to access the application folder (temp location for files & bundles)
        private IHostingEnvironment _env;
        // used to access the SignalR Hub
        private IHubContext<DesignAutomationHub> _hubContext;
        // Constructor, where env and hubContext are specified
        public DesignAutomationController(IHostingEnvironment env, IHubContext<DesignAutomationHub> hubContext) { _env = env; _hubContext = hubContext; }
        // Local folder for bundles
        public string LocalBundlesFolder { get { return Path.Combine(_env.WebRootPath, "bundles"); } }
        /// Prefix for AppBundles and Activities
        public static string NickName { get { return OAuthController.GetAppSetting("FORGE_CLIENT_ID"); } }
        /// Alias for the app (e.g. DEV, STG, PROD). This value may come from an environment variable
        public static string Alias { get { return "dev"; } }
    }

    /// <summary>
    /// Class uses for SignalR
    /// </summary>
    public class DesignAutomationHub : Microsoft.AspNetCore.SignalR.Hub
    {
        public string GetConnectionId() { return Context.ConnectionId; }
    }
}
```

Now let's add a few endpoints to this class.

**1. GetLocalBundles**

Look at the `bundles` folder and return a lista of .ZIP files.

```csharp
/// <summary>
/// Names of app bundles on this project
/// </summary>
[HttpGet]
[Route("api/appbundles")]
public string[] GetLocalBundles()
{
    // this folder is placed under the public folder, which may expose the bundles
    // but it was defined this way so it be published on most hosts easily
    return Directory.GetFiles(LocalBundlesFolder, "*.zip").Select(Path.GetFileNameWithoutExtension).ToArray();
}
```

**2. GetAvailableEngines**

To define a bundle we also need the engine, so this endpoint return a list of all available engines.

```csharp
/// <summary>
/// Return a list of available engines
/// </summary>
[HttpGet]
[Route("api/forge/designautomation/engines")]
public async Task<List<string>> GetAvailableEngines()
{
    dynamic oauth = await OAuthController.GetInternalAsync();

    // define Engines API
    EnginesApi enginesApi = new EnginesApi();
    enginesApi.Configuration.AccessToken = oauth.access_token;
    PageString engines = await enginesApi.EnginesGetItemsAsync();
    engines.Data.Sort();

    return engines.Data; // return list of engines
}
```

**3. CreateAppBundle**

That's where we actually define a new AppBundle:

```csharp
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

    // define Activities API
    dynamic oauth = await OAuthController.GetInternalAsync();
    AppBundlesApi appBundlesApi = new AppBundlesApi();
    appBundlesApi.Configuration.AccessToken = oauth.access_token;

    // get defined app bundles
    PageString appBundles = await appBundlesApi.AppBundlesGetItemsAsync();

    // check if app bundle is already define
    dynamic newAppVersion;
    string qualifiedAppBundleId = string.Format("{0}.{1}+{2}", NickName, appBundleName, Alias);
    if (!appBundles.Data.Contains(qualifiedAppBundleId))
    {
        // create an appbundle (version 1)
        AppBundle appBundleSpec = new AppBundle(appBundleName, null, engineName, null, null, string.Format("Description for {0}", appBundleName), null, appBundleName);
        newAppVersion = await appBundlesApi.AppBundlesCreateItemAsync(appBundleSpec);
        if (newAppVersion == null) throw new Exception("Cannot create new app");

        // create alias pointing to v1
        Alias aliasSpec = new Alias(1, null, Alias);
        Alias newAlias = await appBundlesApi.AppBundlesCreateAliasAsync(appBundleName, aliasSpec);
    }
    else
    {
        // create new version
        AppBundle appBundleSpec = new AppBundle(null, null, engineName, null, null, appBundleName, null, null);
        newAppVersion = await appBundlesApi.AppBundlesCreateItemVersionAsync(appBundleName, appBundleSpec);
        if (newAppVersion == null) throw new Exception("Cannot create new version");

        // update alias pointing to v+1
        Alias aliasSpec = new Alias(newAppVersion.Version, null, null);
        Alias newAlias = await appBundlesApi.AppBundlesModifyAliasAsync(appBundleName, Alias, aliasSpec);
    }

    // upload the zip with .bundle
    RestClient uploadClient = new RestClient(newAppVersion.UploadParameters.EndpointURL);
    RestRequest request = new RestRequest(string.Empty, Method.POST);
    request.AlwaysMultipartFormData = true;
    foreach (KeyValuePair<string, object> x in newAppVersion.UploadParameters.FormData) request.AddParameter(x.Key, x.Value);
    request.AddFile("file", packageZipPath);
    request.AddHeader("Cache-Control", "no-cache");
    await uploadClient.ExecuteTaskAsync(request);

    return Ok(new { AppBundle = qualifiedAppBundleId, Version = newAppVersion.Version });
}
```

As the `DesignAutomationHub` class is now defined (inside this controller), open the `Startup.cs` and, inside `Configure` method, add the following line:

```csharp
app.UseSignalR(routes =>
{
    routes.MapHub<DesignAutomationHub>("/api/signalr/designautomation");
});
```

If you launch the webapp now and click on **Configure** (top-right), you should see your AppBundle and a list of all available engines. **Buttons do not work yet**... let's move forward.

![](_media/designautomation/list_engines.png)

Next: [Define an Activity](designautomation/activity/)