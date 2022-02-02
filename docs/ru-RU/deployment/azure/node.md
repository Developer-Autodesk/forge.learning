# Приложения Forge на Node.js с Azure App Service

Этот раздел поможет вам развернуть приложения Node.js в Azure App Service как веб-приложение на [портале Azure](https://azure.microsoft.com/en-us/features/azure-portal/) или [Git](https://git-scm.com/). 

В этом руководстве мы будем использовать пример *Просмотр моделей из репозиториев Autodesk BIM 360 & Fusion 360* из [предыдущего раздела](/ru-RU/tutorials/viewhubmodels). Полный пример вы найдете по ссылке [Github repo](https://github.com/Autodesk-Forge/learn.forge.viewhubmodels/tree/nodejs). Те же инструкции должны работать и для примера **Визуализация моделей**.

[Войдите в свой аккаунт Azure или создайте учётную запись](https://signup.azure.com/) для [Microsoft Azure Computing Platform & Services](https://azure.microsoft.com/) и получите доступ к [бесплатному пробному периоду](https://azure.microsoft.com/en-us/free/?cdn=disable), который длится 12 месяцев и включает $200 credit.

## Требования

Большинство шагов можно выполнить через Web Portal, тем не менее, вам потребуется [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest). Azure CLI - это интерфейс командной строки Azure для управления ресурсами Azure. 

## Создайте веб-приложение Azure

Существует два способа создать приложение Azure: через Web Portal или с CLI.

**1. Создание приложения с Web Portal**

- Создайте ```Resource Group``` или ```Web App```

  ![](_media/deployment/azure/create_web_app_1.png)
- Настройте ```Runtime Stack``` на ```NodeJs``` и нажмите ```Create```

  ![](_media/deployment/azure/create_web_app_node.png)
- Возможно, создание займёт время - как только оно завершится, проверьте настройки приложения. 

  ![](_media/deployment/azure/app_dashboard.png)

**2. Создание приложения с Azure CLI**

- Создайте```Resource Group``` (или используйте уже существующий) и ```Web App``` с коммандами ниже:

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

# Развертывание приложения

В этом руководстве мы будем использовать ```Local Git``` для развертывания кода. Мы можем сделать это через Web Portal и с CLI. 

**1. Развертывание через Web Portal**

- Перейдите в ```Deployment Center```, чтобы отрегулировать настройки развертывания
![](_media/deployment/azure/deployment_settings_1.png)

- Выберите ваш сервер сборки (англ. build server)
![](_media/deployment/azure/deployment_settings_kudu.png)

- Укажите источник развертывания - ```Local Git```
![](_media/deployment/azure/deployment_settings_localgit_1.png)

- Нажмите выделенную кнопку справа вверху, чтобы открыть Azure CLI, запустите ```az webapp deployment user set --user-name $username --password $password```, чтобы настроить данные развертывания и записать полученный Git URL.
![](_media/deployment/azure/deployment_settings_azure.png)

- Настройте переменные среды с данными аккаунта Forge (```FORGE_CLIENT_ID``` и ```FORGE_CLIENT_SECRET```) и Callback Url (придерживаясь структуры ```http://<nameofyourapp>.azurewebsites.net/api/forge/callback/oauth```)
![](_media/deployment/azure/portalAppSettings.png)

**2. Развертывание с использованием CLI**

``` bash
# Set the account-level deployment credentials
az webapp deployment user set --user-name $username --password $password

# Configure local Git and get deployment URL
echo $(az webapp deployment source config-local-git --name <nameofyourapp> --resource-group <nameofyourresourcegroup> --query url --output tsv)

# Set up the environment variables
az webapp config appsettings set -g MyResourceGroup -n <nameofyourapp> --settings FORGE_CLIENT_ID=<yourForgeAppClientID> FORGE_CLIENT_SECRET=<yourForgeAppSecret> FORGE_CLIENT_SECRET=<yourForgeAppSecret> FORGE_CALLBACK_URL=<yourCallbackURL>
```

- Отправьте локальный репозиторий в Azure Web App с помощью [Git CLI](https://git-scm.com/book/en/v2/Getting-Started-The-Command-Line) или вашего любимого клиента Git

```bash
# Add the Azure remote to your local Git respository and push your code
cd /path/to/local/repo
git remote add azure <giturlofyourapp>
git push azure master # use 'git push azure <nameofyourbranch>:master' if you would like to push other local branches than master
```

Dashboard приложения должен быть таким:

![](_media/deployment/azure/app_dashboard.png)

Готово! Нажмите на URL приложения, чтобы увидеть его в работе.

**3. Другие варианты развертывания**
- [Visual Code](https://azure.microsoft.com/en-us/blog/visual-studio-code-and-azure-app-service-a-perfect-fit/)/[Visual Studio](../node)
- [VSTS](https://docs.microsoft.com/en-us/labs/devops/deployazurefunctionswithvsts/)
- [Github](https://blogs.msdn.microsoft.com/benjaminperkins/2017/05/10/deploy-github-source-code-repositories-to-an-azure-app-service/)
- [BitBucket](https://confluence.atlassian.com/bitbucket/deploy-to-microsoft-azure-900820699.html)
- [FTP](https://docs.microsoft.com/en-us/azure/app-service/deploy-ftp)

# Демо-ролик

Посмотрите это видео, демонстрирующее шаги по резвертыванию через Azure Portal и CLI (демо-ролик основан на Bash, но комманды будут такими же и для Windows CLI и [Powershell](https://docs.microsoft.com/en-us/powershell/scripting/getting-started/getting-started-with-windows-powershell). И вы можете запустить Bash на Windows! Подробности [здесь](http://mingw.org/wiki/msys) или [здесь](https://gitforwindows.org/) (как часть Git) или попробуйте [Linux Subsystem](https://docs.microsoft.com/en-us/windows/wsl/install-win10))

[viewNodejs](https://www.youtube.com/embed/h_b_te0Iza0 ':include :type=iframe width=100% height=400px')

# Материалы для ознакомления
- Автоматизация и тестирование после развертывания через [Azure Pipelines](https://docs.microsoft.com/en-us/azure/devops/pipelines/languages/javascript?view=vsts)
- Попробуйте [Application Insights](https://azure.microsoft.com/en-us/services/monitor/), [Cost Management](https://portal.azure.com/#blade/Microsoft_Azure_Billing/ModernBillingMenuBlade/Overview), [Security Center](https://portal.azure.com/#blade/Microsoft_Azure_Security/SecurityMenuBlade/18) и [другие инструменты и функции Azure Cloud](https://azure.microsoft.com/en-us/services/)
- Узнайте про [Resource Groups](https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-group-overview), [Service Plans](https://azure.microsoft.com/en-us/pricing/details/app-service/plans/),[Azure Templates](https://azure.microsoft.com/en-us/resources/templates/) и [Staging Environment](https://docs.microsoft.com/en-us/azure/app-service/deploy-staging-slots)?
- [Building Cloud-Native Applications with Node.js and Azure](https://azure.microsoft.com/en-us/resources/building-cloud-native-applications-with-node-js-and-azure/en-us/)
- [Monitor Azure App Service performance](https://docs.microsoft.com/en-us/azure/application-insights/app-insights-azure-web-apps)
- [Using Azure Web Site Logging and Diagnostics](https://azure.microsoft.com/en-us/resources/videos/azure-web-site-logging-and-diagnostics/)
- [Pricing - App Service](https://azure.microsoft.com/en-us/pricing/details/app-service/windows/)

[Эта страница на английском языке](https://learnforge.autodesk.io/#/deployment/azure/node).
