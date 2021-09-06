# 建立新專案 (.NET Core)

> .NET Core 亦可在非 Windows 與非 Visual Studio 環境執行，請查看[此專為 MacOS 而設的另一項自學課程](https://github.com/augustogoncalves/dotnetcoreheroku)。若要編譯外掛程式，仍需使用 Windows 作業系統。

移往 **File** 功能表 >> **New** >> **Project**。選取 **C#** 語言和 **Web** 專案類型，最後選取 **ASP.NETCore Web Application**。接下來，讓我們將其命名為 **forgeSample**。在下一個對話方塊中，選取 **Empty**。請確定已選取 **ASP.NET Core 3.0**。

!> 如果專案類型或 .NET Core 3.0 不可用，請檢閱[工具](/zh-TW/environment/tools/netcore)一節。

安裝 Autodesk Forge NuGet 套件：在專案 (**Solution Explorer**) 上按一下右鍵，選取 **Manage NuGet Package**，在 **Browse** 搜尋 **Autodesk.Forge**，然後安裝 `Autodesk.Forge`。這會用來將輸入與輸出結果上傳至 [OSS 儲體](https://forge.autodesk.com/en/docs/data/v2/developers_guide/basics/)。

重複 **Manage NuGet Packages** 的最後一個步驟：搜尋並安裝 `Autodesk.Forge.DesignAutomation` 和 `Microsoft.AspNetCore.Mvc.NewtonsoftJson` 以處理 JSON 資料。 

![](_media/netcore/create_project.gif) 

在專案上按一下右鍵，移往 **Properties**，然後在 **Debug** 頁籤下查看 **Environment Variables** 區段。`ASPNETCORE_ENVIRONMENT` 應已定義，因此請加入：

- `ASPNETCORE_URLS`：使用 `http://localhost:3000`
- `FORGE_CLIENT_ID`：在此處使用您的 ID
- `FORGE_CLIENT_SECRET`：在此處使用您的密碼
- `FORGE_WEBHOOK_URL`：使用上一步的 **ngrok** 轉送 URL

您也可以勾選 **Launch browser**，然後指定 **App URL**。最後，由於此應用程式要在本端執行，請取消勾選 **Enable SSL** 選項。它看起來如下所示。

![](_media/netcore/env_vars_da.png) 


現在，開啟 **Program.cs**，然後加入以下名稱空間：

```csharp
using Autodesk.Forge.Core;
using Autodesk.Forge.DesignAutomation;
```

接著，將 **Program.cs** 的 `Main()` 方法內容取代為以下程式碼。這會告訴我們的應用程式從上方所定義的環境變數載入 Forge Client ID & Secret。

```csharp
CreateHostBuilder(args).ConfigureAppConfiguration(builder =>
{
    builder.AddForgeAlternativeEnvironmentVariables();
}).ConfigureServices((hostContext, services) =>
{
    services.AddDesignAutomation(hostContext.Configuration);
}).Build().Run();
```

現在，開啟 **Startup.cs**，然後加入以下名稱空間：

```csharp
using Microsoft.AspNetCore.Mvc;
```

接著，將 `Startup` 類別的內容取代為以下程式碼，該程式碼會啟用靜態檔案伺服器 (HTML 和 JS) 和 [SignalR](https://docs.microsoft.com/en-us/aspnet/core/signalr/introduction?view=aspnetcore-2.2) (用來將通知推送至用戶端)。

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

建立 **Controllers** 資料夾，該資料夾將用來裝載 WebAPI 控制器。

我們需要有 `access token`，才能對 OSS 儲體讀取及寫入輸入檔案和輸出檔案。在 **Controllers** 資料夾下，建立含有以下內容的 `OAuthController.cs` 檔案：

[OAuthController.cs](_snippets/modifymodels/netcore/OAuthController.cs ':include :type=code csharp')

專案已準備就緒！此時，它看起來像這樣：

![](_media/designautomation/netcore/basefiles_step1.png) 

接下來：[基本應用程式使用者介面](/zh-TW/designautomation/html/)