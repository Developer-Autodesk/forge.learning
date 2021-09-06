# 准备插件

Design Automation 像 Autodesk App Store 一样使用 .bundle，这意味着您需要使用 `DLL`（和其他必需文件）创建 `PackageContents.xml` 和 ZIP。有关如何创建这些文件的详细信息，请访问 [Autodesk App Store 开发人员中心](https://www.autodesk.com/developer-network/app-store)。

在本部分中，我们将创建一个基本插件，该插件将更新 `width` 和 `height` 参数并保存生成的文件。此外，还创建支持文件 (`PackageContents.xml`) 和用于放置这些文件的文件夹结构。最后，创建 .ZIP 文件，准备上传到 Design Automation。

### 先决条件

- **7zip**：用于创建包含包文件的 .ZIP，请[从此处](https://www.7-zip.org/)安装。本教程假定 **7zip** 安装在默认文件夹中：_C:\\Program Files\\7-Zip\\7z.exe_。

### 其他先决条件 

在下一会话中，您可以使用预构建插件。或者，如果您决定构建插件，您将需要：

- **Visual Studio**：需要使用 Visual Studio 2017 或更高版本，请访问[此链接](https://visualstudio.microsoft.com/vs/)。

- **AutoCAD、Inventor、Revit 或 3ds Max**：为了开发、测试和调试 Design Automation 插件：[AutoCAD](https://www.autodesk.com/products/autocad/overview) | [Inventor](https://www.autodesk.com/products/inventor/overview) | [Revit](https://www.autodesk.com/products/revit/overview) | [3ds Max](https://www.autodesk.com/products/3ds-max/overview)。

***

对于下一步，请选择 **Engine**，即插件将在其中运行的 Autodesk 应用程序。您需要安装相应的应用程序才能在本地编译、调试和测试。

选择引擎：[AutoCAD](/zh-CN/designautomation/appbundle/engines/autocad) | [Inventor](/zh-CN/designautomation/appbundle/engines/inventor) | [Revit](/zh-CN/designautomation/appbundle/engines/revit) | [3ds Max](/zh-CN/designautomation/appbundle/engines/max)