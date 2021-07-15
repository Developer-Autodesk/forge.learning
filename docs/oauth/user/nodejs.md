# User information (Node.js)

This endpoint will request the end-user information and return the **name** and **picture** (40px).

## routes/user.js

Create a `routes/user.js` file and copy the following content:

```javascript
const express = require('express');
const { UserProfileApi } = require('forge-apis');

const { OAuth } = require('./common/oauth');

let router = express.Router();

router.get('/user/profile', async (req, res) => {
    const oauth = new OAuth(req.session);
    const internalToken = await oauth.getInternalToken();
    const user = new UserProfileApi();
    const profile = await user.getUserProfile(oauth.getClient(), internalToken);
    res.json({
        name: profile.body.firstName + ' ' + profile.body.lastName,
        picture: profile.body.profileImages.sizeX40
    });
});

module.exports = router;
```

Next: [Show on Viewer](viewer/3legged/readme)