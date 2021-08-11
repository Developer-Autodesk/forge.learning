# 新しいプロジェクトを作成する(.NET Core)

> .NET Core は、Windows 以外および Visual Studio 以外の環境でも実行できます。MacOS の場合は、[この他のチュートリアルを確認してください。](https://github.com/augustogoncalves/dotnetcoreheroku)プラグインのコンパイルには、引き続きWindows OSが必要です。

メニュー **File** >> **New** >> **Project** に移動します。**C#** language および **Web** プロジェクト タイプを選択し、最後に **ASP.NET Core Web アプリケーション**を選択します。次に、**forgeSample** という名前を付けます。次のダイアログで、**空の**を選択します。**ASP.NET Core 3.0** が選択されていることを確認してください。

!> プロジェクト タイプまたは .NET Core 3.0 が使用できない場合は、[ツール](/ja_jp/environment/tools/netcore)セクションを確認してください。

Autodesk Forge NuGet パッケージをインストールします。プロジェクト(**ソリューション エクスプローラ**)を右クリックし、**NuGet パッケージの管理** を選択し、**Autodesk.Forge を参照**して **Autodesk.Forge** をインストールします。

** NuGet パッケージの管理**で最後の手順を繰り返します。次に、`Microsoft.AspNetCore.Mvc.NewtonsoftJson` を検索してインストールし、JSON データを処理します。 

![](_media/netcore/create_project.gif)

プロジェクトを右クリックして、**プロパティ**に移動し、**デバッグ** タブの下で、**環境変数** セクションを参照してください。`ASPNETCORE_ENVIRONMENT` は既に定義されている必要があるため、次を追加します。

- `ASPNETCORE_URLS`:使用 `http://localhost:3000`
- `FORGE_CLIENT_ID`:ここでidを使用
- `FORGE_CLIENT_SECRET`:ここで秘密を使用してください
- `FORGE_CALLBACK_URL`:このサンプルでは、 `http://localhost:3000/api/forge/callback/oauth`

また、デバッグ時にブラウザでアプリを自動的に起動する場合は、**Launch browser** をチェックして、**App URL** を指定することもできます。**App URL** フィールドを `http://localhost:3000` に調整します。最後に、信頼できる証明書を設定せずにローカルでアプリケーションを実行するため、** Enable SSL** オプションをオフにします。設定は次のようになります。

![](_media/netcore/env_vars.png)

次に、**Startup.cs** を開き、次のネームスペースを追加します。

```csharp
using Microsoft.AspNetCore.Mvc;
```

次に、`Startup`クラスの内容を次のコードに置き換えて、HTMLおよびJavaScriptファイル用の静的ファイルサーバを初期化します。 

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

最後に、**Controllers** フォルダを作成し、その中で後から WebAPI コントローラを定義します。

プロジェクトのセットアップに必要な機能が追加されました。