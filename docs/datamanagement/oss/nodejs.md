# Upload file to OSS (Node.js)

In this section we need 3 features:

1. Creating buckets
2. Listing buckets & objects (files)
3. Uploading objects (files)

## routes/oss.js

Create a `routes/oss.js` file with the following content:

[routes/oss.js](_snippets/viewmodels/node/routes/oss.js ':include :type=code javascript')

Since we plan to support [jsTree](https://www.jstree.com/), our **GET /api/forge/oss/buckets** endpoint needs to handle the `id` querystring parameter, returning all buckets when `id` is set to `#`, or returning all objects in a given bucketKey passed as `id=bucketKey`. The upload endpoint uses the [multer](https://github.com/expressjs/multer) module to handle file upload. It saves the file on our server (e.g. in **/uploads/** folder) so we can later upload it to Forge.

Note how we reuse the authentication helpers from `routes/common/oauth.js` as a middleware of this router.

!> Uploading a file from the client (browser) directly to Autodesk Forge is possible, but requires giving the client a **write-enabled** access token, which is **NOT SECURE**.

Next: [Translate the file](modelderivative/translate/)