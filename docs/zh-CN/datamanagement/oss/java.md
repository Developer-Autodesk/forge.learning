# 将文件上传到 OSS (JAVA)

在本部分中，我们实际上需要 3 个功能：

1. 创建存储段
2. 列出存储段和对象（文件）
3. 上传对象（文件）

## oss.java

创建一个名为 `/src/main/java/oss.java` 的新 Java 类，其内容如下。此文件处理创建和列出存储段。

[oss.java](_snippets/viewmodels/java/oss.java ':include :type=code java')

我们计划支持 [jsTree](https://www.jstree.com/) 库，因此，我们的 **GET oss/buckets** 需要返回句柄 `id` 查询字符串参数，并在 `id=#` 时返回存储段，在 `id=bucketKey` 时返回传递的给定 bucketKey 的对象。

## ossuploads.java

创建一个包含以下内容的 `/src/main/ossuploads.java` 文件。此文件处理上传文件。工作流将获取文件流并上传到 Forge。

[ossuploads.java](_snippets/viewmodels/java/ossuploads.java ':include :type=code java')

请注意我们如何重用 `/src/main/java/oauth.java` 文件以在所有函数上调用 `.getTokenInternal()`。 

!> 可以将文件从客户端（浏览器）直接上传到 Autodesk Forge，但需要为客户端提供一个**允许写入的**访问代币，这是**不安全的**。

下一步：[转换文件](/zh-CN/modelderivative/translate/)