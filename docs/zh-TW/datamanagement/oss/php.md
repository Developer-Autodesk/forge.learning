# 將檔案上傳到 OSS (PHP)

在本節中，我們實際需要 3 個功能：

1. 建立 bucket - 注意：從技術上講，您的 bucket 名稱在整個平台中必須是全域唯一的：為了簡化本自學課程中的操作，預設會將 Client ID 加到您的 bucket 名稱前面，然後由使用者介面遮罩，因此您只需確保 bucket 名稱在目前的 Forge 應用程式中是唯一的。
2. 條列 bucket 和 object (檔案)
3. 上傳 object (檔案)

## OSS.php

建立含有以下內容的 `/server/oss.php` 檔案：

[oss.php](_snippets/viewmodels/php/oss.php ':include :type=code php')

由於我們計劃支援 [jsTree](https://www.jstree.com/)，因此 **GET oss/buckets** 需要傳回並處理 `id` 查詢字串參數，並且在 `id=#` 時傳回 bucket，在 `id=bucketKey` 時傳回傳遞的指定 bucketKey 中的 object。上傳 endpoint 在上傳時仍有問題，稍後將進行檢查。

請注意如何重複使用 `/server/oauth.php` 檔案，以便在所有函式上呼叫 `.getTokenInternal()`。


下一步：[模型轉檔](/zh-TW/modelderivative/translate/)