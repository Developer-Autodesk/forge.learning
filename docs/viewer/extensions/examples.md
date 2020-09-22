# Examples

We have built self contained extensions for viewer, which are easily reusable, and can be found here:

- [GitHub Repo](https://github.com/Autodesk-Forge/forge-extensions)
- [Demo Link](https://forge-extensions.autodesk.io/)

Here are a few more examples of extensions based on this skeleton approach:

- [Change color](https://forge.autodesk.com/blog/happy-easter-setthemingcolor-model-material): add 3 toolbar buttons to change colors of selected elements on the model.

The extension can comunicate with server to implement more complex features, just like any other JavaScript code. The following samples demonstrate it:

**Node.js**

- [Share Viewer state](https://forge.autodesk.com/blog/share-viewer-state-websockets): uses websocket to share state between 2+ instances of the Viewer.

**.NET**

- [Custom properties](https://forge.autodesk.com/blog/custom-properties-viewer-net-lambda-dynamodb): stores custom properties on a database (AWS DynamoDB) and uses a .NET WebAPI code to serve via REST endpoints. 

Next: [Deployment](deployment/)