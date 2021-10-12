# 创建服务器

您的 Client ID 和 Secret 应受到保护并保持机密，因为您的所有文件都将绑定到您的帐户。对于 Web 应用程序，请将其保留在您的服务器上。本部分演示如何准备创建本地开发服务器。

### 前提条件

**1. Visual Studio**

需要使用 Visual Studio 2017 或更高版本，请访问[此链接](https://visualstudio.microsoft.com/vs/)。

**2. AutoCAD、Inventor 或 Revit**

为了开发、测试和调试 Design Automation 插件：[AutoCAD](https://www.autodesk.com/products/autocad/overview) | [Inventor](https://www.autodesk.com/products/inventor/overview) | [Revit](https://www.autodesk.com/products/revit/overview)。

**3\. ngrok**

Design Automation 完成模型修改后会发回通知。由于您的计算机未在 Web 上公开，因此 [ngrok](https://ngrok.com/) 工具会创建一个临时地址来接收通知。只需要在本地使用此工具。 

下载后，将其解压缩。打开 Windows **命令行提示符** (CMD) 并导航到该文件夹。然后运行 `ngrok http 3000 -host-header="localhost:3000"`。复制**转发** URL 值（格式为 `http://1ab2c3d4.ngrok.com`）

![](/_media/designautomation/ngrok.gif)

> 如果在非 Windows（例如 MacOS）上运行，请改为打开**终端**，然后按照相同步骤操作。

!> **警告**：使用 `ngrok` 时，它会在 Web 上公开您的本地主机服务器。请务必在完成测试后将其关闭。请勿在开发环境之外使用它

下一步：[设置项目](/zh-CN/environment/setup/netcore_da)