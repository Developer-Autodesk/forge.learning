# Prepare an AutoCAD bundle

This step will help you create a basic AutoCAD plugin. For more information, please visit [My First AutoCAD Plugin](https://knowledge.autodesk.com/support/autocad/learn-explore/caas/simplecontent/content/my-first-autocad-plug-overview.html) tutorial.

## Create a new project

Right-click on the solution, the **Add** >> **New Project**. Select **Windows Desktop**, then **Class Library** and, finally, name it `autocad`.

![](_media/designautomation/autocad/new_project.gif)

The project should contain a `Class1.cs` class, let's rename the file to `Commands.cs` (for consistency). 

## Commands.cs

This is the main code that will run with AutoCAD. Copy the following content into `Commands.cs`.

```csharp
using Autodesk.AutoCAD.ApplicationServices.Core;
using Autodesk.AutoCAD.DatabaseServices;
using Autodesk.AutoCAD.EditorInput;
using Autodesk.AutoCAD.Runtime;
using Newtonsoft.Json;
using System.IO;

[assembly: CommandClass(typeof(Autodesk.Forge.Sample.DesignAutomation.AutoCAD.MainEntry))]
[assembly: ExtensionApplication(null)]

namespace Autodesk.Forge.Sample.DesignAutomation.AutoCAD
{
  public class MainEntry
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
  }

  public class InputParams
  {
    public double Width { get; set; }
    public double Height { get; set; }
  }
}
```

## PackageContents.xml

Create a folder named `UpdateDWGParam.bundle` and, inside, a file named `PackageContents.xml`, then copy the following content to it. Learn more about PackageContents at the [AutoCAD Developer Center](https://www.autodesk.com/developer-network/platform-technologies/autocad).

```xml
<?xml version="1.0" encoding="utf-8" ?>
<ApplicationPackage
    SchemaVersion="1.0"
    Version="1.0"
    ProductCode="{F11EA57A-1E7E-4B6D-8E81-986B071E3E07}"
    Name="UpdateWindowParameters"
    Description="A sample package to update parameters of a Dyanmic blockreference"
    Author="Autodesk Forge">
  <CompanyDetails
      Name="Autodesk, Inc"
      Phone="12345678910"
      Url="www.autodesk.com"
      Email="forge.help@autodesk.com"/>
  <Components>
    <RuntimeRequirements
        OS="Win64"
        Platform="AutoCAD"
		SeriesMin="R23.0" SeriesMax="R23.0"/>
    <ComponentEntry
        AppName="UpdateWindowParameters"
        ModuleName="./Contents/UpdateDWGParam.dll"
        AppDescription="AutoCAD.IO .net App to update parameters of Dynamic blockreference in AutoCAD Drawing"
        LoadOnCommandInvocation="True"
        LoadOnAutoCADStartup="True">
      <Commands GroupName="FPDCommands">
        <Command Global="UpdateWindowParam" Local="UpdateWindowParam"/>
      </Commands>
    </ComponentEntry>
  </Components>
</ApplicationPackage>
```

Finally, create a subfolder named `Contents` and leave it empty. At this point, the project should look like:

![](_media/designautomation/autocad/bundle_folders.png)

## Post-build event

Now we need to ZIP the .bundle folder. Right-click on the project, select **Properties**, then open **Build Events** and copy the following into **Post-build event command line** field, as shown on the image below.

```
xcopy /Y /F $(TargetDir)*.dll $(ProjectDir)UpdateDWGParam.bundle\Contents\
del /F $(ProjectDir)..\webapp\wwwroot\bundles\UpdateDWGParam.zip
"C:\Program Files\7-Zip\7z.exe" a -tzip $(ProjectDir)../webapp/wwwroot/bundles/UpdateDWGParam.zip  $(ProjectDir)UpdateDWGParam.bundle\ -xr0!*.pdb
```

This will copy the DLL from /bin/debug/ into .bundle/Contents folder, then use [7zip](https://www.7-zip.org/) to create a zip, then finally copy the ZIP into /bundles folders of the webapp.

![](_media/designautomation/autocad/post_build.png)

If you build the `autocad` project now you should see something like this on the **Output** window (note the 2 folders, 3 files), this means you're doing great! :wink:

![](_media/designautomation/autocad/build_output.png)

Next: [Upload the plugin](designautomation/appbundle/netcore)