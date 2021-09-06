# 执行工作项

执行指定活动的作业，它使用指定的输入文件并生成相应的输出文件。

活动和工作项之间的关系可以分别视为“函数定义”和“函数调用”。活动指定要使用的应用程序包，而后者指定要使用的引擎。然后，将调用工作项来执行这些操作。

在本教程示例中，工作项指定输入文件 URL、具有新参数值的输入 JSON 数据以及输出文件的目标 URL。此示例将输入文件上传到 OSS 存储段，然后再启动工作项。

选择您的语言：[Node.js](/zh-CN/designautomation/workitem/nodejs) | [.NET Core](/zh-CN/designautomation/workitem/netcore)