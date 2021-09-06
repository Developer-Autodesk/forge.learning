# 建立新專案 (.NET Framework)

移往 **File** 功能表 >> **New** >> **Project**。選取 **C#** 語言和 **Web** 專案類型，最後選取 **ASP.NET Web Application (.NET Framework)**。接下來，讓我們將其命名為 **forgeSample**，並確定已選取 **.NET Framework 4.7.2**。在下一個對話方塊中，選取 **Empty**，然後勾選 **Web API**。

!> 如果專案類型或 .NET Framework 4.7.2 不可用，請檢閱[工具](/zh-TW/environment/tools/net)一節。

安裝 Autodesk Forge NuGet 套件：在專案 (**Solution Explorer**) 上按一下右鍵，選取 **Manage NuGet Package**，在 **Browse** 上搜尋 **Autodesk Forge**，然後安裝我們的 **forgeSample**。 

![](_media/net/create_project_webapi.gif) 

## Web.Config

在 **Web.Config** 檔案中，加入 Forge Client ID & Secret 項目 (您建立應用程式時已取得)。依預設，該檔案中的 `<configuration>` 之後、`<system.web>` 之前應已有 `<appSettings></appSettings>`，請調整為如下所示的樣子：

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

ASP.NET 引擎將最大請求大小限制在 4Mb，並將上傳檔案大小限制在 30Mb。我們可以將此限制變更為最大值 (您也可以依自身需求進行調整)。在 `web.config` 檔案中搜尋 `httpRuntime`，然後在其中加入 `maxRequestLength`，如下所示：

```xml
<!-- httpRuntime targetFramework is already on your file, just add the maxRequestLength -->
<httpRuntime targetFramework="4.7.2" maxRequestLength="2097151" />
```

接著加入 **security** >> **requestFiltering** 限制：

```xml
  </handlers> <!-- this line is already on your file -->
  <security>
    <requestFiltering>
      <requestLimits maxAllowedContentLength="4294967295" />
    </requestFiltering>
  </security>
</system.webServer> <!-- this line is already on your file -->
```

進一步瞭解 [maxRequestLength](https://msdn.microsoft.com/en-us/library/system.web.configuration.httpruntimesection.maxrequestlength.aspx) 和 [maxAllowedContentLength](https://msdn.microsoft.com/en-us/library/ms689462.aspx)。 

## 連接埠

最後，為了讓您的應用程式與所有其他 **Autodesk Forge** 範例一致，讓我們將連接埠變更為 **3000**：在專案名稱上按一下右鍵移往專案 **Properties** (在 **Web** 頁籤下)，然後將 **Project URL** 變更為 `http://localhost:3000`。

![](_media/net/port.png)

!> 如果您剛變更了連接埠號碼，請確定通訊協定為 **http**，而不是 **https**

 

