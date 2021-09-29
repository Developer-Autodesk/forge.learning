# 列出帐户中心和项目（数据管理）

[Data Management API](https://forge.autodesk.com/en/docs/data/v2/overview/) 提供统一且一致的方式，可跨**帐户中心**访问 BIM 360 Team、Fusion Team（以前称为 A360 Team）、BIM 360 Docs 和 A360 Personal 的数据。

![](_media/datamanagement/entities_and_domains.png)

要导航和访问 BIM 360 Team、Fusion Team、BIM 360 Docs、A360 Personal 和 OSS 数据，您需要熟悉以下术语：

- `hubs`：BIM 360 Team 帐户中心、Fusion Team 帐户中心、BIM 360 Docs 帐户或 A360 Personal 帐户中心
- `projects`：BIM 360 Team、Fusion Team、BIM 360 Docs 或 A360 Personal 项目
- `folders`：项目内各项的逻辑组织
- `items`：一个或多个文件版本，例如 dwg、pdf 或 Fusion 设计和工程图
- `versions`：某一项的特定状态；类似于文件的特定版本
- `buckets`：具有全局唯一名称的 object 的容器
- `objects`：由 URN 或密钥标识的二进制数据，存储在特定 bucket 中

> 每个 **BIM 360 Docs** 帐户将成为当前用户有权访问的一个帐户中心。要标识这些帐户中心，`attribute.extension.type` 应为 **hub:autodesk.bim360:Account**。或检查 **id** 上的 `b.` 前缀。 

![](_media/datamanagement/hub_extension_types.png)

在本部分中，我们创建一个 endpoint 以返回**帐户中心**、**项目**、**文件夹**、**项**（文件）和相应**版本**（可以在 Viewer 中查看）的列表。
 
选择您的语言：[Node.js](/zh-CN/datamanagement/hubs/nodejs) | [.NET Framework](/zh-CN/datamanagement/hubs/net) | [.NET Core](/zh-CN/datamanagement/hubs/netcore)
