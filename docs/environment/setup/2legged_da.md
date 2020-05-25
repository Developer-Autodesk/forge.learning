# Create a server

Your Client ID & Secret should be protected and keep confidential as all your files will be bound to your account. For a web application, keep it on your server. This section demonstrate how to prepare create a local development server.

### Prerequisites

> If you are going to develop your own plugin for app bundle, following 1 and 2 softwares are required, for learning purpose it's recommended to use sample app bundle which will be provided in this tutorial later, in this case only install 3)ngrok.
If your preffered language is .netcore install 1)Visual Studio as well.

**1. Visual Studio**

Visual Studio 2017 or newer is required, please visit [this link](https://visualstudio.microsoft.com/vs/).

**2. AutoCAD, Inventor or Revit**

In order to develop, test and debug your Design Automation plugin: [AutoCAD](https://www.autodesk.com/products/autocad/overview) | [Inventor](https://www.autodesk.com/products/inventor/overview) | [Revit](https://www.autodesk.com/products/revit/overview).

**3. ngrok**

When Design Automation finishes modifying your model, it notifies back. As your machine is not exposed on the web, the [ngrok](https://ngrok.com/) tool create a temporary address to receive notifications. This tool is only required locally. 

After download, unzip it. Open the Windows **Command Line Prompt** (CMD) and navigate to the folder. Then run `ngrok http 3000 -host-header="localhost:3000"`. Copy the **forwarding** URL value (in the form of `http://1ab2c3d4.ngrok.com`)

![](/_media/designautomation/ngrok.gif)

> If running on non-Windows (e.g. MacOS), open the **Terminal** instead and follow the same steps.

!> **Warning**: `ngrok` exposes your localhost server to the web while it is in use. Be sure to turn it off when your testing it done. Do not use this outside development environment


Setup Project, choose your language: [Node.js](environment/setup/nodejs_2legged_da) | [.NET Core](environment/setup/netcore_da)