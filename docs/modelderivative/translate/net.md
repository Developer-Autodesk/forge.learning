# Translate the model (.NET Framework)

To translate a file we just need one endpoint.

## ModelDerivativeController.cs

Create a .NET WebAPI Controller named **ModelDerivativeController** (see [how to create a controller](environment/setup/net_controller)) and add the following content:

[ModelDerivativeController.cs](_snippets/viewmodels/net/ModelDerivativeController.cs ':include :type=code csharp')

The **TranslateObject** receives the **bucketKey** and **objectName** and post the [translation job](https://forge.autodesk.com/en/docs/model-derivative/v2/reference/http/job-POST/) to extract 2D & 3D views of the model. 

Next: [Show on Viewer](viewer/2legged/)