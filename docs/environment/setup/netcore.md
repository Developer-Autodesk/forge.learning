# Create a new project (.NET Core)

> .NET Core also runs on non-Windows and non-Visual Studio environment, please check [this other tutorial for MacOS](https://github.com/augustogoncalves/dotnetcoreheroku). Windows OS still required to compile the plugin.

Go to menu **File** >> **New** >> **Project** and select **.NET Core** >> **ASP.NET Core Web Application**. For this sample, let's name it **forgesample**. On the next dialog, select **Empty** and select **Web API**. 

Install the Autodesk Forge NuGet package: right-click on the project (**Solution Explorer**), select **Manage NuGet Package**, then on **Browse** search for **Autodesk Forge** and install it our **forgesample**. 

![](_media/netcore/create_project.gif) 

!> If **Web** & **ASP.NET** project types are not available, please review [Tools](environment/tools/net) section

Right-click on the projet, go to **Properties**, then under **Debug** tab see the **Environment Variables** section. `ASPNETCORE_ENVIRONMENT` should be already defined, so add:

- `ASPNETCORE_URLS`: use `http://localhost:3000`
- `FORGE_CLIENT_ID`: use your id here
- `FORGE_CLIENT_SECRET`: use your secret here
- `FORGE_WEBHOOK_CALLBACK_HOST`: use the **ngrok** forwarding URL from previous step

You may also check **Launch browser** and specify the **App URL** as shown below.

![](_media/netcore/env_vars.png) 

Now open the **Startup.cs** and replace the content of the `Startup` class with the following code, which enables static file server (HTML & JS) and [SignalR](https://docs.microsoft.com/en-us/aspnet/core/signalr/introduction?view=aspnetcore-2.2), used to push notifications to the client.

```csharp
// This method gets called by the runtime. Use this method to add services to the container.
// For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
public void ConfigureServices(IServiceCollection services)
{
    services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
    services.AddSignalR();
}

// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
public void Configure(IApplicationBuilder app, IHostingEnvironment env)
{
    if (env.IsDevelopment())
    {
        app.UseDeveloperExceptionPage();
    }
    else
    {
        app.UseHsts();
    }

    app.UseSignalR(routes =>
    {
        routes.MapHub<DesignAutomationHub>("/api/signalr/designautomation");
    });

    app.UseFileServer();
    app.UseMvc();
}
```

Finally, create a **Controllers** folder, which will later host the WebAPI Controllers.

Project is ready!

Next: [Basic app UI](designautomation/html/)