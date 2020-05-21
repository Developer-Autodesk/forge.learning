# Create a new project (.NET Core)

> .NET Core also runs on non-Windows and non-Visual Studio environment, please check [this other tutorial for MacOS](https://github.com/augustogoncalves/dotnetcoreheroku). Windows OS still required to compile the plugin.

Go to menu **File** >> **New** >> **Project**. Select **C#** language and **Web** project type, finally select **ASP.NET Core Web Application**. Next, let's name it **forgeSample**. On the next dialog, select **Empty**. Please ensure **ASP.NET Core 3.0** is selected.

!> If the project type or .NET Core 3.0 are not available, please review [Tools](environment/tools/netcore) section.

Install the Autodesk Forge NuGet package: right-click on the project (**Solution Explorer**), select **Manage NuGet Package**, then on **Browse** search for **Autodesk.Forge** and install `Autodesk.Forge`.

Repeat the last step at **Manage NuGet Packages**: search and install `Microsoft.AspNetCore.Mvc.NewtonsoftJson` to handle JSON data. 

![](_media/netcore/create_project.gif)

Right-click on the project, go to **Properties**, then under **Debug** tab see the **Environment Variables** section. `ASPNETCORE_ENVIRONMENT` should be already defined, so add:

- `ASPNETCORE_URLS`: use `http://localhost:3000`
- `FORGE_CLIENT_ID`: use your id here
- `FORGE_CLIENT_SECRET`: use your secret here
- `FORGE_CALLBACK_URL`: for this sample, use `http://localhost:3000/api/forge/callback/oauth`

You may also check **Launch browser** and specify the **App URL** if you would to launch the app in your browser automatically when debugging. Adjust the **App URL** field to `http://localhost:3000`. Finally, as we are running the app locally without setting up a trusted certificate, uncheck **Enable SSL** option. Your settings should look as shown below.

![](_media/netcore/env_vars.png)

Now open the **Startup.cs** and add the following namespace:

```csharp
using Microsoft.AspNetCore.Mvc;
```

Then replace the contents of the `Startup` class with the following code to initialize our static file server for HTML & JavaScript files. 

```csharp
// This method gets called by the runtime. Use this method to add services to the container.
// For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
public void ConfigureServices(IServiceCollection services)
{
    services.AddMvc(options => options.EnableEndpointRouting = false).SetCompatibilityVersion(CompatibilityVersion.Version_3_0).AddNewtonsoftJson();
}

// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    if (env.IsDevelopment())
    {
        app.UseDeveloperExceptionPage();
    }

    app.UseDefaultFiles();
    app.UseStaticFiles();
    app.UseHttpsRedirection();
    app.UseMvc();
}
```

Finally, create a **Controllers** folder and in there we will define our WebAPI Controllers later.

So much for setting up our project!