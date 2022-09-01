# Создание нового проекта (.NET Core)

> .NET Core также работает в среде, отличной от Windows и Visual Studio, см. [другое руководство для MacOS](https://github.com/augustogoncalves/dotnetcoreheroku). Для компиляции плагина все еще требуется ОС Windows.

Перейдите в меню **File** >> **New** >> **Project**. Выберите язык **C#** и тип проекта **Web**, а затем **ASP.NET Core Web Application**. Давайте назовем наш файл **forgeSample**. В следующем диалоговом окне выберите **Empty**. Обязательно проверьте, что выбрано **ASP.NET Core 3.0**.

!> Если тип проекта или .NET Core 3.0 недоступны, перейдите в раздел [Веб-технологии](/ru-RU/environment/tools/netcore).

Установите пакет Autodesk Forge NuGet: правой кнопкой мыши щелкните на проект (**Solution Explorer**) --> **Manage NuGet Package** --> **Browse**, найдите **Autodesk.Forge** и установите `Autodesk.Forge`.

Повторите последний шаг в **Manage NuGet Packages**: найдите и загрузите `Microsoft.AspNetCore.Mvc.NewtonsoftJson`, чтобы обработать данные JSON. 

![](_media/netcore/create_project.gif)

Правой кнопкой мыши нажмите на проект, перейдите в **Properties**, во вкладке **Debug** найдите раздел **Environment Variables**. `ASPNETCORE_ENVIRONMENT` уже должна быть определена, поэтому добавьте:

- `ASPNETCORE_URLS`: используйте `http://localhost:3000`
- `FORGE_CLIENT_ID`: используйте ваш Client ID
- `FORGE_CLIENT_SECRET`: используйте ваш Client Secret
- `FORGE_CALLBACK_URL`: для этого примера используйте `http://localhost:3000/api/forge/callback/oauth`

Вы также можете поставить галочку напротив **Launch browser** и указать **URL-адрес приложения**, если вы хотите, чтобы приложение запускалось в браузере автоматически при отладке. В поле **URL приложения** укажите `http://localhost:3000`. Наконец, поскольку мы запускаем приложение локально без приобретения соответствующего сертификата, уберите галочку с **Enable SSL**. Ваши настройки должны выглядеть вот так: 

![](_media/netcore/env_vars.png)

Откройте **Startup.cs** и добавьте пространство имен (англ. namespace):

```csharp
using Microsoft.AspNetCore.Mvc;
```

Затем замените содержимое класса `Startup` следующим кодом для запуска нашего сервера (англ. static file server) для файлов HTML и JavaScript.

```csharp
// This method gets called by the runtime. Use this method to add services to the container.
// For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
public void ConfigureServices(IServiceCollection services)
{
    services.AddMvc(options => options.EnableEndpointRouting = false).SetCompatibilityVersion(CompatibilityVersion.Version_3_0).AddNewtonsoftJson();
}

// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    if (env.IsDevelopment())
    {
        app.UseDeveloperExceptionPage();
    }

    app.UseDefaultFiles();
    app.UseStaticFiles();
    app.UseHttpsRedirection();
    app.UseMvc();
}
```

Наконец, создайте папку **Controllers**. Там вы впоследствии определим WebAPI Controllers.

Двигаемся дальше!
