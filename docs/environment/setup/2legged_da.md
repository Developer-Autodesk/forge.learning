# Create a server

Your Client ID & Secret should be protected and keep confidential as all your files will be bound to your account. For a web application, keep it on your server. This section demonstrate how to prepare create a local development server.

Please review [Tools](environment/tools/) section for required software.

### Prerequisites

**ngrok**

When Design Automation finishes modifying your model, it notifies back. As your machine is not exposed on the web, the [ngrok](https://ngrok.com/) tool create a temporary address to receive notifications. This tool is only required locally. 

After download, unzip it. Open the Windows **Command Line Prompt** (CMD) and navigate to the folder. Then run `ngrok http 3000 -host-header="localhost:3000"`. Copy the **forwarding** URL value (in the form of `http://1ab2c3d4.ngrok.com`)

![](/_media/designautomation/ngrok.gif)

> If running on non-Windows (e.g. MacOS), open the **Terminal** instead and follow the same steps, but you need to prefix with `./`

!> **Warning**: `ngrok` exposes your localhost server to the web while it is in use. Be sure to turn it off when your testing it done. Do not use this outside development environment

Setup Project, choose your language: [Node.js](environment/setup/nodejs_da) | [.NET Core](environment/setup/netcore_da)