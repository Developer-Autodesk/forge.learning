# 轉換模型 (Node.js)

若要轉換檔案，我們只需要一個端點。

## routes/modelderivative.js

建立含有以下內容的 `routes/modelderivative.js` 檔案：

[routes/modelderivative.js](_snippets/viewmodels/node/routes/modelderivative.js ':include :type=code javascript')

**jobs** 端點會接收 **objectName**，然後發佈[轉換工作](https://forge.autodesk.com/en/docs/model-derivative/v2/reference/http/job-POST/)以萃取模型的 2D 與 3D 視圖。 

總而言之，此時您的 **NodeJS** 專案應如下所示：

![](_media/nodejs/vs_code_allfiles.png)

接下來：[在 Viewer 中展示](/zh-TW/viewer/2legged/)