# 准备 AutoCAD 包

此步骤将帮助您创建用于 Design Automation 的基本 AutoCAD 插件。有关详细信息，请访问[我的第一个 AutoCAD 插件](https://knowledge.autodesk.com/support/autocad/learn-explore/caas/simplecontent/content/my-first-autocad-plug-overview.html)教程。

> 您可以[下载包 ZIP 文件](https://github.com/Autodesk-Forge/learn.forge.designautomation/raw/master/forgesample/wwwroot/bundles/UpdateDWGParam.zip)到 `bundles/` (Node.js) 或 `/forgeSample/wwwroot/bundles` (.NET Core) 文件夹，并[跳过此部分](/zh-CN/designautomation/appbundle/common.md)

## 创建新项目

在解决方案上单击鼠标右键，然后单击 **Add** >> **New Project**。选择 **Windows Desktop**，然后选择 **Class Library**，最后将其命名为 `UpdateDWGParam`。然后，在项目上单击鼠标右键，转到 **Manage NuGet Packages...**，在 **Browse** 下，可以搜索 **AutoCAD.NET** 并安装 `AutoCAD.NET.Core`（还会安装 `AutoCAD.NET.Model`）。然后搜索并安装 `Newtonsoft.Json`（用于解析 JSON 格式的输入数据）。

> 请选择 .NET Framework 4.7。如果未列出，请[安装开发包](https://dotnet.microsoft.com/download/dotnet-framework/net47)。

![](_media/designautomation/autocad/new_project.gif)

因此，**package.config** 应如下所示。此示例使用版本 20，它应该适用于所有可用版本。您可以调整到特定版本。 

[package.config](_snippets/modifymodels/engines/autocad/package.config ':include :type=code xml')

项目应包含 `Class1.cs` 类，为了保持一致，我们将文件重命名为 `Commands.cs`。 

## Commands.cs

这是将与 AutoCAD 一起运行的主要代码。将以下内容复制到 `Commands.cs`。该类包含一个自定义 AutoCAD 命令 `UpdateParam`，该命令定义为具有相同名称的方法。此命令由 Design Automation 引擎调用，将在 **Activity** 中指定（本教程的下一步）

[Commands.cs](_snippets/modifymodels/engines/autocad/Commands.cs ':include :type=code csharp')

## PackageContents.xml

创建一个名为 `UpdateDWGParam.bundle` 的文件夹，并在其中创建一个名为 `PackageContents.xml` 的文件，然后将以下内容复制到文件中。有关详细信息，请参见 [PackageContents.xml 格式参考](https://knowledge.autodesk.com/search-result/caas/CloudHelp/cloudhelp/2016/ENU/AutoCAD-Customization/files/GUID-BC76355D-682B-46ED-B9B7-66C95EEF2BD0-htm.html)。此文件定义了在执行 Design Automation 时将调用的新 AutoCAD 自定义命令 `UpdateParam`。

[PackageContents.xml](_snippets/modifymodels/engines/autocad/PackageContents.xml ':include :type=code xml')

最后，创建一个名为 `Contents` 的子文件夹，并将其保留为空。此时，项目应如下所示：

![](_media/designautomation/autocad/bundle_folders.png)

## 生成后事件

> 对于 Node.js，需要调整 AppBundle ZIP 输出文件夹。

现在，我们需要压缩 .bundle 文件夹。在项目上单击鼠标右键，选择 **Properties**，然后打开 **Build Events**，并将以下内容复制到 **Post-build event command line** 字段中，如下图所示。

```
xcopy /Y /F "$(TargetDir)*.dll" "$(ProjectDir)UpdateDWGParam.bundle\Contents\"
del /F "$(ProjectDir)..\forgesample\wwwroot\bundles\UpdateDWGParam.zip"
"C:\Program Files\7-Zip\7z.exe" a -tzip "$(ProjectDir)../forgesample/wwwroot/bundles/UpdateDWGParam.zip" "$(ProjectDir)UpdateDWGParam.bundle\" -xr0!*.pdb
```

这会将 DLL 从 /bin/debug/ 复制到 .bundle/Contents 文件夹，然后使用 [7zip](https://www.7-zip.org/) 创建一个 zip，最后将 ZIP 复制到 Web 应用程序的 /bundles 文件夹。

![](_media/designautomation/autocad/post_build.png)

> 请注意**生成后事件**如何使用项目和文件夹名称，确保您使用的是这些名称。

如果现在构建 `UpdateDWGParam` 项目，您应该会在 **Output** 窗口中看到类似的内容。请注意压缩的 2 个文件夹和 3 个文件。压缩文件直接在 /wwwroot/bundles 文件夹中创建。这意味着您做得很好！

![](_media/designautomation/autocad/build_output.png)

下一步：[上传插件](/zh-CN/designautomation/appbundle/common)