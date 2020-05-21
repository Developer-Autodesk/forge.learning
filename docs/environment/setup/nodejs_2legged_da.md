# Create a new project (Node.js)

Create a folder on your machine, do not use spaces and avoid special chars. For this tutorial, let's use **forgesample**.

Open **Visual Code**, then go to menu **File** and select **Open** (MacOS) or **Open Folder** (Windows) and select the newly created folder. 

Now we need the terminal, go to menu **View** >> **Integrated Terminal**. A window should appear on the bottom. Type the following command and follow the steps. For consistency with other Forge samples, when prompted for **entry point:**, use **start.js**.

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

```json
{
  "name": "forgesample",
  "version": "1.0.0",
  "description": "",
  "main": "start.js",
  "scripts": {
    "start": "node start.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "autodesk.forge.designautomation": "^3.0.3",
    "body-parser": "^1.19.0",
    "cookie-session": "^1.4.0",
    "express": "^4.17.1",
    "forge-apis": "^0.4.8",
    "form-data": "^2.5.1",
    "multer": "^1.4.2",
    "socket.io": "^2.3.0"
  }
}

```

> The version number (e.g. forge-apis 0.4.8) may vary, it was the latest version when this tutorial was created.

## Files and Folders

To create a new folder or file, right-click on the "Explorer" area on the left and select **New Folder** or **New File**.

Create a **/routes/** folder for all server-side files and a **/public/** folder for all client-side files.

At this point, you project should have the following structure:

![](_media/nodejs/vs_code_explorer.png) 

## launch.json

This file indicates to Visual Studio Code how we should run our project. Go to menu **Debug** >> **Add Configuration...** and, in the **Select Environment** window that appears on the top, choose **Node.js**. In the **/.vscode/launch.json** file that is created, enter the following:

!> Note you need to enter your **Forge Client ID & Secret** at the indicated space.

```json
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch Program",
            "program": "${workspaceFolder}/start.js",
            "env": {
                "FORGE_CLIENT_ID": "your id here",
                "FORGE_CLIENT_SECRET": "your secret here",
                "FORGE_WEBHOOK_URL": "your ngrok url"
            }
        }
    ]
}
```

> It's important to define **ID & Secret** as environment variables so our project can later be deployed online. More on this later, in **Deployment**.

## start.js

In the root folder, create a `start.js` file with:

!> File names are case-sensitive for some deployments, like **Heroku**. For this tutorial, let's use lower-case.

```javascript
const app = require('./routes/server');
const socketIO = require('./routes/socket.io')(app);

let server = socketIO.http.listen(app.get('port'), () => {
    console.log(`Server listening on port ${app.get('port')}`);
});

server.on('error', (err) => {
    if (err.errno === 'EACCES') {
        console.error(`Port ${app.get('port')} already in use.\nExiting...`);
	    process.exit (1) ;
	}
}) ;
```

This file starts an **express** server.

## server.js

In the root folder, create a file named `server.js` with the following content:

```javascript
const _path = require('path');
const express = require('express');
const cookieSession = require('cookie-session');
const config = require('../config');
if (!config.credentials.client_id || !config.credentials.client_secret)
	return (console.error('Missing FORGE_CLIENT_ID or FORGE_CLIENT_SECRET env variables.'));

let app = express();
app.use(express.static(_path.join(__dirname, '../public')));
app.use(cookieSession({
	name: 'forge_session',
	keys: ['forge_secure_key'],
	maxAge: 60 * 60 * 1000 // 1 hour, same as the 2 legged lifespan token
}));
app.use(express.json({
	limit: '50mb'
}));
app.use('/api/forge', require('./oauth'));
app.use('/api', require('./DesignAutomation'));

app.set('port', process.env.PORT || 3000);

module.exports = app;
```

This file serves static files (e.g. `html`), and routes API requests.


## config.js

In the root folder, create a file named `config.js` with the following content:

```javascript
// Autodesk Forge configuration
module.exports = {
    // Set environment variables or hard-code here
    credentials: {
        client_id: process.env.FORGE_CLIENT_ID,
        client_secret: process.env.FORGE_CLIENT_SECRET,
        callback_url: process.env.FORGE_CALLBACK || process.env.FORGE_CALLBACK_URL,
        webhook_url: process.env.FORGE_WEBHOOK_URL
    },
    scopes: {
        // Required scopes for the server-side application
        internal: ['bucket:create', 'bucket:read', 'bucket:delete', 'data:read', 'data:create', 'data:write', 'code:all'],
        // Required scope for the client-side viewer
        public: ['viewables:read']
    },
    client: {
        circuitBreaker: {
			threshold: 11,
			interval: 1200
		},
		retry: {
			maxNumberOfRetries: 7,
			backoffDelay: 4000,
			backoffPolicy: 'exponentialBackoffWithJitter'
		},
		requestTimeout: 13000
    }
};
```

We are defining our ENV variables here. At the time of running our Express server, the values of these variables will be use to connect to the different Autodesk Forge services we will need.

Last we see there are 2 scope definitions. The internal scopes give our access token the right permission for the use of the different services of the Forge Web Services (server-side). This tutorial is dedicated to the use of the Viewer, we will only need the "viewables:read" scope for public.

The project is ready! At this point your project should look like this:

![](_media/nodejs/vs_code_project.png) 

> The **package-lock.json** was created by **npm**, don't worry

Next: [Authenticate](oauth/2legged/nodejs_da.md)