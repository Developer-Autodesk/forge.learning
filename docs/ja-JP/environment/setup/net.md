# 新しいプロジェクトを作成する(.NET Framework)

**File** メニュー >> **New** >> **Project** の順に選択します。**C#** 言語および **Web** プロジェクト タイプを選択し、最後に **ASP.NET Web アプリケーション(.NET Framework)** を選択します。次に、**forgeSample** という名前を付けて、**.NET Framework 4.7.2** が選択されていることを確認してください。次のダイアログで **Empty** を選択し、**Web API** をオンにします。

!> プロジェクトのタイプまたは .NET Framework 4.7.2 を使用できない場合は、「[ツール](/ja-JP/environment/tools/net)」セクションを確認してください。

Autodesk Forge NuGet パッケージをインストールする: プロジェクト(**Solution Explorer**)を右クリックし、**Manage NuGet Package** を選択し、**Browse** で **Autodesk Forge** を検索して、**forgeSample** をインストールします。 

![](_media/net/create_project_webapi.gif) 

## Web.Config

**Web.Config** ファイルで、(アプリの作成時に取得された) Forge Client ID と Secret のエントリを追加します。既定では、`<configuration>` の後、`<system.web>` の前に `<appSettings></appSettings>` が既に配置されている必要があります。次の手順に従って調整してください。

```xml
....
<configuration> <!-- this line is already on your file -->
  <appSettings>
    <add key="FORGE_CLIENT_ID" value="Your client ID here" />
    <add key="FORGE_CLIENT_SECRET" value="Your client secret here" />
    <add key="FORGE_CALLBACK_URL" value="http://localhost:3000/api/forge/callback/oauth" />
  </appSettings>
  <system.web> <!-- this line is already on your file -->
....
```

ASP.NET エンジンは、最大リクエスト サイズを 4 MB に、アップロード ファイル サイズを 30 MB に制限します。この制限を最大値に変更することができます(ニーズに合わせて調整することもできます)。次のように、`web.config` ファイルで `httpRuntime` を検索して、`maxRequestLength` を追加します。

```xml
<!-- httpRuntime targetFramework is already on your file, just add the maxRequestLength -->
<httpRuntime targetFramework="4.7.2" maxRequestLength="2097151" />
```

また、**security** >> **requestFiltering** に制限を追加します。

```xml
  </handlers> <!-- this line is already on your file -->
  <security>
    <requestFiltering>
      <requestLimits maxAllowedContentLength="4294967295" />
    </requestFiltering>
  </security>
</system.webServer> <!-- this line is already on your file -->
```

[maxRequestLength](https://msdn.microsoft.com/en-us/library/system.web.configuration.httpruntimesection.maxrequestlength.aspx) および [maxAllowedContentLength](https://msdn.microsoft.com/en-us/library/ms689462.aspx) の詳細を確認してください。 

## ポート

最後に、アプリと他のすべての **Autodesk Forge** サンプルの整合性を確保するために、ポートを **3000** に変更してみましょう。プロジェクト **Properties** に移動し(プロジェクト名を右クリック)、**Web** タブで **Project URL** を `http://localhost:3000` に変更します。

![](_media/net/port.png)

!> 直前にポート番号を変更した場合は、プロトコルが **https** ではなく、**http** であることを確認してください

 

