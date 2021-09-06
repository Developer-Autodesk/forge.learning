# 创建新项目 (.NET Core)

> .NET Core 也可以在非 Windows 上和非 Visual Studio 环境中运行，请查看[此适用于 MacOS 的其他教程](https://github.com/augustogoncalves/dotnetcoreheroku)。编译插件时仍需要 Windows 操作系统。

转到菜单 **File** >> **New** >> **Project**。选择 **C#** 语言和 **Web** 项目类型，最后选择 **ASP.NET Core Web Application**。接下来，我们将其命名为 **forgeSample**。在下一个对话框中，选择 **Empty**。请确保选择 **ASP.NET Core 3.0**。

!> 如果项目类型或 .NET Core 3.0 不可用，请查看[工具](/zh-CN/environment/tools/netcore)部分。

安装 Autodesk Forge NuGet 软件包：在项目上单击鼠标右键 (**Solution Explorer**)，选择 **Manage NuGet Package**，然后在 **Browse** 中搜索 **Autodesk.Forge** 并安装 `Autodesk.Forge`。

重复 **Manage NuGet Packages** 中最后一步：搜索并安装 `Microsoft.AspNetCore.Mvc.NewtonsoftJson` 以处理 JSON 数据。 

![](_media/netcore/create_project.gif)

在项目上单击鼠标右键，转到 **Properties**，然后在 **Debug** 选项卡下，查看 **Environment Variables** 部分。应该已定义 `ASPNETCORE_ENVIRONMENT`，因此添加：

- `ASPNETCORE_URLS`：使用 `http://localhost:3000`
- `FORGE_CLIENT_ID`：此处使用您的 ID
- `FORGE_CLIENT_SECRET`：此处使用您的密钥
- `FORGE_CALLBACK_URL`：在此示例中，使用 `http://localhost:3000/api/forge/callback/oauth`

如果要在调试时在浏览器中自动启动应用程序，还可以选中 **Launch browser** 并指定 **App URL**。将 **App URL** 字段调整为 `http://localhost:3000`。最后，由于我们在本地运行应用程序，无需设置受信任的证书，因此取消选中 **Enable SSL** 选项。设置应如下所示。

![](_media/netcore/env_vars.png)

现在，打开 **Startup.cs** 并添加以下名称空间：

```csharp
using Microsoft.AspNetCore.Mvc;
```

然后，将 `Startup` 类的内容替换为以下代码，以初始化用于存放 HTML 和 JavaScript 文件的静态文件服务器。 

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
    app.UseMvc();
}
```

最后，创建一个 **Controllers** 文件夹，稍后我们将在其中定义 WebAPI 控制器。

有关设置项目的内容就介绍这些！