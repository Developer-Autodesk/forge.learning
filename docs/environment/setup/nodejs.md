# Create a new project

Create a folder and open that on VS Code, open the integrated terminal (under View >> Integrated Terminal) and type: 

```
npm init
```

## Packages

After the project is ready, install **Autodesk Forge** with:

```
npm install forge-apis --save
```

As we'll also need some other packages, also run:

!> Run one **npm install** at a time.

```
npm install cookie-parser --save
npm install express --save
npm install express-session --save
npm install request --save
npm install serve-favicon --save
```

## Config.js

Now create a file named `config.js` with the following content:

```javascript
'use strict'; // http://www.w3schools.com/js/js_strict.asp

module.exports = {

  // Autodesk Forge configuration

  // this this callback URL when creating your client ID and secret (3-legged only)
  callbackURL: process.env.FORGE_CALLBACK_URL || 'YOURCALLBACKURL',

  // set environment variables or hard-code here
  credentials: {
    client_id: process.env.FORGE_CLIENT_ID || '',
    client_secret: process.env.FORGE_CLIENT_SECRET || ''
  },

  // Required scopes for your application on server-side
  scopeInternal: ['data:read','data:write','data:create','data:search'],
  // Required scope of the token sent to the client
  scopePublic: ['viewables:read']
};
```

We are defining our ENV variables here, at the time of running our Express server the values on these variables will be use to connect to the different Autodesk Forge services we will need.

Here we can find the reference to the callback URL which is needed if we use a 3 legged Token for the authentication, in this case we will use a 2 legged authentication, this value can be left out empty. Later on we have a way to pass in our enviornment variables by defining them as Process variables or hard coding them as strings, my suggestion will be to use the process setup.

Last we see there are 2 definitions about scopes. These scopes give our Token the right permission for the use of the different services of the Forge We Services. This tutorial is dedicated to the use of the Viewer only, we will only need the "viewables:read" scope.

## Server.js

Now create a file named `sever.js` with:

```javascript
'use strict';

var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var app = express();

// this session will be used to save the oAuth token
app.use(cookieParser());
app.set('trust proxy', 1) // trust first proxy - HTTPS on Heroku 
app.use(session({
    secret: 'autodeskforge',
    cookie: {
        httpOnly: true,
        secure: (process.env.NODE_ENV === 'production'),
        maxAge: 1000 * 60 * 60 // 1 hours to expire the session and avoid memory leak
    },
    resave: false,
    saveUninitialized: true
}));

// prepare server routing
app.use('/', express.static(__dirname + '/../www')); // redirect static calls
app.set('port', process.env.PORT || 3000); // main port

// prepare our API endpoint routing
var oauth = require('./oauth');
app.use('/', oauth); // redirect oauth API calls

module.exports = app;
```

At this point, the webapp is not doing anything, but you can always test it with:

```
export FORGE_CLIENT_ID=<<YOUR CLIENT ID FROM FORGE DEVELOPER PORTAL>>
export FORGE_CLIENT_SECRET=<<YOUR FORGE CLIENT SECRET>>
npm start
```

!> You only need to **export** the key & secret once.