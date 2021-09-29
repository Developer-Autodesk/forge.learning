# 轉換模型 (JAVA)

若要模型轉檔，我們只需要一個 endpoint。

## modelderivative.java

建立含有以下內容名為 `/src/main/java/modelderivative.java` 的新 Java 類別。 

[modelderivative.java](_snippets/viewmodels/java/modelderivative.java ':include :type=code java')

**jobs** endpoint 會接收 **bucketKey** 和 **objectName**，然後送出[轉檔工作](https://forge.autodesk.com/en/docs/model-derivative/v2/reference/http/job-POST/)以萃取模型的 2D 與 3D 視圖。 
 
總而言之，此時您的 **JAVA** 專案應如下所示：

![](_media/java/Eclipse_server_side.png)

下一步：[在 Viewer 中展示](/zh-TW/viewer/2legged/)