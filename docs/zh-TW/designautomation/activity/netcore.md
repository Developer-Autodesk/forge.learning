# 定義活動 (.NET Core)

以下方法應加入 `DesignAutomationController` 類別中。

**1\.EngineAttributes**

若要定義活動，我們需要可執行檔和預設副檔名。將由此協助函式提供 (從引擎名稱)。 

[DesignAutomationController.cs](_snippets/modifymodels/netcore/DesignAutomationController.5.cs ':include :type=code csharp')

**2\.CreateActivity**

使用輸入檔案、輸入資料 (JSON) 和輸出檔案定義新活動。

[DesignAutomationController.cs](_snippets/modifymodels/netcore/DesignAutomationController.6.cs ':include :type=code csharp')

**3\.GetDefinedActivities**

我們還需要一種方法來傳回所有已定義的活動。請注意，僅傳回由您定義的活動 (我們使用 `Forge Client Id` 作為暱稱，隨後將顯示為字首)。

[DesignAutomationController.cs](_snippets/modifymodels/netcore/DesignAutomationController.7.cs ':include :type=code csharp')

現在，您可以按一下 **Configure** (位於右上方)，選取 AppBundle，選取 Engine，然後按一下 **Define Activity**，這將會定義並上傳 Appbundle，然後定義活動。結果面板 (位於左側) 將展示相應的 ID。**所有其他按鈕尚未起作用**... 我們繼續前進。

![](_media/designautomation/define_activity.gif)

接下來：[執行工作項目](/zh-TW/designautomation/workitem/)