# Translate Model (Node.js)

To translate a file we just need one endpoint.

## routes/modelderivative.js

Create a `routes/modelderivative.js` file with the following content:

[routes/modelderivative.js](_snippets/viewmodels/node/routes/modelderivative.js ':include :type=code javascript')

The **jobs** endpoint receives the **objectName** and posts the [translation job](https://forge.autodesk.com/en/docs/model-derivative/v2/reference/http/job-POST/) to extract 2D & 3D views of the model. 

To summarize, at this point your **NodeJS** project should look like this:

![](_media/nodejs/vs_code_allfiles.png)

Next: [Show on Viewer](viewer/2legged/)