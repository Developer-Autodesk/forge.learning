# Data Management (OSS)

In Forge OSS (Object Storage Service), files are stored as objects in buckets. Apart from giving your app the ability to download data from the broader Forge ecosystem, it also provides the functionality to manage your app’s own buckets and objects (including creation, listing, deleting, uploading, and downloading).

Each bucket also has a [retention policy](https://developer.autodesk.com/en/docs/data/v2/overview/retention-policy/) that determines object retention time:

 - **transient**: Cache-like storage that persists for only 24 hours, ideal for ephemeral objects. **For this tutorial, let's use this policy**.
 - **temporary**: Storage that persists for 30 days.
 - **persistent**: Storage that persists until it’s deleted.

In this section, let's create a few endpoints to create buckets, upload files, and list buckets & objects.

> This tutorial code will prefix the bucket key with your Forge Client ID transparently, which should avoid duplicated names.

!> Note that bucket keys must be of the form [-_.a-z0-9]{3,128}
 
Choose your language: [Node.js](datamanagement/oss/nodejs) | [.NET Framework](datamanagement/oss/net) | [.NET Core](datamanagement/oss/netcore) | [Go](datamanagement/oss/go) | [PHP](datamanagement/oss/php) | [Java](datamanagement/oss/java)

