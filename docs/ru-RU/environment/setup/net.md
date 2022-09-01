# Создание нового проекта (.NET Framework)

Перейдите в меню **File** >> **New** >> **Project**. Выберите язык **C#** и тип проекта **Web**, а затем выберите **ASP.NET Web Application (.NET Framework)**. Давайте назовем его **forgeSample**. Обязательно проверьте, что выбрано **.NET Framework 4.7.2**. В следующем диалоговом окне выберите **Empty** и поставьте галочку напротив **Web API**.

!> Если тип проекта или .NET Framework 4.7.2 недоступны, перейдите в раздел [Веб-технологии](/ru-RU/environment/tools/net).

Установите пакет Autodesk Forge NuGet: щелкните правой кнопкой мыши на проект (**Solution Explorer**) --> **Manage NuGet Package** --> **Browse**, найдите **Autodesk Forge**  и установите **forgeSample**.

![](_media/net/create_project_webapi.gif) 

## Web.Config

В файл **Web.Config** добавьте Forge Client ID & Secret (доступны в вашем аккаунте Forge при создании нового приложения). По умолчанию он уже должен иметь `<appSettings></appSettings>` после `<configuration>` и перед `<system.web>`. Настройте, как показано ниже:

```xml
....
<configuration> <!-- this line is already on your file -->
  <appSettings>
    <add key="FORGE_CLIENT_ID" value="Your client ID here" />
    <add key="FORGE_CLIENT_SECRET" value="Your client secret here" />
    <add key="FORGE_CALLBACK_URL" value="http://localhost:3000/api/forge/callback/oauth" />
  </appSettings>
  <system.web> <!-- this line is already on your file -->
....
```

Движок ASP.NET ограничивает максимальный размер запроса до 4 МБ, а размер загружаемого файла - до 30 МБ. Мы можем изменить это ограничение на максимум (или вы можете изменить его в соответствии с вашими потребностями). В файле `web.config` найдите `httpRuntime` и добавьте к нему `maxRequestLength`, как показано ниже:

```xml
<!-- httpRuntime targetFramework is already on your file, just add the maxRequestLength -->
<httpRuntime targetFramework="4.7.2" maxRequestLength="2097151" />
```

Добавьте лимит **security** >> **requestFiltering**:

```xml
  </handlers> <!-- this line is already on your file -->
  <security>
    <requestFiltering>
      <requestLimits maxAllowedContentLength="4294967295" />
    </requestFiltering>
  </security>
</system.webServer> <!-- this line is already on your file -->
```

Узнайте больше о [maxRequestLength](https://msdn.microsoft.com/en-us/library/system.web.configuration.httpruntimesection.maxrequestlength.aspx) и [maxAllowedContentLength](https://msdn.microsoft.com/en-us/library/ms689462.aspx). 

## Port

Наконец, чтобы ваше приложение соответствовало всем другим примерам кода **Autodesk Forge**, давайте изменим порт на **3000**: во вкладке **Web** перейдите в **Properties** (щелкнув правой кнопкой мыши на название проекта), затем измените **URL-адрес проекта** на `http://localhost:3000`.

![](_media/net/port.png)

!> Если вы только что изменили номер порта, убедитесь, что используется протокол **http**, а не **https**.

