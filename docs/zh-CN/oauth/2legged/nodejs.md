# 身份验证 (Node.js)

对于基本 *OAuth* 实现，我们需要 2 个文件。

## routes/oauth.js

创建一个 `routes/oauth.js` 文件。此文件负责为 OAuth 相关端点创建 express 路由器。

[routes/oauth.js](_snippets/viewmodels/node/routes/oauth.js ':include :type=code javascript')

## routes/common/oauth.js

现在，在 `routes` 文件夹中创建一个 `common` 子文件夹，并准备一个 `routes/common/oauth.js` 文件，用于实际从 Forge 请求访问代币。本教程的其他部分将会重用此文件。

[routes/common/oauth.js](_snippets/viewmodels/node/routes/common/oauth.js ':include :type=code javascript')

为了避免为每个最终用户请求获取新的访问代币（这会增加不必要的延迟），我们将其缓存在全局变量中。请注意，我们仍需在 `expires_in` 秒后刷新代币。

!> 仅当所有用户都访问相同的信息时（两条腿），才可以在用户之间共享访问代币。如果您的应用程序需要用户特定的数据（三条腿），**请勿**使用此方法。

下一步：[将文件上传到 OSS](/zh-CN/datamanagement/oss/)