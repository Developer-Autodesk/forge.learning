[net setup](environment/setup/net.md ':include :type=markdown')

## Global.asax

One extra step: in general a REST API should be state-less, meaning it doesn't maintain control of users on a session. As this app will show data per user we need to identify who is making the calls, let's enable session for `/api/` endpoints only. The following code should copied to the the existing `Global.asax` code file:

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

Project is ready!

Next: [Authorize](oauth/3legged/)