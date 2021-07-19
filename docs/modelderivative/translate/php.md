# Translate Model (PHP)

To translate a file we just need one endpoint.

## ModelDerivative.php

Create a `/server/modelderivative.php` file with the following content:

[modelderivative.php](_snippets/viewmodels/php/modelderivative.php ':include :type=code php')

The **jobs** endpoint receives the **bucketKey** and **objectName** and post the [translation job](https://forge.autodesk.com/en/docs/model-derivative/v2/reference/http/job-POST/) to extract 2D & 3D views of the model. 

To summarize, at this point your **PHP** project should be like:

![](_media/php/vs_code_allfiles.png)

Next: [Show on Viewer](viewer/2legged/)