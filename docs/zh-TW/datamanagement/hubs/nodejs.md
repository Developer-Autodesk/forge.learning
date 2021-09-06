# 列出中樞與專案 (Node.js)

## routes/datamanagement.js

建立含有以下內容的 `routes/datamanagement.js` 檔案：

[routes/datamanagement.js](_snippets/viewhubmodels/node/routes/datamanagement.1.js ':include :type=code javascript')

上述程序從使用者介面樹中接收請求。`id` 參數指出正在展開的節點：`#` 表示根節點，因此會列出中樞。之後，它包含資源的 `href`，因此當展開一個 `hub` 時，端點應傳回中樞的專案。上述程式碼呼叫不同的 `get` 函式。若要完成此作業，另請將以下內容複製到檔案：

[routes/datamanagement.js](_snippets/viewhubmodels/node/routes/datamanagement.2.js ':include :type=code javascript')

最後一個 `get` 函式會傳回每個項目 (檔案) 的**版本**，其中 `.relationships.derivatives.data.id` 性質包含 **Viewer** 的 `URN`。測試此屬性是否可用很重要，因為某些項目可能沒有可檢視項目 (例如 ZIP 或 DOCx 檔)，也可能尚未轉換。

請注意如何重複使用此處 `routes/common/oauth.js` 中的驗證協助程式。

接下來：[使用者資訊](/zh-TW/oauth/user/readme)