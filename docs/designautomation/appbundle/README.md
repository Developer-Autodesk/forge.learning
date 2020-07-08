# Prepare a plugin

Design Automation uses .bundle just like the Autodesk App Store, meaning you need to create a `PackageContents.xml` and a ZIP with the `DLL` (and other required files). For detailed information on how to create them, please visit [Autodesk App Store Developer Center](https://www.autodesk.com/developer-network/app-store).

At this section we will create a basic plugin that update `width` and `height` parameter and save the resulting file. Also the supporting files (`PackageContents.xml`) and the folder structure to place them. Finally create a .ZIP file ready to upload to Design Automation.

### Prerequisites

- **7zip**: use to create the .ZIP with bundle files, please install [from here](https://www.7-zip.org/). This tutorial assumes **7zip** is installed on the default folder: _C:\Program Files\7-Zip\7z.exe_.

### Additional prerequisites 

For the next session you can use the pre-build plugin. Or if you decide to build it, you will need:

- **Visual Studio**: Visual Studio 2017 or newer is required, please visit [this link](https://visualstudio.microsoft.com/vs/).

- **AutoCAD, Inventor, Revit or 3ds Max**: In order to develop, test and debug your Design Automation plugin: [AutoCAD](https://www.autodesk.com/products/autocad/overview) | [Inventor](https://www.autodesk.com/products/inventor/overview) | [Revit](https://www.autodesk.com/products/revit/overview) | [3ds Max](https://www.autodesk.com/products/3ds-max/overview).

***

For the next step, choose the **Engine**, which is the Autodesk application where you plugin will run. You'll need the respective application installed in order to compile, debug and test locally.

Choose the engine: [AutoCAD](/designautomation/appbundle/engines/autocad) | [Inventor](/designautomation/appbundle/engines/inventor) | [Revit](/designautomation/appbundle/engines/revit) | [3ds Max](/designautomation/appbundle/engines/max)