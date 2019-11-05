# Create a new project (.NET Core)

> .NET Core also runs on non-Windows and non-Visual Studio environment, please check [this other tutorial for MacOS](https://github.com/augustogoncalves/dotnetcoreheroku). Windows OS still required to compile the plugin.

Go to menu **File** >> **New** >> **Project**. Select **C#** language and **Web** project type, finally select **ASP.NET Core Web Application**. Next, let's name it **forgeSample**. On the next dialog, select **Empty**. Please ensure **ASP.NET Core 3.0** is selected.

!> If the project type or .NET Core 3.0 are not available, please review [Tools](environment/tools/netcore) section.

Install the Autodesk Forge NuGet package: right-click on the project (**Solution Explorer**), select **Manage NuGet Package**, then on **Browse** search for **Autodesk.Forge** and install `Autodesk.Forge`. This will be used to upload input and output results to [OSS buckets](https://forge.autodesk.com/en/docs/data/v2/developers_guide/basics/).

Repeat the last step at **Manage NuGet Packages**: search and install `Autodesk.Forge.DesignAutomation` and `Microsoft.AspNetCore.Mvc.NewtonsoftJson` to handle JSON data. 

![](_media/netcore/create_project.gif) 

Right-click on the project, go to **Properties**, then under **Debug** tab see the **Environment Variables** section. `ASPNETCORE_ENVIRONMENT` should be already defined, so add:

- `ASPNETCORE_URLS`: use `http://localhost:3000`
- `FORGE_CLIENT_ID`: use your id here
- `FORGE_CLIENT_SECRET`: use your secret here
- `FORGE_WEBHOOK_URL`: use the **ngrok** forwarding URL from previous step

You may also check **Launch browser** and specify the **App URL**. Finally, as this is running locally, uncheck **Enable SSL** option. It should look like as shown below.

![](_media/netcore/env_vars_da.png) 


Now open the **Program.cs** and add the following namespaces:

```csharp
using Autodesk.Forge.Core;
using Autodesk.Forge.DesignAutomation;
```

Then replace the **Program.cs** `Main()` method content with the following. This tells our application to load Forge Client ID & Secret from the environment variables defined above.

```csharp
CreateHostBuilder(args).ConfigureAppConfiguration(builder =>
{
    builder.AddForgeAlternativeEnvironmentVariables();
}).ConfigureServices((hostContext, services) =>
{
    services.AddDesignAutomation(hostContext.Configuration);
}).Build().Run();
```

Now open the **Startup.cs** and add the following namespace:

```csharp
using Microsoft.AspNetCore.Mvc;
```

Then replace the content of the `Startup` class with the following code, which enables static file server (HTML & JS) and [SignalR](https://docs.microsoft.com/en-us/aspnet/core/signalr/introduction?view=aspnetcore-2.2), used to push notifications to the client.

```csharp
// This method gets called by the runtime. Use this method to add services to the container.
// For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
public void ConfigureServices(IServiceCollection services)
{
    services.AddMvc(options => options.EnableEndpointRouting = false).SetCompatibilityVersion(CompatibilityVersion.Version_3_0).AddNewtonsoftJson();
    services.AddSignalR();
}

// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    app.UseFileServer();
    app.UseMvc();
}
```

## OAuthController.cs

Create a **Controllers** folder, which will host the WebAPI Controllers.

We'll need an `access token` to read & write input & output files to OSS Buckets. Under **Controllers** folder, create a `OAuthController.cs` file with the following content:

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Autodesk.Forge;

namespace forgeSample.Controllers
{
    [ApiController]
    public class OAuthController : ControllerBase
    {
        // As both internal & public tokens are used for all visitors
        // we don't need to request a new token on every request, so let's
        // cache them using static variables. Note we still need to refresh
        // them after the expires_in time (in seconds)
        private static dynamic InternalToken { get; set; }

        /// <summary>
        /// Get access token with internal (write) scope
        /// </summary>
        public static async Task<dynamic> GetInternalAsync()
        {
            if (InternalToken == null || InternalToken.ExpiresAt < DateTime.UtcNow)
            {
                InternalToken = await Get2LeggedTokenAsync(new Scope[] { Scope.BucketCreate, Scope.BucketRead, Scope.BucketDelete, Scope.DataRead, Scope.DataWrite, Scope.DataCreate, Scope.CodeAll });
                InternalToken.ExpiresAt = DateTime.UtcNow.AddSeconds(InternalToken.expires_in);
            }

            return InternalToken;
        }

        /// <summary>
        /// Get the access token from Autodesk
        /// </summary>
        private static async Task<dynamic> Get2LeggedTokenAsync(Scope[] scopes)
        {
            TwoLeggedApi oauth = new TwoLeggedApi();
            string grantType = "client_credentials";
            dynamic bearer = await oauth.AuthenticateAsync(
              GetAppSetting("FORGE_CLIENT_ID"),
              GetAppSetting("FORGE_CLIENT_SECRET"),
              grantType,
              scopes);
            return bearer;
        }

        /// <summary>
        /// Reads appsettings from web.config
        /// </summary>
        public static string GetAppSetting(string settingKey)
        {
            return Environment.GetEnvironmentVariable(settingKey);
        }
    }
}
```

Project is ready! At this point it should look like:

![](_media/designautomation/netcore/basefiles_step1.png) 

Next: [Basic app UI](designautomation/html/)