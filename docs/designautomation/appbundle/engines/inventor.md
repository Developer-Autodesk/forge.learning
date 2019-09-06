# Prepare an Inventor bundle

This step will help you create a basic Inventor plugin. For more information, please visit [My First Inventor Plugin](https://knowledge.autodesk.com/support/inventor-products/learn-explore/caas/simplecontent/content/my-first-inventor-plug-overview.html) tutorial.

## Prerequisites

- **DeveloperTools.msi**: includes the project template for Visual Studio. This is part of the Inventor SDK, which is installed with Inventor, see **C:\Users\Public\Documents\Autodesk\Inventor 2019\SDK\** folder.

## Create a new project

Right-click on the solution, the **Add** >> **New Project**. Select **Visual C#**, then **Autodesk Inventor 2019 Addin** and, finally, name it `UpdateIPTParam`. Right-click on the project, go to **Manage NuGet Packages...**, under **Browser** you can search for **Newtonsoft** and install `Newtonsoft.Json`. 

> Please select .NET Framework 4.7. If not listed, [please install the Dev Pack](https://dotnet.microsoft.com/download/dotnet-framework/net47).

![](_media/designautomation/inventor/new_project.gif)

As a result, the **package.config** should look like the following. These are the latest version as of Jan/2019.

```xml
<?xml version="1.0" encoding="utf-8"?>
<packages>
  <package id="Newtonsoft.Json" version="12.0.1" targetFramework="net45" />
</packages>
```

## Commands.cs

Create a new class named `Commands` and copy the following content to it. This is where the parameters are updated under the `Run` method.

```csharp
using Inventor;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Runtime.InteropServices;
using System.Threading;

namespace UpdateIPTParam
{
    [ComVisible(true)]
    public class Commands
    {
        private InventorServer m_server;
        public Commands(InventorServer app) { m_server = app; }

        public void Run(Document doc)
        {
            try
            {
                // update parameters in the doc
               ChangeParameters(doc);

                // generate outputs
                var docDir = System.IO.Path.GetDirectoryName(doc.FullFileName);

                // save output file
                var documentType = doc.DocumentType;
                if (documentType == DocumentTypeEnum.kPartDocumentObject)
                {
                    // the name must be in sync with OutputIpt localName in Activity
                    var fileName = System.IO.Path.Combine(docDir, "outputFile.ipt");

                    // save file                                                                
                    doc.SaveAs(fileName, false);
                }
            }
            catch (Exception e) { LogTrace("Processing failed: {0}", e.ToString()); }
        }

        /// <summary>
        /// Change parameters in Inventor document.
        /// </summary>
        /// <param name="doc">The Inventor document.</param>
        /// <param name="json">JSON with changed parameters.</param>
        public void ChangeParameters(Document doc)
        {
            var theParams = GetParameters(doc);

            Dictionary<string, string> parameters = JsonConvert.DeserializeObject<Dictionary<string, string>>(System.IO.File.ReadAllText("params.json"));
            foreach (KeyValuePair<string, string> entry in parameters)
            {
                try
                {
                    Parameter param = theParams[entry.Key.ToLower()];
                    param.Expression = entry.Value;
                }
                catch (Exception e) { LogTrace("Cannot update {0}: {1}", entry.Key, e.Message); }
            }
            doc.Update();
        }

        /// <summary>
        /// Get parameters for the document.
        /// </summary>
        /// <returns>Parameters. Throws exception if parameters are not found.</returns>
        private static Parameters GetParameters(Document doc)
        {
            var docType = doc.DocumentType;
            switch (docType)
            {
                case DocumentTypeEnum.kAssemblyDocumentObject:
                    var asm = doc as AssemblyDocument;
                    return asm.ComponentDefinition.Parameters;
                case DocumentTypeEnum.kPartDocumentObject:
                    var ipt = doc as PartDocument;
                    return ipt.ComponentDefinition.Parameters;
                default:
                    throw new ApplicationException(string.Format("Unexpected document type ({0})", docType));
            }
        }

        /// <summary>
        /// This will appear on the Design Automation output
        /// </summary>
        private static void LogTrace(string format, params object[] args) { Trace.TraceInformation(format, args); }
    }
}
```

## StandardAddInServer.cs

This file is created by the template and is the entry point, let's just add our Commands to it and make it as a return for `Automation` property, so it is called by Design Automation.

**1. Class members**

Replace the `m_inventorApplication` with `m_inventorServer` and `m_commands`:

```csharp
// Inventor application object.
//private Inventor.Application m_inventorApplication;
private Inventor.InventorServer m_inventorServer;
private Commands m_commands;
```

**2. Activate**

Adjust the activate to our new members:

```csharp
public void Activate(Inventor.ApplicationAddInSite addInSiteObject, bool firstTime)
{
    // This method is called by Inventor when it loads the addin.
    // The AddInSiteObject provides access to the Inventor Application object.
    // The FirstTime flag indicates if the addin is loaded for the first time.

    // Initialize AddIn members.
    //m_inventorApplication = addInSiteObject.Application;
    m_inventorServer = addInSiteObject.InventorServer;

    // TODO: Add ApplicationAddInServer.Activate implementation.
    // e.g. event initialization, command creation etc.
    m_commands = new Commands(m_inventorServer);
}
```

**3. Automation property**

Return change the return:

```csharp
public object Automation
{
    // This property is provided to allow the AddIn to expose an API 
    // of its own to other programs. Typically, this  would be done by
    // implementing the AddIn's API interface in a class and returning 
    // that class object through this property.

    get
    {
        // TODO: Add ApplicationAddInServer.Automation getter implementation
        return m_commands;
    }
}
```

## PackageContents.xml

Create a folder named `UpdateIPTParam.bundle` and, inside, a file named `PackageContents.xml`, then copy the following content to it. Learn more at the [PackageContents.xml Format Reference](https://knowledge.autodesk.com/search-result/caas/CloudHelp/cloudhelp/2016/ENU/AutoCAD-Customization/files/GUID-BC76355D-682B-46ED-B9B7-66C95EEF2BD0-htm.html).

```xml
<?xml version="1.0" encoding="utf-8" ?>
<ApplicationPackage SchedmaVersion="1.0" Version="1.0" ProductCode="{84fef6aa-abf5-43be-b176-bb6f0c1d6680}" Name="InventorDesignAutomation" Description="Sample Plugin for Inventor" Author="learnforge.autodesk.io">
    <CompanyDetails Name="Autodesk, Inc" Url="http://learnforge.autodesk.io" Email="forge.help@autodesk.com" />
    <Components>
        <RuntimeRequirements  SeriesMax="R23" SeriesMin="R23" OS="Win64" Platform="Inventor" />
        <ComponentEntry LoadOnAutoCADStartup="False" LoadOnCommandInvocation="False" AppDescription="Inventor .NET App to update value of Assembly and Parts parameters" ModuleName="./Contents/Autodesk.UpdateIPTParam.Inventor.addin" AppName="Inventor for Design Automation"/>
    </Components>
</ApplicationPackage>
```

Finally, create a subfolder named `Contents` and move the `Autodesk.UpdateIPTParam.Inventor.addin` to this folder.

## Autodesk.UpdateIPTParam.Inventor.addin

Change the type to: `<Addin Type="Plugin">`

At this point, the project should look like:

![](_media/designautomation/inventor/bundle_folders.png)

## Post-build event

Now we need to ZIP the .bundle folder. Right-click on the project, select **Properties**, then open **Build Events** and copy the following into **Post-build event command line** field, as shown on the image below.

```
xcopy /Y /F "$(TargetDir)*.dll" "$(ProjectDir)UpdateIPTParam.bundle\Contents\"
del /F "$(ProjectDir)..\forgesample\wwwroot\bundles\UpdateIPTParam.zip"
"C:\Program Files\7-Zip\7z.exe" a -tzip "$(ProjectDir)../forgesample/wwwroot/bundles/UpdateIPTParam.zip" "$(ProjectDir)UpdateIPTParam.bundle\" -xr0!*.pdb
```

This will copy the DLL from /bin/debug/ into .bundle/Contents folder, then use [7zip](https://www.7-zip.org/) to create a zip, then finally copy the ZIP into /bundles folders of the webapp.

![](_media/designautomation/inventor/post_build.png)

If you build the `UpdateIPTParam` project now you should see something like this on the **Output** window. Note the 2 folders and 3 files zipped. The zip file is created directly at the /wwwroot/bundles folder. This means you're doing great!

![](_media/designautomation/inventor/build_output.png)

Next: [Upload the plugin](designautomation/appbundle/netcore)