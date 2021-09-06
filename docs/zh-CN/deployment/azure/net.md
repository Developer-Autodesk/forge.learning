# 使用 Azure App Service 的 .NET Forge 应用程序

本教程将为您介绍使用 [Visual Studio 2017](https://visualstudio.microsoft.com/vs/) 将 .NET 示例 Forge 应用程序作为 Web 应用程序部署到 Azure App Service 的步骤。

在本教程中，我们将使用 ViewHubModels 示例，如[前面的章节](/zh-CN/tutorials/viewhubmodels)所述。您可以从 [Github 存储库](https://github.com/Autodesk-Forge/learn.forge.viewhubmodels/tree/net)中检索完整的示例。同样的步骤也适用于**查看模型**教程规范。

在开始之前，请[登录或注册](https://signup.azure.com/) [Microsoft Azure 计算平台和服务](https://azure.microsoft.com/)，并创建[试用帐户](https://azure.microsoft.com/en-us/free/?cdn=disable)，它包含 200 美元积分，可免费使用 12 个月

## 先决条件

本教程需要使用 [Visual Studio 2017](https://visualstudio.microsoft.com/vs/)。

# 创建并部署到 Azure

- 在 Visual Studio 中打开示例项目。在项目上单击鼠标右键，或选择 ```Build > Publish``` 以开始发布到 ```Azure App Service``` ![](_media/deployment/azure/create_web_app_net.png)

- 登录或创建 Azure 免费帐户 ![](_media/deployment/azure/create_web_app_net_2.png) ![](_media/deployment/azure/create_web_app_net_3.png)

- 相应地设置 ```Name``` 和 ```Plan```，请注意，```Name``` 必须是全局唯一的，并且应该与之前在回调 URL 中指定的名称匹配 - 这将输入到应用程序的 URL 中。单击 ```Create``` 以开始部署 ![](_media/deployment/azure/create_web_app_net_4.png)

- 检查生成输出，了解部署详细信息。请注意，已自动创建一个新配置文件，以便您将来可以将解决方案直接部署到此应用程序，而无需再次执行这些步骤 ![](_media/deployment/azure/net_app_published_result.png)

- 使用 Forge 应用程序凭据（```FORGE_CLIENT_ID``` 和 ```FORGE_CLIENT_SECRET```）和回调 URL（模式为 ```http://<nameofyourapp>.azurewebsites.net/api/forge/callback/oauth```）设置环境变量 ![](_media/deployment/azure/vsAppSettings.png)

完成！单击 ```Site URL``` 以查看应用程序的运行情况

# 替代方法

- 您也可以通过浏览器在 Azure 门户上创建应用程序。在浏览器中创建应用程序时，只需从 ```Marketplace``` 中选择 ```API App```，在 Visual Studio 中发布或创建 ```Deployment Profile``` 时，选择 ```Existing App```

  ![](_media/deployment/azure/app_dashboard.png)
- 创建 ```API App``` 后，您可以从本地 Git 存储库部署。有关详细信息，请参见[此处](/zh-CN/deployment/azure/node)

### 其他部署选项
- [Visual Code](https://azure.microsoft.com/en-us/blog/visual-studio-code-and-azure-app-service-a-perfect-fit/)/[Visual Studio](../node)
- [VSTS](https://docs.microsoft.com/en-us/labs/devops/deployazurefunctionswithvsts/)
- [Github](https://blogs.msdn.microsoft.com/benjaminperkins/2017/05/10/deploy-github-source-code-repositories-to-an-azure-app-service/)
- [BitBucket](https://confluence.atlassian.com/bitbucket/deploy-to-microsoft-azure-900820699.html)
- [FTP](https://docs.microsoft.com/en-us/azure/app-service/deploy-ftp)

# 演示截屏视频

观看此截屏视频，其中演示了如何在 [Visual Studio 2017](https://visualstudio.microsoft.com/vs/) 中部署 .NET 示例（可以采取类似步骤来使用 Visual Studio 部署 Node.js 应用程序）

[videoNET](https://www.youtube.com/embed/dDg-fQ7SHAQ ':include :type=iframe width=100% height=400px')

# 延伸阅读
<!--
This will be live soon (as another version of the tutorial)
- Adapt this sample app to the [.NET Core Framework](https://docs.microsoft.com/en-us/dotnet/core/) and deploy it as a [Azure Web App](/zh-CN/deployment/azure/node)
-->
- 尝试使用 [Application Insights](https://azure.microsoft.com/en-us/services/monitor/)、[成本管理](https://portal.azure.com/#blade/Microsoft_Azure_Billing/ModernBillingMenuBlade/Overview)、[安全中心](https://portal.azure.com/#blade/Microsoft_Azure_Security/SecurityMenuBlade/18)和[更多 Azure 远程服务工具和功能](https://azure.microsoft.com/en-us/services/)
- 什么是[资源组](https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-group-overview)、[服务计划](https://azure.microsoft.com/en-us/pricing/details/app-service/plans/)、[Azure 模板](https://azure.microsoft.com/en-us/resources/templates/)和[过渡环境](https://docs.microsoft.com/en-us/azure/app-service/deploy-staging-slots)？
- [Microsoft Azure 开发人员训练营：构建远程服务平台原生应用程序](https://mva.microsoft.com/en-us/training-courses/microsoft-azure-developer-camp-build-a-cloud-native-app-8299)
- [监控 Azure App Service 性能](https://docs.microsoft.com/en-us/azure/application-insights/app-insights-azure-web-apps)
- [使用 Azure 网站日志记录和诊断](https://azure.microsoft.com/en-us/resources/videos/azure-web-site-logging-and-diagnostics/)
- [定价 - App Service](https://azure.microsoft.com/en-us/pricing/details/app-service/windows/)
