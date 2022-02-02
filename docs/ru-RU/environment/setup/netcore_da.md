# Создание нового проекта (.NET Core)

> .NET Core также работает в среде, отличной от Windows и Visual Studio, см. [другое руководство для MacOS] (https://github.com/augustogoncalves/dotnetcoreheroku). Для компиляции плагина все еще требуется ОС Windows.

Перейдите в меню **File** >> **New** >> **Project**. Выберите язык **C#** и тип проекта **Web**, а затем **ASP.NET Core Web Application**. Давайте назовем наш файл **forgeSample**. В следующем диалоговом окне выберите **Empty**. Обязательно проверьте, что выбрано **ASP.NET Core 3.0**.

!> Если тип проекта или .NET Core 3.0 недоступны, перейдите в раздел [Веб-технологии](/ru-RU/environment/tools/netcore).

Установите пакет Autodesk Forge NuGet: правой кнопкой мыши щелкните на проект (**Solution Explorer**) --> **Manage NuGet Package** --> **Browse**, найдите **Autodesk.Forge** и установите `Autodesk.Forge`. Это будет использовано для загрузки исходных и финальных данных в [бакеты OSS](https://forge.autodesk.com/en/docs/data/v2/developers_guide/basics/).

Повторите последний шаг в **Manage NuGet Packages**: найдите и загрузите `Autodesk.Forge.DesignAutomation` и `Microsoft.AspNetCore.Mvc.NewtonsoftJson`, чтобы обработать данные JSON. 

![](_media/netcore/create_project.gif) 

Правой кнопкой мыши нажмите на проект, перейдите в **Properties**, во вкладке **Debug** найдите раздел **Environment Variables**. `ASPNETCORE_ENVIRONMENT` уже должна быть определена, поэтому добавьте:

- `ASPNETCORE_URLS`: используйте `http://localhost:3000`
- `FORGE_CLIENT_ID`:  используйте ваш Client ID
- `FORGE_CLIENT_SECRET`: используйте ваш Client Secret
- `FORGE_WEBHOOK_URL`: используйте **ngrok** forwarding URL-адрес из предыдущего шага

Вы также можете поставить галочку напротив **Launch browser** и указать **URL-адрес приложения**. Т.к. приложение запускается локально, уберите галочку с **Enable SSL**. Должно получиться вот так: 

![](_media/netcore/env_vars_da.png) 


Откройте **Program.cs** и добавьте пространство имен (англ. namespace):

```csharp
using Autodesk.Forge.Core;
using Autodesk.Forge.DesignAutomation;
```

Замените код метода **Program.cs** `Main()` на код ниже - это направит запрос нашему приложению загрузить Forge Client ID&Secret из переменных среды, определенных выше.

```csharp
CreateHostBuilder(args).ConfigureAppConfiguration(builder =>
{
    builder.AddForgeAlternativeEnvironmentVariables();
}).ConfigureServices((hostContext, services) =>
{
    services.AddDesignAutomation(hostContext.Configuration);
}).Build().Run();
```

Откройте **Startup.cs** и добавьте пространство имен (англ. namespace):

```csharp
using Microsoft.AspNetCore.Mvc;
```

Затем замените содержимое класса `Startup` следующим кодом для запуска нашего сервера (англ. static file server) для файлов HTML и JavaScript и [SignalR](https://docs.microsoft.com/en-us/aspnet/core/signalr/introduction?view=aspnetcore-2.2) для подключения уведомлений.

```csharp
// This method gets called by the runtime. Use this method to add services to the container.
// For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
public void ConfigureServices(IServiceCollection services)
{
    services.AddMvc(options => options.EnableEndpointRouting = false).SetCompatibilityVersion(CompatibilityVersion.Version_3_0).AddNewtonsoftJson();
    services.AddSignalR();
}

// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    app.UseFileServer();
    app.UseMvc();
}
```

## OAuthController.cs

Наконец, создайте папку **Controllers**, там мы впоследствии разместим WebAPI Controllers.

Нам понадобится `токен доступа`, чтобы читать и изменять (доступ read & write) исходные и фнинальные файлы в бакетах OSS. В папке **Controllers** создайте файл `OAuthController.cs` с кодом ниже:

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Autodesk.Forge;

namespace forgeSample.Controllers
{
    [ApiController]
    public class OAuthController : ControllerBase
    {
        // As both internal & public tokens are used for all visitors
        // we don't need to request a new token on every request, so let's
        // cache them using static variables. Note we still need to refresh
        // them after the expires_in time (in seconds)
        private static dynamic InternalToken { get; set; }

        /// <summary>
        /// Get access token with internal (write) scope
        /// </summary>
        public static async Task<dynamic> GetInternalAsync()
        {
            if (InternalToken == null || InternalToken.ExpiresAt < DateTime.UtcNow)
            {
                InternalToken = await Get2LeggedTokenAsync(new Scope[] { Scope.BucketCreate, Scope.BucketRead, Scope.BucketDelete, Scope.DataRead, Scope.DataWrite, Scope.DataCreate, Scope.CodeAll });
                InternalToken.ExpiresAt = DateTime.UtcNow.AddSeconds(InternalToken.expires_in);
            }

            return InternalToken;
        }

        /// <summary>
        /// Get the access token from Autodesk
        /// </summary>
        private static async Task<dynamic> Get2LeggedTokenAsync(Scope[] scopes)
        {
            TwoLeggedApi oauth = new TwoLeggedApi();
            string grantType = "client_credentials";
            dynamic bearer = await oauth.AuthenticateAsync(
              GetAppSetting("FORGE_CLIENT_ID"),
              GetAppSetting("FORGE_CLIENT_SECRET"),
              grantType,
              scopes);
            return bearer;
        }

        /// <summary>
        /// Reads appsettings from web.config
        /// </summary>
        public static string GetAppSetting(string settingKey)
        {
            return Environment.GetEnvironmentVariable(settingKey);
        }
    }
}
```

Проект готов! На этом этапе он должен выглядеть вот так: 

![](_media/designautomation/netcore/basefiles_step1.png) 

Далее: [Базовый пользовательский интерфейс](/ru-RU/designautomation/html/)

[Эта страница на английском языке](https://learnforge.autodesk.io/#/environment/setup/netcore_da).
