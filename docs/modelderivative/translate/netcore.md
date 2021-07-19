# Translate the model (.NET Core)

To translate a file we just need one endpoint.

## ModelDerivativeController.cs

Under **Controllers** folder, create a class/file named **ModelDerivativeController** and add the following content:

[ModelDerivativeController.cs](_snippets/viewmodels/netcore/ModelDerivativeController.cs ':include :type=code csharp')

The **TranslateObject** receives the **bucketKey** and **objectName** and post the [translation job](https://forge.autodesk.com/en/docs/model-derivative/v2/reference/http/job-POST/) to extract 2D & 3D views of the model. 

Next: [Show on Viewer](viewer/2legged/)
