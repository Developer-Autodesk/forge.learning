# 运行和调试 (Java)

我们需要为 **FORGE_CLIENT_ID** 和 **FORGE_CLIENT_SECRET** 设置 ENV 变量。

确保 Tomcat 服务器未运行，然后转到 **Run** 菜单，并选择 **Run Configurations...**。在左侧树中选择 Tomcat 服务器，然后选择 **Environment** 选项卡，并单击 **New** 以添加变量。我们可以保留默认设置。 

 ![](_media/java/Eclipse_new_env_var.png) 

 > 请务必添加 **FORGE_CLIENT_ID** 和 **FORGE_CLIENT_SECRET**。

最后，单击右下角的 **Apply**，然后关闭对话框。

现在，我们可以启动 Tomcat 服务器 

![](_media/java/Eclipse_start_server_final.png) 

打开浏览器，然后访问 `http://localhost:3000`

下一步：[Viewer 扩展](/zh-CN/tutorials/extensions)