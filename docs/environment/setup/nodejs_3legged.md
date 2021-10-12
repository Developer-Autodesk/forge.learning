# Create a new project (Node.js)

Create a folder on your machine, do not use spaces and avoid special chars. For this tutorial, let's use **forgesample**.

Open **Visual Studio Code**, then go to menu **File** and select **Open** (MacOS) or **Open Folder** (Windows) and select the newly created folder. 

Now we need the terminal, go to menu **View** >> **Integrated Terminal**. A window should appear on the bottom. Type the following command and follow the steps. For consistency with other Forge samples, when prompted for **entry point:**, use **start.js**.

```
npm init
```

This creates the **package.json** file, which defines which packages our project will be using. [Learn more](https://docs.npmjs.com/files/package.json).

## Install packages

By default, a Node.js project is empty, so we need to install a few packages with **npm install**. Let's start with a basic **express** server, **cookie-session** for handling authentication session data, **multer** for file upload and, of course, **Autodesk Forge**.

!> Run one **npm install** at a time.

```
npm install express --save
npm install cookie-session --save
npm install forge-apis --save
```

> The `--save` parameter indicates that the module should be included in the **package.json** file as a dependency.

Finally open the **package.json** and, inside `"scripts"`, add `"start": "node start.js",` line. Now your folder should have a **node_modules** folder and your **package.json** should look like this:

[package.json](_snippets/viewhubmodels/node/package.json ':include :type=code json')

> The version number (e.g. forge-apis 0.4.1) may vary, it was the latest version when this tutorial was created.

## Files and Folders

To create a new folder or file, right-click on the "Explorer" area on the left and select **New Folder** or **New File**.

Create a **/routes/** folder for all server-side files and a **/public/** folder for all client-side files.

At this point, you project should have the following structure:

![](_media/nodejs/vs_code_explorer.png) 

> The **package-lock.json** was created by **npm**, don't worry

## launch.json

This file indicates to Visual Studio Code how we should run our project. Go to menu **Debug** >> **Add Configuration...** and, in the **Select Environment** window that appears on the top, choose **Node.js**. In the **/.vscode/launch.json** file that is created, enter the following:

!> Note you need to enter your **Forge Client ID & Secret** at the indicated space.

[launch.json](_snippets/viewhubmodels/node/launch.json ':include :type=code json')

> It's important to define **ID & Secret** as environment variables so our project can later be deployed online. More on this later, in **Deployment**.

## start.js

In the root folder, create a `start.js` file with:

!> File names are case-sensitive for some deployments, like **Heroku**. For this tutorial, let's use lower-case.

[start.js](_snippets/viewhubmodels/node/start.js ':include :type=code javascript')

This file starts an **express** server, serves static files (e.g. `html`), and routes API requests.

## config.js

In the root folder, create a file named `config.js` with the following content:

[config.js](_snippets/viewhubmodels/node/config.js ':include :type=code javascript')

We are defining our ENV variables here. At the time of running our Express server, the values of these variables will be use to connect to the different Autodesk Forge services we will need.

Last we see there are 2 scope definitions. The internal scopes give our access token the right permission for the use of the different services of the Forge Web Services (server-side). This tutorial is dedicated to the use of the Viewer, we will only need the "viewables:read" scope for public.

The project is ready! At this point your project should look like this:

![](_media/nodejs/vs_code_project.png) 

Next: [Authorize](oauth/3legged/)
