# OAuth 3 條腿

用正式的 OAuth 術語來說，要想在 Forge Platform 上實現 3 條腿的驗證與授權，可以採用授權碼授與類型。

以網頁應用程式為例，這表示您的應用程式需要先將終端使用者重新導向 Autodesk 登入頁面，讓使用者能夠在該處核准您的應用程式存取其資料。一旦使用者這麼做，便會有個授權碼傳回您的應用程式 (透過回呼中的查詢參數)。然後，您的應用程式便會直接與 Forge 驗證伺服器通訊，用該授權碼換取 Token。[瞭解更多](https://forge.autodesk.com/en/docs/oauth/v2/overview/basics/)。

使用者需要授予對自己資料的存取權。這時就需要有 **3 條腿**的 Token。

請選擇您的語言：[Node.js](/zh-TW/oauth/3legged/nodejs) | [.NET Framework](/zh-TW/oauth/3legged/net) | [.NET Core](/zh-TW/oauth/3legged/netcore)
