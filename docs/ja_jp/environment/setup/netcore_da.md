# 新しいプロジェクトを作成する(.NET Core)

> .NET Core は、Windows 以外および Visual Studio 以外の環境でも実行できます。MacOS の場合は、[この他のチュートリアルを確認してください。](https://github.com/augustogoncalves/dotnetcoreheroku)プラグインのコンパイルには、引き続きWindows OSが必要です。

メニュー **File** >> **New** >> **Project** に移動します。**C#** language および **Web** プロジェクト タイプを選択し、最後に **ASP.NET Core Web アプリケーション**を選択します。次に、**forgeSample** という名前を付けます。次のダイアログで、**空の**を選択します。**ASP.NET Core 3.0** が選択されていることを確認してください。

!> プロジェクト タイプまたは .NET Core 3.0 が使用できない場合は、[ツール](/ja_jp/environment/tools/netcore)セクションを確認してください。

Autodesk Forge NuGet パッケージをインストールします。プロジェクト(**ソリューション エクスプローラ**)を右クリックし、**NuGet パッケージの管理** を選択し、**Autodesk.Forge を参照**して **Autodesk.Forge** をインストールします。これは、[OSS バケット](https://forge.autodesk.com/en/docs/data/v2/developers_guide/basics/)に入力および出力結果をアップロードするために使用されます。

** NuGet パッケージの管理**で最後の手順を繰り返します。JSON データを処理するには、`Autodesk.Forge.DesignAutomation` および `Microsoft.AspNetCore.Mvc.NewtonsoftJson` を検索してインストールします。 

![](_media/netcore/create_project.gif) 

プロジェクトを右クリックして、**プロパティ**に移動し、**デバッグ** タブの下で、**環境変数** セクションを参照してください。`ASPNETCORE_ENVIRONMENT` は既に定義されている必要があるため、次を追加します。

- `ASPNETCORE_URLS`:使用 `http://localhost:3000`
- `FORGE_CLIENT_ID`:ここでidを使用
- `FORGE_CLIENT_SECRET`:ここで秘密を使用してください
- `FORGE_WEBHOOK_URL`: 前の手順の **ngrok** 転送 URL を使用します

また、**Launch browser** をチェックし、**App URL** を指定することもできます。最後に、ローカルで実行するため、** Enable SSL** オプションをオフにします。次のように表示されます。

![](_media/netcore/env_vars_da.png) 


次に、**Program.cs** を開き、次のネームスペースを追加します。

```csharp
using Autodesk.Forge.Core;
using Autodesk.Forge.DesignAutomation;
```

次に、**Program.cs ** `Main()` メソッドの内容を次のように置き換えます。これにより、アプリケーションは上記で定義した環境変数からForgeクライアントIDとシークレットをロードします。

```csharp
CreateHostBuilder(args).ConfigureAppConfiguration(builder =>
{
    builder.AddForgeAlternativeEnvironmentVariables();
}).ConfigureServices((hostContext, services) =>
{
    services.AddDesignAutomation(hostContext.Configuration);
}).Build().Run();
```

次に、**Startup.cs** を開き、次のネームスペースを追加します。

```csharp
using Microsoft.AspNetCore.Mvc;
```

次に、`Startup` クラスの内容を次のコードに置き換えます。このコードは、静的ファイル サーバ(HTML および JS)および [SignalR](https://docs.microsoft.com/en-us/aspnet/core/signalr/introduction?view=aspnetcore-2.2) を有効にし、クライアントに通知をプッシュするために使用されます。

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

OSSバケットに入力および出力ファイルを読み書きするには、`access token`が必要です。**Controllers** フォルダの下に、次の内容を含む `OAuthController.cs` ファイルを作成します。

[OAuthController.cs](_snippets/modifymodels/netcore/OAuthController.cs ':include :type=code csharp')

プロジェクトの準備ができました。この時点では、次のようになります。

![](_media/designautomation/netcore/basefiles_step1.png) 

次へ:[基本アプリUI](/ja_jp/designautomation/html/)