# 在本地运行和调试

现在，您的应用程序已准备就绪，是时候运行它了。此时，我们可以测试并检查可能存在的错误（通过调试）。

## 使用示例

单击右上角的 **Configure** 以定义 AppBundle 和 Activity。只需执行一次。在左侧面板上指定新的 `width` 和 `height`，选择 `input file`，然后单击 `Start workitem`。右侧面板应显示结果。

您可以[在此处查找示例文件](https://github.com/Developer-Autodesk/learn.forge.designautomation/tree/master/sample%20files)。

!> 如果插件代码发生变化，则需要上传新的 AppBundle 并更新版本（例如，从 v1 更新到 v2）。每次上传新的 AppBundle 时，此示例都将创建新版本。

> 输入和输出文件都保存在 OSS bucket 中，您可以参考[查看模型](/zh-CN/tutorials/viewmodels)教程来查看它们。

![](_media/tutorials/run_sample_modifymodels.gif)

## 疑难解答

**1. 结果面板未显示完整信息**

确保 **ngrok** 正在运行且未过期。确保在环境变量中正确指定了 ngrok 地址。

**2. 执行 Workitem 后，结果不符合预期**

请考虑使用 **Clear Account** 按钮。这将删除您帐户中的所有 AppBundle 和 Activity。然后再次定义它们。

**3. 在配置表单中看不到我的 AppBundle**

构建相应的插件后，ZIP 包将复制到 `wwwroot/bundles`。确保已正确定义 `Post-build` 事件并在构建后执行此事件。

**4. 确保上传了正确的 DLL**

要确保已将正确的 DLL 上传到 Design Automation，一个简单的技巧是检查其日期。[此 StackOverflow 解答](https://stackoverflow.com/a/1600990)介绍了如何获取链接器日期（即 DLL 编译时间），获取后您就可以在代码开头显示它。请注意，日期是服务器时区的日期。

> 插件以 `C#` 编写，与服务器语言无关。
 
```csharp
LogTrace("DLL {0} compiled on {1}",
    System.IO.Path.GetFileName(System.Reflection.Assembly.GetExecutingAssembly().Location),
    GetLinkerTime(System.Reflection.Assembly.GetExecutingAssembly()));
```

已准备就绪？下面来运行它！

选择您的语言：[Node.js](/zh-CN/environment/rundebug/nodejs_da) | [.NET Core](/zh-CN/environment/rundebug/netcore)