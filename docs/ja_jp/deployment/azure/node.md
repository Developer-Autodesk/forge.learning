# Azure App Serviceを使用したNode.js Forgeアプリ

ここでは、[Azure Web ポータル ](https://azure.microsoft.com/en-us/features/azure-portal/) および [Git](https://git-scm.com/) を使用して Web アプリとして Node.js サンプル Forge アプリを Azure App Service にデプロイする手順について説明します。

このチュートリアルでは、[前の章](tutorials/viewhubmodels)で説明した ViewHubModels サンプルを使用します。[Github リポジトリから完全なサンプルを取得することができます。](https://github.com/Autodesk-Forge/learn.forge.viewhubmodels/tree/nodejs)同じ手順は、**モデルの表示**チュートリアル コードでも使用できます。

開始する前に、[Microsoft Azure Computing Platform & Services](https://signup.azure.com/) にサインインまたはサインアップし、[体験版アカウント](https://azure.microsoft.com/en-us/free/?cdn=disable)を作成します。これには $200 クレジットと 12 ヵ月間無料が含まれます

## 前提条件

ほとんどの手順は Web ポータルを使用して実行できますが、[Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest) が必要です。

## Azure Webアプリを作成する

アプリを作成するには、Webポータルを使用する方法とCLIを使用する方法の2つがあります。

**1\.Webポータルでアプリを作成する**

- ```リソース グループ ``` と ```Web アプリ ``` を作成します。

  ![](_media/deployment/azure/create_web_app_1.png)
- ```ランタイム スタック```を ```NodeJs``` に設定し、```作成(Create)```をクリックします

  ![](_media/deployment/azure/create_web_app_node.png)
- アプリの作成には時間がかかる場合があります。すべてが完了したら、アプリに移動して設定を確認します

  ![](_media/deployment/azure/app_dashboard.png)

**2\.Azure CLIを使用してアプリを作成する**

- 次のコマンドを使用して、```リソース グループ ``` および ```Web アプリケーション ``` を作成します。

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

# アプリを配置する

このチュートリアルでは、```Local Git``` を使用してコードを配置します。これは、WebポータルとCLIを使用して実行できます

**1\.Webポータルを使用して配置する**

- 配置センターに移動して、配置設定を設定します`````` ![](_media/deployment/azure/deployment_settings_1.png)

- ビルドサーバを選択 ![](_media/deployment/azure/deployment_settings_kudu.png)

- 配置ソースを```ローカル git ``` に設定します ![](_media/deployment/azure/deployment_settings_localgit_1.png)

- 右側のハイライト表示されたボタンをクリックして Azure CLI を開き、```az webapp deployment user set --user-name $username --password $password``` を実行して、展開資格情報を構成し、結果の Git url を記録します ![](_media/deployment/azure/deployment_settings_azure.png)

- Forge アプリケーションの資格情報(```FORGE_CLIENT_ID``` および ```FORGE_CLIENT_SECRET```)とコールバック URL (次のパターン ```http://<nameofyourapp>.azurewebsites.net/api/forge/callback/oauth```)を使用して環境変数を設定します ![](_media/deployment/azure/portalAppSettings.png)

**2\.CLIを使用した配置**

``` bash
# Set the account-level deployment credentials
az webapp deployment user set --user-name $username --password $password

# Configure local Git and get deployment URL
echo $(az webapp deployment source config-local-git --name <nameofyourapp> --resource-group <nameofyourresourcegroup> --query url --output tsv)

# Set up the environment variables
az webapp config appsettings set -g MyResourceGroup -n <nameofyourapp> --settings FORGE_CLIENT_ID=<yourForgeAppClientID> FORGE_CLIENT_SECRET=<yourForgeAppSecret> FORGE_CLIENT_SECRET=<yourForgeAppSecret> FORGE_CALLBACK_URL=<yourCallbackURL>
```

- ローカル リポジトリを [Git CLI](https://git-scm.com/book/en/v2/Getting-Started-The-Command-Line) またはお気に入りの Git クライアントを使用して Azure Web アプリにプッシュしてください

```bash
# Add the Azure remote to your local Git respository and push your code
cd /path/to/local/repo
git remote add azure <giturlofyourapp>
git push azure master # use 'git push azure <nameofyourbranch>:master' if you would like to push other local branches than master
```

アプリダッシュボードは次のようになります。

![](_media/deployment/azure/app_dashboard.png)

完了アプリのURLを開いて、アプリの動作を確認します。

**3\.その他の展開オプション** - [Visual Code ](https://azure.microsoft.com/en-us/blog/visual-studio-code-and-azure-app-service-a-perfect-fit/)/[Visual Studio ](../node) - [VSTS ](https://docs.microsoft.com/en-us/labs/devops/deployazurefunctionswithvsts/) - [Github ](https://blogs.msdn.microsoft.com/benjaminperkins/2017/05/10/deploy-github-source-code-repositories-to-an-azure-app-service/) - [BitBucket ](https://confluence.atlassian.com/bitbucket/deploy-to-microsoft-azure-900820699.html) - [FTP](https://docs.microsoft.com/en-us/azure/app-service/deploy-ftp)

# デモScreencast

Azure ポータルと CLI の上記の手順を示したスクリーンキャストをご覧ください(スクリーンキャストは Bash に基づきますが、関連するコマンドは Windows CLI と [Powershell](https://docs.microsoft.com/en-us/powershell/scripting/getting-started/getting-started-with-windows-powershell) で同じです)。WindowsでBashを実行できます。[この](http://mingw.org/wiki/msys)または [this](https://gitforwindows.org/) を Git の一部として参照するか、または [Linux サブシステム](https://docs.microsoft.com/en-us/windows/wsl/install-win10)を試してください)

[viewNodejs](https://www.youtube.com/embed/h_b_te0Iza0 ':include :type=iframe width=100% height=400px')

# その他の測定値
- 配置の自動化と[Azure パイプラインのテスト](https://docs.microsoft.com/en-us/azure/devops/pipelines/languages/javascript?view=vsts)
- [Application Insights](https://azure.microsoft.com/en-us/services/monitor/)、[Cost Management](https://portal.azure.com/#blade/Microsoft_Azure_Billing/ModernBillingMenuBlade/Overview)、[Security Center](https://portal.azure.com/#blade/Microsoft_Azure_Security/SecurityMenuBlade/18)、[その他の Azure クラウド ツールと機能](https://azure.microsoft.com/en-us/services/)をお試しください
- [リソース グループ](https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-group-overview)、[サービス プラン](https://azure.microsoft.com/en-us/pricing/details/app-service/plans/)、[Azure テンプレート](https://azure.microsoft.com/en-us/resources/templates/)、および [ステージング環境](https://docs.microsoft.com/en-us/azure/app-service/deploy-staging-slots)とは何ですか?
- [Node.jsとAzureを使用してクラウドネイティブアプリケーションをビルドする](https://azure.microsoft.com/en-us/resources/building-cloud-native-applications-with-node-js-and-azure/en-us/)
- [Azure App Serviceのパフォーマンスを監視する](https://docs.microsoft.com/en-us/azure/application-insights/app-insights-azure-web-apps)
- [Azure Web Siteのログと診断を使用する](https://azure.microsoft.com/en-us/resources/videos/azure-web-site-logging-and-diagnostics/)
- [価格- App Service](https://azure.microsoft.com/en-us/pricing/details/app-service/windows/)
