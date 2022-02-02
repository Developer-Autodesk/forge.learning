# Аутентификация (Node.js)

Для настройки базового *процесса аутентификации (OAuth)* нам понадобится два файла.

## routes/oauth.js

Создайте файл `routes/oauth.js`. Этот файл создаст маршрутизацию для конечных точек, связанных с Oauth.

```javascript
const express = require('express');

const { getPublicToken } = require('./common/oauth');

let router = express.Router();

// GET /api/forge/oauth/token - generates a public access token (required by the Forge viewer).
router.get('/token', async (req, res, next) => {
    try {
        const token = await getPublicToken();
        res.json({
            access_token: token.access_token,
            expires_in: token.expires_in    
        });
    } catch(err) {
        next(err);
    }
});

module.exports = router;
```

## routes/common/oauth.js

Теперь создайте подпапку `common` в папке `routes` и подготовьте файл `routes/common/oauth.js`, который будет запрашивать токен доступа у Forge. Мы будем повторно использовать это в других частях этого руководства.

```javascript
const { AuthClientTwoLegged } = require('forge-apis');

const config = require('../../config');

/**
 * Initializes a Forge client for 2-legged authentication.
 * @param {string[]} scopes List of resource access scopes.
 * @returns {AuthClientTwoLegged} 2-legged authentication client.
 */
function getClient(scopes) {
    const { client_id, client_secret } = config.credentials;
    return new AuthClientTwoLegged(client_id, client_secret, scopes || config.scopes.internal);
}

let cache = {};
async function getToken(scopes) {
    const key = scopes.join('+');
    if (cache[key]) {
        return cache[key];
    }
    const client = getClient(scopes);
    let credentials = await client.authenticate();
    cache[key] = credentials;
    setTimeout(() => { delete cache[key]; }, credentials.expires_in * 1000);
    return credentials;
}

/**
 * Retrieves a 2-legged authentication token for preconfigured public scopes.
 * @returns Token object: { "access_token": "...", "expires_at": "...", "expires_in": "...", "token_type": "..." }.
 */
async function getPublicToken() {
    return getToken(config.scopes.public);
}

/**
 * Retrieves a 2-legged authentication token for preconfigured internal scopes.
 * @returns Token object: { "access_token": "...", "expires_at": "...", "expires_in": "...", "token_type": "..." }.
 */
async function getInternalToken() {
    return getToken(config.scopes.internal);
}

module.exports = {
    getClient,
    getPublicToken,
    getInternalToken
};
```

Чтобы избежать получения нового токена доступа на каждый запрос конечного пользователя (т.к. это создает ненужную задержку работы), давайте кэшируем их в глобальных переменных. Обратите внимание, что нам все еще нужно обновлять его после времени окончания действия (`expires_in` secons).

!> Обмен токенами доступа между пользователями возможен только в том случае, когда все пользователи получают доступ к одним и тем же данным (2-legged токены). Если ваше приложение использует данные для каждого пользователя (3-legged токены), **НЕ** используйте этот подход.

Далее: [Загрузка файла в OSS (Object Storage Service)](/ru-RU/datamanagement/oss/)

[Эта страница на английском языке](https://learnforge.autodesk.io/#/oauth/2legged/nodejs).
