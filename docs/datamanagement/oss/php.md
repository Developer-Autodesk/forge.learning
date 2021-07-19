# Upload file to OSS (PHP)

At this section we actually need 3 features:

1. Create buckets - Note: Technically your bucket name is required to be globally unique across the entire platform - to keep things simple with this tutorial your client ID will be prepended by default to your bucket name and in turn masked by the UI so you only have to make sure your bucket name is unique within your current Forge app.
2. List buckets & objects (files)
3. Upload objects (files)

## OSS.php

Create a `/server/oss.php` file with the following content:

[oss.php](_snippets/viewmodels/php/oss.php ':include :type=code php')

As we plan to support the [jsTree](https://www.jstree.com/), our **GET oss/buckets** needs to return handle the `id` querystring parameter and return buckets when `id=#` and objects for a given bucketKey passed as `id=bucketKey`. The upload endpoint still have problem to upload, will check that later.

Note how we reuse the `/server/oauth.php` file to call `.getTokenInternal()` on all functions.


Next: [Translate the file](modelderivative/translate/)