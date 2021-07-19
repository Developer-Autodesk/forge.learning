# Upload file to OSS (Go)

At this section we actually need 3 features:

1. Create buckets
2. List buckets & objects (files)
3. Upload objects (files)

We will structure this in 2 files:

## oss.go

Create a `/server/oss.go` file, which will take care of first 2 features and should have the following content:

[oss.go](_snippets/viewmodels/go/oss.go ':include :type=code go')

As we plan to suppor the [jsTree](https://www.jstree.com/) on the frontend. Thus, our **GET oss/buckets** need to return handle the `id` querystring parameter and return buckets when `id=#` and objects for a given bucketKey passed as `id=bucketKey`.


## uploader.go

Create a `/server/uploader.go` file with the following content:

[uploader.go](_snippets/viewmodels/go/uploader.go ':include :type=code go')

!> Upload a file from the client (browser) directly to Autodesk Forge is possible, but requires giving the client a **write-enabled** access token, which is **NOT SECURE**.

Next: [Translate the file](modelderivative/translate/)