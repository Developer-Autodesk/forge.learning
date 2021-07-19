# Upload file to OSS (.NET Framework)

At this section we actually need 3 features:

1. Create buckets
2. List buckets & objects (files)
3. Upload objects (files)

## OSSController.cs

Create a .NET WebAPI Controller named **OSSController** (see [how to create a controller](environment/setup/net_controller)) and add the following content:

[OSSController.cs](_snippets/viewmodels/net/OSSController.cs ':include :type=code csharp')

As we plan to suppor the [jsTree](https://www.jstree.com/), our **GetOSSAsync** need to return handle the `id` querystring parameter and return buckets when `id=#` and objects for a given bucketKey passed as `id=bucketKey`. The **CreateBucket** expects a **bucketKey** parameter to create the bucket. Last, but not least, the **UploadObject** receives the files from the client (browser), save it on **/App_Data/** temporaly, then upload to the respective bucket.

!> Upload a file from the client (browser) directly to Autodesk Forge is possible, but requires giving the client a **write-enabled** access token, which is **NOT SECURE**.

Next: [Translate the file](modelderivative/translate/)