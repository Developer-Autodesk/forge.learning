# 轉換模型 (.NET Core)

若要模型轉檔，我們只需要一個 endpoint。

## ModelDerivativeController.cs

在 **Controllers** 資料夾下，建立名為 **ModelDerivativeController** 的類別/檔案，然後加入以下內容：

[ModelDerivativeController.cs](_snippets/viewmodels/netcore/ModelDerivativeController.cs ':include :type=code csharp')

**TranslateObject** 會接收 **bucketKey** 和 **objectName**，然後送出[轉檔工作](https://forge.autodesk.com/en/docs/model-derivative/v2/reference/http/job-POST/)以萃取模型的 2D 與 3D 視圖。 

下一步：[在 Viewer 中展示](/zh-TW/viewer/2legged/)
