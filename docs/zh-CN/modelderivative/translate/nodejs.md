# 转换模型 (Node.js)

要转换文件，我们只需要一个端点。

## routes/modelderivative.js

创建一个包含以下内容的 `routes/modelderivative.js` 文件：

[routes/modelderivative.js](_snippets/viewmodels/node/routes/modelderivative.js ':include :type=code javascript')

**jobs** 端点接收 **objectName**，然后发布[转换作业](https://forge.autodesk.com/en/docs/model-derivative/v2/reference/http/job-POST/)以提取模型的二维和三维视图。 

总之，此时您的 **NodeJS** 项目应如下所示：

![](_media/nodejs/vs_code_allfiles.png)

下一步：[在 Viewer 上显示](/zh-CN/viewer/2legged/)