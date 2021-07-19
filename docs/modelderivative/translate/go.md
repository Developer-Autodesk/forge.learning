# Translate Model (Go)

To translate a file we just need one endpoint.

## modelderivative.go

Create a `/server/modelderivative.go` file with the following content:

[modelderivative.go](_snippets/viewmodels/go/modelderivative.go ':include :type=code go')

The **jobs** endpoint receives the **bucketKey** and **objectName** and post the [translation job](https://forge.autodesk.com/en/docs/model-derivative/v2/reference/http/job-POST/) to extract 2D & 3D views of the model. 

To summarize, at this point your **Go** project should be like:

![](_media/go/vs_code_allfiles.png)

Next: [Show on Viewer](viewer/2legged/)