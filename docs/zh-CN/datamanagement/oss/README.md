# 数据管理 (OSS)

在 Forge OSS（对象存储服务）中，文件作为对象存储在存储段中。除了使您的应用程序能够从更广泛的 Forge 生态系统下载数据外，它还提供了管理应用程序自己的存储段和对象的功能（包括创建、列出、删除、上传和下载）。

每个存储段还有一个[保留策略](https://forge.autodesk.com/en/docs/data/v2/overview/retention-policy/)，用于确定对象保留时间：

 - **transient**：类似缓存的存储，仅持续 24 小时，适用于临时对象。**在本教程中，我们使用此策略**。
 - **temporary**：存储持续 30 天。
 - **persistent**：存储持续存在，除非被删除。

在本部分中，我们将创建几个端点，用于创建存储段、上传文件以及列出存储段和对象。

> 本教程代码将以透明的方式使用 Forge 客户端 ID 作为存储段密钥的前缀，这样可避免重复名称。

!> 请注意，存储段密钥的形式必须为 \[-_.a-z0-9]{3,128}
 
选择您的语言：[Node.js](/zh-CN/datamanagement/oss/nodejs) | [.NET Framework](/zh-CN/datamanagement/oss/net) | [.NET Core](/zh-CN/datamanagement/oss/netcore) | [Go](/zh-CN/datamanagement/oss/go) | [PHP](/zh-CN/datamanagement/oss/php) | [Java](/zh-CN/datamanagement/oss/java)

