# Create a new project (NodeJS)

Create a folder on your machine, do not use spaces and avoid special chars. For this tutorial, let's use **forgesample**.

Open **Visual Code**, then go to menu **File** and select **Open** (MacOS) or **Open Folder** (Windows) and select the newly created folder. 

Now we need the terminal, go to menu **View** >> **Integrated Terminal**. A window should appear on the bottom. Type the following command and follow the steps. For consistency with other Forge samples, when prompted for **entry point:**, use **start.js**.

```
npm init
```

This creates the **package.json** file, which defines which packages our project will be using. [Learn more](https://docs.npmjs.com/files/package.json).

## Install packages

By default, a NodeJS project is empty, so we need to install a few packages with **npm install**. Let's start with a basic **express** server, **body-parser** for JSON handling, **multer** for file upload and, of course, **Autodesk Forge**.

!> Run one **npm install** at a time.

```
npm install express --save
npm install forge-apis --save
npm install multer --save
npm install cookie-session --save
npm install body-parser --save
```

> The `--save` parameter indicates that it should be saved on the **package.json** file. 

Finally open the **package.json** and, inside `"scripts"`, add `"start": "node start.js",` line. Now your folder should have a **node_modules** folder and your **package.json** should look like:

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
    "body-parser": "^1.18.2",
    "cookie-session": "^2.0.0-beta.3",
    "express": "^4.16.2",
    "forge-apis": "^0.4.1",
    "multer": "^1.3.0"
  }
}

```

> The version number (e.g. forge-apis 0.4.1) may vary, this was the latest version when tutorial was created.

## Files and Folders

To create a new folder or file, right-click on the "Explorer" area on the left and select **New Folder** or **New File**.

For consitency with other Forge samples, create a **/server/** folder for all server-side files and a **/www/** for all client-side files.

At this point, you project should be something like:

![](_media/nodejs/vs_code_explorer.png) 

## launch.json

This file indicates to Visual Code how we should run our project. Go to menu **Debug** >> **Add Configuration...** and, on **Select Environment** small window that appears on the top, choose **NodeJS** and at the **/.vscode/launch.json** file that is created, enter the following:

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
                "FORGE_CALLBACK_URL": "http://localhost:3000/api/forge/callback/oauth"
            }
        }
    ]
}
```

> It's important to define **ID & Secret** as environment variables so our project can, later, be deployed online. More on this later, on **Deployment**.

## start.js

At the root folder, create a `/start.js` file with:

!> File names are case-sensitive for some deployments, like **Heroku**. For this tutorial, let's use lower-case.

```javascript
'use strict';

var app = require('./server/server');

// start server
var server = app.listen(app.get('port'), function () {
  if (process.env.FORGE_CLIENT_ID == null || process.env.FORGE_CLIENT_SECRET == null)
    console.log('*****************\nWARNING: Forge Client ID & Client Secret not defined as environment variables.\n*****************');

  console.log('Starting at ' + (new Date()).toString());
  console.log('Server listening on port ' + server.address().port);
});
```

The purpouse of this file is to ensure our running server is what we expecte. More on this later.

## server.js

Now, under **/server/** folder, create a file named `server.js` with:

```javascript
'use strict';

var express = require('express');
var app = express();

// prepare server routing
app.use('/', express.static(__dirname + '/../www')); // redirect static calls
app.set('port', process.env.PORT || 3000); // main port

// cookie-based session
var cookieSession = require('cookie-session')
app.use(cookieSession({
    name: 'forgesession',
    keys: ['forgesecurekey'],
    secure: (process.env.NODE_ENV == 'production'),
    maxAge: 14 * 24 * 60 * 60 * 1000 // 14 days, same as refresh token
}))

// prepare our API endpoint routing
loadRoute('./oauthtoken');
// viewmodels sample
loadRoute('./oss');
loadRoute('./modelderivative');
// view hub models sample
loadRoute('./datamanagement');
loadRoute('./user');

function loadRoute(path) {
    try {
        require.resolve(path);
        var m = require(path);
        app.use('/', m);
    } catch (e) { }
}

module.exports = app;
```

This file start the **express** server and serve the static files (e.g. `html`) and route the API requests.

## config.js

Under **/server/** create a file named `config.js` with the following content:

```javascript
'use strict';

// Autodesk Forge configuration
module.exports = {
  // set environment variables or hard-code here
  credentials: {
    client_id: process.env.FORGE_CLIENT_ID,
    client_secret: process.env.FORGE_CLIENT_SECRET,
    callback_url: process.env.FORGE_CALLBACK_URL
  },

  // Required scopes for your application on server-side
  scopeInternal: ['bucket:create', 'bucket:read', 'data:read', 'data:create', 'data:write'],
  // Required scope of the token sent to the client
  scopePublic: ['viewables:read']
};
```

We are defining our ENV variables here, at the time of running our Express server the values on these variables will be use to connect to the different Autodesk Forge services we will need.

Last we see there are 2 definitions about scopes. The internal scopes give our access token the right permission for the use of the different services of the Forge Web Services (server-side). This tutorial is dedicated to the use of the Viewer, we will only need the "viewables:read" scope for public.

Project is ready! At this point your project should have:

![](_media/nodejs/vs_code_project.png) 

> The **package-lock.json** was created by Visual Code, don't worry :wink: 