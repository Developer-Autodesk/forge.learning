# Authenticate (NodeJS)

For a basic *OAuth* implementation we need 2 files.

## oauthtoken.js

Create a `/server/oauthtoken.js` file. This file takes care of creating the express router to expose the endpoint. 

```javascript
'use strict';

// web framework
var express = require('express');
var router = express.Router();

// Forge NPM
var forgeSDK = require('forge-apis');

// actually perform the token operation
var oauth = require('./oauth');

// Endpoint to return a 2-legged access token
router.get('/api/forge/oauth/token', function (req, res) {
    oauth.getTokenPublic().then(function (credentials) {
        res.json({ access_token: credentials.access_token, expires_in: credentials.expires_in });
    }).catch(function (error) {
        console.log('Error at OAuth Token:');
        console.log(error);
        res.status(500).json(error);
    });
});

module.exports = router;
```

## oauth.js

Now create a `/sever/oauth.js` file that will actually request the access token from Forge. This will be reused on other parts of this tutorial.

```javascript
'use strict';

// Forge NPM
var forgeSDK = require('forge-apis');

// Forge config information, such as client ID and secret
var config = require('./config');

// Cache of the access tokens
var _cached = [];

module.exports = {
    getTokenPublic: function () {
        return this.OAuthRequest(config.scopePublic, 'public');
    },

    getTokenInternal: function () {
        return this.OAuthRequest(config.scopeInternal, 'internal');
    },

    OAuthRequest: function (scopes, cache) {
        var client_id = config.credentials.client_id;
        var client_secret = config.credentials.client_secret;
        var forgeOAuth = this.OAuthClient(scopes);

        return new Promise(function (resolve, reject) {
            if (_cached[cache] != null && _cached[cache].expires_at > (new Date()).getTime()) {
                resolve(_cached[cache]);
                return;
            }

            var client_id = config.credentials.client_id;
            var client_secret = config.credentials.client_secret;

            //new forgeSDK.AuthClientTwoLegged(client_id, client_secret, scopes);
            forgeOAuth.authenticate()
                .then(function (credentials) {
                    _cached[cache] = credentials;
                    var now = new Date();
                    _cached[cache].expires_at = (now.setSeconds(now.getSeconds() + credentials.expires_in));
                    resolve(_cached[cache]);
                })
                .catch(function (error) {
                    console.log('Error at OAuth Authenticate:');
                    console.log(error);
                    reject(error)
                });
        })
    },

    OAuthClient: function (scopes) {
        var client_id = config.credentials.client_id;
        var client_secret = config.credentials.client_secret;
        if (scopes == undefined) scopes = config.scopeInternal;
        return new forgeSDK.AuthClientTwoLegged(client_id, client_secret, scopes);
    }
}
```

To avoid getting a new access token for each end-user request, which adds unnecessary latency, let's cache them in global variables. Note we still need to refresh it after `expires_in` seconds.

!> Share access token between users is only valid in this case, where all users are accessing the same information (2-legged). If your app uses per-user data (3-legged), **DOT NOT** use this approach.

Next: [Upload file to OSS](/datamanagement/oss/)