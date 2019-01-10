# .NET Forge App with Azure App Service

This is to walk you through the steps to deploy a .NET sample Forge App to Azure App Service as a Web App with [Visual Studio 2017](https://visualstudio.microsoft.com/vs/).

For this tutorial, we will be using our ViewHubModels sample as described in [previous chapters](tutorials/viewhubmodels). You may retrieve the full sample from [our Github repo](https://github.com/Autodesk-Forge/learn.forge.viewhubmodels/tree/net). The same steps should also work for **View Models** tutorial code.

Before you start, [sign in or sign up](https://signup.azure.com/) for [Microsoft Azure Computing Platform & Services](https://azure.microsoft.com/) and create a [trial account](https://azure.microsoft.com/en-us/free/?cdn=disable), it includes $200 credit and free for 12 months

# Create and Deploy to Azure

- Set up the environment variables in your ```Web.config```

```xml
<appSettings>
  <add key="FORGE_CLIENT_ID" value="<yourclientid>" />
  <add key="FORGE_CLIENT_SECRET" value="<yourclientsecret>" />
  <add key="FORGE_CALLBACK_URL" value="http://<nameofyourapp>.azurewebsites.net/api/forge/callback/oauth" />
</appSettings>
```

- Right click on your project or select ```Build > Publish``` to start to publish to ```Azure App Service```
![](_media/deployment/azure/create_web_app_net.png)

- Sign in or create a Azure free account
![](_media/deployment/azure/create_web_app_net_2.png)
![](_media/deployment/azure/create_web_app_net_3.png)

- Set the ```Name``` and ```Plan``` accordingly, note the ```Name``` will have to be globally unique and should match the name specified in your callback url previously - this is going in to the URL of your app. Click ```Create``` to start the deployment
![](_media/deployment/azure/create_web_app_net_4.png)

- Check the build output for deployment details. And note that a new profile has been automatically created so that going forward you can deploy your solution directly to this app and won't need to go through these steps again
![](_media/deployment/azure/net_app_published_result.png)

- Click on the ```Site URL``` to see the app in action
![](_media/deployment/azure/app_running.png)

# Alternative Approaches

- You can create the app on the Azure Portal in your browser as well. Simply choose ```API App``` from the ```Marketplace``` when creating the App in your browser and select ```Existing App``` when publishing or creating the ```Deployment Profile``` in Visual Studio

  ![](_media/deployment/azure/app_dashboard.png)
- Once we have the ```API App``` created, you can deploy from a local Git repo - see [here](deployment/azure/node) for details

### Other Deployment Options
- [Visual Code](https://azure.microsoft.com/en-us/blog/visual-studio-code-and-azure-app-service-a-perfect-fit/)/[Visual Studio](../node)
- [VSTS](https://docs.microsoft.com/en-us/labs/devops/deployazurefunctionswithvsts/)
- [Github](https://blogs.msdn.microsoft.com/benjaminperkins/2017/05/10/deploy-github-source-code-repositories-to-an-azure-app-service/)
- [BitBucket](https://confluence.atlassian.com/bitbucket/deploy-to-microsoft-azure-900820699.html)
- [FTP](https://docs.microsoft.com/en-us/azure/app-service/deploy-ftp)

# Demo Screencast

Watch this screencast demonstrating the deployment of our .NET sample in [Visual Studio 2017](https://visualstudio.microsoft.com/vs/) (similar steps can be taken to deploy your Node.js app with Visual Studio)

[videoNET](https://www.youtube.com/embed/r7QyGvsXTK8 ':include :type=iframe width=100% height=400px')

# Try For Yourself
<!--
This will be live soon (as another version of the tutorial)
- Adapt this sample app to the [.NET Core Framework](https://docs.microsoft.com/en-us/dotnet/core/) and deploy it as a [Azure Web App](deployment/azure/node)
-->
- Try out [Application Insights](https://azure.microsoft.com/en-us/services/monitor/), [Cost Management](https://portal.azure.com/#blade/Microsoft_Azure_Billing/ModernBillingMenuBlade/Overview), [Security Center](https://portal.azure.com/#blade/Microsoft_Azure_Security/SecurityMenuBlade/18) and [many more Azure Cloud tools and features](https://azure.microsoft.com/en-us/services/)

# Further Readings
- What are [Resource Groups](https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-group-overview), [Service Plans](https://azure.microsoft.com/en-us/pricing/details/app-service/plans/),[Azure Templates](https://azure.microsoft.com/en-us/resources/templates/) and [Staging Environment](https://docs.microsoft.com/en-us/azure/app-service/deploy-staging-slots)?
- [Microsoft Azure Developer Camp: Build a Cloud-Native App](https://mva.microsoft.com/en-us/training-courses/microsoft-azure-developer-camp-build-a-cloud-native-app-8299)
- [Monitor Azure App Service performance](https://docs.microsoft.com/en-us/azure/application-insights/app-insights-azure-web-apps)
- [Using Azure Web Site Logging and Diagnostics](https://azure.microsoft.com/en-us/resources/videos/azure-web-site-logging-and-diagnostics/)
- [Pricing - App Service](https://azure.microsoft.com/en-us/pricing/details/app-service/windows/)
