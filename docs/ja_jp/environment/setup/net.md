# 新しいプロジェクトを作成する(.NET Framework)

メニュー **File** >> **New** >> **Project** に移動します。**C#** language および **Web** プロジェクト タイプを選択し、最後に **ASP.NET Web アプリケーション(.NET Framework)**を選択します。次に、**forgeSample** という名前を付け、**.NET Framework 4.7.2** が選択されていることを確認します。次のダイアログで、**空にする(Empty)**を選択し、**Web API** をチェックします。

!> プロジェクト タイプまたは .NET Framework 4.7.2 が使用できない場合は、[ツール](/ja_jp/environment/tools/net)セクションを確認してください。

Autodesk Forge NuGet パッケージをインストールします。プロジェクト(**ソリューション エクスプローラ**)を右クリックし、**NuGet パッケージの管理** を選択し、**Autodesk Forge ** を参照して、**forgeSample** をインストールします。 

![](_media/net/create_project_webapi.gif) 

## Web.Config

**Web.Config** ファイルで、Forge Client ID & Secret エントリ(アプリの作成時に取得)を追加します。既定では、`<configuration>`の後と`<system.web>`の前に`<appSettings></appSettings>`が既に存在する必要があります。次に示すように調整します。

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

ASP.NETエンジンは、要求の最大サイズを4MBに制限し、アップロードするファイルサイズを30MBに制限します。この制限を最大に変更することができます(または、必要に応じて調整することもできます)。`web.config`ファイルで、`httpRuntime`を検索して、次のように`maxRequestLength`を追加します。

```xml
<!-- httpRuntime targetFramework is already on your file, just add the maxRequestLength -->
<httpRuntime targetFramework="4.7.2" maxRequestLength="2097151" />
```

次に、**security** >> **requestFiltering** の制限を追加します。

```xml
  </handlers> <!-- this line is already on your file -->
  <security>
    <requestFiltering>
      <requestLimits maxAllowedContentLength="4294967295" />
    </requestFiltering>
  </security>
</system.webServer> <!-- this line is already on your file -->
```

[maxRequestLength](https://msdn.microsoft.com/en-us/library/system.web.configuration.httpruntimesection.maxrequestlength.aspx) および [maxAllowedContentLength](https://msdn.microsoft.com/en-us/library/ms689462.aspx) の詳細を参照してください。 

## ポート

最後に、アプリを他のすべての **Autodesk Forge** サンプルと一致させるには、ポートを **3000** に変更します。プロジェクト **Properties** (プロジェクト名を右クリック)に移動し、**Web** タブの下で **Project URL** を {<meta=} に変更します。

![](_media/net/port.png)

!> ポート番号を変更した直後の場合は、プロトコルが **http** であり、**https** ではないことを確認してください

 

