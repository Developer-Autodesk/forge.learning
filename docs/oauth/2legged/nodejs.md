# Authenticate (NodeJS)

For a basic *OAuth* implementation we just need one file.

## OAuth.js

Create a `/server/oauth.js` file.

This file takes care of creating the express router we need to call the NPM function "AuthClientTwoLegged" to get a 2 legged Client authentication token. Here we will use the **ID & Secret** variables from the previous **config.js** file.

```javascript
'use strict';

// web framework
var express = require('express');
var router = express.Router();

// Forge NPM
var forgeSDK = require('forge-apis');

// Forge config information, such as client ID and secret
var config = require('./config');

// Store credential in cache
var _cachedCredentials = null;

// wait for Autodesk callback (oAuth callback)
router.get('/api/forge/oauth/token', function (req, res) {
    try {
        var client_id = config.credentials.client_id;
        var client_secret = config.credentials.client_secret;
        var scopes = config.scopePublic;

        if (_cachedCredentials != null && _cachedCredentials.expires_at > (new Date()).getTime()) {
            res.json({ access_token: _cachedCredentials.access_token, expires_in: _cachedCredentials.expires_in });
            return;
        }

        var req = new forgeSDK.AuthClientTwoLegged(client_id, client_secret, scopes);
        req.authenticate()
            .then(function (credentials) {
                _cachedCredentials = credentials;
                var now = new Date();
                _cachedCredentials.expires_at = (now.setSeconds(now.getSeconds() + credentials.expires_in));
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

To avoid getting a new access token for each end-user request, which adds unnecessary latency, let's cache them in global variables. Note we still need to refresh it after `expires_in` seconds.

!> Share access token between users is only valid in this case, where all users are accessing the same information (2-legged). If your app uses per-user data (3-legged), **DOT NOT** use this approach.

Next: [Upload file to OSS](/datamanagement/oss/)