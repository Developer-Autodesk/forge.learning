# Azure App Service を使用した .NET Forge アプリ

ここでは、[Visual Studio 2017](https://visualstudio.microsoft.com/vs/) を使用して Web アプリとして .NET のサンプル Forge アプリを Azure App Service に配置する手順について説明します。

このチュートリアルでは、[前の章](/ja-JP/tutorials/viewhubmodels)で説明した ViewHubModels サンプルを使用します。[Github リポジトリ](https://github.com/Autodesk-Forge/learn.forge.viewhubmodels/tree/net)から完全なサンプルを取得することができます。同じ手順を、**モデルの表示**チュートリアル コードでも使用できます。

開始する前に、[Microsoft Azure Computing Platform & Services](https://azure.microsoft.com/) に[サインインまたはサインアップ](https://signup.azure.com/)し、[体験版アカウント](https://azure.microsoft.com/en-us/free/?cdn=disable)を作成します。これには $200 クレジットが含まれ、12 ヵ月間無料です。

## 前提条件

このチュートリアルでは、[Visual Studio 2017](https://visualstudio.microsoft.com/vs/) が必要です。

# 作成して Azure に配置する

- Visual Studio でサンプル プロジェクトを開きます。プロジェクトを右クリックするか、```Build > Publish``` を選択して ```Azure App Service``` へのパブリッシュを開始します。 ![](_media/deployment/azure/create_web_app_net.png)

- サインインするか、Azure の無償アカウントを作成します。 ![](_media/deployment/azure/create_web_app_net_2.png) ![](_media/deployment/azure/create_web_app_net_3.png)

- それぞれ ```Name``` と ```Plan``` を設定します。```Name``` はグローバルに一意である必要があり、以前にコールバック URL で指定された名前と一致する必要があることに注意してください。これはアプリの URL に反映されます。配置を開始するには、```Create``` をクリックします。 ![](_media/deployment/azure/create_web_app_net_4.png)

- ビルド出力で配置の詳細を確認します。また、新しいプロファイルが自動的に作成され、今後はこのアプリにソリューションを直接配置でき、これらの手順を繰り返す必要がなくなります。 ![](_media/deployment/azure/net_app_published_result.png)

- Forge アプリの資格情報(```FORGE_CLIENT_ID``` と ```FORGE_CLIENT_SECRET```)とコールバック URL (次のパターン ```http://<nameofyourapp>.azurewebsites.net/api/forge/callback/oauth```)を使用して、環境変数をセットアップします。![](_media/deployment/azure/vsAppSettings.png)

完了しました!```Site URL``` をクリックして、アプリが動作していることを確認します。

# 代替方法

- ブラウザの Azure ポータルでもアプリを作成できます。ブラウザでアプリを作成するときは ```Marketplace``` から ```API App``` を選択し、Visual Studio で ```Deployment Profile``` をパブリッシュまたは作成するときは ```Existing App``` を選択します。

  ![](_media/deployment/azure/app_dashboard.png)
- ```API App``` を作成したら、ローカルの Git リポジトリから配置できます。詳細については、[こちら](/ja-JP/deployment/azure/node)を参照してください。

### その他の配置オプション
- [Visual Code](https://azure.microsoft.com/en-us/blog/visual-studio-code-and-azure-app-service-a-perfect-fit/)/[Visual Studio](../node)
- [VSTS](https://docs.microsoft.com/en-us/labs/devops/deployazurefunctionswithvsts/)
- [Github](https://blogs.msdn.microsoft.com/benjaminperkins/2017/05/10/deploy-github-source-code-repositories-to-an-azure-app-service/)
- [BitBucket](https://confluence.atlassian.com/bitbucket/deploy-to-microsoft-azure-900820699.html)
- [FTP](https://docs.microsoft.com/en-us/azure/app-service/deploy-ftp)

# Screencast のデモ

[Visual Studio 2017](https://visualstudio.microsoft.com/vs/) に .NET サンプルを配置する方法を示す、この Screencast をご覧ください(Visual Studio を使用して Node.js アプリを配置する場合も同様の手順を実行できます)。

[videoNET](https://www.youtube.com/embed/dDg-fQ7SHAQ ':include :type=iframe width=100% height=400px')

# その他の資料
<!--
This will be live soon (as another version of the tutorial)
- Adapt this sample app to the [.NET Core Framework](https://docs.microsoft.com/en-us/dotnet/core/) and deploy it as a [Azure Web App](/ja-JP/deployment/azure/node)
-->
- [Application Insights](https://azure.microsoft.com/en-us/services/monitor/)、[Cost Management](https://portal.azure.com/#blade/Microsoft_Azure_Billing/ModernBillingMenuBlade/Overview)、[Security Center](https://portal.azure.com/#blade/Microsoft_Azure_Security/SecurityMenuBlade/18) および[その他の Azure クラウド ツールと機能](https://azure.microsoft.com/en-us/services/)をお試しください
- [リソース グループ](https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-group-overview)、[サービス プラン](https://azure.microsoft.com/en-us/pricing/details/app-service/plans/)、[Azure テンプレート](https://azure.microsoft.com/en-us/resources/templates/)、[ステージング環境](https://docs.microsoft.com/en-us/azure/app-service/deploy-staging-slots)とは何ですか?
- [Microsoft Azure Developer Camp:クラウドネイティブのアプリを作成する](https://mva.microsoft.com/en-us/training-courses/microsoft-azure-developer-camp-build-a-cloud-native-app-8299)
- [Azure App Service のパフォーマンスを監視する](https://docs.microsoft.com/en-us/azure/application-insights/app-insights-azure-web-apps)
- [Azure Web Site のログと診断を使用する](https://azure.microsoft.com/en-us/resources/videos/azure-web-site-logging-and-diagnostics/)
- [価格 - App Service](https://azure.microsoft.com/en-us/pricing/details/app-service/windows/)
