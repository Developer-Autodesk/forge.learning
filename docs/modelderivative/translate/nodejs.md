# Translate Model (NodeJS)

To translate a file we just need one endpoint.

## modelderivative.js

Create a `/server/modelderivative.js` file with the following content:

```javascript
'use strict';

// web framework
var express = require('express');
var router = express.Router();

// Forge NPM
var forgeSDK = require('forge-apis');

// handle json requests
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

// actually perform the token operation
var oauth = require('./oauth');

// Create a new bucket 
router.post('/api/forge/modelderivative/jobs', jsonParser, function (req, res) {
    oauth.getTokenInternal().then(function (credentials) {
        // prepare the translation job payload
        var postJob = new forgeSDK.JobPayload();
        postJob.input = new forgeSDK.JobPayloadInput();
        postJob.input.urn = req.body.objectName;
        postJob.output = new forgeSDK.JobPayloadOutput(
            [new forgeSDK.JobSvfOutputPayload()]
        );
        postJob.output.formats[0].type = 'svf';
        postJob.output.formats[0].views = ['2d', '3d'];

        // create the derivative API 
        var derivativesApi = new forgeSDK.DerivativesApi();
        // post the job
        derivativesApi.translate(postJob, {}, oauth.OAuthClient(), credentials)
            .then(function (data) {
                res.status(200).end();
            }).catch(function (e) {
                console.log('Error at Model Derivative job:');
                console.log(e);
                res.status(500).json({ error: e.error.body })
            });
    });
});

module.exports = router;
```

The **jobs** endpoint receives the **bucketKey** and **objectName** and post the [translation job](https://developer.autodesk.com/en/docs/model-derivative/v2/reference/http/job-POST/) to extract 2D & 3D views of the model. 

To summarize, at this point your **NodeJS** project should be like:

![](_media/nodejs/vs_code_allfiles.png)

Next: [Show on Viewer](viewer/2legged/)