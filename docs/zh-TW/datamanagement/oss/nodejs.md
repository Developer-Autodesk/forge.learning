# 將檔案上傳到 OSS (Node.js)

在本節中，我們需要 3 個功能：

1. 建立 bucket
2. 條列 bucket 和 object (檔案)
3. 上傳 object (檔案)

## routes/oss.js

建立含有以下內容的 `routes/oss.js` 檔案：

[routes/oss.js](_snippets/viewmodels/node/routes/oss.js ':include :type=code javascript')

由於我們計劃支援 [jsTree](https://www.jstree.com/)，因此 **GET /api/forge/oss/buckets** endpoint 需要處理 `id` 查詢字串參數，當 `id` 設定為 `#` 時傳回所有 bucket，或在 `id=bucketKey` 時傳回傳遞的指定 bucketKey 中的所有 object。上傳 endpoint 將使用 [multer](https://github.com/expressjs/multer) 模組處理檔案上傳。它會將檔案儲存在我們的伺服器上 (例如，位於 **/uploads/** 資料夾)，以便稍後可以將其上傳至 Forge。

請注意如何將 `routes/common/oauth.js` 中的驗證協助程式作為此路由器的中介軟體重複使用。

!> 可以直接從用戶端 (瀏覽器) 將檔案上傳至 Autodesk Forge，但需要為用戶端提供**支援寫入的** access token，這是**不安全的**。

下一步：[模型轉檔](/zh-TW/modelderivative/translate/)