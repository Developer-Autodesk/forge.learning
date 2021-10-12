# 授权

对于基本 *OAuth* 实现，我们需要 1 个文件。

### OAuthController.cs

在项目根目录级别创建一个名为 `Controllers` 的文件夹，然后在类文件 (`OAuthController.cs`) 中创建一个名为 **OAuthController** 的类（类与类文件名称相同），并添加以下内容：

[OAuthController.cs](_snippets/viewhubmodels/netcore/OAuthController.cs ':include :type=code csharp')

此代码将在会话中存储内部和公共**访问 token** 以及**刷新 token** 和**到期时间**。当它到期时，它将使用刷新 token 请求 2 个新的访问 token（内部和公共）。请注意它如何包含 2 个类：`OAuthController` 和 `Credentials`，其中第一个类公开 endpoint，第二个类处理访问 token（包括刷新 token）。

下一步：[列出帐户中心和项目](/zh-CN/datamanagement/hubs/readme)