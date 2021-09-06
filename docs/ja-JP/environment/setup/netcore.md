# 新規プロジェクトを作成する(.NET Core)

> .NET Core は、Windows 以外および Visual Studio 以外の環境でも実行できます。[このチュートリアルの MacOS 版](https://github.com/augustogoncalves/dotnetcoreheroku)を確認してください。プラグインをコンパイルするには、引き続き Windows OS が必要です。

**File** メニュー >> **New** >> **Project** の順に選択します。**C#** 言語および **Web** プロジェクト タイプを選択し、最後に **ASP.NET Core Web Application** を選択します。次に、プロジェクトに **forgeSample** という名前を付けます。次のダイアログで、**Empty** を選択します。**ASP.NET Core 3.0** が選択されていることを確認してください。

!> プロジェクトのタイプまたは .NET Core 3.0 が使用できない場合は、[Tools](/ja-JP/environment/tools/netcore) セクションを確認してください。

Autodesk Forge NuGet パッケージをインストールする: プロジェクト(**Solution Explorer**)を右クリックし、**Manage NuGet Package** を選択し、**Browse** で **Autodesk Forge** を検索して、`Autodesk.Forge` をインストールします。

「**NuGet パッケージを管理する**」の最後の手順を繰り返す: JSON データを処理するには、`Microsoft.AspNetCore.Mvc.NewtonsoftJson` を検索してインストールします。 

![](_media/netcore/create_project.gif)

プロジェクトを右クリックして **Properties** を選択し、**Debug** タブの **Environment Variables** セクションを確認します。`ASPNETCORE_ENVIRONMENT` は既に定義されているため、以下を追加します。

- `ASPNETCORE_URLS`: `http://localhost:3000` を使用
- `FORGE_CLIENT_ID`: ここで自分の ID を使用
- `FORGE_CLIENT_SECRET`: ここで自分のシークレットを使用
- `FORGE_CALLBACK_URL`: このサンプルでは `http://localhost:3000/api/forge/callback/oauth` を使用

**Launch browser** をオンにして、**App URL** を指定することで、デバッグ時にブラウザでアプリを自動的に起動することもできます。**App URL** フィールドを `http://localhost:3000` に調整します。最後に、信頼できる証明書をセットアップしないでアプリをローカルに実行しているため、** Enable SSL** オプションをオフにします。設定は以下のようになります。

![](_media/netcore/env_vars.png)

**Startup.cs** を開き、次のネームスペースを追加します。

```csharp
using Microsoft.AspNetCore.Mvc;
```

次に、`Startup` クラスの内容を次のコードに置き換えて、HTML および JavaScript ファイル用の静的ファイル サーバを初期化します。 

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

最後に、**Controllers** フォルダを作成し、後でこのフォルダ内で WebAPI コントローラを定義します。

これで、プロジェクトのセットアップは完了です。