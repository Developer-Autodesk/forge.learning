# Prepare an AppBundle (plugin)

At this section we will create a basic plugin or AppBundle that searches for the Windows in the scene model tree and updates the `width` and `height` parameters of it, saving the resulting file as a new file. 

Design Automation uses .bundle just like the Autodesk App Store. For it, a `PackageContents.xml` descriptor file will be created and ZIP together with the `DLL` and other possible required files. For detailed information on how to create them, please visit [Autodesk App Store Developer Center](https://www.autodesk.com/developer-network/app-store). The created ZIP AppBundle file will be uploaded.

### Prerequisites

- **7zip**: use to create the .ZIP with bundle files, please install [from here](https://www.7-zip.org/). This tutorial assumes **7zip** is installed on the default folder: _C:\Program Files\7-Zip\7z.exe_.

#### Additional prerequisites 

For the next session you can use the pre-build plugin. Or if you decide to build it, you will need:

- **Visual Studio**: Visual Studio 2017 or newer is required, please visit [this link](https://visualstudio.microsoft.com/vs/).

- **AutoCAD, Inventor, Revit or 3ds Max**: In order to develop, compile, test and debug your Design Automation plugin, you will need the respective application installed: [AutoCAD](https://www.autodesk.com/products/autocad/overview) | [Inventor](https://www.autodesk.com/products/inventor/overview) | [Revit](https://www.autodesk.com/products/revit/overview) | [3ds Max](https://www.autodesk.com/products/3ds-max/overview).

***

The **Engine** is the Autodesk application where your plugin or App will run. Choose the engine you will use: 
[AutoCAD](/designautomation/appbundle/engines/autocad) | [Inventor](/designautomation/appbundle/engines/inventor) | [Revit](/designautomation/appbundle/engines/revit) | [3ds Max](/designautomation/appbundle/engines/max)