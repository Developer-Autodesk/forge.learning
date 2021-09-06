# 工具 (.NET Core)

.NET 引擎是 Windows 计算机上的内置功能，.NET Core 随 Visual Studio 一起安装。

## Visual Studio Community 2019

可以使用任何版本的 [Visual Studio](https://visualstudio.microsoft.com/vs/)，目前本教程使用 **Community** 版本。[下载安装程序](https://visualstudio.microsoft.com/vs/)并按照步骤操作，确保选择 **ASP.NET and web development** 和 **.NET desktop development**（**修改模型**教程需要）。

!> 为了获得更好的体验，请勿在本教程中使用 Visual Code。

![](_media/net/workloads_2019.png)


## 其他版本和先前版本

> 在本教程中，我们不需要 Professional 或 Enterprise 功能

!> .NET Core 在 Visual Studio 2015 中**不**受支持，.NET Core 3.0 在 Visual Studio 2017 中**不**受支持。

为了获得更好的体验，请使用 2019 版本。如果必须使用已安装的先前版本（例如 Visual Studio Professional 2017），请转至“Add or remove programs”>>“Apps & Features”，找到“Visual Studio Community”并单击“Modify”，然后选择“Workloads”（如下所示）。**修改模型**教程需要 **.NET 桌面开发**。

![](_media/net/workloads_2017.png)

> 确保已安装 [.NET Core 3.0 SDK](https://dotnet.microsoft.com/download)。

## Visual Code (MacOS/Linux)

另一种解决方案是，您可以使用 [Visual Code](https://code.visualstudio.com/)。这需要 **C#** 扩展。请记得安装 [.NET Core 3.0 SDK 和运行时](https://dotnet.microsoft.com/download)。 

> 需要 Visual Studio（适用于 Windows）来编译**修改模型**教程的插件。

![](_media/net/csharp_extension.png)

下一步：[身份验证](/zh-CN/oauth/)