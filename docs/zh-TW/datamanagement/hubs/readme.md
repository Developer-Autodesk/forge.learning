# 列出中樞與專案 (資料管理)

[資料管理 API](https://forge.autodesk.com/en/docs/data/v2/overview/) 提供了跨 BIM 360 Team、Fusion Team (先前稱為 BIM 360 Team)、BIM 360 Docs 和 BIM 360 Personal **中樞**存取資料的統一且一致的方式。

![](_media/datamanagement/entities_and_domains.png)

若要導覽和存取 BIM 360 Team、Fusion Team、BIM 360 Docs、BIM 360 Personal 和 OSS 資料，您需要熟悉下列術語：

- `hubs`：BIM 360 Team 中樞、Fusion Team 中樞、BIM 360 Docs 帳號或 BIM 360 Personal 中樞
- `projects`：BIM 360 Team、Fusion Team、BIM 360 Docs 或 BIM360 Personal 專案
- `folders`：專案中項目的邏輯組織
- `items`：一或多個檔案版本，例如 dwg、pdf 或 Fusion 設計和圖面
- `versions`：項目的特定狀態；類似於檔案的特定版本
- `buckets`：具有全域唯一名稱的 object 的容器
- `objects`：由 URN 或機碼識別的二進位資料，儲存於特定 bucket 中

> 每個 **BIM 360 Docs** 帳號將是目前使用者可存取的一個中樞。若要識別這些中樞，`attribute.extension.type` 應為 **hubs:autodesk.bim360:Account**。或檢查 **id** 上的 `b.` 前綴。 

![](_media/datamanagement/hub_extension_types.png)

在本節中，我們將建立一個 endpoint 以傳回**中樞**、**專案**、**資料夾**、**項目** (檔案) 和對應的**版本**的清單 (可在 Viewer 上檢視)。
 
請選擇您的語言：[Node.js](/zh-TW/datamanagement/hubs/nodejs) | [.NET Framework](/zh-TW/datamanagement/hubs/net) | [.NET Core](/zh-TW/datamanagement/hubs/netcore)
