# 具有 Azure App Service 的 Node.js Forge 應用程式

這將引導您完成透過 [Azure Web 入口網站](https://azure.microsoft.com/en-us/features/azure-portal/)和 [Git](https://git-scm.com/) 將 Node.js 範例 Forge 應用程式作為網頁應用程式部署到 Azure App Service 的步驟。

在本自學課程中，我們將使用 ViewHubModels 範例，如[上一章](/zh-TW/tutorials/viewhubmodels)所述。您可以從[我們的 Github 儲存庫](https://github.com/Autodesk-Forge/learn.forge.viewhubmodels/tree/nodejs)擷取完整範例。相同的步驟應該也適用於**「檢視模型」**自學課程程式碼。

開始之前，[請先登入或註冊](https://signup.azure.com/) [Microsoft Azure Computing Platform & Services](https://azure.microsoft.com/) 並建立[試用帳號](https://azure.microsoft.com/en-us/free/?cdn=disable)，其中包括 $200 點數，可免費使用 12 個月

## 事前准备

大多數步驟可透過 Web 入口網站完成，但需要 [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest)。

## 建立 Azure 網頁應用程式

有 2 種方式可以建立應用程式：使用 Web 入口網站和 CLI。

**1\.使用 Web 入口網站建立應用程式**

- 建立 ```Resource Group``` 和 ```Web App```

  ![](_media/deployment/azure/create_web_app_1.png)
- 將 ```Runtime Stack``` 設定為 ```NodeJs```，然後按一下 ```Create```

  ![](_media/deployment/azure/create_web_app_node.png)
- 建立應用程式可能需要一些時間，全部完成後，導覽至應用程式以檢閱其設定

  ![](_media/deployment/azure/app_dashboard.png)

**2\.使用 Azure CLI 建立應用程式**

- 使用以下指令建立 ```Resource Group``` (或使用既有的) 和 ```Web App```：

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

# 部署應用程式

在本自學課程中，我們將使用 ```Local Git``` 來部署程式碼。這可以透過使用 Web 入口網站和 CLI 完成

**1\.使用 Web 入口網站進行部署**

- 導覽至 ```Deployment Center``` 以設定部署設定 ![](_media/deployment/azure/deployment_settings_1.png)

- 選擇您的建置伺服器 ![](_media/deployment/azure/deployment_settings_kudu.png)

- 將部署來源設定為 ```Local Git``` ![](_media/deployment/azure/deployment_settings_localgit_1.png)

- 按一下右上方的亮顯按鈕以開啟 Azure CLI，執行 ```az webapp deployment user set --user-name $username --password $password``` 以設定部署認證並記錄產生的 Git URL ![](_media/deployment/azure/deployment_settings_azure.png)

- 使用您的 Forge 應用程式認證 (```FORGE_CLIENT_ID``` 和 ```FORGE_CLIENT_SECRET```) 和回呼 URL (callback URL) (遵循樣式 ```http://<nameofyourapp>.azurewebsites.net/api/forge/callback/oauth```) 設定環境變數 ![](_media/deployment/azure/portalAppSettings.png)

**2\.使用 CLI 部署**

``` bash
# Set the account-level deployment credentials
az webapp deployment user set --user-name $username --password $password

# Configure local Git and get deployment URL
echo $(az webapp deployment source config-local-git --name <nameofyourapp> --resource-group <nameofyourresourcegroup> --query url --output tsv)

# Set up the environment variables
az webapp config appsettings set -g MyResourceGroup -n <nameofyourapp> --settings FORGE_CLIENT_ID=<yourForgeAppClientID> FORGE_CLIENT_SECRET=<yourForgeAppSecret> FORGE_CLIENT_SECRET=<yourForgeAppSecret> FORGE_CALLBACK_URL=<yourCallbackURL>
```

- 使用 [Git CLI ](https://git-scm.com/book/en/v2/Getting-Started-The-Command-Line)或您最愛的 Git 用戶端將本端 Github 儲存庫推送到 Azure 網頁應用程式

```bash
# Add the Azure remote to your local Git respository and push your code
cd /path/to/local/repo
git remote add azure <giturlofyourapp>
git push azure master # use 'git push azure <nameofyourbranch>:master' if you would like to push other local branches than master
```

應用程式管控面板應如下所示：

![](_media/deployment/azure/app_dashboard.png)

完成！開啟應用程式 URL 以查看作用中的應用程式。

**3\.其他部署選項** - [Visual Code](https://azure.microsoft.com/en-us/blog/visual-studio-code-and-azure-app-service-a-perfect-fit/)/[Visual Studio](../node) - [VSTS](https://docs.microsoft.com/en-us/labs/devops/deployazurefunctionswithvsts/) - [Github](https://blogs.msdn.microsoft.com/benjaminperkins/2017/05/10/deploy-github-source-code-repositories-to-an-azure-app-service/) - [BitBucket](https://confluence.atlassian.com/bitbucket/deploy-to-microsoft-azure-900820699.html) - [FTP](https://docs.microsoft.com/en-us/azure/app-service/deploy-ftp)

# 示範螢幕擷取

觀看示範了 Azure 入口網站和 CLI 上的上述步驟的螢幕擷取 (該螢幕擷取依據 Bash，但所涉及的指令在 Windows CLI 和 [Powershell ](https://docs.microsoft.com/en-us/powershell/scripting/getting-started/getting-started-with-windows-powershell)上是相同的。您可以在 Windows 上執行 Bash！將[此項](http://mingw.org/wiki/msys)或[此項](https://gitforwindows.org/)視為 Git 的一部分，甚至可以嘗試 [Linux 子系統](https://docs.microsoft.com/en-us/windows/wsl/install-win10))

[viewNodejs](https://www.youtube.com/embed/h_b_te0Iza0 ':include :type=iframe width=100% height=400px')

# 詳細資訊
- 使用 [Azure 管道](https://docs.microsoft.com/en-us/azure/devops/pipelines/languages/javascript?view=vsts)進行部署後自動化和測試
- 試用 [Application Insights](https://azure.microsoft.com/en-us/services/monitor/)、[成本管理](https://portal.azure.com/#blade/Microsoft_Azure_Billing/ModernBillingMenuBlade/Overview)、[資訊安全中心](https://portal.azure.com/#blade/Microsoft_Azure_Security/SecurityMenuBlade/18)和[另外許多 Azure 雲端工具和功能](https://azure.microsoft.com/en-us/services/)
- 什麼是[資源群組](https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-group-overview)、[服務計畫](https://azure.microsoft.com/en-us/pricing/details/app-service/plans/)、[Azure 範本](https://azure.microsoft.com/en-us/resources/templates/)和[暫存環境](https://docs.microsoft.com/en-us/azure/app-service/deploy-staging-slots)？
- [使用 Node.js 和 Azure 建置雲端原生應用程式](https://azure.microsoft.com/en-us/resources/building-cloud-native-applications-with-node-js-and-azure/en-us/)
- [監視 Azure App Service 效能](https://docs.microsoft.com/en-us/azure/application-insights/app-insights-azure-web-apps)
- [使用 Azure 網站記錄和診斷](https://azure.microsoft.com/en-us/resources/videos/azure-web-site-logging-and-diagnostics/)
- [定價 - App Service](https://azure.microsoft.com/en-us/pricing/details/app-service/windows/)
