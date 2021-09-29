# 建立新專案 (.NET Core)

> .NET Core 亦可在非 Windows 與非 Visual Studio 環境執行，請查看[此專為 MacOS 而設的另一項自學課程](https://github.com/augustogoncalves/dotnetcoreheroku)。若要編譯外掛程式，仍需使用 Windows 作業系統。

移往 **File** 功能表 >> **New** >> **Project**。選取 **C#** 語言和 **Web** 專案類型，最後選取 **ASP.NETCore Web Application**。下一步，讓我們將其命名為 **forgeSample**。在下一個對話方塊中，選取 **Empty**。請確定已選取 **ASP.NET Core 3.0**。

!> 如果找不到上述的檔案類型或 .NET Core 3.0，請參閱[「開發工具及環境準備」](/zh-TW/environment/tools/netcore)章節。

安裝 Autodesk Forge NuGet 套件：在專案 (**Solution Explorer**) 上按一下右鍵，選取 **Manage NuGet Package**，在 **Browse** 搜尋 **Autodesk.Forge**，然後安裝 `Autodesk.Forge`。

重複 **Manage NuGet Packages** 的最後一個步驟：搜尋並安裝 `Microsoft.AspNetCore.Mvc.NewtonsoftJson` 以處理 JSON 資料。 

![](_media/netcore/create_project.gif)

在專案上按一下右鍵，移往 **Properties**，然後在 **Debug** 頁籤下查看 **Environment Variables** 區段。`ASPNETCORE_ENVIRONMENT` 應已定義，因此請加入：

- `ASPNETCORE_URLS`：使用 `http://localhost:3000`
- `FORGE_CLIENT_ID`：在此處使用您的 Client ID
- `FORGE_CLIENT_SECRET`：在此處使用您的 Client Secret
- `FORGE_CALLBACK_URL`：就此範例而言，請使用 `http://localhost:3000/api/forge/callback/oauth`

如果要在除錯時自動在瀏覽器中啟動應用程式，則還可以勾選 **Launch browser**，然後指定 **App URL**。將 **App URL** 欄位調整為 `http://localhost:3000`。最後，由於我們是要在本端執行應用程式但不設定受信任的認證，請取消勾選 **Enable SSL** 選項。您的設定看起來如下所示。

![](_media/netcore/env_vars.png)

現在，開啟 **Startup.cs**，然後加入以下名稱空間：

```csharp
using Microsoft.AspNetCore.Mvc;
```

接著，將 `Startup` 類別的內容取代為以下程式碼，以便為 HTML 與 JavaScript 檔案初始化靜態檔案伺服器。 

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

最後，建立 **Controllers** 資料夾，稍後我們將在其中定義 Web API 控制器。

這樣專案就設定完成了！