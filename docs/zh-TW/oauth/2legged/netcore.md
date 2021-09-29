# 驗證 (.NET Core)

## OAuthController.cs

在專案的根層級建立名為 `Controllers` 的資料夾，將名為 **OAuthController** 的類別建立在同名的類別檔案 (`OAuthController.cs`) 中，然後加入以下內容：

[OAuthController.cs](_snippets/viewmodels/netcore/OAuthController.cs ':include :type=code csharp')

**Get2HeddedTokenAsync** 方法會連接至 Autodesk Forge 來取得 access token。由於我們需要一個公開 (唯讀) Token 和一個內部 (允許寫入) Token，因此 **GetPublicAsync** 會公開一個 endpoint 供公開存取之用，而 **GetInternalAsync** 僅供在應用程式內呼叫。

為避免每次一有終端使用者請求，就得取得新的 access token，造成延遲時間無謂增加，讓我們將這些 Token 快取在一些 `static` 變數中。請注意，過了 `expires_in` 指定的時間（以秒為單位）之後，我們仍需重新整理它。

!> 在此情況下，只能讓使用者共用 access token，也就是說，所有使用者都會存取相同資訊 (2 條腿)。如果您的應用程式需要使用個別使用者特有的資料 (3 條腿)，則 **DOT NOT** 會使用此方法。

如上述程式碼中的註解所述，**GetAppSetting** 會直接從 **Web.Config** 檔案取得您的 Client ID 和 Secret。

下一步：[將檔案上傳到 OSS](/zh-TW/datamanagement/oss/)
