# 授權

就基本的 *OAuth* 實作而言，我們需要 1 個檔案。

### OAuthController.cs

在專案的根層級建立名為 `Controllers` 的資料夾，將名為 **OAuthController** 的類別建立在同名的類別檔案 (`OAuthController.cs`) 中，然後加入以下內容：

[OAuthController.cs](_snippets/viewhubmodels/netcore/OAuthController.cs ':include :type=code csharp')

此程式碼將在階段作業中儲存這兩種**存取記號**並加上**重新整理記號**和**到期時間**。階段作業到期後，就會使用重新整理記號請求 2 個新的存取記號 (內部記號和公開記號)。請注意它是如何包含 2 個類別的：`OAuthController` 和 `Credentials`；第一個類別會公開端點，而第二個類別則會處理存取記號 (包括重新整理)。

接下來：[列出中樞與專案](/zh-TW/datamanagement/hubs/readme)