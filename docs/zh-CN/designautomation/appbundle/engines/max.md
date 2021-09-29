# 准备 3ds Max 包

此步骤将帮助您创建用于 Design Automation 的基本 3ds Max 插件。整个教程使用 Microsoft .NET Framework，包括 3ds Max 插件。请注意，3ds Max 可以通过 MAXScript、Python、NET API 和 C++ 实现自动化。3ds Max .NET API 可能不是插件最常用的 API，但是，对于其他 Design Automation 产品，它是典型的 API。可在此处找到用于 .NET API 的 3ds Max 资源（2019 链接，但 3ds Max Design Automation 引擎的所有可用版本均支持 .NET API）：* [编写 3ds Max .NET 插件](http://help.autodesk.com/view/3DSMAX/2019/ENU/?guid=__developer_3ds_max_sdk___the_learning_path_lesson_7_writing__net_plug_ins_html) * [3ds Max .NET SDK](http://help.autodesk.com/view/3DSMAX/2019/ENU/?guid=__developer_3ds_max__net_sdk_html) * [GetCOREInterface 博客 .NET 示例](https://getcoreinterface.typepad.com/blog/2017/10/updated-net-api-samples-for-3ds-max-2018.html)

请记住，对于 Design Automation，不应出现无法自动化的 UI 或提示。要自动执行 3ds Max DA 引擎，必须提供一些 MAXScript。这通常非常简单，因为大多数自定义可以快速向 MAXScript 公开（请参见 [C++ 函数发布](http://help.autodesk.com/view/3DSMAX/2019/ENU/?guid=__developer_3ds_max_sdk_features_function_publishing_html)和 [MAXScript .NET 处理](http://help.autodesk.com/view/3DSMAX/2019/ENU/?guid=GUID-779FD7AC-953D-4567-B2A8-60B1D8695B95)）

> 您可以[下载包 ZIP 文件](https://github.com/Autodesk-Forge/learn.forge.designautomation/raw/master/forgesample/wwwroot/bundles/UpdateMAXParam.zip)到 `bundles/` (Node.js) 或 `/forgeSample/wwwroot/bundles` (.NET Core) 文件夹，并[跳过此部分](/zh-CN/designautomation/appbundle/common.md)

## 创建新的 .NET 项目

在解决方案上单击鼠标右键，然后单击 **Add** >> **New Project**。选择 **Windows Desktop**，然后选择 **Class Library**，最后将其命名为 `UpdateMAXParam`。然后，您需要参考 Autodesk.Max.Dll 托管程序集（3ds Max .NET API 核心模块）。此模块位于 3dsmax.exe 文件夹中，在参考时，请确保禁用“Copy Local”标志。还有一些其他模块可用于支持 .NET API（请参见 [3ds Max .NET SDK](http://help.autodesk.com/view/3DSMAX/2019/ENU/?guid=__developer_3ds_max__net_sdk_html)），但在本教程中，我们将仅使用 Autodesk.Max.dll。然后搜索并安装 `Newtonsoft.Json`（用于解析 JSON 格式的输入数据）。

> 请选择 .NET Framework 4.7。如果未列出，请[安装开发包](https://dotnet.microsoft.com/download/dotnet-framework/net47)。

![](_media/designautomation/max/new_project.gif)

因此，对于 Newtonsoft.Json 模块，**package.config** 应如下所示。

[package.config](_snippets/modifymodels/engines/max/package.config ':include :type=code xml')

项目应包含 `Class1.cs` 类，为了保持一致，我们将文件重命名为 `Command.cs`。 

## Commands.cs

这是将与 3ds Max 一起运行的主要代码。将以下内容复制到 `Command.cs`。有三个类可用于进行 Design Automation 处理。第一个是 `InputParams` 类，用于与 JSON 输入数据交互。第二个是 `ParameterChanger` 类，用于迭代场景，并查找所有平开窗（但可以是类 ID 标识的任何 object 类型）。第三个是 `RuntimeExecute` 类，用于获取输入并驱动自动化。另请注意，有一个专门的日志记录，可将信息输出到 Design Automation 控制台。请参见 LogTrace 函数。请注意，`ILogSys` 3ds Max 托管类用于此操作，并且与所指示的 `LogEntry` API 一起使用的标志对于在 Design Automation 控制台中显示输出是必需的。 

[Commands.cs](_snippets/modifymodels/engines/max/Commands.cs ':include :type=code csharp')

## PackageContents.xml

创建一个名为 `UpdateMAXParam.bundle` 的文件夹，然后在此文件夹中添加一个名为 `PackageContents.xml` 的文件。将下面列出的 XML 部分中的内容复制到 PackageContents.xml 文件。有关详细信息，请参见 [PackageContents.xml 格式参考](https://knowledge.autodesk.com/search-result/caas/CloudHelp/cloudhelp/2016/ENU/AutoCAD-Customization/files/GUID-BC76355D-682B-46ED-B9B7-66C95EEF2BD0-htm.html)。有关打包 3ds Max 插件的更多 3ds Max 特定信息，请参见此处的[打包插件](http://help.autodesk.com/view/3DSMAX/2019/ENU/?guid=__developer_writing_plug_ins_packaging_plugins_html)

此文件将告知 3ds Max 要加载的模块（在本例中是我们正在创建的 .NET API 插件程序集，但也可以包含 MAXScript、Python 和/或 C++ 插件）。 由于插件通过此功能加载，因此您只需关注触发自动化作业的说明。请注意，3ds Max 需要具有 ProductCode 和 UpgradeCode 的唯一 ID 才能正确加载代码。有关详细信息，请参见上述文档。

[PackageContents.xml](_snippets/modifymodels/engines/max/PackageContents.xml ':include :type=code xml')

最后，创建一个名为 `Contents` 的子文件夹，并将其保留为空。此时，项目应如下所示：

![](_media/designautomation/max/bundle_folders.png)

## 生成后事件

> 对于 Node.js，需要调整 AppBundle ZIP 输出文件夹。

现在，我们需要压缩 .bundle 文件夹。在项目上单击鼠标右键，选择 **Properties**，然后打开 **Build Events**，并将以下内容复制到 **Post-build event command line** 字段中，如下图所示。

```
xcopy /Y /F "$(TargetDir)*.dll" "$(ProjectDir)UpdateMAXParam.bundle\Contents\"
del /F "$(ProjectDir)..\forgesample\wwwroot\bundles\UpdateMAXParam.zip"
"C:\Program Files\7-Zip\7z.exe" a -tzip "$(ProjectDir)../forgesample/wwwroot/bundles/UpdateMAXParam.zip" "$(ProjectDir)UpdateMAXParam.bundle\" -xr0!*.pdb
```

这会将 DLL 从 /bin/debug/ 复制到 .bundle/Contents 文件夹，然后使用 [7zip](https://www.7-zip.org/) 创建一个 zip，最后将 ZIP 复制到 Web 应用程序的 /bundles 文件夹。

![](_media/designautomation/max/post_build.png)
> 请注意**生成后事件**如何使用项目和文件夹名称，确保您使用的是这些名称。

如果现在构建 `UpdateMAXParam` 项目，您应该会在 **Output** 窗口中看到类似的内容。请注意压缩的 2 个文件夹和 3 个文件。压缩文件直接在 /wwwroot/bundles 文件夹中创建。这意味着您做得很好！

![](_media/designautomation/max/build_output.png)

此时，您可以使用 3ds Max 批处理工具测试该功能。它的工作方式与 3ds Max Design Automation 引擎类似，是在将作业发送到 Forge DA 远程服务之前在本地测试所有自动化的好方法。对于要在 MAXScript 环境中实例化的 .NET 类，我们可以使用 `dotNetClass` MAXScript 函数。对于此示例项目，MAXScript 代码如下所示：

```MAXScript
fn UpdateParam =
(
	da = dotNetClass("Autodesk.Forge.Sample.DesignAutomation.Max.RuntimeExecute")
	da.ModifyWindowWidthHeight()
)

UpdateParam()
```

要在本地执行此操作，我们可以使用类似以下内容测试命令行提示：
```CommandLine
"%ADSK_3DSMAX_x64_2019%\3dsmaxbatch.exe" -sceneFile <myTestScene>.max da_script.ms
```
在本教程的后面部分，您将看到这些相同的指令被发送到 3ds Max Design Automation 引擎。

下一步：[上传插件](/zh-CN/designautomation/appbundle/common)