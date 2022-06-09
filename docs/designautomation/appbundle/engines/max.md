# Prepare a 3ds Max bundle

This step will help you create a basic 3ds Max plugin for Design Automation. The entire tutorial uses the Microsoft .NET framework, including the plugin for 3ds Max. Note that 3ds Max can be automated by MAXScript, Python, NET API, and C++. The 3ds Max .NET API is probably not the most used for plugins, however, for other Design Automatiuon products it is the typical API. 3ds Max resources for .NET API can be found here (2019 links, but .NET API is supported for all available versions of the 3ds Max Design Automation engines):
* [Writing 3ds Max .NET plugins](http://help.autodesk.com/view/3DSMAX/2019/ENU/?guid=__developer_3ds_max_sdk___the_learning_path_lesson_7_writing__net_plug_ins_html)
* [The 3ds Max .NET SDK](http://help.autodesk.com/view/3DSMAX/2019/ENU/?guid=__developer_3ds_max__net_sdk_html)
* [GetCOREInterface Blog .NET Samples](https://getcoreinterface.typepad.com/blog/2017/10/updated-net-api-samples-for-3ds-max-2018.html)

Remember that for Design Automation, there should be no UI or prompts that cannot be automated. To automate the 3ds Max DA engine, you must provide some MAXScript. This is usually very easy as most customization can be exposed quickly to MAXScript (see [function publishing for C++](http://help.autodesk.com/view/3DSMAX/2019/ENU/?guid=__developer_3ds_max_sdk_features_function_publishing_html) and [MAXScript .NET handling](http://help.autodesk.com/view/3DSMAX/2019/ENU/?guid=GUID-779FD7AC-953D-4567-B2A8-60B1D8695B95))

> You may [download the Bundle ZIP](https://github.com/Autodesk-Forge/learn.forge.designautomation/raw/master/forgesample/wwwroot/bundles/UpdateMAXParam.zip) into the `bundles/` (Node.js) or `/forgeSample/wwwroot/bundles` (.NET Core) folder and [skip this section](designautomation/appbundle/common.md)

## Create a new .NET project

Right-click on the solution, the **Add** >> **New Project**. Select **Windows Desktop**, then **Class Library** and, finally, name it `UpdateMAXParam`. You will then need to reference the Autodesk.Max.Dll managed assembly (3ds Max .NET API core module). This module is found in the 3dsmax.exe folder and when referencing, make sure to turn off the "Copy Local" flag. There are a few other modules used for .NET API support (see [The 3ds Max .NET SDK](http://help.autodesk.com/view/3DSMAX/2019/ENU/?guid=__developer_3ds_max__net_sdk_html)), but for this tutorial we will use only Autodesk.Max.dll. Then search and install `Newtonsoft.Json` (which is used to parse input data in JSON format).

> Please select .NET Framework 4.7. If not listed, [please install the Dev Pack](https://dotnet.microsoft.com/download/dotnet-framework/net47).

![](_media/designautomation/max/new_project.gif)

As a result, the **package.config** should look like the following for the Newtonsoft.Json module.

[package.config](_snippets/modifymodels/engines/max/package.config ':include :type=code xml')

The project should contain a `Class1.cs` class, let's rename the file to `Command.cs` (for consistency). 

## Commands.cs

This is the main code that will run with 3ds Max. Copy the following content into `Command.cs`. There are three classes to handle the Design Automation porcessing. First is the `InputParams` that will be used to interface with the JSON input data. Next is `ParameterChanger` class that is used to iterate the scene, and find all Casement Windows (but could be any object types as identified by the class ids). Finally the `RuntimeExecute` is used to take the input and drive the automation. Also note there is a specialized logging that will output information to the Design Automation console. See the LogTrace function. Note that the `ILogSys` 3ds Max managed class is used for this, and the flags used with the `LogEntry` API indicated are necessary for the output to show in the Design Automation console. 

[Commands.cs](_snippets/modifymodels/engines/max/Commands.cs ':include :type=code csharp')

## PackageContents.xml

Create a folder named `UpdateMAXParam.bundle` and inside this folder add a file named `PackageContents.xml`. Copy the content listed below in the XML section into the PackageContents.xml file. Learn more at the [PackageContents.xml Format Reference](http://docs.autodesk.com/ACD/2014/ENU/index.html?url=files/GUID-BC76355D-682B-46ED-B9B7-66C95EEF2BD0.htm,topicNumber=d30e484183). For more 3ds Max specific information for packaging your 3ds Max plugins see here [Packaging Plugins](http://help.autodesk.com/view/3DSMAX/2019/ENU/?guid=__developer_writing_plug_ins_packaging_plugins_html)

This file will tell 3ds Max the modules to load (in this case the .NET API plugin assembly we are creating, but can also include MAXScripts, Python, and/or C++ plugins.) Because the plugin is being loaded through this feature, you only need to worry about the instructions to trigger your automation job. Please note that a unique ID for both ProductCode and UpgradeCode are required for 3ds Max to correctly load your code. See above mentioned documentation for details.

[PackageContents.xml](_snippets/modifymodels/engines/max/PackageContents.xml ':include :type=code xml')

Finally, create a subfolder named `Contents` and leave it empty. At this point, the project should look like:

![](_media/designautomation/max/bundle_folders.png)

## Post-build event

> For Node.js it is required to adjust the AppBundle ZIP output folder.

Now we need to ZIP the .bundle folder. Right-click on the project, select **Properties**, then open **Build Events** and copy the following into **Post-build event command line** field, as shown on the image below.

```
xcopy /Y /F "$(TargetDir)*.dll" "$(ProjectDir)UpdateMAXParam.bundle\Contents\"
del /F "$(ProjectDir)..\forgesample\wwwroot\bundles\UpdateMAXParam.zip"
"C:\Program Files\7-Zip\7z.exe" a -tzip "$(ProjectDir)../forgesample/wwwroot/bundles/UpdateMAXParam.zip" "$(ProjectDir)UpdateMAXParam.bundle\" -xr0!*.pdb
```

This will copy the DLL from /bin/debug/ into .bundle/Contents folder, then use [7zip](https://www.7-zip.org/) to create a zip, then finally copy the ZIP into /bundles folders of the webapp.

![](_media/designautomation/max/post_build.png)
> Note how the **Post-build event** uses the project and folder names, so make sure you're using these names.

If you build the `UpdateMAXParam` project now you should see something like below in the **Output** window. Note that 2 folders and 3 files zipped. The zip file is created directly at the /wwwroot/bundles folder. This means you're doing great!

![](_media/designautomation/max/build_output.png)

At this point, you could test the functionality using the 3ds Max batch tool. It works similarly to the 3ds Max Design Automation engine and is a good way to test all your automation locally before sending the job to the Forge DA cloud services. For .NET Classes to be instantiated in MAXScript environment, we can use the `dotNetClass` MAXScript function. For this sample project, the MAXScript code would look like this:

```MAXScript
fn UpdateParam =
(
	da = dotNetClass("Autodesk.Forge.Sample.DesignAutomation.Max.RuntimeExecute")
	da.ModifyWindowWidthHeight()
)

UpdateParam()
```

To execute this locally, we could do test a a command-line prompt with something like this:
```CommandLine
"%ADSK_3DSMAX_x64_2019%\3dsmaxbatch.exe" -sceneFile <myTestScene>.max da_script.ms
```
Later in this tutorial you will see these same instructions being sent to the 3ds Max Design Automation engine.

Next: [Upload the plugin](designautomation/appbundle/common)