# OAuth 2 條腿

用正式的 OAuth 術語來說，要想在 Forge 平台上實現 **2 條腿**的驗證，您必須使用「Client Credentials」授權類型。

換句話說，您的應用程式會直接與 Forge 平台通訊來進行驗證以及存取資源。如果是網頁應用程式，則終端使用者不會直接察覺任何這些伺服器對伺服器通訊，因為這些通訊完全不會透過網頁瀏覽器傳遞。[瞭解更多](https://forge.autodesk.com/en/docs/oauth/v2/overview/basics/)。

要想存取 Forge 上的任何資源，都必須進行驗證。**2 條腿**的 Token 可以用來授權您的應用程式存取 Forge 資料的權限。

請選擇您的語言：[Node.js](/zh-TW/oauth/2legged/nodejs) | [.NET Framework](/zh-TW/oauth/2legged/net) | [.NET Core](/zh-TW/oauth/2legged/netcore) | [Go](/zh-TW/oauth/2legged/go) | [PHP](/zh-TW/oauth/2legged/php) | [Java](/zh-TW/oauth/2legged/java)

