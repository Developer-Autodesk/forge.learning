# Upload file to OSS (.NET Core)

For this section we actually need 3 features:

1. Create buckets
2. List buckets & objects (files)
3. Upload objects (files)

## OSSController.cs

Under **Controllers** folder, create a class named **OSSController** in a class file with the same name (`OSSController.cs`) and add the following content:

[OSSController.cs](_snippets/viewmodels/netcore/OSSController.cs ':include :type=code csharp')

As we plan to support the [jsTree](https://www.jstree.com/), our **GetOSSAsync** needs a `id` as querystring parameter and returns buckets when `id=#` and objects for a given bucketKey passed in as `id=bucketKey` in the querystring. The **CreateBucket** expects a **bucketKey** parameter to create the bucket. Last but not least, the **UploadObject** receives the files from your browser, saves it under **/App_Data/** temporarily, then uploads to the respective bucket.

!> Upload a file from the client (browser) directly to Autodesk Forge is possible, but requires giving the client a **write-enabled** access token, which is **NOT SECURE**.

Next: [Translate the file](modelderivative/translate/)
