# 轉換模型 (.NET Framework)

若要轉換檔案，我們只需要一個端點。

## ModelDerivativeController.cs

建立名為 **ModelDerivativeController** 的 .NET WebAPI 控制器 (請參閱[如何建立控制器](/zh-TW/environment/setup/net_controller))，然後加入以下內容：

[ModelDerivativeController.cs](_snippets/viewmodels/net/ModelDerivativeController.cs ':include :type=code csharp')

**TranslateObject** 端點會接收 **bucketKey** 和 **objectName**，然後發佈[轉換工作](https://forge.autodesk.com/en/docs/model-derivative/v2/reference/http/job-POST/)以萃取模型的 2D 與 3D 視圖。 

接下來：[在 Viewer 中展示](/zh-TW/viewer/2legged/)