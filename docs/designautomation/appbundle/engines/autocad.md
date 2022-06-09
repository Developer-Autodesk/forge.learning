# Prepare an AutoCAD bundle

This step will help you create a basic AutoCAD plugin for Design Automation. For more information, please visit [My First AutoCAD Plugin](https://knowledge.autodesk.com/support/autocad/learn-explore/caas/simplecontent/content/my-first-autocad-plug-overview.html) tutorial.

> You may [download the Bundle ZIP](https://github.com/Autodesk-Forge/learn.forge.designautomation/raw/master/forgesample/wwwroot/bundles/UpdateDWGParam.zip) into the `bundles/` (Node.js) or `/forgeSample/wwwroot/bundles` (.NET Core) folder and [skip this section](designautomation/appbundle/common.md)

## Create a new project

Right-click on the solution, the **Add** >> **New Project**. Select **Windows Desktop**, then **Class Library** and, finally, name it `UpdateDWGParam`. Then right-click on the project, go to **Manage NuGet Packages...**, under **Browser** you can search for **AutoCAD.NET** and install `AutoCAD.NET.Core` (which also installs `AutoCAD.NET.Model`). Then search and install `Newtonsoft.Json` (which is used to parse input data in JSON format).

> Please select .NET Framework 4.7. If not listed, [please install the Dev Pack](https://dotnet.microsoft.com/download/dotnet-framework/net47).

![](_media/designautomation/autocad/new_project.gif)

As a result, the **package.config** should look like the following. This sample uses version 20, which should work on all available versions. You may adjust to a specific version. 

[package.config](_snippets/modifymodels/engines/autocad/package.config ':include :type=code xml')

The project should contain a `Class1.cs` class, let's rename the file to `Commands.cs` (for consistency). 

## Commands.cs

This is the main code that will run with AutoCAD. Copy the following content into `Commands.cs`. The class contains one custom AutoCAD command, `UpdateParam`, defined as a method with the same name. This command is called by Design Automation engine, as will be specified on the **Activity** (next step of this tutorial)

[Commands.cs](_snippets/modifymodels/engines/autocad/Commands.cs ':include :type=code csharp')

## PackageContents.xml

Create a folder named `UpdateDWGParam.bundle` and, inside, a file named `PackageContents.xml`, then copy the following content to it. Learn more at the [PackageContents.xml Format Reference](http://docs.autodesk.com/ACD/2014/ENU/index.html?url=files/GUID-BC76355D-682B-46ED-B9B7-66C95EEF2BD0.htm,topicNumber=d30e484183). This file defines the new AutoCAD custom command `UpdateParam` that will be called when Design Automation executes.

[PackageContents.xml](_snippets/modifymodels/engines/autocad/PackageContents.xml ':include :type=code xml')

Finally, create a subfolder named `Contents` and leave it empty. At this point, the project should look like:

![](_media/designautomation/autocad/bundle_folders.png)

## Post-build event

> For Node.js it is required to adjust the AppBundle ZIP output folder.

Now we need to ZIP the .bundle folder. Right-click on the project, select **Properties**, then open **Build Events** and copy the following into **Post-build event command line** field, as shown on the image below.

```
xcopy /Y /F "$(TargetDir)*.dll" "$(ProjectDir)UpdateDWGParam.bundle\Contents\"
del /F "$(ProjectDir)..\forgesample\wwwroot\bundles\UpdateDWGParam.zip"
"C:\Program Files\7-Zip\7z.exe" a -tzip "$(ProjectDir)../forgesample/wwwroot/bundles/UpdateDWGParam.zip" "$(ProjectDir)UpdateDWGParam.bundle\" -xr0!*.pdb
```

This will copy the DLL from /bin/debug/ into .bundle/Contents folder, then use [7zip](https://www.7-zip.org/) to create a zip, then finally copy the ZIP into /bundles folders of the webapp.

![](_media/designautomation/autocad/post_build.png)

> Note how the **Post-build event** uses the project and folder names, so make sure you're using this names.

If you build the `UpdateDWGParam` project now you should see something like this on the **Output** window. Note the 2 folders and 3 files zipped. The zip file is created directly at the /wwwroot/bundles folder. This means you're doing great!

![](_media/designautomation/autocad/build_output.png)

Next: [Upload the plugin](designautomation/appbundle/common)