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

// Forge config information, such as client ID and secret
var config = require('./config');

// actually perform the token operation
var oauth = require('./oauth');

router.get('/api/forge/callback/oauth', function (req, res) {
    var code = req.query.code;
    var credentials = new oauth(req.session);
    credentials.setCode(code).then(function () {
        res.redirect("/");
    }).catch(function (error) {
        res.end(JSON.stringify(error));
    });
});

router.get('/api/forge/oauth/url', function (req, res) {
    var url =
        "https://developer.api.autodesk.com" +
        '/authentication/v1/authorize?response_type=code' +
        '&client_id=' + config.credentials.client_id +
        '&redirect_uri=' + config.credentials.callback_url +
        '&scope=' + config.scopeInternal.join(" ");
    res.end(url);
});

router.get('/api/forge/oauth/signout', function (req, res) {
    req.session = null;
    res.redirect("/");
});

// Endpoint to return a 2-legged access token
router.get('/api/forge/oauth/token', function (req, res) {
    var credentials = new oauth(req.session);
    if (!credentials.isAuthorized()) {
        res.status(401).end();
        return;
    }

    credentials.getTokenPublic()
        .then(function (accessToken) {
            res.json(accessToken);
        })
        .catch(function () {
            res.status(500).end();
        })
});

module.exports = router;
```

## oauth.js

Now create a `/server/oauth.js` file that will actually request the access token from Forge. This will be reused on other parts of this tutorial.

```javascript
'use strict';

// Forge NPM
var forgeSDK = require('forge-apis');

// Forge config information, such as client ID and secret
var config = require('./config');

function OAuth(session) {
    this._session = session;
};

// returns the Public scope token (Viewer)
OAuth.prototype.getTokenPublic = function () {
    var _this = this;
    return new Promise(function (resolve, reject) {
        if (_this.isExpired())
            _this.refreshToken().then(function () {
                resolve({ access_token: _this._session.tokenPublic, expires_in: _this.getExpiresIn() })
            });
        else
            resolve({ access_token: _this._session.tokenPublic, expires_in: _this.getExpiresIn() })
    });
};

// returns the Internal scope token (data management)
OAuth.prototype.getTokenInternal = function () {
    var _this = this;
    return new Promise(function (resolve, reject) {
        if (_this.isExpired())
            _this.refreshToken().then(function () {
                resolve({ access_token: _this._session.tokenInternal, expires_in: _this.getExpiresIn() })
            });
        else
            resolve({ access_token: _this._session.tokenInternal, expires_in: _this.getExpiresIn() })
    });
};

OAuth.prototype.getExpiresIn = function () {
    var now = new Date();
    var expiresAt = new Date(this._session.expiresAt)
    return Math.round((expiresAt.getTime() - now.getTime()) / 1000);
};

OAuth.prototype.isExpired = function () {
    return (new Date() > new Date(this._session.expiresAt))
};

OAuth.prototype.isAuthorized = function () {
    // !! converts value into boolean
    return (!!this._session.tokenPublic);
};

// On callback, pass the CODE to this function, it will
// get the internal and public tokens and store them 
// on the session
OAuth.prototype.setCode = function (code) {
    var forgeOAuthInternal = this.OAuthClient(config.scopeInternal);
    var forgeOAuthPublic = this.OAuthClient(config.scopePublic);
    var _this = this;

    return new Promise(function (resolve, reject) {
        forgeOAuthInternal.getToken(code)
            .then(function (credentialsInternal) {
                forgeOAuthPublic.refreshToken(credentialsInternal)
                    .then(function (credentialsPublic) {
                        _this._session.tokenInternal = credentialsInternal.access_token;
                        _this._session.tokenPublic = credentialsPublic.access_token;
                        _this._session.refreshToken = credentialsPublic.refresh_token;
                        var now = new Date();
                        _this._session.expiresAt = (now.setSeconds(now.getSeconds() + credentialsPublic.expires_in));
                        resolve();
                    })
                    .catch(function (error) {
                        console.log('Error at OAuth refreshToken:');
                        console.log(error);
                        reject(error)
                    });
            })
            .catch(function (error) {
                console.log('Error at OAuth getToken:');
                console.log(error);
                reject(error)
            });
    })
}

// refresh both internal and public tokens, keep new refresh token
OAuth.prototype.refreshToken = function () {
    var forgeOAuthInternal = this.OAuthClient(config.scopeInternal);
    var forgeOAuthPublic = this.OAuthClient(config.scopePublic);
    var _this = this;

    return new Promise(function (resolve, reject) {
        forgeOAuthInternal.refreshToken({ refresh_token: _this._session.refreshToken })
            .then(function (credentialsInternal) {
                forgeOAuthPublic.refreshToken(credentialsInternal)
                    .then(function (credentialsPublic) {
                        _this._session.tokenInternal = credentialsInternal.access_token;
                        _this._session.tokenPublic = credentialsPublic.access_token;
                        _this._session.refreshToken = credentialsPublic.refresh_token;
                        var now = new Date();
                        _this._session.expiresAt = (now.setSeconds(now.getSeconds() + credentialsPublic.expires_in));
                        resolve();
                    })
                    .catch(function (error) {
                        console.log('Error at OAuth refreshToken public');
                        console.log(error);
                        reject(error)
                    });
            })
            .catch(function (error) {
                console.log('Error at OAuth refreshToken internal:');
                console.log(error);
                reject(error)
            });
    });
}

OAuth.prototype.OAuthClient = function (scopes) {
    var client_id = config.credentials.client_id;
    var client_secret = config.credentials.client_secret;
    var callback_url = config.credentials.callback_url;
    if (scopes == undefined) scopes = config.scopeInternal;
    return new forgeSDK.AuthClientThreeLegged(client_id, client_secret, callback_url, scopes);
}

module.exports = OAuth;
```

This code will store both **access tokens** on the session (cookie-based) with the **refresh token** and **expiration time**. When it expires, it will use the refresh token to request 2 new access tokens (internal & public). 

!> Our server was specified with `https` access only and the cookie can only be read by the client and server. 

Next: [List hubs & projects](/datamanagement/hubs/readme)