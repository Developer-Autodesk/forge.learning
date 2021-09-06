# 新規プロジェクトを作成する(.NET Core)

> .NET Core は、Windows 以外および Visual Studio 以外の環境でも実行できます。[このチュートリアルの MacOS 版](https://github.com/augustogoncalves/dotnetcoreheroku)を確認してください。プラグインをコンパイルするには、引き続き Windows OS が必要です。

**File** メニュー >> **New** >> **Project** の順に選択します。**C#** 言語および **Web** プロジェクト タイプを選択し、最後に **ASP.NET Core Web Application** を選択します。次に、プロジェクトに **forgeSample** という名前を付けます。次のダイアログで、**Empty** を選択します。**ASP.NET Core 3.0** が選択されていることを確認してください。

!> プロジェクトのタイプまたは .NET Core 3.0 が使用できない場合は、[Tools](/ja-JP/environment/tools/netcore) セクションを確認してください。

Autodesk Forge NuGet パッケージをインストールする: プロジェクト(**Solution Explorer**)を右クリックし、**Manage NuGet Package** を選択し、**Browse** で **Autodesk Forge** を検索して、`Autodesk.Forge` をインストールします。これは、入力および出力結果を [OSS バケット](https://forge.autodesk.com/en/docs/data/v2/developers_guide/basics/)にアップロードする際に使用されます。

「**NuGet パッケージを管理する**」の最後の手順を繰り返す: JSON データを処理するには、`Autodesk.Forge.DesignAutomation` および `Microsoft.AspNetCore.Mvc.NewtonsoftJson` を検索してインストールします。 

![](_media/netcore/create_project.gif) 

プロジェクトを右クリックして **Properties** を選択し、**Debug** タブの **Environment Variables** セクションを確認します。`ASPNETCORE_ENVIRONMENT` は既に定義されているため、以下を追加します。

- `ASPNETCORE_URLS`: `http://localhost:3000` を使用
- `FORGE_CLIENT_ID`: ここで自分の ID を使用
- `FORGE_CLIENT_SECRET`: ここで自分のシークレットを使用
- `FORGE_WEBHOOK_URL`: 前の手順の **ngrok** 転送 URL を使用

**Launch browser** をオンにして、**App URL** を指定することもできます。最後に、この処理はローカルで実行されるため、**Enable SSL** オプションをオフにします。次のように表示されます。

![](_media/netcore/env_vars_da.png) 


ここで、**Program.cs** を開き、次のネームスペースを追加します。

```csharp
using Autodesk.Forge.Core;
using Autodesk.Forge.DesignAutomation;
```

次に、**Program.cs** の `Main()` メソッドの内容を以下に置き換えます。こうすることで、上記で定義した環境変数から Forge クライアント ID とシークレットをロードするようにアプリケーションに通知されます。

```csharp
CreateHostBuilder(args).ConfigureAppConfiguration(builder =>
{
    builder.AddForgeAlternativeEnvironmentVariables();
}).ConfigureServices((hostContext, services) =>
{
    services.AddDesignAutomation(hostContext.Configuration);
}).Build().Run();
```

**Startup.cs** を開き、次のネームスペースを追加します。

```csharp
using Microsoft.AspNetCore.Mvc;
```

次に、`Startup` クラスの内容を次のコードに置き換えます。このコードは、クライアントに通知をプッシュする際に使用される静的ファイル サーバ(HTML と JS)および [SignalR](https://docs.microsoft.com/en-us/aspnet/core/signalr/introduction?view=aspnetcore-2.2) を有効にします。

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

WebAPI コントローラをホストする **Controllers** フォルダを作成します。

OSSバケットに対して入力および出力ファイルを読み書きするには、`access token` が必要です。**Controllers** フォルダの下に、次の内容を含む `OAuthController.cs` ファイルを作成します。

[OAuthController.cs](_snippets/modifymodels/netcore/OAuthController.cs ':include :type=code csharp')

プロジェクトの準備ができました!この時点で、次のようになります。

![](_media/designautomation/netcore/basefiles_step1.png) 

次の作業:[基本アプリの UI](/ja-JP/designautomation/html/)