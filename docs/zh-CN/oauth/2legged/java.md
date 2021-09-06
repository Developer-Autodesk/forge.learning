# 身份验证 (JAVA)

对于基本 *OAuth* 实现，我们需要 2 个文件。

## oauth.java

创建一个名为 `/src/main/java/oauth.java` 的新 **Java 类**，并复制以下内容。这将从 Forge 请求访问代币。本教程的其他部分将会重用此文件。

[oauth.java](_snippets/viewmodels/java/oauth.java ':include :type=code java')

为了避免为每个最终用户请求获取新的访问代币（这会增加不必要的延迟），我们将其缓存在全局变量中。请注意，我们仍需在 `expires_in` 秒后刷新代币。

!> 仅当所有用户都访问相同的信息时（两条腿），才可以在用户之间共享访问代币。如果您的应用程序需要用户特定的数据（三条腿），**请勿**使用此方法。

## oauthtoken.java

现在，创建一个 `/src/main/java/oauthtoken.java` 文件，并复制以下内容。此文件负责创建端点路由器。  

[oauthtoken.java](_snippets/viewmodels/java/oauthtoken.java ':include :type=code java')

请注意 `@WebServlet` 注释，它通过 [WebServlet](https://www.javaguides.net/2019/02/webservlet-annotation-example.html) 使 `oauthtoken` 类成为 Web 服务。**urlPatterns** 属性指定用于访问此端点的最终 URL。

要验证此端点是否正常工作，请切换到[运行和调试 (Java)](//environment/rundebug/java?id=running-amp-debugging-java)，输入 **FORGE_CLIENT_ID** 和 **FORGE_CLIENT_SECRET**。最后运行或调试。

当应用程序运行时，打开浏览器并输入 http://localhost:3000/api/forge/oauth/token。如果页面上显示包含 access_token 的响应，则意味着已正确定义端点 /api/forge/oauth/token。

![](_media/java/endpoint_oauth.png)


下一步：[将文件上传到 OSS](/zh-CN/datamanagement/oss/)