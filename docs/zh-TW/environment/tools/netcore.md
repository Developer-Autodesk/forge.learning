# 開發工具及環境準備 (.NET Core)

.NET 引擎是 Windows 電腦上的內建功能，.NET Core 會隨 Visual Studio 一起安裝。

## Visual Studio Community 2019

[Visual Studio](https://visualstudio.microsoft.com/vs/) 的任何產品版本均可，本自學課程使用的是 **Community** 版本。[下載安裝程式](https://visualstudio.microsoft.com/vs/)並遵循以下步驟，確保選取 **ASP.NET and web development** 和 **.NET desktop development** (在**「修改模型」**自學課程中需要)。

!> 為了獲得更佳的學習體驗，請不要在本自學課程中使用 Visual Studio Code。

![](_media/net/workloads_2019.png)


## 其他產品版本和舊版本

> 在本自學課程中，我們不需要 Professional 或 Enterprise 功能

!> 在 Visual Studio 2015 中**不**支援 .NET Core，在 Visual Studio 2017 中**不**支援 .NET Core 3.0。

為了獲得更佳的學習體驗，請使用 2019 版。如果您必須使用已安裝的舊版本 (例如 Visual Studio Professional 2017)，請移往「新增或移除程式」>>「應用程式與功能」，找到 Visual Studio Community 並按一下「修改」，然後選取需要的安裝項目 (如下所示)。在**「修改模型」**自學課程中需要 **.NET desktop development**。

![](_media/net/workloads_2017.png)

> 確保已安裝 [.NET Core 3.0 SDK](https://dotnet.microsoft.com/download)。

## Visual Studio Code (MacOS/Linux)

您可以使用 [Visual Studio Code](https://code.visualstudio.com/) 作為替代解決方案。這需要 **C#** 擴充功能。請務必安裝 [.NET Core 3.0 SDK 和 Runtime](https://dotnet.microsoft.com/download)。 

> 在**「修改模型」**自學課程中編譯外掛程式需要 Visual Studio (適用於 Windows)。

![](_media/net/csharp_extension.png)

下一步：[驗證](/zh-TW/oauth/)