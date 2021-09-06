# 将文件上传到 OSS (.NET Framework)

在本部分中，我们实际上需要 3 个功能：

1. 创建存储段
2. 列出存储段和对象（文件）
3. 上传对象（文件）

## OSSController.cs

创建一个名为 **OSSController** 的 .NET WebAPI 控制器（请参见[如何创建控制器](/zh-CN/environment/setup/net_controller)），并添加以下内容：

[OSSController.cs](_snippets/viewmodels/net/OSSController.cs ':include :type=code csharp')

我们计划支持 [jsTree](https://www.jstree.com/)，因此，我们的 **GetOSSAsync** 需要返回句柄 `id` 查询字符串参数，并在 `id=#` 时返回存储段，在 `id=bucketKey` 时返回传递的给定 bucketKey 的对象。**CreateBucket** 需要 **bucketKey** 参数来创建存储段。最后但同样重要的是，**UploadObject** 从客户端（浏览器）接收文件，将其临时保存在 **/App_Data/** 上，然后上传到相应的存储段。

!> 可以将文件从客户端（浏览器）直接上传到 Autodesk Forge，但需要为客户端提供一个**允许写入的**访问代币，这是**不安全的**。

下一步：[转换文件](/zh-CN/modelderivative/translate/)