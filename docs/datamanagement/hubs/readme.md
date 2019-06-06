# List hubs & projects (Data Management)

The [Data Management API](https://developer.autodesk.com/en/docs/data/v2/overview/) provides a unified and consistent way to access data across **Hubs** for BIM 360 Team, Fusion Team (formerly known as A360 Team), BIM 360 Docs and A360 Personal.

![](_media/datamanagement/entities_and_domains.png)

To navigate and access BIM 360 Team, Fusion Team, BIM 360 Docs, A360 Personal, and OSS data, you need to be familiar with the following terminology:

- `hubs`: a BIM 360 Team hub, Fusion Team hub, BIM 360 Docs account, or A360 Personal hub
- `projects`: a BIM 360 Team, Fusion Team, BIM 360 Docs, or A360 Personal project
- `folders`: a logical organization of items within a project
- `items`: one or more versions of files, such as dwg, pdf, or Fusion designs and drawings
- `versions`: a specific state of an item; analogous to a specific version of a file
- `buckets`: containers for objects with globally unique names
- `objects`: binary data identified by a URN or key, stored in a specific bucket

> Each **BIM 360 Docs** account will be one hub that the current user has access to. To identify these hubs, the `attribute.extension.type` should be **hubs:autodesk.bim360:Account**. Or check the `b.` prefix on the **id**. 

![](_media/datamanagement/hub_extension_types.png)

At this section, let's create an endpoint to returns list of **Hubs**, **Projects**, **Folders**, **Items** (files) and respective **Versions** (which can be viewed on Viewer).
 
Choose your language: [Node.js](datamanagement/hubs/nodejs) | [.NET Framework](datamanagement/hubs/net) | [.NET Core](datamanagement/hubs/netcore)
