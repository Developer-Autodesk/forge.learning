# Create a new project (Node.js)

Create a folder on your machine, do not use spaces and avoid special chars. For this tutorial, let's use **forgesample**.

Open [Visual Studio Code](https://code.visualstudio.com/download), then go to menu **File** and select **Open** (MacOS) or **Open Folder** (Windows) and select the newly created folder. 

Now we need the terminal, go to menu **View** >> **Terminal**. A window should appear on the bottom. Type the following command and follow the steps, you can safely accept the default suggestion, except **entry point:**, use **start.js** (which is used on most of Forge samples).

```
npm init
```

This creates the **package.json** file, which defines which packages our project will be using. [Learn more](https://docs.npmjs.com/files/package.json).

## Install packages

By default, a Node.js project is empty, so we need to install a few packages with **npm install**. Let's start with a basic **express** server, **body-parser** for JSON handling, **multer** for file upload and, of course, **Autodesk Forge**.

!> Run one **npm install** at a time.

```
npm install express --save
npm install multer --save
npm install cookie-session --save
npm install forge-apis --save
npm install autodesk.forge.designautomation --save
npm install body-parser --save
npm install form-data --save
npm install socket.io --save
```

> The `--save` parameter indicates that the module should be included in the **package.json** file as a dependency.

Finally open the **package.json** and, inside `"scripts"`, add `"start": "node start.js",` line. Now your folder should have a **node_modules** folder and your **package.json** should look like this:

[package.json](_snippets/modifymodels/node/package.json ':include :type=code json')

> The version number (e.g. forge-apis 0.8.5) may vary, it was the latest version when this tutorial was created.

## Files and Folders

To create a new folder or file, right-click on the "Explorer" area on the left and select **New Folder** or **New File**.

Create a **/routes/** folder for all server-side files and a **/public/** folder for all client-side files.

At this point, you project should have the following structure:

![](_media/nodejs/vs_code_explorer_da.png) 

## launch.json

This file indicates to Visual Studio Code how we should run our project. Go to menu **Run** >> **Add Configuration...** and, in the **Select Environment** window that appears on the top, choose **Node.js**. In the **/.vscode/launch.json** file that is created, enter the following:

!> Note you need to enter your **Forge Client ID & Secret** at the indicated space.

[launch.json](_snippets/modifymodels/node/launch.json ':include :type=code json')

> It's important to define **ID & Secret** as environment variables so our project can later be deployed online. More on this later, in **Deployment**.

## start.js

This file starts an **express** server. In the root folder, create a `start.js` file with:

!> File names are case-sensitive for some deployments, like **Heroku**. For this tutorial, let's use lower-case.

[start.js](_snippets/modifymodels/node/start.js ':include :type=code javascript')

## server.js

This file serves static files (e.g. `html`), and routes API requests. In the root folder, create a file named `server.js` with the following content:

[server.js](_snippets/modifymodels/node/server.js ':include :type=code javascript')

## socket.io.js

In the root folder, create a file named `socket.io.js` with the following content:

[socket.io.js](_snippets/modifymodels/node/socket.io.js ':include :type=code javascript')

## config.js

In the root folder, create a file named `config.js` with the following content:

[config.js](_snippets/modifymodels/node/config.js ':include :type=code javascript')

We are using the environment variables here. At the time of running our Express server, the values of these variables will be used to connect to Autodesk Forge.
com

## routes/common/oauth.js

Now create a `common` subfolder in the `routes` folder, and prepare a `routes/common/oauth.js` file that will actually request
the access token from Forge. This will be reused in other parts of this tutorial.

[routes/common/oauth.js](_snippets/modifymodels/node/routes/common/oauth.js ':include :type=code javascript')

The project is ready! At this point your project should look like this:

![](_media/nodejs/vs_code_project_da.PNG) 

> The **package-lock.json** was created by **npm**, don't worry

Next: [Basic app UI](designautomation/html/README.md)
