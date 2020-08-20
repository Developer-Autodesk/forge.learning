# Prepare a 3ds Max bundle

This step will help you create a basic 3ds Max plugin for Design Automation. The entire tutorial uses the Microsoft .NET framework, including the plugin for 3ds Max. Note that 3ds Max can be automated by MAXScript, Python, NET API, and C++. The 3ds Max .NET API is probably not the most used for plugins, however, for other Design Automatiuon products it is the typical API. 3ds Max resources for .NET API can be found here (2019 links, but .NET API is supported for all available versions of the 3ds Max Design Automation engines):
* [Writing 3ds Max .NET plugins](http://help.autodesk.com/view/3DSMAX/2019/ENU/?guid=__developer_3ds_max_sdk___the_learning_path_lesson_7_writing__net_plug_ins_html)
* [The 3ds Max .NET SDK](http://help.autodesk.com/view/3DSMAX/2019/ENU/?guid=__developer_3ds_max__net_sdk_html)
* [GetCOREInterface Blog .NET Samples](https://getcoreinterface.typepad.com/blog/2017/10/updated-net-api-samples-for-3ds-max-2018.html)

Remember that for Design Automation, there should be no UI or prompts that cannot be automated. To automate the 3ds Max DA engine, you must provide some MAXScript. This is usually very easy as most customization can be exposed quickly to MAXScript (see [function publishing for C++](http://help.autodesk.com/view/3DSMAX/2019/ENU/?guid=__developer_3ds_max_sdk_features_function_publishing_html) and [MAXScript .NET handling](http://help.autodesk.com/view/3DSMAX/2019/ENU/?guid=GUID-779FD7AC-953D-4567-B2A8-60B1D8695B95))

> You may [download the Bundle ZIP](https://github.com/Autodesk-Forge/learn.forge.designautomation/raw/master/forgesample/wwwroot/bundles/UpdateMAXParam.zip) into the `/public/bundles/` (Node.js) or `/forgeSample/wwwroot/bundles` (.NET Core) folder and [skip this section](designautomation/appbundle/common.md)

## Create a new .NET project

Right-click on the solution, the **Add** >> **New Project**. Select **Windows Desktop**, then **Class Library** and, finally, name it `UpdateMAXParam`. You will then need to reference the Autodesk.Max.Dll managed assembly (3ds Max .NET API core module). This module is found in the 3dsmax.exe folder and when referencing, make sure to turn off the "Copy Local" flag. There are a few other modules used for .NET API support (see [The 3ds Max .NET SDK](http://help.autodesk.com/view/3DSMAX/2019/ENU/?guid=__developer_3ds_max__net_sdk_html)), but for this tutorial we will use only Autodesk.Max.dll. Then search and install `Newtonsoft.Json` (which is used to parse input data in JSON format).

> Please select .NET Framework 4.7. If not listed, [please install the Dev Pack](https://dotnet.microsoft.com/download/dotnet-framework/net47).

![](_media/designautomation/max/new_project.gif)

As a result, the **package.config** should look like the following for the Newtonsoft.Json module.

```xml
<?xml version="1.0" encoding="utf-8"?>
<packages>
  <package id="Newtonsoft.Json" version="12.0.1" targetFramework="net47" />
</packages>
```

The project should contain a `Class1.cs` class, let's rename the file to `Command.cs` (for consistency). 

## Commands.cs

This is the main code that will run with 3ds Max. Copy the following content into `Command.cs`. There are three classes to handle the Design Automation porcessing. First is the `InputParams` that will be used to interface with the JSON input data. Next is `ParameterChanger` class that is used to iterate the scene, and find all Casement Windows (but could be any object types as identified by the class ids). Finally the `RuntimeExecute` is used to take the input and drive the automation. Also note there is a specialized logging that will output information to the Design Automation console. See the LogTrace function. Note that the `ILogSys` 3ds Max managed class is used for this, and the flags used with the `LogEntry` API indicated are necessary for the output to show in the Design Automation console. 

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.IO;

using Newtonsoft.Json;

using Autodesk.Max;

namespace Autodesk.Forge.Sample.DesignAutomation.Max
{
    /// <summary>
    /// Used to hold the parameters to change
    /// </summary>
    public class InputParams
    {
        public float Width { get; set; }
        public float Height { get; set; }
    }
    /// <summary>
    /// Changes parameters in automated way. 
    /// Iterate entire scene to get all nodes
    /// In this example we specifically find Casement Windows by object class ID
    /// Then modify the width and height based on inputs.
    /// 
    /// Could be expanded to find other window types, other objects, etc.
    /// </summary>
    static public class ParameterChanger
    {
        static List<IINode> m_sceneNodes = new List<IINode> { };

        /// <summary>
        /// Recursively go through the scene and get all nodes
        /// Use the Autodesk.Max APIs to get the children nodes
        /// </summary>
        static private void GetSceneNodes(IINode node)
        {
            m_sceneNodes.Add(node);

            for (int i = 0; i < node.NumberOfChildren; i++)
                GetSceneNodes(node.GetChildNode(i));
        }

        /// <summary>
        /// Function to specifically update Case Windows with input wedth and height parameters
        /// </summary>
        /// <param name="width">The new Width to set the Window</param>
        /// <param name="height">The new Height to set the Window</param>
        /// <returns>window count</returns>
        static public int UpdateWindowNodes(float width, float height)
        {
            IGlobal globalInterface = Autodesk.Max.GlobalInterface.Instance;
            IInterface14 coreInterface = globalInterface.COREInterface14;

            IINode nodeRoot = coreInterface.RootNode;
            m_sceneNodes.Clear();
            GetSceneNodes(nodeRoot);

            // 3ds Max uses a class ID for all object types. This is easiest way to find specific type.
            // ClassID (1902665597L, 1593788199L) == 0x71685F7D, 0x5EFF4727 for casement window
            IClass_ID cidCasementWindow = globalInterface.Class_ID.Create(0x71685F7D, 0x5EFF4727);

            // Use LINQ to filter for windows only - in case scene has more than one, 
            // but this should still give us at least one for single window scene!
            var sceneWindows = from node in m_sceneNodes
                               where ((node.ObjectRef != null) && // In some cases the ObjectRef can be null for certain node types.
                                      (node.ObjectRef.ClassID.PartA == cidCasementWindow.PartA) && 
                                      (node.ObjectRef.ClassID.PartB == cidCasementWindow.PartB))
                               select node;

            // Iterate the casement windws and update the hight and width parameters.
            foreach (IINode item in sceneWindows)
            {
                // window is using old-style ParamArray rather than newer ParamBlk2
                IIParamArray pb = item.ObjectRef.ParamBlock;
                pb.SetValue(0, coreInterface.Time, height); // window height is at index zero.
                pb.SetValue(1, coreInterface.Time, width); // window width is at index one.
            }

            // If there are windows, save the window updates
            int status;
            if (sceneWindows.Count() > 0)
            {
                // The output file name must match what the Design Automation work item is specifying as output file.
                string full_filename = coreInterface.CurFilePath;
                string filename = coreInterface.CurFileName;
                string new_filename = full_filename.Replace(filename, "outputFile.max");
                status = coreInterface.SaveToFile(new_filename, true, false);
                if (status == 0) //error
                    return -1;
            }

            // return how many windows were modified.
            return sceneWindows.Count();
        }

    }

    /// <summary>
    /// This class is used to execute the automation. Above class could be connected to UI elements, or run by scripts directly.
    /// This class takes the input from JSON input and uses those values. This way it is more cohesive to web development.
    /// </summary>
    static public class RuntimeExecute
    {
        static public int ModifyWindowWidthHeight()
        {
            int count = 0;

            // Run entire code block with try/catch to help determine errors
            try
            {

                // read input parameters from JSON file
                InputParams inputParams = JsonConvert.DeserializeObject<InputParams>(File.ReadAllText("params.json"));

                count = ParameterChanger.UpdateWindowNodes(inputParams.Width, inputParams.Height);

            }
            catch (Exception e)
            {
                LogTrace("Exception Error: " + e.Message);
                return -1; //fail
            }
            
            LogTrace("Changed {0} Window objects.", count);
            return count; // 0+ means success, and how many objects were changed.
        }
        /// <summary>
        /// Information sent to this LogTrace will appear on the Design Automation output
        /// </summary>
        private static void LogTrace(string format, params object[] args)
        {
            System.Reflection.Assembly a = System.Reflection.Assembly.GetExecutingAssembly();
            string output_msg = string.Format("DLL {0} compiled on {1}; {2}",
                System.IO.Path.GetFileName(a.Location),
                File.GetLastWriteTime(a.Location), 
                string.Format(format, args));

            IGlobal globalInterface = Autodesk.Max.GlobalInterface.Instance;
            IInterface14 coreInterface = globalInterface.COREInterface14;
            ILogSys log = coreInterface.Log;
            // Note flags are necessary to produce Design Automation output. This is same as C++:
            // SYSLOG_INFO | SYSLOG_IGNORE_VERBOSITY | SYSLOG_BROADCAST
            log.LogEntry(0x00000004 | 0x00040000 | 0x00010000, false, "", output_msg);
        }
    }
}
```

## PackageContents.xml

Create a folder named `UpdateMAXParam.bundle` and inside this folder add a file named `PackageContents.xml`. Copy the content listed below in the XML section into the PackageContents.xml file. Learn more at the [PackageContents.xml Format Reference](https://knowledge.autodesk.com/search-result/caas/CloudHelp/cloudhelp/2016/ENU/AutoCAD-Customization/files/GUID-BC76355D-682B-46ED-B9B7-66C95EEF2BD0-htm.html). For more 3ds Max specific information for packaging your 3ds Max plugins see here [Packaging Plugins](http://help.autodesk.com/view/3DSMAX/2019/ENU/?guid=__developer_writing_plug_ins_packaging_plugins_html)

This file will tell 3ds Max the modules to load (in this case the .NET API plugin assembly we are creating, but can also include MAXScripts, Python, and/or C++ plugins.) Because the plugin is being loaded through this feature, you only need to worry about the instructions to trigger your automation job. Please note that a unique ID for both ProductCode and UpgradeCode are required for 3ds Max to correctly load your code. See above mentioned documentation for details.

```xml
<?xml version="1.0" encoding="utf-8"?>
<ApplicationPackage 
	SchemaVersion="1.0" 
	AutodeskProduct="3ds Max" 
    Name="Sample Design Automation Plugin for 3ds Max"
    Description="A sample package to update parameters of a 3ds Max scene file containing a casement window"
	AppVersion="2019.0.0" 
	FriendlyVersion="2019.0.0" 
	ProductType="Application" 
	SupportedLocales="Enu" 
	AppNameSpace="apps.autodesk.com" 
	Author="Autodesk Forge" 
    ProductCode="{6A8D06F4-C3DD-42DD-A69E-9B9617A7ABC0}"
	UpgradeCode="{CE88CEA5-47F6-423E-B9EC-E9FA683B5228}"
    >

	<CompanyDetails Name="Autodesk"
		Phone=" "
		Url="http://forge.autodesk.com"
		Email="noreply@autodesk.com" />

	<RuntimeRequirements OS="Win64" Platform="3ds Max" SeriesMin="2019" SeriesMax="2021" />
		
	<Components Description="assemblies parts">
		<RuntimeRequirements OS="Win64" Platform="3ds Max" SeriesMin="2019" SeriesMax="2021" />
		<ComponentEntry AppName="UpdateMAXParam" Version="2019.0.0" ModuleName="./Contents/UpdateMAXParam.dll" AppDescription="The Sample Design Automation Plugin managed assembly module" />
	</Components>
  
</ApplicationPackage>
```

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