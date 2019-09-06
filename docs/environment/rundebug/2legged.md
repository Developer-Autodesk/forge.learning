# Running locally & Debugging

Now that your app is ready, it's time to run it. This is where we can test and check for possible errors (via debugging). And check for tips & tricks.

## Using the sample

The next section will show you how to run your app. When it opens in the browser, click on **New Bucket** to create your bucket (the name should be unique across all Forge accounts).

Right-click on the newly created bucket and choose **Upload file** (this triggers the OSS Upload process).

Here are a few sample files for testing: 
 - [AutoCAD (.dwg)](https://knowledge.autodesk.com/support/autocad/downloads/caas/downloads/content/autocad-sample-files.html)
 - [AutoCAD Mechanical (.dwg)](https://knowledge.autodesk.com/support/autocad-mechanical/downloads/caas/downloads/content/autocad-mechanical-2019-sample-files.html)
 - [Inventor (.ipt)](https://knowledge.autodesk.com/support/inventor/troubleshooting/caas/downloads/content/inventor-sample-files.html)
 - [Revit (.rvt)](https://knowledge.autodesk.com/support/revit-products/getting-started/caas/CloudHelp/cloudhelp/2019/ENU/Revit-GetStarted/files/GUID-61EF2F22-3A1F-4317-B925-1E85F138BE88-htm.html)


 Then expand the bucket tree node, right-click on the file, select **Translate** (This triggers the Model Derivative JOB). After a moment your file should be ready, click on the file again to show it in the Viewer.

![](_media/tutorials/run_sample_viewmodels.gif)

Ready? Let's run it!

Choose your language: [Node.js](environment/rundebug/nodejs) | [.NET Framework](environment/rundebug/net) | [.NET Core](environment/rundebug/netcore) | [Go](environment/rundebug/go) | [PHP](environment/rundebug/php) | [Java](environment/rundebug/java)