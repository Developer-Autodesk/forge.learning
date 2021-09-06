# 转换文件

通过 Model Derivative API，用户能够以不同格式表示和共享他们的设计，同时提取有价值的元数据。

![](/_media/forge/md_diagram.png)

不确定您的文件是否兼容？查看[支持的转换](https://forge.autodesk.com/en/docs/model-derivative/v2/developers_guide/supported-translations/)。

在本部分中，我们调用 [POST 作业](https://forge.autodesk.com/en/docs/model-derivative/v2/reference/http/job-POST/)来启动转换过程。请注意，此端点是异步的，可启动在后台运行的进程，而不是保持打开的 HTTP 连接直到完成。

选择您的语言：[Node.js](/zh-CN/modelderivative/translate/nodejs) | [.NET Framework](/zh-CN/modelderivative/translate/net) | [.NET Core](/zh-CN/modelderivative/translate/netcore) | [Go](/zh-CN/modelderivative/translate/go) | [PHP](/zh-CN/modelderivative/translate/php) | [Java](/zh-CN/modelderivative/translate/java)

