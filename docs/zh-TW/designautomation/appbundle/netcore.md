# 用於建立應用程式組合的程式碼 (.NET Core)

## DesignAutomationController.cs

在 **Controllers** 資料夾下，建立含有以下內容的 `DesignAutomationController.cs` 檔案。這只是類別，我們稍後將定義端點，但請注意結尾處的 `DesignAutomationHub`，這可讓我們透過 [SignalR](https://docs.microsoft.com/en-us/aspnet/core/signalr/introduction?view=aspnetcore-3.1) 將通知推送至用戶端。

[DesignAutomationController.cs](_snippets/modifymodels/netcore/DesignAutomationController.1.cs ':include :type=code csharp')

現在，我們將幾個端點加入此類別中。以下方法必須在 `DesignAutomationController` 類別內進行複製。

**1\.GetLocalBundles**

查看 `bundles` 資料夾並傳回 .ZIP 檔案的清單。

[DesignAutomationController.cs](_snippets/modifymodels/netcore/DesignAutomationController.2.cs ':include :type=code csharp')

**2\.GetAvailableEngines**

若要定義組合，我們還需要引擎，因此，此端點將傳回所有可用引擎的清單。

[DesignAutomationController.cs](_snippets/modifymodels/netcore/DesignAutomationController.3.cs ':include :type=code csharp')

**3\.CreateAppBundle**

我們實際上就是在這裡定義新的 AppBundle：

[DesignAutomationController.cs](_snippets/modifymodels/netcore/DesignAutomationController.4.cs ':include :type=code csharp')

由於現在已定義 `DesignAutomationHub` 類別 (在此控制器內)，請開啟 `Startup.cs`，並在 `Configure` 方法內加入以下行：

```csharp
app.UseRouting();
app.UseEndpoints(routes =>
{
    routes.MapHub<Controllers.DesignAutomationHub>("/api/signalr/designautomation");
});
```

如果現在執行網頁應用程式並按一下 **Configure** (位於右上方)，您應該會看到您的 AppBundle 以及所有可用引擎的清單。**按鈕尚未起作用**... 我們繼續前進。

![](_media/designautomation/list_engines.png)

接下來：[定義活動](/zh-TW/designautomation/activity/)
