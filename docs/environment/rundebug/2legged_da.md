# Running locally & Debugging

Now that your app is ready, it's time to run it. This is where we can test and check for possible errors (via debugging).

## Using the sample

At the top-roght, click on **Configure** to define AppBundle & Activity. This only need to be done once. Specify the new `width` and `height` on the left panel, select the `input file` and click on `Start workitem`. The right panel should show the results.

You can find [sample files here](https://github.com/Developer-Autodesk/learn.forge.designautomation/tree/master/sample%20files).

!> If the plugin code changes, then you need to upload a new AppBundle and increase the version (e.g. v1 to v2). This sample will create a new version every time a new AppBundle is uploaded.

> Both input and output files are saved in OSS Buckets, you can use [View Models](tutorials/viewmodels) tutorial to view them.

![](_media/tutorials/run_sample_modifymodels.gif)

## Troubleshooting

**1. The results panel doesn't show the entire information**

Make sure the **ngrok** is running and have not expired. Make sure the ngrok address is correctly specified at the environment variable.

**2. Workitem execute, but result is not as expected**

Consider use the **Clear Account** button. This removes all AppBundles & Activities on your account. Then define them again.

**3. Cannot see my AppBundle at the Configuration form**

The ZIP bundles are copied to the `wwwroot/bundles` after you Build the respective plugin. Make sure the `Post-build` event is properly defined and executed after build.

**4. Ensuring the correct DLL was uploaded**

A easy trick to ensure the correct DLL was uploaded to Design Automation is to check it's date. [This StackOverflow answer](https://stackoverflow.com/a/1600990) shows how to get the Linker Date (i.e. when the DLL was compiled), with that you can show it on the begining of your code. Note the dates are on the server timezone.

> Plugin is written in `C#` irrespective of server language.
 
```csharp
LogTrace("DLL {0} compiled on {1}",
    System.IO.Path.GetFileName(System.Reflection.Assembly.GetExecutingAssembly().Location),
    GetLinkerTime(System.Reflection.Assembly.GetExecutingAssembly()));
```

Ready? Let's run it!

Choose your language: [Node.js](environment/rundebug/nodejs_da) | [.NET Core](environment/rundebug/netcore)