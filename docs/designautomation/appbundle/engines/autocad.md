# Prepare an AutoCAD bundle

This step will help you create a basic AutoCAD plugin for Design Automation. For more information, please visit [My First AutoCAD Plugin](https://knowledge.autodesk.com/support/autocad/learn-explore/caas/simplecontent/content/my-first-autocad-plug-overview.html) tutorial.

> You may [download the Bundle ZIP](https://github.com/Autodesk-Forge/learn.forge.designautomation/raw/master/forgesample/wwwroot/bundles/UpdateDWGParam.zip) into the `/public/bundles/` (Node.js) or `/forgeSample/wwwroot/bundles` (.NET Core) folder and [skip this section](designautomation/appbundle/common.md)

## Create a new project

Right-click on the solution, the **Add** >> **New Project**. Select **Windows Desktop**, then **Class Library** and, finally, name it `UpdateDWGParam`. Then right-click on the project, go to **Manage NuGet Packages...**, under **Browser** you can search for **AutoCAD.NET** and install `AutoCAD.NET.Core` (which also installs `AutoCAD.NET.Model`). Then search and install `Newtonsoft.Json` (which is used to parse input data in JSON format).

> Please select .NET Framework 4.7. If not listed, [please install the Dev Pack](https://dotnet.microsoft.com/download/dotnet-framework/net47).

![](_media/designautomation/autocad/new_project.gif)

As a result, the **package.config** should look like the following. This sample uses version 20, which should work on all available versions. You may adjust to a specific version. 

```xml
<?xml version="1.0" encoding="utf-8"?>
<packages>
  <package id="AutoCAD.NET.Core" version="20.0.0" targetFramework="net47" />
  <package id="AutoCAD.NET.Model" version="20.0.0" targetFramework="net47" />
  <package id="Newtonsoft.Json" version="12.0.1" targetFramework="net47" />
</packages>
```

The project should contain a `Class1.cs` class, let's rename the file to `Commands.cs` (for consistency). 

## Commands.cs

This is the main code that will run with AutoCAD. Copy the following content into `Commands.cs`. The class contains one custom AutoCAD command, `UpdateParam`, defined as a method with the same name. This command is called by Design Automation engine, as will be specified on the **Activity** (next step of this tutorial)

```csharp
using Autodesk.AutoCAD.ApplicationServices.Core;
using Autodesk.AutoCAD.DatabaseServices;
using Autodesk.AutoCAD.Runtime;
using Newtonsoft.Json;
using System.IO;

[assembly: CommandClass(typeof(UpdateDWGParam.Commands))]
[assembly: ExtensionApplication(null)]

namespace UpdateDWGParam
{
    public class Commands
    {
        [CommandMethod("UpdateParam", CommandFlags.Modal)]
        public static void UpdateParam()
        {
            //Get active document of drawing with Dynamic block
            var doc = Application.DocumentManager.MdiActiveDocument;
            var db = doc.Database;

            // read input parameters from JSON file
            InputParams inputParams = JsonConvert.DeserializeObject<InputParams>(File.ReadAllText("params.json"));

            using (Transaction t = db.TransactionManager.StartTransaction())
            {
                var bt = t.GetObject(db.BlockTableId, OpenMode.ForRead) as BlockTable;

                foreach (ObjectId btrId in bt)
                {
                    //get the blockDef and check if is anonymous
                    BlockTableRecord btr = (BlockTableRecord)t.GetObject(btrId, OpenMode.ForRead);
                    if (btr.IsDynamicBlock)
                    {
                        //get all anonymous blocks from this dynamic block
                        ObjectIdCollection anonymousIds = btr.GetAnonymousBlockIds();
                        ObjectIdCollection dynBlockRefs = new ObjectIdCollection();
                        foreach (ObjectId anonymousBtrId in anonymousIds)
                        {
                            //get the anonymous block
                            BlockTableRecord anonymousBtr = (BlockTableRecord)t.GetObject(anonymousBtrId, OpenMode.ForRead);
                            //and all references to this block
                            ObjectIdCollection blockRefIds = anonymousBtr.GetBlockReferenceIds(true, true);
                            foreach (ObjectId id in blockRefIds)
                            {
                                dynBlockRefs.Add(id);
                            }
                        }
                        if (dynBlockRefs.Count > 0)
                        {
                            //Get the first dynamic block reference, we have only one Dyanmic Block reference in Drawing
                            var dBref = t.GetObject(dynBlockRefs[0], OpenMode.ForWrite) as BlockReference;
                            UpdateDynamicProperties(dBref, inputParams);
                        }
                    }
                }
                t.Commit();
            }
            LogTrace("Saving file...");
            db.SaveAs("outputFile.dwg", DwgVersion.Current);
        }

        /// <summary>
        /// This updates the Dyanmic Blockreference with given Width and Height
        /// The initial parameters of Dynamic Blockrefence, Width =20.00 and Height =40.00
        /// </summary>
        /// <param Editor="ed"></param>
        /// <param BlockReference="br"></param>
        /// <param String="name"></param>
        private static void UpdateDynamicProperties(BlockReference br, InputParams inputParams)
        {
            // Only continue is we have a valid dynamic block
            if (br != null && br.IsDynamicBlock)
            {
                // Get the dynamic block's property collection
                DynamicBlockReferencePropertyCollection pc = br.DynamicBlockReferencePropertyCollection;
                foreach (DynamicBlockReferenceProperty prop in pc)
                {
                    switch (prop.PropertyName)
                    {
                        case "Width":
                            prop.Value = inputParams.Width;
                            break;
                        case "Height":
                            prop.Value = inputParams.Height;
                            break;
                        default:
                            break;
                    }
                }
            }
        }

        /// <summary>
        /// This will appear on the Design Automation output
        /// </summary>
        private static void LogTrace(string format, params object[] args) { Application.DocumentManager.MdiActiveDocument.Editor.WriteMessage(format, args); }
    }

    public class InputParams
    {
        public double Width { get; set; }
        public double Height { get; set; }
    }
}
```

## PackageContents.xml

Create a folder named `UpdateDWGParam.bundle` and, inside, a file named `PackageContents.xml`, then copy the following content to it. Learn more at the [PackageContents.xml Format Reference](https://knowledge.autodesk.com/search-result/caas/CloudHelp/cloudhelp/2016/ENU/AutoCAD-Customization/files/GUID-BC76355D-682B-46ED-B9B7-66C95EEF2BD0-htm.html). This file defines the new AutoCAD custom command `UpdateParam` that will be called when Design Automation executes.

```xml
<?xml version="1.0" encoding="utf-8" ?>
<ApplicationPackage SchemaVersion="1.0" Version="1.0" ProductCode="{F11EA57A-1E7E-4B6D-8E81-986B071E3E07}" Name="AutoCADDesignAutomation" Description="Sample Plugin for AutoCAD" Author="learnforge.autodesk.io>">
  <CompanyDetails Name="Autodesk, Inc" Url="http://learnforge.autodesk.io" Email="forge.help@autodesk.com"/>
  <Components>
    <RuntimeRequirements OS="Win64" Platform="AutoCAD"/>
    <ComponentEntry AppName="UpdateWindowParameters" ModuleName="./Contents/UpdateDWGParam.dll" AppDescription="AutoCAD .NET App to update parameters of Dynamic blockreference in AutoCAD Drawing" LoadOnCommandInvocation="True" LoadOnAutoCADStartup="True">
      <Commands GroupName="FPDCommands">
        <Command Global="UpdateParam" Local="UpdateParam"/>
      </Commands>
    </ComponentEntry>
  </Components>
</ApplicationPackage>
```

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