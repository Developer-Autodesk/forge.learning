[net 设置](/zh-CN/environment/setup/net.md ':include :type=markdown')

## Global.asax

额外的步骤：通常，REST API 应该是无状态的，这意味着它不会在会话中保持对用户的控制。由于此应用程序将显示每位用户的数据，因此我们需要确定谁在进行调用，让我们仅为 `/api/` 端点启用会话。以下代码应复制到现有的 `Global.asax` 代码文件：

[Global.asax](_snippets/viewhubmodels/net/Global.asax ':include :type=code csharp')

项目已准备就绪！

下一步：[授权](/zh-CN/oauth/3legged/)