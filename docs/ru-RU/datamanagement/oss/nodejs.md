# Загрузка файлов в OSS (Node.js)

В этом разделе нам нужны 3 функции:

1. Создание бакетов
2. Указание репозиториев данных и объектов (файлов)
3. Загрузка объектов (файлов)

## routes/oss.js

Создайте файл `routes/oss.js` со следующим кодом:

```javascript
const fs = require('fs');
const express = require('express');
const multer  = require('multer');
const { BucketsApi, ObjectsApi, PostBucketsPayload } = require('forge-apis');

const { getClient, getInternalToken } = require('./common/oauth');
const config = require('../config');

let router = express.Router();

// Middleware for obtaining a token for each request.
router.use(async (req, res, next) => {
    const token = await getInternalToken();
    req.oauth_token = token;
    req.oauth_client = getClient();
    next();
});

// GET /api/forge/oss/buckets - expects a query param 'id'; if the param is '#' or empty,
// returns a JSON with list of buckets, otherwise returns a JSON with list of objects in bucket with given name.
router.get('/buckets', async (req, res, next) => {
    const bucket_name = req.query.id;
    if (!bucket_name || bucket_name === '#') {
        try {
            // Retrieve buckets from Forge using the [BucketsApi](https://github.com/Autodesk-Forge/forge-api-nodejs-client/blob/master/docs/BucketsApi.md#getBuckets)
            const buckets = await new BucketsApi().getBuckets({ limit: 64 }, req.oauth_client, req.oauth_token);
            res.json(buckets.body.items.map((bucket) => {
                return {
                    id: bucket.bucketKey,
                    // Remove bucket key prefix that was added during bucket creation
                    text: bucket.bucketKey.replace(config.credentials.client_id.toLowerCase() + '-', ''),
                    type: 'bucket',
                    children: true
                };
            }));
        } catch(err) {
            next(err);
        }
    } else {
        try {
            // Retrieve objects from Forge using the [ObjectsApi](https://github.com/Autodesk-Forge/forge-api-nodejs-client/blob/master/docs/ObjectsApi.md#getObjects)
            const objects = await new ObjectsApi().getObjects(bucket_name, {}, req.oauth_client, req.oauth_token);
            res.json(objects.body.items.map((object) => {
                return {
                    id: Buffer.from(object.objectId).toString('base64'),
                    text: object.objectKey,
                    type: 'object',
                    children: false
                };
            }));
        } catch(err) {
            next(err);
        }
    }
});

// POST /api/forge/oss/buckets - creates a new bucket.
// Request body must be a valid JSON in the form of { "bucketKey": "<new_bucket_name>" }.
router.post('/buckets', async (req, res, next) => {
    let payload = new PostBucketsPayload();
    payload.bucketKey = config.credentials.client_id.toLowerCase() + '-' + req.body.bucketKey;
    payload.policyKey = 'transient'; // expires in 24h
    try {
        // Create a bucket using [BucketsApi](https://github.com/Autodesk-Forge/forge-api-nodejs-client/blob/master/docs/BucketsApi.md#createBucket).
        await new BucketsApi().createBucket(payload, {}, req.oauth_client, req.oauth_token);
        res.status(200).end();
    } catch(err) {
        next(err);
    }
});

// POST /api/forge/oss/objects - uploads new object to given bucket.
// Request body must be structured as 'form-data' dictionary
// with the uploaded file under "fileToUpload" key, and the bucket name under "bucketKey".
router.post('/objects', multer({ dest: 'uploads/' }).single('fileToUpload'), async (req, res, next) => {
    fs.readFile(req.file.path, async (err, data) => {
        if (err) {
            next(err);
        }
        try {
            // Upload an object to bucket using [ObjectsApi](https://github.com/Autodesk-Forge/forge-api-nodejs-client/blob/master/docs/ObjectsApi.md#uploadObject).
            await new ObjectsApi().uploadObject(req.body.bucketKey, req.file.originalname, data.length, data, {}, req.oauth_client, req.oauth_token);
            res.status(200).end();
        } catch(err) {
            next(err);
        }
    });
});

module.exports = router;
```

Т.к. мы планируем поддерживать [jsTree](https://www.jstree.com/), наш **GET /api/forge/oss/buckets** должен обрабатывать параметр строки запроса `id` (англ. querystring parameter) и возвращать все бакеты, если `id=#` и объекты для данного bucketKey переданы как `id=bucketKey`. Конечная точка загрузки использует модуль [multer](https://github.com/expressjs/multer) для обработки загрузки. Это сохраняет файл на сервере (например, в папке **/uploads/**), поэтому мы можем впоследствии загрузить его в Forge.

Обратите внимание, что мы повторно используем authentication helpers из `routes/common/oauth.js` как промежуточный слой (англ. middleware) этого маршрутизатора.

!> Загрузка файла из браузера напрямую в Autodesk Forge возможна, но требует предоставления токена доступа **write-enabled**, что **НЕ БЕЗОПАСНО**. 

Далее: [Конвертация файлов](/ru-RU/modelderivative/translate/)

[Эта страница на английском языке](https://learnforge.autodesk.io/#/datamanagement/oss/nodejs).
