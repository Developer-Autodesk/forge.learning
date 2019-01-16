# Running locally & Debugging

Now that your app is ready, it's time to run it. This is where we can test and check for possible errors (via debugging).

## Using the sample

At the top-roght, click on **Configure** to define AppBundle & Activity. This only need to be done once. Specify the new `width` and `height` on the left panel, select the `input file` and click on `Start workitem`. The right panel should show the results.

!> If the plugin code changes, then you need to redefine the AppBundle. This sample will create a new version every time a new AppBundle is uploaded.

![](_media/tutorials/run_sample_modifymodels.gif)

## Troubleshooting

**1. The results panel doesn't show the entire information**

Make sure the **ngrok** is running and have not expired. Make sure the ngrok address is correctly specified at the environment variable.

**2. Workitem execute, but result is not as expected**

Consider use the **Clear Account** button. This removes all AppBundles & Activities on your account. Then define them again.

**3. Cannot see my AppBundle at the Configuration form**

The ZIP bundles are copied to the `webapp/wwwroot/bundles` after you Build the respective plugin. Make sure the `Post-build` event is properly defined and executed after build.

Ready? Let's run it!

Choose your language: [.NET Core](environment/rundebug/netcore)