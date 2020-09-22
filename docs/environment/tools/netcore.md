# Tools (.NET Core)

The .NET engine is a built-in feature on Windows machines, .NET Core is installed with Visual Studio.

## Visual Studio Community 2019

Any flavor of [Visual Studio](https://visualstudio.microsoft.com/vs/), this tutorial uses the **Community** edition. [Download the installer](https://visualstudio.microsoft.com/vs/) and follow the steps, make sure to select **ASP.NET and web development** and **.NET desktop development** (required for **Modify your models** tutorial).

!> For a better experience, DO NOT use Visual code on this tutorial.

![](_media/net/workloads_2019.png)


## Other flavors & older versions

> For this tutorial, we don't need Professional or Enterprise features

!> .NET Core is **NOT** supported in Visual Studio 2015 and .NET Core 3.0 is **NOT** supported in Visual Studio 2017.

For a better experience, use the 2019 version. If you must use older versions already installed (e.g. Visual Studio Professional 2017), go to Add or remove programs >> Apps & Features, find Visual Studio Community and click Modify, then select the workload (as shown below). **.NET desktop development** is required for for **Modify your models** tutorial.

![](_media/net/workloads_2017.png)

> Make sure the [.NET Core 3.0 SDK](https://dotnet.microsoft.com/download) is installed.

## Visual Code (MacOS/Linux)

As an alternative solution, you may use [Visual Code](https://code.visualstudio.com/). This requires the **C#** extension. Remember to install [.NET Core 3.0 SDK and Runtime](https://dotnet.microsoft.com/download). 

> Visual Studio (for Windows) is required to compile plugins for **Modify your models** tutorial.

![](_media/net/csharp_extension.png)

Next: [Authentication](oauth/)