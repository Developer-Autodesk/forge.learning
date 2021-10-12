# 执行 Workitem

执行指定 Activity 的作业，它使用指定的输入文件并生成相应的输出文件。

Activity 和 Workitem 之间的关系可以分别视为“函数定义”和“函数调用”。Activity 指定要使用的 AppBundle，而后者指定要使用的引擎。然后，将调用 Workitem 来执行这些操作。

在本教程示例中，Workitem 指定输入文件 URL、具有新参数值的输入 JSON 数据以及输出文件的目标 URL。此示例将输入文件上传到 OSS bucket，然后再启动 Workitem。

选择您的语言：[Node.js](/zh-CN/designautomation/workitem/nodejs) | [.NET Core](/zh-CN/designautomation/workitem/netcore)