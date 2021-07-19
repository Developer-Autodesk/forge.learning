# Code for creating App Bundle (.NET Core)

## DesignAutomationController.cs

Under **Controllers** folder create a `DesignAutomationController.cs` with the following content. This is just the class, we'll define the endpoints later, but note the `DesignAutomationHub` at the end, which allow us push notifications to the client via [SignalR](https://docs.microsoft.com/en-us/aspnet/core/signalr/introduction?view=aspnetcore-3.1).

[DesignAutomationController.cs](_snippets/modifymodels/netcore/DesignAutomationController.1.cs ':include :type=code csharp')

Now let's add a few endpoints to this class. The following methods must be copied inside the `DesignAutomationController` class.

**1. GetLocalBundles**

Look at the `bundles` folder and return a list of .ZIP files.

[DesignAutomationController.cs](_snippets/modifymodels/netcore/DesignAutomationController.2.cs ':include :type=code csharp')

**2. GetAvailableEngines**

To define a bundle we also need the engine, so this endpoint return a list of all available engines.

[DesignAutomationController.cs](_snippets/modifymodels/netcore/DesignAutomationController.3.cs ':include :type=code csharp')

**3. CreateAppBundle**

That's where we actually define a new AppBundle:

[DesignAutomationController.cs](_snippets/modifymodels/netcore/DesignAutomationController.4.cs ':include :type=code csharp')

As the `DesignAutomationHub` class is now defined (inside this controller), open the `Startup.cs` and, inside `Configure` method, add the following line:

```csharp
app.UseRouting();
app.UseEndpoints(routes =>
{
    routes.MapHub<Controllers.DesignAutomationHub>("/api/signalr/designautomation");
});
```

If you run the webapp now and click on **Configure** (top-right), you should see your AppBundle and a list of all available engines. **Buttons do not work yet**... let's move forward.

![](_media/designautomation/list_engines.png)

Next: [Define an Activity](designautomation/activity/)
