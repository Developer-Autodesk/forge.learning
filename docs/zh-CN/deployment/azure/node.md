# 使用 Azure App Service 的 Node.js Forge 应用程序

本教程将为您介绍使用 [Azure Web 门户](https://azure.microsoft.com/en-us/features/azure-portal/)和 [Git](https://git-scm.com/) 将 Node.js 示例 Forge 应用程序作为 Web 应用程序部署到 Azure App Service 的步骤。

在本教程中，我们将使用 ViewHubModels 示例，如[前面的章节](/zh-CN/tutorials/viewhubmodels)所述。您可以从 [Github 存储库](https://github.com/Autodesk-Forge/learn.forge.viewhubmodels/tree/nodejs)中检索完整的示例。同样的步骤也适用于**查看模型**教程规范。

在开始之前，请[登录或注册](https://signup.azure.com/) [Microsoft Azure 计算平台和服务](https://azure.microsoft.com/)，并创建[试用帐户](https://azure.microsoft.com/en-us/free/?cdn=disable)，它包含 200 美元积分，可免费使用 12 个月

## 先决条件

大多数步骤都可以通过 Web 门户完成，但需要 [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest)。

## 创建 Azure Web 应用程序

创建应用程序有两种方法：使用 Web 门户和使用 CLI。

**1. 使用 Web 门户创建应用程序**

- 创建 ```Resource Group``` 和 ```Web App```

  ![](_media/deployment/azure/create_web_app_1.png)
- 将 ```Runtime Stack``` 设置为 ```NodeJs```，然后单击 ```Create```

  ![](_media/deployment/azure/create_web_app_node.png)
- 创建应用程序可能需要一些时间，完成所有操作后，请导航到应用程序以查看其设置

  ![](_media/deployment/azure/app_dashboard.png)

**2. 使用 Azure CLI 创建应用程序**

- 使用以下命令创建 ```Resource Group```（或使用现有的）和 ```Web App```：

```bash
# login with credentials explicitly or simply use 'azure login' to log in with a browser session or authorisation code
az login -u <username> -p <password>

# Create a Resource Group
az group create --location westus --name myResourceGroup

# Create an App Service Plan in free tier
az appservice plan create --name myAppServicePlan --resource-group myResourceGroup --sku FREE

# Create a Web App
az webapp create --name <nameofyourapp> --plan myAppServicePlan --resource-group myResourceGroup
```

# 部署应用程序

在本教程中，我们将使用 ```Local Git``` 部署代码。可以使用 Web 门户和 CLI 完成此操作

**1. 使用 Web 门户部署**

- 导航到 ```Deployment Center``` 以完成部署设置 ![](_media/deployment/azure/deployment_settings_1.png)

- 选择您的构建服务器 ![](_media/deployment/azure/deployment_settings_kudu.png)

- 将部署源设置为 ```Local Git``` ![](_media/deployment/azure/deployment_settings_localgit_1.png)

- 单击右上角亮显的按钮以打开 Azure CLI，运行 ```az webapp deployment user set --user-name $username --password $password``` 以配置部署凭据并记录生成的 Git url ![](_media/deployment/azure/deployment_settings_azure.png)

- 使用 Forge 应用程序凭据（```FORGE_CLIENT_ID``` 和 ```FORGE_CLIENT_SECRET```）和回调 URL（模式为 ```http://<nameofyourapp>.azurewebsites.net/api/forge/callback/oauth```）设置环境变量 ![](_media/deployment/azure/portalAppSettings.png)

**2. 使用 CLI 部署**

``` bash
# Set the account-level deployment credentials
az webapp deployment user set --user-name $username --password $password

# Configure local Git and get deployment URL
echo $(az webapp deployment source config-local-git --name <nameofyourapp> --resource-group <nameofyourresourcegroup> --query url --output tsv)

# Set up the environment variables
az webapp config appsettings set -g MyResourceGroup -n <nameofyourapp> --settings FORGE_CLIENT_ID=<yourForgeAppClientID> FORGE_CLIENT_SECRET=<yourForgeAppSecret> FORGE_CLIENT_SECRET=<yourForgeAppSecret> FORGE_CALLBACK_URL=<yourCallbackURL>
```

- 使用 [Git CLI](https://git-scm.com/book/en/v2/Getting-Started-The-Command-Line) 或您喜欢的 Git 客户端将本地存储库推送到 Azure Web 应用程序

```bash
# Add the Azure remote to your local Git respository and push your code
cd /path/to/local/repo
git remote add azure <giturlofyourapp>
git push azure master # use 'git push azure <nameofyourbranch>:master' if you would like to push other local branches than master
```

应用程序面板应如下所示：

![](_media/deployment/azure/app_dashboard.png)

完成！打开应用程序 URL 以查看应用程序的运行情况。

**3. 其他部署选项** - [Visual Code](https://azure.microsoft.com/en-us/blog/visual-studio-code-and-azure-app-service-a-perfect-fit/)/[Visual Studio](../node) - [VSTS](https://docs.microsoft.com/en-us/labs/devops/deployazurefunctionswithvsts/) - [Github](https://blogs.msdn.microsoft.com/benjaminperkins/2017/05/10/deploy-github-source-code-repositories-to-an-azure-app-service/) - [BitBucket](https://confluence.atlassian.com/bitbucket/deploy-to-microsoft-azure-900820699.html) - [FTP](https://docs.microsoft.com/en-us/azure/app-service/deploy-ftp)

# 演示截屏视频

观看此截屏视频，其中演示了如何在 Azure 门户和 CLI 上执行上述步骤（截屏视频基于 Bash，但涉及的命令在 Windows CLI 和 [Powershell](https://docs.microsoft.com/en-us/powershell/scripting/getting-started/getting-started-with-windows-powershell) 上是相同的。您可以在 Windows 上运行 Bash！将[此对象](http://mingw.org/wiki/msys)或[此对象](https://gitforwindows.org/)视为 Git 的一部分，甚至尝试 [Linux 子系统](https://docs.microsoft.com/en-us/windows/wsl/install-win10)）

[viewNodejs](https://www.youtube.com/embed/h_b_te0Iza0 ':include :type=iframe width=100% height=400px')

# 延伸阅读
- 使用 [Azure Pipelines](https://docs.microsoft.com/en-us/azure/devops/pipelines/languages/javascript?view=vsts) 进行部署后自动化和测试
- 尝试使用 [Application Insights](https://azure.microsoft.com/en-us/services/monitor/)、[成本管理](https://portal.azure.com/#blade/Microsoft_Azure_Billing/ModernBillingMenuBlade/Overview)、[安全中心](https://portal.azure.com/#blade/Microsoft_Azure_Security/SecurityMenuBlade/18)和[更多 Azure 远程服务工具和功能](https://azure.microsoft.com/en-us/services/)
- 什么是[资源组](https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-group-overview)、[服务计划](https://azure.microsoft.com/en-us/pricing/details/app-service/plans/)、[Azure 模板](https://azure.microsoft.com/en-us/resources/templates/)和[过渡环境](https://docs.microsoft.com/en-us/azure/app-service/deploy-staging-slots)？
- [使用 Node.js 和 Azure 构建远程服务平台原生应用程序](https://azure.microsoft.com/en-us/resources/building-cloud-native-applications-with-node-js-and-azure/en-us/)
- [监控 Azure App Service 性能](https://docs.microsoft.com/en-us/azure/application-insights/app-insights-azure-web-apps)
- [使用 Azure 网站日志记录和诊断](https://azure.microsoft.com/en-us/resources/videos/azure-web-site-logging-and-diagnostics/)
- [定价 - App Service](https://azure.microsoft.com/en-us/pricing/details/app-service/windows/)
