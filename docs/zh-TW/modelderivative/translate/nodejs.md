# 轉換模型 (Node.js)

若要模型轉檔，我們只需要一個 endpoint。

## routes/modelderivative.js

建立含有以下內容的 `routes/modelderivative.js` 檔案：

[routes/modelderivative.js](_snippets/viewmodels/node/routes/modelderivative.js ':include :type=code javascript')

**jobs** endpoint 會接收 **objectName**，然後送出[轉檔工作](https://forge.autodesk.com/en/docs/model-derivative/v2/reference/http/job-POST/)以萃取模型的 2D 與 3D 視圖。 

總而言之，此時您的 **NodeJS** 專案應如下所示：

![](_media/nodejs/vs_code_allfiles.png)

下一步：[在 Viewer 中展示](/zh-TW/viewer/2legged/)