# Upload file to OSS (JAVA)

At this section we actually need 3 features:

1. Create buckets
2. List buckets & objects (files)
3. Upload objects (files)

## oss.java

Create a new Java Class named `/src/main/java/oss.java` with the following content. This file handles creating and listing buckets.

[oss.java](_snippets/viewmodels/java/oss.java ':include :type=code java')

As we plan to suppor the [jsTree](https://www.jstree.com/) library, our **GET oss/buckets** need to return handle the `id` querystring parameter and return buckets when `id=#` and objects for a given bucketKey passed as `id=bucketKey`.

## ossuploads.java

Create a `/src/main/ossuploads.java` file with the following content. This file handles uploading file. The workflow gets the file stream and uploads to Forge.

[ossuploads.java](_snippets/viewmodels/java/ossuploads.java ':include :type=code java')

Note how we reuse the `/src/main/java/oauth.java` file to call `.getTokenInternal()` on all functions. 

!> Upload a file from the client (browser) directly to Autodesk Forge is possible, but requires giving the client a **write-enabled** access token, which is **NOT SECURE**.

Next: [Translate the file](modelderivative/translate/)