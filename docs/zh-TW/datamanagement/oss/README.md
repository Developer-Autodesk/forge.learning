# 資料管理 (OSS)

在 Forge OSS (Object 儲存服務) 中，檔案將作為 object 儲存在 bucket 中。除了讓您的應用程式能夠從範圍更廣的 Forge 生態系統下載資料，它還提供了管理應用程式自己的 bucket 和 object 的功能 (包括建立、條列、刪除、上傳和下載)。

每個 bucket 還具有[保留原則](https://forge.autodesk.com/en/docs/data/v2/overview/retention-policy/)，用於確定 object 保留時間：

 - **transient**：僅保留 24 小時的類似快取的儲存，非常適合暫時 object。**在本自學課程中，我們使用此原則**。
 - **temporary**：保留 30 天的儲存。
 - **persistent**：在刪除前會一直保留的儲存。

在本節中，我們將建立幾個 endpoint 來建立 bucket、上傳檔案以及條列 bucket 和 object。

> 本自學課程程式碼將明確使用 Forge Client ID 作為 bucket key 的前綴，這應避免使用重複的名稱。

!> 請注意，bucket keys 的格式必須為 \[-_.a-z0-9]{3,128}
 
請選擇您的語言：[Node.js](/zh-TW/datamanagement/oss/nodejs) | [.NET Framework](/zh-TW/datamanagement/oss/net) | [.NET Core](/zh-TW/datamanagement/oss/netcore) | [Go](/zh-TW/datamanagement/oss/go) | [PHP](/zh-TW/datamanagement/oss/php) | [Java](/zh-TW/datamanagement/oss/java)

