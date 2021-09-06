# 授權 (.NET Framework)

就基本的 *OAuth* 實作而言，我們需要 1 個檔案。

### OAuthController.cs

建立名為 **OAuthController** 的 .NET WebAPI 控制器 (請參閱[如何建立控制器](/zh-TW/environment/setup/net_controller))，然後加入以下內容：

[OAuthController.cs](_snippets/viewhubmodels/net/OAuthController.cs ':include :type=code csharp')

此程式碼將在階段作業中儲存這兩種**存取記號**並加上**重新整理記號**和**到期時間**。階段作業到期後，就會使用重新整理記號請求 2 個新的存取記號 (內部記號和公開記號)。請注意它是如何包含 2 個類別的：`OAuthController` 和 `Credentials`；第一個類別會公開端點，而第二個類別則會處理存取記號 (包括重新整理)。

接下來：[列出中樞與專案](/zh-TW/datamanagement/hubs/readme)