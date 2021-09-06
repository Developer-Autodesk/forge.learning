# 准备 Revit 包

此步骤将帮助您创建用于 Design Automation 的基本 Revit 插件。有关详细信息，请访问[我的第一个 Revit 插件](https://knowledge.autodesk.com/support/revit-products/learn-explore/caas/simplecontent/content/my-first-revit-plug-overview.html)教程。

> 您可以[下载包 ZIP 文件](https://github.com/Autodesk-Forge/learn.forge.designautomation/raw/master/forgesample/wwwroot/bundles/UpdateRVTParam.zip)到 `bundles/` (Node.js) 或 `/forgeSample/wwwroot/bundles` (.NET Core) 文件夹，并[跳过此部分](/zh-CN/designautomation/appbundle/common.md)

## 创建新项目

在解决方案上单击鼠标右键，然后单击 **Add** >> **New Project**。选择 **Windows Desktop**，然后选择 **Class Library**，最后将其命名为 `UpdateRVTParam`。 

> 请选择 .NET Framework 4.8。如果未列出，请[安装开发包](https://dotnet.microsoft.com/download/dotnet-framework/net47)。

在 **References** 上单击鼠标右键，然后单击 **Add Reference** 和 **Browse** 找到 `RevitAPI.dll`（默认情况下位于 _C:\Program Files\Autodesk\Revit 201x_ 文件夹下）。然后在此 **RevitAPI** 参考上单击鼠标右键，转到 **Properties**，然后将 **Copy Local** 设置为 **False**。

然后，在项目上单击鼠标右键，转到 **Manage NuGet Packages...**，在 **Browse** 下，可以搜索 **DesignAutomation.Revit** 并安装 `Autodesk.Forge.DesignAutomation.Revit`（选择所需的相应 Revit 版本）。然后搜索并安装 `Newtonsoft.Json`（用于解析 JSON 格式的输入数据）。 

![](_media/designautomation/revit/new_project.gif)

[package.config](_snippets/modifymodels/engines/revit/package.config ':include :type=code xml')

项目应包含 `Class1.cs` 类，为了保持一致，我们将文件重命名为 `Commands.cs`。 

此时，项目应如下所示：

![](_media/designautomation/revit/project_files.png)

## Commands.cs

这是将与 Revit 一起运行的主要代码。将以下内容复制到 `Commands.cs`。主要关注点是在应用程序准备运行时触发的 `DesignAutomationReadyEvent` 事件。`HandleDesignAutomationReadyEvent` 实现了我们的自定义代码。

[Commands.cs](_snippets/modifymodels/engines/revit/Commands.cs ':include :type=code csharp')

## PackageContents.xml

创建一个名为 `UpdateRVTParam.bundle` 的文件夹，并在其中创建一个名为 `PackageContents.xml` 的文件，然后将以下内容复制到文件中。有关详细信息，请参见 [PackageContents.xml 格式参考](https://knowledge.autodesk.com/search-result/caas/CloudHelp/cloudhelp/2016/ENU/AutoCAD-Customization/files/GUID-BC76355D-682B-46ED-B9B7-66C95EEF2BD0-htm.html)。此文件告知 Revit 加载我们的 `.addin` 插件。

[PackageContents.xml](_snippets/modifymodels/engines/revit/PackageContents.xml ':include :type=code xml')

## Autodesk.Forge.Sample.DesignAutomation.Revit.addin

在 `UpdateRVTParam.bundle` 文件夹下，创建一个名为 `Contents` 的子文件夹，并在此文件夹内创建一个名为 `Autodesk.Forge.Sample.DesignAutomation.Revit.addin` 的新文件。这将告知 Revit 如何加载插件。

[Autodesk.Forge.Sample.DesignAutomation.Revit.addin](_snippets/modifymodels/engines/revit/Autodesk.Forge.Sample.DesignAutomation.Revit.addin ':include :type=code xml')

此时，项目应如下所示：

![](_media/designautomation/revit/bundle_folders.png)

## 生成后事件

> 对于 Node.js，需要调整应用程序包 ZIP 输出文件夹。

现在，我们需要压缩 .bundle 文件夹。在项目上单击鼠标右键，选择 **Properties**，然后打开 **Build Events**，并将以下内容复制到 **Post-build event command line** 字段中，如下图所示。

```
xcopy /Y /F "$(TargetDir)*.dll" "$(ProjectDir)UpdateRVTParam.bundle\Contents\"
del /F "$(ProjectDir)..\forgesample\wwwroot\bundles\UpdateRVTParam.zip"
"C:\Program Files\7-Zip\7z.exe" a -tzip "$(ProjectDir)../forgesample/wwwroot/bundles/UpdateRVTParam.zip" "$(ProjectDir)UpdateRVTParam.bundle\" -xr0!*.pdb
```

这会将 DLL 从 /bin/debug/ 复制到 .bundle/Contents 文件夹，然后使用 [7zip](https://www.7-zip.org/) 创建一个 zip，最后将 ZIP 复制到 Web 应用程序的 /bundles 文件夹。

![](_media/designautomation/revit/post_build.png)

> 请注意**生成后事件**如何使用项目和文件夹名称，确保您使用的是这些名称。

如果现在构建 `UpdateRVTParam` 项目，您应该会在 **Output** 窗口中看到类似的内容。请注意压缩的 2 个文件夹和 3 个文件。压缩文件直接在 /wwwroot/bundles 文件夹中创建。这意味着您做得很好！

![](_media/designautomation/revit/build_output.png)

!> 如果生成输出显示复制的内容超过 **2 个文件夹，5 个文件**，请返回并确保 **RevitAPI** 参考已设置为 **Copy Local**:**False**。您可能需要从 `UpdateRVTParam.bundle/Contents/` 文件夹中删除所有 DLL

下一步：[上传插件](/zh-CN/designautomation/appbundle/common)