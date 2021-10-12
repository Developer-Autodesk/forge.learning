# 将文件上传到 OSS (PHP)

在本部分中，我们实际上需要 3 个功能：

1. 创建 bucket - 注意：从技术上讲，bucket 名称在整个平台中必须是全局唯一的 - 为了使本教程保持简单，默认情况下，您的 Client ID 将附加在 bucket 名称之前，而且会被 UI 遮罩，因此您只需确保 bucket 名称在当前 Forge 应用程序中是唯一的。
2. 列出 bucket 和 object（文件）
3. 上传 object（文件）

## OSS.php

创建一个包含以下内容的 `/server/oss.php` 文件：

[oss.php](_snippets/viewmodels/php/oss.php ':include :type=code php')

我们计划支持 [jsTree](https://www.jstree.com/)，因此，我们的 **GET oss/buckets** 需要返回句柄 `id` 查询字符串参数，并在 `id=#` 时返回 bucket，在 `id=bucketKey` 时返回传递的给定 bucketKey 的 object。上传 endpoint 仍然存在上传问题，稍后会进行检查。

请注意我们如何重用 `/server/oauth.php` 文件以在所有函数上调用 `.getTokenInternal()`。


下一步：[转换文件](/zh-CN/modelderivative/translate/)