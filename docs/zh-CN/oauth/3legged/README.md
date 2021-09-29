# OAuth 三条腿

在正式的 OAuth 术语中，要在 Forge 平台上完成三条腿身份验证和授权，可以采用授权码授权类型。

以 Web 应用程序为例，这意味着您的应用程序首先需要将最终用户重定向到 Autodesk 登录页面，用户可以在该页面中批准您的应用程序访问其数据。用户批准后，将向您的应用程序返回授权码（通过回调中的查询参数）。然后，您的应用程序通过直接与 Forge 身份验证服务器通信，使用该授权码交换 token。[了解更多信息](https://forge.autodesk.com/en/docs/oauth/v2/overview/basics/)。

用户需要授予对其数据的访问权限。需要**三条腿** token。

选择您的语言：[Node.js](/zh-CN/oauth/3legged/nodejs) | [.NET Framework](/zh-CN/oauth/3legged/net) | [.NET Core](/zh-CN/oauth/3legged/netcore)
