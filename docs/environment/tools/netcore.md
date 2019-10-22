# Tools (.NET Core)

The .NET Core **SDK** and **Runtime** may need to be installed on your machine, please visit [.NET Core Downloads](https://dotnet.microsoft.com/download). 

!> For **Modify your models** tutorials you need Visual Studio. Other tutorials can be done with Visual Code.

## Visual Studio (Windows)

Any flavor of [Visual Studio](https://visualstudio.microsoft.com/vs/). Choose your preffered edition in dropdown.

In Visual Studio 2019, there is no workloads tab in the beginning, `ASP.NET Core web development with c#` is selected while creating project.

## Older versions

If you are installing Visual Studio Community for the first time, make sure to select `ASP.NET and web development` workload for this tutorial. `.NET desktop development` worflow is need for **Design Automation** tutorial: **Modify my models**. Other **Workloads** are not required for this tutorial.

In case Visual Studio Community is already installed, go to **Add or remove programs** >> **Apps & Features**, find Visual Studio Community and click **Modify**, then select the workload (as shown below). 

![](_media/net/install_webcomponents.png)

## Visual Code (Windows/MacOS/Linux)

As an alternative solution, you may use [Visual Code](https://code.visualstudio.com/). This requires the **C#** extension. Remember to install .NET Core SDK and Runtime.

![](_media/net/csharp_extension.png)

## Other flavors

For this tutorial, we don't need Professional or Enterprise features

.NET Core is not supported on older versions of Visual Studio.

Next: [Authentication](oauth/)