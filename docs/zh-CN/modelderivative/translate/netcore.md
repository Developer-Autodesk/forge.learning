# 转换模型 (.NET Core)

要转换文件，我们只需要一个端点。

## ModelDerivativeController.cs

在 **Controllers** 文件夹下，创建一个名为 **ModelDerivativeController** 的类/文件，并添加以下内容：

[ModelDerivativeController.cs](_snippets/viewmodels/netcore/ModelDerivativeController.cs ':include :type=code csharp')

**TranslateObject** 接收 **bucketKey** 和 **objectName**，然后发布[转换作业](https://forge.autodesk.com/en/docs/model-derivative/v2/reference/http/job-POST/)以提取模型的二维和三维视图。 

下一步：[在 Viewer 上显示](/zh-CN/viewer/2legged/)
