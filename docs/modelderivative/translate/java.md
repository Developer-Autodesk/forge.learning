# Translate Model (JAVA)

To translate a file we just need one endpoint.

## modelderivative.java

Create a new Java Class named `/src/main/java/modelderivative.java` with the following content. 

[modelderivative.java](_snippets/viewmodels/java/modelderivative.java ':include :type=code java')

The **jobs** endpoint receives the **bucketKey** and **objectName** and post the [translation job](https://forge.autodesk.com/en/docs/model-derivative/v2/reference/http/job-POST/) to extract 2D & 3D views of the model. 
 
To summarize, at this point your **JAVA** project should be like:

![](_media/java/Eclipse_server_side.png)

Next: [Show on Viewer](viewer/2legged/)