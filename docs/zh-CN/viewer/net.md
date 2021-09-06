# 客户端文件 (.NET Framework)

ASP.NET 应用程序通常使用 `.aspx`，而不是 `.html`，但在本教程中，为了简单起见，我们使用 `.html`。

我们的 .NET 服务器配置为从根 `/` 文件夹提供文件。我们按如下所示进行组织：

- `/`：`.html`（对于其他项目为 `.aspx`）
- `/js`：`.js`
- `/css`：`.css`

下图显示了此结构（在下一部分中创建文件后）

![](_media/net/project_all_files.png)

> 默认情况下，将创建 `Global.asax` 和 `packages.config` 文件以及 `App_Data`、`App_Start` 和 `Model` 文件夹。