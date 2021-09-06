# アプリ バンドルを作成するためのコード(.NET Core)

## DesignAutomationController.cs

**Controllers** フォルダの下に、次の内容を含む `DesignAutomationController.cs` を作成します。これは単なるクラスで、後でエンドポイントを定義しますが、最後の `DesignAutomationHub` に注意してください。これにより、[SignalR](https://docs.microsoft.com/en-us/aspnet/core/signalr/introduction?view=aspnetcore-3.1) を介してクライアントに通知をプッシュすることができます。

[DesignAutomationController.cs](_snippets/modifymodels/netcore/DesignAutomationController.1.cs ':include :type=code csharp')

このクラスにいくつかのエンドポイントを追加しましょう。次のメソッドを、`DesignAutomationController`クラス内にコピーする必要があります。

**1\.GetLocalBundles**

`bundles` フォルダを見て、.ZIP ファイルのリストを返します。

[DesignAutomationController.cs](_snippets/modifymodels/netcore/DesignAutomationController.2.cs ':include :type=code csharp')

**2\.GetAvailableEngines**

バンドルを定義するには、エンジンも必要であるため、このエンドポイントはすべての使用可能なエンジンのリストを返します。

[DesignAutomationController.cs](_snippets/modifymodels/netcore/DesignAutomationController.3.cs ':include :type=code csharp')

**3\.CreateAppBundle**

ここで、新しい AppBundle を実際に定義します。

[DesignAutomationController.cs](_snippets/modifymodels/netcore/DesignAutomationController.4.cs ':include :type=code csharp')

`DesignAutomationHub` クラスが(このコントローラ内で)定義されたので、`Startup.cs` を開き、`Configure` メソッド内で次の行を追加します。

```csharp
app.UseRouting();
app.UseEndpoints(routes =>
{
    routes.MapHub<Controllers.DesignAutomationHub>("/api/signalr/designautomation");
});
```

ここで Web アプリを実行し、**Configure** (右上)をクリックすると、AppBundle および使用可能なすべてのエンジンのリストが表示されます。**ボタンはまだ機能しません。**先に進みましょう。

![](_media/designautomation/list_engines.png)

次の作業:[アクティビティを定義する](designautomation/activity/)
