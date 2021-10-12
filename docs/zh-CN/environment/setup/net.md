# 创建新项目 (.NET Framework)

转到菜单 **File** >> **New** >> **Project**。选择 **C#** 语言和 **Web** 项目类型，最后选择 **ASP.NET Web Application (.NET Framework)**。接下来，我们将其命名为 **forgeSample**，并确保选择 **.NET Framework 4.7.2**。在下一个对话框中，选择 **Empty**，然后选中 **Web API**。

!> 如果项目类型或 .NET Framework 4.7.2 不可用，请查看[工具](/zh-CN/environment/tools/net)部分。

安装 Autodesk Forge NuGet 软件包：在项目上单击鼠标右键 (**Solution Explorer**)，选择 **Manage NuGet Package**，然后在 **Browse** 中搜索 **Autodesk Forge** 并安装 **forgeSample**。 

![](_media/net/create_project_webapi.gif) 

## Web.Config

在 **Web.Config** 文件中，添加 Forge Client ID 和 Secret 条目（在创建应用程序时获取）。默认情况下，在 `<configuration>` 之后和 `<system.web>` 之前应该有 `<appSettings></appSettings>`，调整如下：

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

ASP.NET 引擎限制最大请求大小不超过 4Mb，上传文件大小不超过 30Mb。我们可以将此限制更改为最大值（您也可以根据需要进行调整）。在 `web.config` 文件中，搜索 `httpRuntime`，然后将 `maxRequestLength` 添加到其中，如下所示：

```xml
<!-- httpRuntime targetFramework is already on your file, just add the maxRequestLength -->
<httpRuntime targetFramework="4.7.2" maxRequestLength="2097151" />
```

然后添加 **security** >> **requestFiltering** 限制：

```xml
  </handlers> <!-- this line is already on your file -->
  <security>
    <requestFiltering>
      <requestLimits maxAllowedContentLength="4294967295" />
    </requestFiltering>
  </security>
</system.webServer> <!-- this line is already on your file -->
```

详细了解 [maxRequestLength](https://msdn.microsoft.com/en-us/library/system.web.configuration.httpruntimesection.maxrequestlength.aspx) 和 [maxAllowedContentLength](https://msdn.microsoft.com/en-us/library/ms689462.aspx)。 

## 端口

最后，为了使您的应用程序与所有其他 **Autodesk Forge** 示例保持一致，我们将端口更改为 **3000**：转到项目的 **Properties**（在项目名称上单击鼠标右键），然后在 **Web** 选项卡下，将 **Project URL** 更改为 `http://localhost:3000`。

![](_media/net/port.png)

!> 如果您刚刚更改了端口号，请确保协议为 **http** 而不是 **https**

 

