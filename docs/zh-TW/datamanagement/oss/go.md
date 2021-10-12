# 將檔案上傳到 OSS (Go)

在本節中，我們實際需要 3 個功能：

1. 建立 bucket
2. 條列 bucket 和 object (檔案)
3. 上傳 object (檔案)

我們將在 2 個檔案中對此進行結構化：

## oss.go

建立 `/server/oss.go` 檔案，該檔案將處理前 2 個功能並且應具有以下內容：

[oss.go](_snippets/viewmodels/go/oss.go ':include :type=code go')

由於我們計劃支援前端的 [jsTree](https://www.jstree.com/)，因此 **GET oss/buckets** 需要傳回並處理 `id` 查詢字串參數，並且在`id=#` 時傳回 bucket，在 `id=bucketKey` 時傳回傳遞的指定 bucketKey 中的 object。


## uploader.go

建立含有以下內容的 `/server/uploader.go` 檔案：

[uploader.go](_snippets/viewmodels/go/uploader.go ':include :type=code go')

!> 可以直接從用戶端 (瀏覽器) 將檔案上傳至 Autodesk Forge，但需要為用戶端提供**支援寫入的** access token，這是**不安全的**。

下一步：[模型轉檔](/zh-TW/modelderivative/translate/)