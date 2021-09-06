# 列出中心和项目 (Node.js)

## routes/datamanagement.js

创建一个包含以下内容的 `routes/datamanagement.js` 文件：

[routes/datamanagement.js](_snippets/viewhubmodels/node/routes/datamanagement.1.js ':include :type=code javascript')

上述代码接收来自 UI 树的请求。`id` 参数指示正在展开的节点：`#` 表示根节点，因此列出中心。之后，它包含资源的 `href`，因此在展开一个 `hub` 时，端点应返回该中心的项目。上述代码调用不同的 `get` 函数。要完成此操作，还要将以下内容复制到文件：

[routes/datamanagement.js](_snippets/viewhubmodels/node/routes/datamanagement.2.js ':include :type=code javascript')

最后一个 `get` 函数返回每一项（文件）的**版本**，其中 `.relationships.derivatives.data.id` 特性包含 **Viewer** 的 `URN`。请务必测试此属性是否可用，因为某些项可能没有可查看内容（例如 ZIP 或 DOCx 文件），或者可能尚未转换。

请注意我们如何重用 `routes/common/oauth.js` 此处的验证辅助对象。

下一步：[用户信息](/zh-CN/oauth/user/readme)