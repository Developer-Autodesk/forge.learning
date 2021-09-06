# 身份验证 (Node.js)

对于基本 *OAuth* 实现，我们需要 2 个文件。

## routes/oauth.js

创建一个 `routes/oauth.js` 文件。此文件负责为 OAuth 相关端点创建 express 路由器。

[routes/oauth.js](_snippets/viewhubmodels/node/routes/oauth.js ':include :type=code javascript')

## routes/common/oauth.js

现在，在 `routes` 文件夹中创建一个 `common` 子文件夹，并准备一个 `routes/common/oauth.js` 文件，用于实际从 Forge 请求访问代币。本教程的其他部分将会重用此文件。

[routes/common/oauth.js](_snippets/viewhubmodels/node/routes/common/oauth.js ':include :type=code javascript')

此代码将在会话（基于 Cookie）中存储内部和公共**访问代币**以及**刷新代币**和**到期时间**。当它到期时，它将使用刷新代币请求 2 个新的访问代币（内部和公共）。 

!> 我们的服务器指定为仅允许 `https` 访问，并且 Cookie 只能由客户端和服务器读取。 

下一步：[列出中心和项目](/zh-CN/datamanagement/hubs/readme)