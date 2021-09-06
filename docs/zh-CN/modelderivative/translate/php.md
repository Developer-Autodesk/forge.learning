# 转换模型 (PHP)

要转换文件，我们只需要一个端点。

## ModelDerivative.php

创建一个包含以下内容的 `/server/modelderivative.php` 文件：

[modelderivative.php](_snippets/viewmodels/php/modelderivative.php ':include :type=code php')

**jobs** 端点接收 **bucketKey** 和 **objectName**，然后发布[转换作业](https://forge.autodesk.com/en/docs/model-derivative/v2/reference/http/job-POST/)以提取模型的二维和三维视图。 

总之，此时您的 **PHP** 项目应如下所示：

![](_media/php/vs_code_allfiles.png)

下一步：[在 Viewer 上显示](/zh-CN/viewer/2legged/)