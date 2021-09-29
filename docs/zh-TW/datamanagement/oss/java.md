# 將檔案上傳到 OSS (JAVA)

在本節中，我們實際需要 3 個功能：

1. 建立 bucket
2. 條列 bucket 和 object (檔案)
3. 上傳 objects (檔案)

## oss.java

建立含有以下內容名為 `/src/main/java/oss.java` 的新 Java 類別。此檔案用於處理建立和條列 buckets。

[oss.java](_snippets/viewmodels/java/oss.java ':include :type=code java')

由於我們計劃支援 [jsTree](https://www.jstree.com/) 程式庫，因此 **GET oss/buckets** 需要傳回並處理 `id` 查詢字串參數，並且在 `id=#` 時傳回 buckets，在 `id=bucketKey` 時傳回傳遞的指定 bucketKey 中的 objects。

## ossuploads.java

建立含有以下內容的 `/src/main/ossuploads.java` 檔案。此檔案用於處理上傳檔案。工作流程會取得檔案串流並上傳至 Forge。

[ossuploads.java](_snippets/viewmodels/java/ossuploads.java ':include :type=code java')

請注意如何重複使用 `/src/main/java/oauth.java` 檔案，以便在所有函式上呼叫 `.getTokenInternal()`。 

!> 可以直接從用戶端 (瀏覽器) 將檔案上傳至 Autodesk Forge，但需要為用戶端提供**支援寫入的** access token，這是**不安全的**。

下一步：[模型轉檔](/zh-TW/modelderivative/translate/)