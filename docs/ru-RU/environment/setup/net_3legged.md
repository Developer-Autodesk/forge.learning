[net setup](/ru-RU/environment/setup/net.md ':include :type=markdown')

## Global.asax

Один дополнительный шаг: REST API должен быть без состояния (англ. state-less), т.е. он не поддерживает контроль над пользователями во время работы. Поскольку это приложение будет отображать данные для каждого пользователя, нам необходимо определить, кто отправляет запросы. Давайте подключим это только для конечных точек `/api/`. Следующий код следует скопировать в существующий файл `Global.asax`:

```csharp
using System.Web;
using System.Web.Http;
using System.Web.SessionState;

namespace forgeSample
{
  public class WebApiApplication : System.Web.HttpApplication
  {
    // This method is already on your file...
    protected void Application_Start()
    {
      GlobalConfiguration.Configure(WebApiConfig.Register);
    }

    // Enable session on WebAPI app
    // Credit: https://stackoverflow.com/a/17539008/4838205
    protected void Application_PostAuthorizeRequest()
    {
      HttpContext.Current.SetSessionStateBehavior(SessionStateBehavior.Required);
    }
    private bool IsWebApiRequest()
    {
      return HttpContext.Current.Request.AppRelativeCurrentExecutionFilePath.StartsWith("~/api");
    }
  }
}
```

Проект готов!

Далее: [Аутентификация](/ru-RU/oauth/3legged/)

[Эта страница на английском языке](https://learnforge.autodesk.io/#/environment/setup/net_3legged).
