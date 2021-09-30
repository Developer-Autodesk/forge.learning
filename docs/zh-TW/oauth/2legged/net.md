# 驗證 (.NET Framework)

## OAuthController.cs

建立名為 **OAuthController** 的 .NET WebAPI 控制器 (請參閱[如何建立控制器](/zh-TW/environment/setup/net_controller))，然後加入以下內容：

[OAuthController.cs](_snippets/viewmodels/net/OAuthController.cs ':include :type=code csharp')

**Get2HeddedTokenAsync** 方法會連接至 Autodesk Forge 來取得 access token。由於我們需要一個公開 (唯讀) token 和一個內部 (允許寫入) token，因此 **GetPublicAsync** 會公開為一個 endpoint，而 **GetInternalAsync ** 則供應用程式之用。 

為避免每次一有終端使用者請求，就得取得新的 access token，造成延遲時間無謂增加，讓我們將這些 token 快取在一些 `static` 變數中。請注意，過了 `expires_in` 秒之後，我們仍需重新取得新的 access token。

!> 在此情況下，只能讓使用者共用存取 access token，也就是說，所有使用者都會存取相同資訊 (2 條腿)。如果您的應用程式需要使用個別使用者特有的資料 (3 條腿)，**切勿**使用此方法。

如註解所述，**GetAppSetting** 會直接從 **Web.Config** 檔案取得您的 Client ID 和 Secret。

下一步：[將檔案上傳到 OSS](/zh-TW/datamanagement/oss/)