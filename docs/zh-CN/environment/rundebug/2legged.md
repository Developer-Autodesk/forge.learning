# 在本地运行和调试

现在，您的应用程序已准备就绪，是时候运行它了。此时，我们可以测试并检查可能存在的错误（通过调试）。另外，您还可以查看提示和技巧。

## 使用示例

下一部分将介绍如何运行应用程序。在浏览器中打开它后，单击 **New Bucket** 以创建 bucket（名称在所有 Forge 帐户中应该是唯一的）。

在新创建的 bucket 上单击鼠标右键，然后选择 **Upload file**（这将触发 OSS 上传过程）。

下面是一些用于测试的示例文件： - [AutoCAD (.dwg)](https://knowledge.autodesk.com/support/autocad/downloads/caas/downloads/content/autocad-sample-files.html) - [AutoCAD Mechanical (.dwg)](https://knowledge.autodesk.com/support/autocad-mechanical/downloads/caas/downloads/content/autocad-mechanical-2019-sample-files.html) - [Inventor (.ipt)](https://knowledge.autodesk.com/support/inventor/troubleshooting/caas/downloads/content/inventor-sample-files.html) - [Revit (.rvt)](https://knowledge.autodesk.com/support/revit-products/getting-started/caas/CloudHelp/cloudhelp/2019/ENU/Revit-GetStarted/files/GUID-61EF2F22-3A1F-4317-B925-1E85F138BE88-htm.html)


 然后展开 bucket 树节点，在文件上单击鼠标右键，选择 **Translate**（这将触发 Model Derivative 作业）。不久，您的文件就应准备就绪，再次单击该文件以在 Viewer 中显示它。

![](_media/tutorials/run_sample_viewmodels.gif)

已准备就绪？下面来运行它！

选择您的语言：[Node.js](/zh-CN/environment/rundebug/nodejs) | [.NET Framework](/zh-CN/environment/rundebug/net) | [.NET Core](/zh-CN/environment/rundebug/netcore) | [Go](/zh-CN/environment/rundebug/go) | [PHP](/zh-CN/environment/rundebug/php) | [Java](/zh-CN/environment/rundebug/java)