# 將檔案上傳到 OSS (.NET Framework)

在本節中，我們實際需要 3 個功能：

1. 建立 bucket
2. 條列 bucket 和 object (檔案)
3. 上傳 object (檔案)

## OSSController.cs

建立名為 **OSSController** 的 .NET WebAPI 控制器 (請參閱[如何建立控制器](/zh-TW/environment/setup/net_controller))，然後加入以下內容：

[OSSController.cs](_snippets/viewmodels/net/OSSController.cs ':include :type=code csharp')

由於我們計劃支援 [jsTree](https://www.jstree.com/)，因此 **GetOSSAsync** 需要傳回並處理 `id` 查詢字串參數，並且在 `id=#` 時傳回 bucket，在 `id=bucketKey` 時傳回傳遞的指定 bucketKey 中的 object。**CreateBucket** 需要 **bucketKey** 參數來建立 bucket。最後，但同樣重要的是，**UploadObject** 會從用戶端 (瀏覽器) 接收檔案，暫時將其儲存在 **/App_Data/** 上，然後上傳至對應的 bucket。

!> 可以直接從用戶端 (瀏覽器) 將檔案上傳至 Autodesk Forge，但需要為用戶端提供**支援寫入的** access token，這是**不安全的**。

下一步：[模型轉檔](/zh-TW/modelderivative/translate/)