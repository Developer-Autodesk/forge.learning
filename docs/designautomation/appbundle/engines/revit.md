# Prepare a Revit bundle

This step will help you create a basic Revit plugin for Design Automation. For more information, please visit [My First Revit Plugin](https://knowledge.autodesk.com/support/revit-products/learn-explore/caas/simplecontent/content/my-first-revit-plug-overview.html) tutorial.

> You may [download the Bundle ZIP](https://github.com/Autodesk-Forge/learn.forge.designautomation/raw/master/forgesample/wwwroot/bundles/UpdateRVTParam.zip) into the `bundles/` (Node.js) or `/forgeSample/wwwroot/bundles` (.NET Core) folder and [skip this section](designautomation/appbundle/common.md)

## Create a new project

Right-click on the solution, the **Add** >> **New Project**. Select **Windows Desktop**, then **Class Library** and, finally, name it `UpdateRVTParam`. 

> Please select .NET Framework 4.8. If not listed, [please install the Dev Pack](https://dotnet.microsoft.com/download/dotnet-framework/net47).

Right-click on **References**, then **Add Reference** and **Browse** for `RevitAPI.dll` (by default under _C:\Program Files\Autodesk\Revit 201x\_ folder). Then right-click on this **RevitAPI** reference, go to **Properties**, then set **Copy Local** to **False**.

Then right-click on the project, go to **Manage NuGet Packages...**, under **Browser** you can search for **DesignAutomation.Revit** and install `Autodesk.Forge.DesignAutomation.Revit` (choose the appropriate Revit version you need). Then search and install `Newtonsoft.Json` (which is used to parse input data in JSON format). 

![](_media/designautomation/revit/new_project.gif)

[package.config](_snippets/modifymodels/engines/revit/package.config ':include :type=code xml')

The project should contain a `Class1.cs` class, let's rename the file to `Commands.cs` (for consistency). 

At this point, the project should look like the following:

![](_media/designautomation/revit/project_files.png)

## Commands.cs

This is the main code that will run with Revit. Copy the following content into `Commands.cs`. The main point of interest is the `DesignAutomationReadyEvent` event, triggered when the application is ready to run. The `HandleDesignAutomationReadyEvent` implements our custom code.

[Commands.cs](_snippets/modifymodels/engines/revit/Commands.cs ':include :type=code csharp')

## PackageContents.xml

Create a folder named `UpdateRVTParam.bundle` and, inside, a file named `PackageContents.xml`, then copy the following content to it. Learn more at the [PackageContents.xml Format Reference](http://docs.autodesk.com/ACD/2014/ENU/index.html?url=files/GUID-BC76355D-682B-46ED-B9B7-66C95EEF2BD0.htm,topicNumber=d30e484183). This file tells Revit to load our `.addin` plugin.

[PackageContents.xml](_snippets/modifymodels/engines/revit/PackageContents.xml ':include :type=code xml')

## Autodesk.Forge.Sample.DesignAutomation.Revit.addin

Under `UpdateRVTParam.bundle` folder create a subfolder named `Contents` and, inside this folder, a new file called `Autodesk.Forge.Sample.DesignAutomation.Revit.addin`. This tells Revit how to load the plugin.

[Autodesk.Forge.Sample.DesignAutomation.Revit.addin](_snippets/modifymodels/engines/revit/Autodesk.Forge.Sample.DesignAutomation.Revit.addin ':include :type=code xml')

At this point, the project should look like:

![](_media/designautomation/revit/bundle_folders.png)

## Post-build event

> For Node.js it is required to adjust the AppBundle ZIP output folder.

Now we need to ZIP the .bundle folder. Right-click on the project, select **Properties**, then open **Build Events** and copy the following into **Post-build event command line** field, as shown on the image below.

```
xcopy /Y /F "$(TargetDir)*.dll" "$(ProjectDir)UpdateRVTParam.bundle\Contents\"
del /F "$(ProjectDir)..\forgesample\wwwroot\bundles\UpdateRVTParam.zip"
"C:\Program Files\7-Zip\7z.exe" a -tzip "$(ProjectDir)../forgesample/wwwroot/bundles/UpdateRVTParam.zip" "$(ProjectDir)UpdateRVTParam.bundle\" -xr0!*.pdb
```

This will copy the DLL from /bin/debug/ into .bundle/Contents folder, then use [7zip](https://www.7-zip.org/) to create a zip, then finally copy the ZIP into /bundles folders of the webapp.

![](_media/designautomation/revit/post_build.png)

> Note how the **Post-build event** uses the project and folder names, so make sure you're using this names.

If you build the `UpdateRVTParam` project now you should see something like this on the **Output** window. Note the 2 folders and 3 files zipped. The zip file is created directly at the /wwwroot/bundles folder. This means you're doing great!

![](_media/designautomation/revit/build_output.png)

!> If the build output shows more than **2 folder, 5 files** copied, please go back and ensure **RevitAPI** reference is set to **Copy Local**:**False**. You may need to remove all DLLs from `UpdateRVTParam.bundle/Contents/` folder

Next: [Upload the plugin](designautomation/appbundle/common)