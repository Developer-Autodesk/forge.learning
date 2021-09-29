# 准备 Inventor 包

此步骤将帮助您创建基本 Inventor 插件。有关详细信息，请访问[我的第一个 Inventor 插件](https://knowledge.autodesk.com/support/inventor-products/learn-explore/caas/simplecontent/content/my-first-inventor-plug-overview.html)教程。

> 您可以[下载包 ZIP 文件](https://github.com/Autodesk-Forge/learn.forge.designautomation/raw/master/forgesample/wwwroot/bundles/UpdateIPTParam.zip)到 `bundles/` (Node.js) 或 `/forgeSample/wwwroot/bundles` (.NET Core) 文件夹，并[跳过此部分](/zh-CN/designautomation/appbundle/common.md)

## 前提条件

- **Design Automation for Inventor** 模板：转到 Visual Studio Market Place，从[此链接](https://marketplace.visualstudio.com/items?itemName=Autodesk.DesignAutomation)下载并打开它，然后按照步骤进行安装。

![](_media/designautomation/inventor/da4inventor_template.png)

## 创建新项目

在解决方案上单击鼠标右键，然后单击 **Add** >> **New Project**。搜索 **Inventor** 模板，然后单击 **Plugin project**，最后将其命名为 `UpdateIPTParam`。在项目上单击鼠标右键，转到 **Manage NuGet Packages...**，在 **Browse** 下，可以选择 `Newtonsoft.Json` 并更新（此软件包已在解决方案中，如果没有，请进行安装）

> 请选择 .NET Framework 4.7。如果未列出，请[安装开发包](https://dotnet.microsoft.com/download/dotnet-framework/net47)。

![](_media/designautomation/inventor/new_project.gif)

## SampleAutomation.cs

打开 `SampleAutomation.cs` 文件，然后将以下内容复制到文件中。此时，参数在 `Run` 方法下更新。

[SampleAutomation.cs](_snippets/modifymodels/engines/inventor/SampleAutomation.cs ':include :type=code csharp')

## 生成后事件

> 对于 Node.js，需要调整 AppBundle ZIP 输出文件夹。

现在，我们需要压缩 .bundle 文件夹。在项目上单击鼠标右键，选择 **Properties**，然后打开 **Build Events**，并将以下内容复制到 **Post-build event command line** 字段中，如下图所示。

```
xcopy /Y /F "$(ProjectDir)PackageContents.xml" "$(TargetDir)\Bundle\$(MSBuildProjectName).bundle\"
xcopy /Y /F "$(TargetDir)*.*" "$(TargetDir)\Bundle\$(MSBuildProjectName).bundle\Contents\"
del /F "$(ProjectDir)..\forgesample\wwwroot\bundles\UpdateIPTParam.zip"
"C:\Program Files\7-Zip\7z.exe" a -tzip "$(ProjectDir)../forgesample/wwwroot/bundles/UpdateIPTParam.zip" "$(TargetDir)\bundle\$(MSBuildProjectName).bundle\" -xr0!*.pdb
```

这会将 DLL 从 /bin/debug/ 复制到 .bundle/Contents 文件夹，然后使用 [7zip](https://www.7-zip.org/) 创建一个 zip，最后将 ZIP 复制到 Web 应用程序的 /bundles 文件夹。

![](_media/designautomation/inventor/post_build.png)

如果现在构建 `UpdateIPTParam` 项目，您应该会在 **Output** 窗口中看到类似的内容。请注意压缩的 2 个文件夹和多个文件。压缩文件直接在 /wwwroot/bundles 文件夹中创建。这意味着您做得很好！

![](_media/designautomation/inventor/build_output.png)

下一步：[上传插件](/zh-CN/designautomation/appbundle/common)