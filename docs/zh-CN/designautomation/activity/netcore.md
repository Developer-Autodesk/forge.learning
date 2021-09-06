# 定义活动 (.NET Core)

应将以下方法添加到 `DesignAutomationController` 类。

**1. EngineAttributes**

要定义活动，我们需要可执行文件和默认文件扩展名。由以下辅助对象函数提供（来自引擎名称）。 

[DesignAutomationController.cs](_snippets/modifymodels/netcore/DesignAutomationController.5.cs ':include :type=code csharp')

**2. CreateActivity**

使用输入文件、输入数据 (JSON) 和输出文件定义新活动。

[DesignAutomationController.cs](_snippets/modifymodels/netcore/DesignAutomationController.6.cs ':include :type=code csharp')

**3. GetDefinedActivities**

我们还需要一种方法来返回所有定义的活动。请注意，仅返回您定义的活动（我们使用 `Forge Client Id` 作为昵称，它将显示为前缀）。

[DesignAutomationController.cs](_snippets/modifymodels/netcore/DesignAutomationController.7.cs ':include :type=code csharp')

现在，您可以单击右上角的 **Configure**，选择“AppBundle”和“Engine”，然后单击 **Define Activity**，这应该会定义并上传应用程序包并定义活动。左侧的结果面板显示各自的 ID。**所有其他按钮仍不起作用**... 我们继续。

![](_media/designautomation/define_activity.gif)

下一步：[执行工作项](/zh-CN/designautomation/workitem/)