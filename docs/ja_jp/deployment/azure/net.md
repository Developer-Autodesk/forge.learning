# Azure App Serviceを使用した.NET Forgeアプリ

ここでは、[Visual Studio 2017](https://visualstudio.microsoft.com/vs/) の Web アプリとして .NET サンプル Forge アプリを Azure App Service に配置する手順について説明します。

このチュートリアルでは、[前の章](/ja_jp/tutorials/viewhubmodels)で説明した ViewHubModels サンプルを使用します。[Github リポジトリから完全なサンプルを取得することができます。](https://github.com/Autodesk-Forge/learn.forge.viewhubmodels/tree/net)同じ手順は、**モデルの表示**チュートリアル コードでも使用できます。

開始する前に、[Microsoft Azure Computing Platform & Services](https://signup.azure.com/) にサインインまたはサインアップし、[体験版アカウント](https://azure.microsoft.com/en-us/free/?cdn=disable)を作成します。これには $200 クレジットと 12 ヵ月間無料が含まれます

## 前提条件

このチュートリアルでは、[Visual Studio 2017](https://visualstudio.microsoft.com/vs/) が必要です。

# Azureを作成して配置

- Visual Studioでサンプルプロジェクトを開きます。プロジェクトを右クリックするか、```Build > Publish```を選択してパブリッシュを開始します ```Azure App Service``` ![](_media/deployment/azure/create_web_app_net.png)

- サインインするか、Azure無償アカウントを作成 ![](_media/deployment/azure/create_web_app_net_2.png) ![](_media/deployment/azure/create_web_app_net_3.png)

- ```Name```と```Plan```を設定します。したがって、```Name```はグローバルに一意である必要があり、以前にコールバックURLで指定された名前と一致する必要があることに注意してください。これはアプリのURLに反映されます。配置を開始するには、```Create```をクリックします ![](_media/deployment/azure/create_web_app_net_4.png)

- ビルド出力で配置の詳細を確認してください。また、新しいプロファイルが自動的に作成され、今後このアプリにソリューションを直接配置できるようになり、これらの手順を繰り返す必要がなくなりました ![](_media/deployment/azure/net_app_published_result.png)

- Forgeアプリの資格情報(```FORGE_CLIENT_ID```と```FORGE_CLIENT_SECRET```)とコールバックURL (次のパターン```http://<nameofyourapp>.azurewebsites.net/api/forge/callback/oauth```)を使用して、環境変数を設定します ![](_media/deployment/azure/vsAppSettings.png)

完了```Site URL```をクリックして、アプリが動作していることを確認します

# 代替方法

- ブラウザのAzureポータルでもアプリを作成できます。ブラウザでアプリを作成するときは```Marketplace```から```API App```を選択し、Visual Studioで```Deployment Profile```をパブリッシュまたは作成するときは```Existing App```を選択します

  ![](_media/deployment/azure/app_dashboard.png)
- ```API App``` を作成したら、ローカルの Git リポジトリから配置できます。詳細については、[こちらを参照してください。](/ja_jp/deployment/azure/node)

### その他の配置オプション
- [Visual Code](https://azure.microsoft.com/en-us/blog/visual-studio-code-and-azure-app-service-a-perfect-fit/)/[Visual Studio](../node)
- [VSTS](https://docs.microsoft.com/en-us/labs/devops/deployazurefunctionswithvsts/)
- [Github](https://blogs.msdn.microsoft.com/benjaminperkins/2017/05/10/deploy-github-source-code-repositories-to-an-azure-app-service/)
- [BitBucket](https://confluence.atlassian.com/bitbucket/deploy-to-microsoft-azure-900820699.html)
- [FTP](https://docs.microsoft.com/en-us/azure/app-service/deploy-ftp)

# デモScreencast

このビデオでは、[Visual Studio 2017](https://visualstudio.microsoft.com/vs/) に .NET サンプルを配置する方法を説明します(Visual Studio を使用して Node.js アプリを配置する場合も同様の手順を実行できます)

[videoNET](https://www.youtube.com/embed/dDg-fQ7SHAQ ':include :type=iframe width=100% height=400px')

# その他の測定値
<!--
This will be live soon (as another version of the tutorial)
- Adapt this sample app to the [.NET Core Framework](https://docs.microsoft.com/en-us/dotnet/core/) and deploy it as a [Azure Web App](/ja_jp/deployment/azure/node)
-->
- [Application Insights](https://azure.microsoft.com/en-us/services/monitor/)、[Cost Management](https://portal.azure.com/#blade/Microsoft_Azure_Billing/ModernBillingMenuBlade/Overview)、[Security Center](https://portal.azure.com/#blade/Microsoft_Azure_Security/SecurityMenuBlade/18)、[その他の Azure クラウド ツールと機能](https://azure.microsoft.com/en-us/services/)をお試しください
- [リソース グループ](https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-group-overview)、[サービス プラン](https://azure.microsoft.com/en-us/pricing/details/app-service/plans/)、[Azure テンプレート](https://azure.microsoft.com/en-us/resources/templates/)、および [ステージング環境](https://docs.microsoft.com/en-us/azure/app-service/deploy-staging-slots)とは何ですか?
- [Microsoft Azure Developer Camp:クラウド固有のアプリを作成する](https://mva.microsoft.com/en-us/training-courses/microsoft-azure-developer-camp-build-a-cloud-native-app-8299)
- [Azure App Serviceのパフォーマンスを監視する](https://docs.microsoft.com/en-us/azure/application-insights/app-insights-azure-web-apps)
- [Azure Web Siteのログと診断を使用する](https://azure.microsoft.com/en-us/resources/videos/azure-web-site-logging-and-diagnostics/)
- [価格- App Service](https://azure.microsoft.com/en-us/pricing/details/app-service/windows/)
