# Приложения Forge на .NET с Azure App Service

Этот раздел поможет вам развернуть приложения .NET в Azure App Service как веб-приложение с [Visual Studio 2017](https://visualstudio.microsoft.com/vs/).

В этом руководстве мы будем использовать пример ViewHubModels из [предыдущего раздела](/ru-RU/tutorials/viewhubmodels). Полный пример вы найдете по ссылке [Github repo](https://github.com/Autodesk-Forge/learn.forge.viewhubmodels/tree/net). Те же инструкции должны работать и для примера **View Models**.

[Войдите в свой аккаунт Azure или создайте учётную запись](https://signup.azure.com/) для [Microsoft Azure Computing Platform & Services](https://azure.microsoft.com/) и получите доступ к [бесплатному пробному периоду](https://azure.microsoft.com/en-us/free/?cdn=disable), который длится 12 месяцев и включает $200 credit. 

## Требования

Это руководство работает с [Visual Studio 2017](https://visualstudio.microsoft.com/vs/).

# Создавайте и развертывайте на Azure

- Откройте проект в Visual Studio. Нажмите правой кнопкой мыши на проект и выберите ```Build > Publish```, чтобы начать публикацию в ```Azure App Service```
![](_media/deployment/azure/create_web_app_net.png)

- Войдите в/создайте басплатную учетную запись Azure 
![](_media/deployment/azure/create_web_app_net_2.png)
![](_media/deployment/azure/create_web_app_net_3.png)

- Настройте ```Name``` и ```Plan``` соответственно. Обратите внимание, что ```Name``` должно быть уникальным и совпадать с именем в вашем Callback Url - это входит в URL-адрес вашего приложения. Нажмите```Create```, чтобы начать развертывание. 
![](_media/deployment/azure/create_web_app_net_4.png)

- Проверьте build output в деталях развертывания. выходных данных сборки. Обратите внимание, что новый профиль был создан автоматически, поэтому в дальнейшем вы можете развернуть свое решение непосредственно в этом приложении, вам не нужно будет повторять эти шаги снова.
![](_media/deployment/azure/net_app_published_result.png)

- Настройте переменные среды с данными аккаунта Forge (```FORGE_CLIENT_ID``` и ```FORGE_CLIENT_SECRET```) и Callback Url (придерживаясь структуры  ```http://<nameofyourapp>.azurewebsites.net/api/forge/callback/oauth```)
![](_media/deployment/azure/vsAppSettings.png)

Готово! Нажмите на ```Site URL```, чтобы увидеть приложение в работе. 

# Альтернативные подходы

- Вы можете создать приложение на портале Azure Portal в вашем браузере. Просто выберите ```API App``` в ```Marketplace``` (при создании приложения в браузере) и ```Existing App```(при публикации или создании ```Deployment Profile``` в Visual Studio). 

  ![](_media/deployment/azure/app_dashboard.png)
- Как только вы создадите ```API App```, вы сможете развернуть его из локального репозитория Git - подробности [здесь](/ru-RU/deployment/azure/node). 

### Другие варианты развертывания 
- [Visual Code](https://azure.microsoft.com/en-us/blog/visual-studio-code-and-azure-app-service-a-perfect-fit/)/[Visual Studio](../node)
- [VSTS](https://docs.microsoft.com/en-us/labs/devops/deployazurefunctionswithvsts/)
- [Github](https://blogs.msdn.microsoft.com/benjaminperkins/2017/05/10/deploy-github-source-code-repositories-to-an-azure-app-service/)
- [BitBucket](https://confluence.atlassian.com/bitbucket/deploy-to-microsoft-azure-900820699.html)
- [FTP](https://docs.microsoft.com/en-us/azure/app-service/deploy-ftp)

# Демо-ролик

Посмотрите это видео, демонстрирующее развертывание нашего примера .NET в [Visual Studio 2017](https://visualstudio.microsoft.com/vs/) (те же инструкции подойдут для вашего приложения Node.js с Visual Studio)

[Демо .NET](https://www.youtube.com/embed/dDg-fQ7SHAQ ':include :type=iframe width=100% height=400px')

# Материалы для ознакомления
<!--
Это скоро будет доступно (как другая версия руководства)
- Адаптируйте этот пример к [.NET Core Framework](https://docs.microsoft.com/en-us/dotnet/core/) и разверните его как [веб-приложение Azure](/ru-RU/deployment/azure/node)
-->
- Попробуйте [Application Insights](https://azure.microsoft.com/en-us/services/monitor/), [Cost Management](https://portal.azure.com/#blade/Microsoft_Azure_Billing/ModernBillingMenuBlade/Overview), [Security Center](https://portal.azure.com/#blade/Microsoft_Azure_Security/SecurityMenuBlade/18) и [другие инструменты и функции Azure Cloud](https://azure.microsoft.com/en-us/services/)
- Узнайте про [Resource Groups](https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-group-overview), [Service Plans](https://azure.microsoft.com/en-us/pricing/details/app-service/plans/),[Azure Templates](https://azure.microsoft.com/en-us/resources/templates/) и [Staging Environment](https://docs.microsoft.com/en-us/azure/app-service/deploy-staging-slots)
- [Microsoft Azure Developer Camp: Build a Cloud-Native App](https://mva.microsoft.com/en-us/training-courses/microsoft-azure-developer-camp-build-a-cloud-native-app-8299)
- [Monitor Azure App Service performance](https://docs.microsoft.com/en-us/azure/application-insights/app-insights-azure-web-apps)
- [Using Azure Web Site Logging and Diagnostics](https://azure.microsoft.com/en-us/resources/videos/azure-web-site-logging-and-diagnostics/)
- [Pricing - App Service](https://azure.microsoft.com/en-us/pricing/details/app-service/windows/)

[Эта страница на английском языке](https://learnforge.autodesk.io/#/deployment/azure/net).
