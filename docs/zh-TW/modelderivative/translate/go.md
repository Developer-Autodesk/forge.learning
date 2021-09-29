# 轉換模型 (Go)

若要轉換檔案，我們只需要一個 endpoint。

## modelderivative.go

建立含有以下內容的 `/server/modelderivative.go` 檔案：

[modelderivative.go](_snippets/viewmodels/go/modelderivative.go ':include :type=code go')

**jobs** endpoint 會接收 **bucketKey** 和 **objectName**，然後送出[轉檔工作](https://forge.autodesk.com/en/docs/model-derivative/v2/reference/http/job-POST/)以萃取模型的 2D 與 3D 視圖。 

總而言之，此時您的 **Go** 專案應為如下所示：

![](_media/go/vs_code_allfiles.png)

下一步：[在 Viewer 中展示](/zh-TW/viewer/2legged/)