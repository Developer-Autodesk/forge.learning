# 身份验证 (.NET Core)

## OAuthController.cs

在项目根目录级别创建一个名为 `Controllers` 的文件夹，然后在类文件 (`OAuthController.cs`) 中创建一个名为 **OAuthController** 的类（类与类文件名称相同），并添加以下内容：

[OAuthController.cs](_snippets/viewmodels/netcore/OAuthController.cs ':include :type=code csharp')

**Get2LeggedTokenAsync** 方法连接到 Autodesk Forge 并获取访问 token。由于我们需要公共（只读）和内部（启用写入）token，因此 **GetPublicAsync** 公开用于公共访问的 endpoint，而 **GetInternalAsync** 仅在应用程序内调用。

为了避免为每个最终用户请求获取新的访问 token（这会导致出现不必要的延迟），我们将其缓存在几个 `static` 变量中。请注意，我们仍需在 `expires_in` 秒后刷新 token。

!> 仅当所有用户都访问相同的信息时（两条腿），才可以在用户之间共享访问 token。如果您的应用程序需要用户特定的数据（三条腿），**请勿**使用此方法。

根据上述代码中的注释，**GetAppSetting** 直接从 **Web.Config** 文件获取 ID 和 Secret。

下一步：[将文件上传到 OSS](/zh-CN/datamanagement/oss/)
