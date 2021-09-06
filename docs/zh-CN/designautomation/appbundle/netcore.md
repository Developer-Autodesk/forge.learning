# 用于创建应用程序包的代码 (.NET Core)

## DesignAutomationController.cs

在 **Controllers** 文件夹下，创建一个包含以下内容的 `DesignAutomationController.cs`。这只是类，稍后我们将定义端点，但请注意末尾的 `DesignAutomationHub`，它允许我们通过 [SignalR](https://docs.microsoft.com/en-us/aspnet/core/signalr/introduction?view=aspnetcore-3.1) 向客户端推送通知。

[DesignAutomationController.cs](_snippets/modifymodels/netcore/DesignAutomationController.1.cs ':include :type=code csharp')

现在，我们向此类添加几个端点。必须在 `DesignAutomationController` 类中复制以下方法。

**1. GetLocalBundles**

查看 `bundles` 文件夹并返回 .ZIP 文件列表。

[DesignAutomationController.cs](_snippets/modifymodels/netcore/DesignAutomationController.2.cs ':include :type=code csharp')

**2. GetAvailableEngines**

要定义包，我们还需要引擎，因此此端点将返回所有可用引擎的列表。

[DesignAutomationController.cs](_snippets/modifymodels/netcore/DesignAutomationController.3.cs ':include :type=code csharp')

**3. CreateAppBundle**

这是我们真正定义新应用程序包的地方：

[DesignAutomationController.cs](_snippets/modifymodels/netcore/DesignAutomationController.4.cs ':include :type=code csharp')

`DesignAutomationHub` 类现已定义（在此控制器内），打开 `Startup.cs`，然后在 `Configure` 方法内添加以下行：

```csharp
app.UseRouting();
app.UseEndpoints(routes =>
{
    routes.MapHub<Controllers.DesignAutomationHub>("/api/signalr/designautomation");
});
```

如果您现在运行 Web 应用程序，并单击右上角的 **Configure**，您应该会看到您的应用程序包以及所有可用引擎的列表。**按钮仍不起作用**... 我们继续。

![](_media/designautomation/list_engines.png)

下一步：[定义活动](/zh-CN/designautomation/activity/)
