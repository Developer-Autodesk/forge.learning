# 驗證 (.NET Framework)

## OAuthController.cs

建立名為 **OAuthController** 的 .NET WebAPI 控制器 (請參閱[如何建立控制器](/zh-TW/environment/setup/net_controller))，然後加入以下內容：

[OAuthController.cs](_snippets/viewmodels/net/OAuthController.cs ':include :type=code csharp')

**Get2HeddedTokenAsync** 方法會連接至 Autodesk Forge 來取得存取記號。由於我們需要一個公開 (唯讀) 記號和一個內部 (允許寫入) 記號，因此 **GetPublicAsync** 會公開為一個端點，而 **GetInternalAsync ** 則供應用程式之用。 

為避免每次一有終端使用者請求，就得取得新的存取記號，造成延遲時間無謂增加，讓我們將這些記號快取在一些 `static` 變數中。請注意，過了 `expires_in` 秒之後，我們仍需重新整理它。

!> 在此情況下，只能讓使用者共用存取記號，也就是說，所有使用者都會存取相同資訊 (2 腳型)。如果您的應用程式需要使用個別使用者特有的資料 (3 腳型)，**切勿**使用此方法。

如註解所述，**GetAppSetting** 會直接從 **Web.Config** 檔案取得 ID & Secret。

接下來：[將檔案上傳到 OSS](/zh-TW/datamanagement/oss/)