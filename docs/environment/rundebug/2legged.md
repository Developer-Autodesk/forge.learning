# Running locally & Debugging

Now that your app is ready, it's time to run it. This is where we can test and check for possible errors (via debugging). And check for tips & tricks.

## Using the sample

The next section will show you how to run your app. When it opens in the browser, click on **New Bucket** to create your bucket (the name should be unique across all Forge accounts).

Right-click on the newly created bucket and choose **Upload file** (this triggers the OSS Upload process).

To upload .rvt file in a bucket, first we need to download one. Use the below link to download sample RVT, DWG, IPT files. 

[Click here to download](https://myshare.autodesk.com/personal/varun_devrao_patil_autodesk_com/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fvarun%5Fdevrao%5Fpatil%5Fautodesk%5Fcom%2FDocuments%2Fmodels%2Ezip&parent=%2Fpersonal%2Fvarun%5Fdevrao%5Fpatil%5Fautodesk%5Fcom%2FDocuments&cid=9f5caaa3-45f0-4f77-a98a-8c54fcecd4d8)

 Then expand the bucket tree node, right-click on the file, select **Translate** (This triggers the Model Derivative JOB). After a moment your file should be ready, click on the file again to show it in the Viewer.

![](_media/tutorials/run_sample_viewmodels.gif)

Ready? Let's run it!

Choose your language: [Node.js](environment/rundebug/nodejs) | [.NET Framework](environment/rundebug/net) | [.NET Core](environment/rundebug/netcore) | [Go](environment/rundebug/go) | [PHP](environment/rundebug/php) | [Java](environment/rundebug/java)