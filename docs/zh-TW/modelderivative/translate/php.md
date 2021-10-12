# 轉換模型 (PHP)

若要模型轉檔，我們只需要一個 endpoint。

## ModelDerivative.php

建立含有以下內容的 `/server/modelderivative.php` 檔案：

[modelderivative.php](_snippets/viewmodels/php/modelderivative.php ':include :type=code php')

**jobs** endpoint 會接收 **bucketKey** 和 **objectName**，然後送出[轉檔工作](https://forge.autodesk.com/en/docs/model-derivative/v2/reference/http/job-POST/)以萃取模型的 2D 與 3D 視圖。 

總而言之，此時您的 **PHP** 專案應為如下所示：

![](_media/php/vs_code_allfiles.png)

下一步：[在 Viewer 中展示](/zh-TW/viewer/2legged/)