# Конвертация файлов (Node.js)

Для конвертации файлов нам нужна только одна конечная точка.

## routes/modelderivative.js

Создайте файл `routes/modelderivative.js` с кодом ниже:

```javascript
const express = require('express');
const {
    DerivativesApi,
    JobPayload,
    JobPayloadInput,
    JobPayloadOutput,
    JobSvfOutputPayload
} = require('forge-apis');

const { getClient, getInternalToken } = require('./common/oauth');

let router = express.Router();

// Middleware for obtaining a token for each request.
router.use(async (req, res, next) => {
    const token = await getInternalToken();
    req.oauth_token = token;
    req.oauth_client = getClient();
    next();
});

// POST /api/forge/modelderivative/jobs - submits a new translation job for given object URN.
// Request body must be a valid JSON in the form of { "objectName": "<translated-object-urn>" }.
router.post('/jobs', async (req, res, next) => {
    let job = new JobPayload();
    job.input = new JobPayloadInput();
    job.input.urn = req.body.objectName;
    job.output = new JobPayloadOutput([
        new JobSvfOutputPayload()
    ]);
    job.output.formats[0].type = 'svf';
    job.output.formats[0].views = ['2d', '3d'];
    try {
        // Submit a translation job using [DerivativesApi](https://github.com/Autodesk-Forge/forge-api-nodejs-client/blob/master/docs/DerivativesApi.md#translate).
        await new DerivativesApi().translate(job, {}, req.oauth_client, req.oauth_token);
        res.status(200).end();
    } catch(err) {
        next(err);
    }
});

module.exports = router;
```

Конечная точка **jobs** получает **objectName** и размещает [задание на конвертацию](https://forge.autodesk.com/en/docs/model-derivative/v2/reference/http/job-POST/) для извлечения 2D и 3D-видов модели.

Подводя итог, на этом этапе ваш проект **NodeJS** должен выглядеть так:

![](_media/nodejs/vs_code_allfiles.png)

Далее: [Отображение файлов в Viewer](/ru-RU/viewer/2legged/)

[Эта страница на английском языке](https://learnforge.autodesk.io/#/modelderivative/translate/nodejs).
