[nodejs setup](environment/setup/net.md ':include :type=markdown')

## Global.asax

One extra step: in general a REST API should be state-less, meaning it doesn't maintain control of users on a session. As this app will show data per user we need to identify who is making the calls, so let's enable session for `/api/` endpoints only. The following code should be added to the existing `WebApiApplication` (at the existing `Global.asax` file).

```csharp
// Enable session on WebAPI app
// https://stackoverflow.com/a/17539008/4838205
protected void Application_PostAuthorizeRequest()
{
  HttpContext.Current.SetSessionStateBehavior(SessionStateBehavior.Required);
}
private bool IsWebApiRequest()
{
  return HttpContext.Current.Request.AppRelativeCurrentExecutionFilePath.StartsWith("~/api");
}
```

Project is ready!

Next: [Authorize](oauth/3legged/)