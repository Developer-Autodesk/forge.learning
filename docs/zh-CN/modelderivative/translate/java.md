# 转换模型 (JAVA)

要转换文件，我们只需要一个 endpoint。

## modelderivative.java

创建一个名为 `/src/main/java/modelderivative.java` 的新 Java 类，其内容如下。 

[modelderivative.java](_snippets/viewmodels/java/modelderivative.java ':include :type=code java')

**jobs** endpoint 接收 **bucketKey** 和 **objectName**，然后发布[转换作业](https://forge.autodesk.com/en/docs/model-derivative/v2/reference/http/job-POST/)以提取模型的二维和三维视图。 
 
总之，此时您的 **JAVA** 项目应如下所示：

![](_media/java/Eclipse_server_side.png)

下一步：[在 Viewer 上显示](/zh-CN/viewer/2legged/)