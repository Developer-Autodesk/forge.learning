# 转换模型 (.NET Framework)

要转换文件，我们只需要一个端点。

## ModelDerivativeController.cs

创建一个名为 **ModelDerivativeController** 的 .NET WebAPI 控制器（请参见[如何创建控制器](/zh-CN/environment/setup/net_controller)），并添加以下内容：

[ModelDerivativeController.cs](_snippets/viewmodels/net/ModelDerivativeController.cs ':include :type=code csharp')

**TranslateObject** 接收 **bucketKey** 和 **objectName**，然后发布[转换作业](https://forge.autodesk.com/en/docs/model-derivative/v2/reference/http/job-POST/)以提取模型的二维和三维视图。 

下一步：[在 Viewer 上显示](/zh-CN/viewer/2legged/)