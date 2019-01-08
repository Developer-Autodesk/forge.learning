# Node.js Forge App with Azure App Service

This is to walk you through the steps to deploy a sample OAuth (3-legged) Enabled Node.js Forge App to Azure App Service as a Web App.

For this tutorial, we will be using our ViewHubModels sample as described in [previous chapters](tutorials/viewhubmodels). You may retrieve the full sample from [our Github repo](https://github.com/Autodesk-Forge/learn.forge.viewhubmodels/tree/nodejs).

# Create a Web App

### Create an app with Web Portal

- [Sign up](https://signup.azure.com/) for [Microsoft Azure Computing Platform & Services](https://azure.microsoft.com/) and create a [trial account, with $200 credit and free for 12 months ](https://azure.microsoft.com/en-us/free/?cdn=disable)
- Create a ```Resource Group``` and a ```Web App```

  ![](_media/deployment/azure/create_web_app_1.png)
- Set the ```Runtime Stack``` to ```NodeJs``` and click ```Create```

  ![](_media/deployment/azure/create_web_app_node.png)
- It may take a while for the app to be created, once all done, navigate to the app to review its settings

  ![](_media/deployment/azure/app_dashboard.png)

### Create an App with Azure CLI
- Install the [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest)

- Create a ```Resource Group``` (or use existing) and a ```Web App``` with commands below:

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

# Deploy the App

For this tutorial, we are going with ```Local Git``` to deploy our code.

### Deploy with Azure Portal and Git CLI (Windows/Linux)
- Navigate to the ```Deployment Center``` to set up deployment settings

  ![](_media/deployment/azure/deployment_settings_1.png)
- Choose your build server

  ![](_media/deployment/azure/deployment_settings_kudu.png)
- Set deployment source to ```Local Git```

  ![](_media/deployment/azure/deployment_settings_localgit_1.png)
- Click the highlighted button on right top to open the Azure CLI, run ```az webapp deployment user set --user-name $username --password $password``` to configure deployment credentials and record the resulting Git url

  ![](_media/deployment/azure/deployment_settings_azure.png)

- _Optional: the above steps can be done on Azure CLI with commands below_
  ```bash
  # Set the account-level deployment credentials
  az webapp deployment user set --user-name $username --password $password

  # Configure local Git and get deployment URL
  echo $(az webapp deployment source config-local-git --name <nameofyourapp> --resource-group <nameofyourresourcegroup> --query url --output tsv)
  ```

- Push your local repo with the Git CLI or your favorite Git client
  ```bash
  # Add the Azure remote to your local Git respository and push your code
  cd /path/to/local/repo
  git remote add azure <giturlofyourapp>
  git push azure master # use 'git push azure <nameofyourbranch>:master' if you would like to push other local branches than master
  ```

- Open the app url to see our app in action

    ![](_media/deployment/azure/app_dashboard.png)
    ![](_media/deployment/azure/app_running.png)

### Other Deployment Options
- [Visual Code](https://azure.microsoft.com/en-us/blog/visual-studio-code-and-azure-app-service-a-perfect-fit/)/[Visual Studio](../node)
- [VSTS](https://docs.microsoft.com/en-us/labs/devops/deployazurefunctionswithvsts/)
- [Github](https://blogs.msdn.microsoft.com/benjaminperkins/2017/05/10/deploy-github-source-code-repositories-to-an-azure-app-service/)
- [BitBucket](https://confluence.atlassian.com/bitbucket/deploy-to-microsoft-azure-900820699.html)
- [FTP](https://docs.microsoft.com/en-us/azure/app-service/deploy-ftp)



# Demo Screencast
Watch this screencast demonstrating the above steps on the Azure Portal and CLI (the screencast is based on Bash but the commands involved would have been identical on Windows CLI and Powershell. And you can run Bash on Windows! See [this](http://mingw.org/wiki/msys) or [this](https://gitforwindows.org/) as part of Git or even try the [Linux Subsystem](https://docs.microsoft.com/en-us/windows/wsl/install-win10))
<iframe width="560" height="315" src="https://www.youtube.com/embed/h_b_te0Iza0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

# Try For Yourself
- Post deployment automation and testing with [Azure Pipelines](https://docs.microsoft.com/en-us/azure/devops/pipelines/languages/javascript?view=vsts)
Try out [Application Insights](https://azure.microsoft.com/en-us/services/monitor/), [Cost Management](https://portal.azure.com/#blade/Microsoft_Azure_Billing/ModernBillingMenuBlade/Overview), [Security Center](https://portal.azure.com/#blade/Microsoft_Azure_Security/SecurityMenuBlade/18) and [many more Azure Cloud tools and features](https://azure.microsoft.com/en-us/services/)

# Further Readings
- What are [Resource Groups](https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-group-overview), [Service Plans](https://azure.microsoft.com/en-us/pricing/details/app-service/plans/),[Azure Templates](https://azure.microsoft.com/en-us/resources/templates/) and [Staging Environment](https://docs.microsoft.com/en-us/azure/app-service/deploy-staging-slots)?
- [Building Cloud-Native Applications with Node.js and Azure](https://azure.microsoft.com/en-us/resources/building-cloud-native-applications-with-node-js-and-azure/en-us/)
- [Monitor Azure App Service performance](https://docs.microsoft.com/en-us/azure/application-insights/app-insights-azure-web-apps)
- [Using Azure Web Site Logging and Diagnostics](https://azure.microsoft.com/en-us/resources/videos/azure-web-site-logging-and-diagnostics/)
- [Pricing - App Service](https://azure.microsoft.com/en-us/pricing/details/app-service/windows/)
