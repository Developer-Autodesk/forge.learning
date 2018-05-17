# User information

This endpoint will request the end-user information and return the **name** and **picture** (40px).

## user.js

Create a `/sever/user.js` file and copy the following content:

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

router.get('/api/forge/user/profile', function (req, res) {
    var credentials = new oauth(req.session);
    credentials.getTokenInternal().then(function (tokenInternal) {
        var user = new forgeSDK.UserProfileApi();
        user.getUserProfile(credentials.OAuthClient(), tokenInternal)
            .then(function (profile) {
                res.json({
                    name: profile.body.firstName + ' ' + profile.body.lastName,
                    picture: profile.body.profileImages.sizeX40
                });
            })
            .catch(function (error) {
                console.log(error);
                res.status(401).end()
            })
    });
});

module.exports = router;
```

Next: [Show on Viewer](viewer/3legged/readme)