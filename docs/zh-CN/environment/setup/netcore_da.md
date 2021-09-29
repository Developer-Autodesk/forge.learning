# 创建新项目 (.NET Core)

> .NET Core 也可以在非 Windows 上和非 Visual Studio 环境中运行，请查看[此适用于 MacOS 的其他教程](https://github.com/augustogoncalves/dotnetcoreheroku)。编译插件时仍需要 Windows 操作系统。

转到菜单 **File** >> **New** >> **Project**。选择 **C#** 语言和 **Web** 项目类型，最后选择 **ASP.NET Core Web Application**。接下来，我们将其命名为 **forgeSample**。在下一个对话框中，选择 **Empty**。请确保选择 **ASP.NET Core 3.0**。

!> 如果项目类型或 .NET Core 3.0 不可用，请查看[工具](/zh-CN/environment/tools/netcore)部分。

安装 Autodesk Forge NuGet 软件包：在项目上单击鼠标右键 (**Solution Explorer**)，选择 **Manage NuGet Package**，然后在 **Browse** 中搜索 **Autodesk.Forge** 并安装 `Autodesk.Forge`。这将用于将输入和输出结果上传到 [OSS bucket](https://forge.autodesk.com/en/docs/data/v2/developers_guide/basics/)。

重复 **Manage NuGet Packages** 中最后一步：搜索并安装 `Autodesk.Forge.DesignAutomation` 和 `Microsoft.AspNetCore.Mvc.NewtonsoftJson` 以处理 JSON 数据。 

![](_media/netcore/create_project.gif) 

在项目上单击鼠标右键，转到 **Properties**，然后在 **Debug** 选项卡下，查看 **Environment Variables** 部分。应该已定义 `ASPNETCORE_ENVIRONMENT`，因此添加：

- `ASPNETCORE_URLS`：使用 `http://localhost:3000`
- `FORGE_CLIENT_ID`：此处使用您的 ID
- `FORGE_CLIENT_SECRET`：此处使用您的 Secret
- `FORGE_WEBHOOK_URL`：使用上一步中的 **ngrok** 转发 URL

您还可以选中 **Launch browser** 并指定 **App URL**。最后，由于这是在本地运行，因此取消选中 **Enable SSL** 选项。它应如下所示。

![](_media/netcore/env_vars_da.png) 


现在，打开 **Program.cs** 并添加以下名称空间：

```csharp
using Autodesk.Forge.Core;
using Autodesk.Forge.DesignAutomation;
```

然后，将 **Program.cs** `Main()` 方法内容替换为以下内容。这将告知应用程序从上面定义的环境变量加载 Forge Client ID 和 Secret。

```csharp
CreateHostBuilder(args).ConfigureAppConfiguration(builder =>
{
    builder.AddForgeAlternativeEnvironmentVariables();
}).ConfigureServices((hostContext, services) =>
{
    services.AddDesignAutomation(hostContext.Configuration);
}).Build().Run();
```

现在，打开 **Startup.cs** 并添加以下名称空间：

```csharp
using Microsoft.AspNetCore.Mvc;
```

然后，将 `Startup` 类的内容替换为以下代码，这将启用静态文件服务器（HTML 和 JS）和 [SignalR](https://docs.microsoft.com/en-us/aspnet/core/signalr/introduction?view=aspnetcore-2.2)，用于向客户端推送通知。

```csharp
// This method gets called by the runtime. Use this method to add services to the container.
// For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
public void ConfigureServices(IServiceCollection services)
{
    services.AddMvc(options => options.EnableEndpointRouting = false).SetCompatibilityVersion(CompatibilityVersion.Version_3_0).AddNewtonsoftJson();
    services.AddSignalR().AddNewtonsoftJsonProtocol(opt=> {
        opt.PayloadSerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
    });
}

// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    app.UseFileServer();
    app.UseMvc();
}
```

## OAuthController.cs

创建 **Controllers** 文件夹，该文件夹将托管 WebAPI 控制器。

我们需要 `access token` 以在 OSS bucket 中读写输入和输出文件。在 **Controllers** 文件夹下，创建一个包含以下内容的 `OAuthController.cs` 文件：

[OAuthController.cs](_snippets/modifymodels/netcore/OAuthController.cs ':include :type=code csharp')

项目已准备就绪！此时，它应如下所示：

![](_media/designautomation/netcore/basefiles_step1.png) 

下一步：[基本应用程序 UI](/zh-CN/designautomation/html/)