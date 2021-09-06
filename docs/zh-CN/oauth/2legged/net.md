# 身份验证 (.NET Framework)

## OAuthController.cs

创建一个名为 **OAuthController** 的 .NET WebAPI 控制器（请参见[如何创建控制器](/zh-CN/environment/setup/net_controller)），并添加以下内容：

[OAuthController.cs](_snippets/viewmodels/net/OAuthController.cs ':include :type=code csharp')

**Get2LeggedTokenAsync** 方法连接到 Autodesk Forge 并获取访问代币。由于我们需要公共（只读）和内部（启用写入）代币，因此 **GetPublicAsync** 以端点形式公开，而 **GetInternalAsync** 用于应用程序。 

为了避免为每个最终用户请求获取新的访问代币（这会增加不必要的延迟），我们将其缓存在几个 `static` 变量中。请注意，我们仍需在 `expires_in` 秒后刷新代币。

!> 仅当所有用户都访问相同的信息时（两条腿），才可以在用户之间共享访问代币。如果您的应用程序需要用户特定的数据（三条腿），**请勿**使用此方法。

根据注释，**GetAppSetting** 直接从 **Web.Config** 文件获取 ID 和密钥。

下一步：[将文件上传到 OSS](/zh-CN/datamanagement/oss/)