# 执行工作项 (.NET Core)

应将以下方法添加到 `DesignAutomationController` 类。

**1. StartWorkitem**

这是我们真正启动 Design Automation 的地方。`StartWorkitemInput` 只是一个数据结构。此方法还会将输入文件上传到 OSS 存储段，并定义输出应保存在同一存储段中。为了帮助您识别文件，输入和输出使用相同的原始文件名，但带有后缀（`input` 或 `output`）并加上时间戳。

[DesignAutomationController.cs](_snippets/modifymodels/netcore/DesignAutomationController.8.cs ':include :type=code csharp')

> 请注意 `StartWorkitemInput` 类在 **DesignAutomationController** **内**是如何定义的，这是正确的示例，它用作 `StartWorkitem` 方法的输入参数。

**2. OnCallback**

工作项完成后，Design Automation 将回调我们的应用程序（使用 ngrok 转发 URL）。此函数将处理该回调并将通知推送给客户端（使用 SignalR Hub）。

[DesignAutomationController.cs](_snippets/modifymodels/netcore/DesignAutomationController.9.cs ':include :type=code csharp')

**3. ClearAccount**

最后但同样重要的是，为了帮助您进行测试，此函数会从您的帐户中删除所有应用程序包和活动。 

[DesignAutomationController.cs](_snippets/modifymodels/netcore/DesignAutomationController.10.cs ':include :type=code csharp')

一切就绪！

下一步：[运行和调试](/zh-CN/environment/rundebug/2legged_da)