# 身份验证 (Go)


在身份验证上下文中，我们的服务器唯一需要的是公开 endpoint `GET /api/forge/oauth/token`，前端将使用该 endpoint 来请求范围为 `viewables:read` 的 token，以便能够在浏览器中显示可查看内容。

为此，我们只需要一个文件。

## oauth.go

创建一个 `/server/oauth.go` 文件。此文件负责公开上述 endpoint。 

[oauth.go](_snippets/viewmodels/go/oauth.go ':include :type=code go')

这将确保对 oauth 的任何 `GET /api/forge/oauth/token` 调用都将返回访问 token，形式如下：

```json
{
	'access_token': value, 
	'expires_in': value
}
```

下一步：[将文件上传到 OSS](/zh-CN/datamanagement/oss/)