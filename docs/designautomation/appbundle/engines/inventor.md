# Prepare an Inventor bundle

This step will help you create a basic Inventor plugin. For more information, please visit [My First Inventor Plugin](https://knowledge.autodesk.com/support/inventor-products/learn-explore/caas/simplecontent/content/my-first-inventor-plug-overview.html) tutorial.

> You may [download the Bundle ZIP](https://github.com/Autodesk-Forge/learn.forge.designautomation/raw/master/forgesample/wwwroot/bundles/UpdateIPTParam.zip) into the `bundles/` (Node.js) or `/forgeSample/wwwroot/bundles` (.NET Core) folder and [skip this section](designautomation/appbundle/common.md)

## Prerequisites

- **Design Automation for Inventor** template: go to the Visual Studio Market Place, download and open it from [this link](https://marketplace.visualstudio.com/items?itemName=Autodesk.DesignAutomation), then follow the steps to install.

![](_media/designautomation/inventor/da4inventor_template.png)

## Create a new project

Right-click on the solution, the **Add** >> **New Project**. Search for **Inventor** templates, then **Plugin project** and, finally, name it `UpdateIPTParam`. Right-click on the project, go to **Manage NuGet Packages...**, under **Browse** you can select `Newtonsoft.Json` and update (this package is already in the solution, if not, install)

> Please select .NET Framework 4.7. If not listed, [please install the Dev Pack](https://dotnet.microsoft.com/download/dotnet-framework/net47).

![](_media/designautomation/inventor/new_project.gif)

## SampleAutomation.cs

Open the `SampleAutomation.cs` file and copy the following content to it. This is where the parameters are updated under the `Run` method.

[SampleAutomation.cs](_snippets/modifymodels/engines/inventor/SampleAutomation.cs ':include :type=code csharp')

## Post-build event

> For Node.js it is required to adjust the AppBundle ZIP output folder.

Now we need to ZIP the .bundle folder. Right-click on the project, select **Properties**, then open **Build Events** and copy the following into **Post-build event command line** field, as shown on the image below.

```
xcopy /Y /F "$(ProjectDir)PackageContents.xml" "$(TargetDir)\Bundle\$(MSBuildProjectName).bundle\"
xcopy /Y /F "$(TargetDir)*.*" "$(TargetDir)\Bundle\$(MSBuildProjectName).bundle\Contents\"
del /F "$(ProjectDir)..\forgesample\wwwroot\bundles\UpdateIPTParam.zip"
"C:\Program Files\7-Zip\7z.exe" a -tzip "$(ProjectDir)../forgesample/wwwroot/bundles/UpdateIPTParam.zip" "$(TargetDir)\bundle\$(MSBuildProjectName).bundle\" -xr0!*.pdb
```

This will copy the DLL from /bin/debug/ into .bundle/Contents folder, then use [7zip](https://www.7-zip.org/) to create a zip, then finally copy the ZIP into /bundles folders of the webapp.

![](_media/designautomation/inventor/post_build.png)

If you build the `UpdateIPTParam` project now you should see something like this on the **Output** window. Note the 2 folders and several files zipped. The zip file is created directly at the /wwwroot/bundles folder. This means you're doing great!

![](_media/designautomation/inventor/build_output.png)

Next: [Upload the plugin](designautomation/appbundle/common)