# 将文件上传到 OSS (Go)

在本部分中，我们实际上需要 3 个功能：

1. 创建 bucket
2. 列出 bucket 和 object（文件）
3. 上传 object（文件）

我们将在 2 个文件中构建此结构：

## oss.go

创建一个包含以下内容的 `/server/oss.go` 文件，该文件将处理前 2 个功能：

[oss.go](_snippets/viewmodels/go/oss.go ':include :type=code go')

我们计划在前端支持 [jsTree](https://www.jstree.com/)，因此，我们的 **GET oss/buckets** 需要返回句柄 `id` 查询字符串参数，并在 `id=#` 时返回 bucket，在 `id=bucketKey` 时返回传递的给定 bucketKey 的 object。


## uploader.go

创建一个包含以下内容的 `/server/uploader.go` 文件：

[uploader.go](_snippets/viewmodels/go/uploader.go ':include :type=code go')

!> 可以将文件从客户端（浏览器）直接上传到 Autodesk Forge，但需要为客户端提供一个**允许写入的**访问 token，这是**不安全的**。

下一步：[转换文件](/zh-CN/modelderivative/translate/)