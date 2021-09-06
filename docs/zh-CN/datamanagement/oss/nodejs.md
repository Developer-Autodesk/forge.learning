# 将文件上传到 OSS (Node.js)

在本部分中，我们需要 3 个功能：

1. 创建存储段
2. 列出存储段和对象（文件）
3. 上传对象（文件）

## routes/oss.js

创建一个包含以下内容的 `routes/oss.js` 文件：

[routes/oss.js](_snippets/viewmodels/node/routes/oss.js ':include :type=code javascript')

我们计划支持 [jsTree](https://www.jstree.com/)，因此，我们的 **GET /api/forge/oss/buckets** 端点需要处理 `id` 查询字符串参数，并在 `id` 设置为 `#` 时返回所有存储段，或在 `id=bucketKey` 时返回传递的给定 bucketKey 中的所有对象。上传端点使用 [multer](https://github.com/expressjs/multer) 模块来处理文件上传。它将文件保存在服务器上（例如，在 **/uploads/** 文件夹中），以便我们稍后将其上传到 Forge。

请注意我们如何重用来自 `routes/common/oauth.js` 的身份验证辅助对象作为此路由器的中间件。

!> 可以将文件从客户端（浏览器）直接上传到 Autodesk Forge，但需要为客户端提供**允许写入的**访问代币，这是**不安全的**。

下一步：[转换文件](/zh-CN/modelderivative/translate/)