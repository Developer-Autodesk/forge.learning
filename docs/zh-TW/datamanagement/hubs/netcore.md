# 列出中樞與專案

## DataManagementController.cs

在 **Controllers** 資料夾下，將名為 **DataManagementController** 的類別建立在同名的類別檔案 (`DataManagementController.cs`) 中，然後加入以下內容：

> 請注意，將會出現一些錯誤，稍後將予以修正。

[DataManagementController.cs](_snippets/viewhubmodels/netcore/DataManagementController.1.cs ':include :type=code csharp')

上述程序從使用者介面樹中接收請求。`id` 參數指出正在展開的節點：`#` 表示根節點，因此會列出中樞。之後，它包含資源的 `href`，因此當展開一個 `hub` 時，endpoint 應傳回中樞的專案。上述程式碼呼叫不同的 `get` 函式。若要完成此作業，另請將以下內容複製到檔案 (位於同一 `DataManagementController` 類別內)。

[DataManagementController.cs](_snippets/viewhubmodels/netcore/DataManagementController.2.cs ':include :type=code csharp')

最後一個 `get` 函式會傳回每個項目 (檔案) 的**版本**，其中 `.relationships.derivatives.data.id` 性質包含 **Viewer** 的 `URN`。測試此屬性是否可用很重要，因為某些項目可能沒有可檢視項目 (例如 ZIP 或 DOCx 檔)，也可能尚未轉換。

請注意如何重複使用透過性質公開的 `Credentials`。

下一步：[使用者資訊](/zh-TW/oauth/user/readme)