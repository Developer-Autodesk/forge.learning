# 具有 Azure App Service 的 .NET Forge 應用程式

這將引導您完成透過 [Visual Studio 2017](https://visualstudio.microsoft.com/vs/) 將 .NET 範例 Forge 應用程式作為網頁應用程式部署到 Azure App Service 的步驟。

在本自學課程中，我們將使用 ViewHubModels 範例，如[上一章](/zh-TW/tutorials/viewhubmodels)所述。您可以從[我們的 Github 存放庫](https://github.com/Autodesk-Forge/learn.forge.viewhubmodels/tree/net)擷取完整範例。相同的步驟應該也適用於**「檢視模型」**自學課程程式碼。

開始之前，[請先登入或註冊](https://signup.azure.com/) [Microsoft Azure Computing Platform & Services](https://azure.microsoft.com/) 並建立[試用帳戶](https://azure.microsoft.com/en-us/free/?cdn=disable)，其中包括 $200 點數，可免費使用 12 個月

## 必備條件

本自學課程需要 [Visual Studio 2017](https://visualstudio.microsoft.com/vs/)。

# 建立並部署至 Azure

- 在 Visual Studio 中開啟範例專案。在專案上按一下右鍵，或選取 ```Build > Publish``` 以開始發佈至 ```Azure App Service``` ![](_media/deployment/azure/create_web_app_net.png)

- 登入或建立 Azure 免費帳戶 ![](_media/deployment/azure/create_web_app_net_2.png) ![](_media/deployment/azure/create_web_app_net_3.png)

- 請相應地設定 ```Name``` 和 ```Plan```，請注意，```Name``` 必須是全域唯一的，並且應該與之前在回呼 URL 中指定的名稱相符 - 這將進入您的應用程式的 URL。按一下 ```Create``` 以開始部署 ![](_media/deployment/azure/create_web_app_net_4.png)

- 檢查建置輸出以取得部署詳細資料。請注意，已自動建立新紀要，以便今後可以直接將解決方案部署到此應用程式，而無需再次執行這些步驟 ![](_media/deployment/azure/net_app_published_result.png)

- 使用您的 Forge 應用程式認證 (```FORGE_CLIENT_ID``` 和 ```FORGE_CLIENT_SECRET```) 和回呼 URL (遵循樣式 ```http://<nameofyourapp>.azurewebsites.net/api/forge/callback/oauth```) 設置環境變數 ![](_media/deployment/azure/vsAppSettings.png)

完成！按一下 ```Site URL``` 以查看作用中的應用程式

# 替代方法

- 您也可以在瀏覽器中的 Azure 入口網站上建立應用程式。只需在瀏覽器中建立應用程式時從 ```Marketplace``` 中選擇 ```API App```，然後在 Visual Studio 中發佈或建立 ```Deployment Profile``` 時選取 ```Existing App```

  ![](_media/deployment/azure/app_dashboard.png)
- 建立 ```API App``` 後，便可以從本端 Git 存放庫進行部署 - 請參閱[此處](/zh-TW/deployment/azure/node)以取得詳細資料

### 其他部署選項
- [Visual Code](https://azure.microsoft.com/en-us/blog/visual-studio-code-and-azure-app-service-a-perfect-fit/)/[Visual Studio](../node)
- [VSTS](https://docs.microsoft.com/en-us/labs/devops/deployazurefunctionswithvsts/)
- [Github](https://blogs.msdn.microsoft.com/benjaminperkins/2017/05/10/deploy-github-source-code-repositories-to-an-azure-app-service/)
- [BitBucket](https://confluence.atlassian.com/bitbucket/deploy-to-microsoft-azure-900820699.html)
- [FTP](https://docs.microsoft.com/en-us/azure/app-service/deploy-ftp)

# 示範螢幕擷取

觀看示範了在 [Visual Studio 2017](https://visualstudio.microsoft.com/vs/) 中部署 .NET 範例的螢幕擷取 (可採取類似步驟在 Visual Studio 中部署 Node.js 應用程式)

[videoNET](https://www.youtube.com/embed/dDg-fQ7SHAQ ':include :type=iframe width=100% height=400px')

# 詳細資訊
<!--
This will be live soon (as another version of the tutorial)
- Adapt this sample app to the [.NET Core Framework](https://docs.microsoft.com/en-us/dotnet/core/) and deploy it as a [Azure Web App](/zh-TW/deployment/azure/node)
-->
- 試用 [Application Insights](https://azure.microsoft.com/en-us/services/monitor/)、[成本管理](https://portal.azure.com/#blade/Microsoft_Azure_Billing/ModernBillingMenuBlade/Overview)、[資訊安全中心](https://portal.azure.com/#blade/Microsoft_Azure_Security/SecurityMenuBlade/18)和[另外許多 Azure 雲端工具和功能](https://azure.microsoft.com/en-us/services/)
- 什麼是[資源群組](https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-group-overview)、[服務計畫](https://azure.microsoft.com/en-us/pricing/details/app-service/plans/)、[Azure 範本](https://azure.microsoft.com/en-us/resources/templates/)和[暫存環境](https://docs.microsoft.com/en-us/azure/app-service/deploy-staging-slots)？
- [Microsoft Azure 開發人員研習營：建置雲端原生應用程式](https://mva.microsoft.com/en-us/training-courses/microsoft-azure-developer-camp-build-a-cloud-native-app-8299)
- [監視 Azure App Service 效能](https://docs.microsoft.com/en-us/azure/application-insights/app-insights-azure-web-apps)
- [使用 Azure 網站記錄和診斷](https://azure.microsoft.com/en-us/resources/videos/azure-web-site-logging-and-diagnostics/)
- [定價 - App Service](https://azure.microsoft.com/en-us/pricing/details/app-service/windows/)
