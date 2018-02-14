# NodeJS

For a basic *OAuth* implementation we need 2 files:

## OAuth.js

Create a file named `oauth.js`

This file takes care of creating the express router we need to call the NPM function "AuthClientTwoLegged" to get a 2 legged Client authentication token. Here we will use the ENV variables from the previous config.js file.

```javascript
/////////////////////////////////////////////////////////////////////////////////
//
// Obtaining our Token 
//
/////////////////////////////////////////////////////////////////////////////////
'use strict'; // http://www.w3schools.com/js/js_strict.asp
// token handling in session
var token = require('./token');

// web framework
var express = require('express');
var router = express.Router();

// Forge NPM
var forgeSDK = require('forge-apis');

// Forge config information, such as client ID and secret
var config = require('./config');

// wait for Autodesk callback (oAuth callback)
router.get('/api/forge/token', function (req, res) {

    try {
      var client_id = config.credentials.client_id;
      var client_secret = config.credentials.client_secret;
      var scopes = config.scopePublic;
      
      var req = new forgeSDK.AuthClientTwoLegged(client_id, client_secret, scopes);
      req.authenticate()
          .then(function (credentials) {

            console.log('Token: ' + credentials.access_token);
            res.json({ access_token: credentials.access_token, expires_in: credentials.expires_in });

          })
          .catch(function (error) {
            res.status(500).end(error.developerMessage);
          });
    } catch (err) {
        res.status(500).end(err);
    }
});

module.exports = router;
```

# Token.js

Finally create a `token.js` file with 

```javascript
'use strict'; // http://www.w3schools.com/js/js_strict.asp

function Token(session) {
    this._session = session;
}

Token.prototype.getOAuth = function () {
    return this._session.oAuth;
};

Token.prototype.setOAuth = function (oAuth) {
    this._session.oAuth = oAuth;
};

Token.prototype.getCredentials = function () {
    return this._session.credentials;
};

Token.prototype.setCredentials = function (credentials) {
    this._session.credentials = credentials;
};

module.exports = Token;
```