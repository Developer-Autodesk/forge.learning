# Аутентификация (Node.js)

Для настройки базового *процесса аутентификации (OAuth)* нам понадобится два файла.

## routes/oauth.js

Создайте файл `routes/oauth.js`. Этот файл создаст маршрутизацию для конечных точек, связанных с Oauth.

```javascript
const express = require('express');

const config = require('../config');
const { OAuth } = require('./common/oauth');

let router = express.Router();

router.get('/callback/oauth', async (req, res, next) => {
    const { code } = req.query;
    const oauth = new OAuth(req.session);
    try {
        await oauth.setCode(code);
        res.redirect('/');
    } catch(err) {
        next(err);
    }
});

router.get('/oauth/url', (req, res) => {
    const url =
        'https://developer.api.autodesk.com' +
        '/authentication/v1/authorize?response_type=code' +
        '&client_id=' + config.credentials.client_id +
        '&redirect_uri=' + config.credentials.callback_url +
        '&scope=' + config.scopes.internal.join(' ');
    res.end(url);
});

router.get('/oauth/signout', (req, res) => {
    req.session = null;
    res.redirect('/');
});

// Endpoint to return a 2-legged access token
router.get('/oauth/token', async (req, res, next) => {
    const oauth = new OAuth(req.session);
    if (!oauth.isAuthorized()) {
        res.status(401).end();
        return;
    }

    try {
        const accessToken = await oauth.getPublicToken();
        res.json(accessToken);
    } catch(err) {
        next(err);
    }
});

module.exports = router;
```

## routes/common/oauth.js

Теперь создайте подпапку `common` в папке `routes` и подготовьте файл `routes/common/oauth.js`, который будет запрашивать токен доступа у Forge. Мы будем повторно использовать это в других частях этого руководства.

```javascript
const { AuthClientThreeLegged } = require('forge-apis');

const config = require('../../config');

class OAuth {
    constructor(session) {
        this._session = session;
    }

    getClient(scopes = config.scopes.internal) {
        const { client_id, client_secret, callback_url } = config.credentials;
        return new AuthClientThreeLegged(client_id, client_secret, callback_url, scopes);
    }

    isAuthorized() {
        return !!this._session.public_token;
    }

    async getPublicToken() {
        if (this._isExpired()) {
            await this._refreshTokens();
        }

        return {
            access_token: this._session.public_token,
            expires_in: this._expiresIn()
        };
    }

    async getInternalToken() {
        if (this._isExpired()) {
            await this._refreshTokens();
        }

        return {
            access_token: this._session.internal_token,
            expires_in: this._expiresIn()
        };
    }

    // On callback, pass the CODE to this function, it will
    // get the internal and public tokens and store them 
    // on the session
    async setCode(code) {
        const internalTokenClient = this.getClient(config.scopes.internal);
        const publicTokenClient = this.getClient(config.scopes.public);
        const internalCredentials = await internalTokenClient.getToken(code);
        const publicCredentials = await publicTokenClient.refreshToken(internalCredentials);

        const now = new Date();
        this._session.internal_token = internalCredentials.access_token;
        this._session.public_token = publicCredentials.access_token;
        this._session.refresh_token = publicCredentials.refresh_token;
        this._session.expires_at = (now.setSeconds(now.getSeconds() + publicCredentials.expires_in));
    }

    _expiresIn() {
        const now = new Date();
        const expiresAt = new Date(this._session.expires_at)
        return Math.round((expiresAt.getTime() - now.getTime()) / 1000);
    };

    _isExpired() {
        return (new Date() > new Date(this._session.expires_at));
    }

    async _refreshTokens() {
        let internalTokenClient = this.getClient(config.scopes.internal);
        let publicTokenClient = this.getClient(config.scopes.public);
        const internalCredentials = await internalTokenClient.refreshToken({ refresh_token: this._session.refresh_token });
        const publicCredentials = await publicTokenClient.refreshToken(internalCredentials);

        const now = new Date();
        this._session.internal_token = internalCredentials.access_token;
        this._session.public_token = publicCredentials.access_token;
        this._session.refresh_token = publicCredentials.refresh_token;
        this._session.expires_at = (now.setSeconds(now.getSeconds() + publicCredentials.expires_in));
    }
}

module.exports = { OAuth };
```

Этот код будет хранить оба **токена доступа** вместе с **refresh token** и **expiration time**. Когда срок токена истечет, он будет использовать refresh token для запроса 2 новых токенов доступа (внутреннего и открытого).

!> Наш сервер был указан только с доступом по протоколу `https`, а файлы cookie могут быть прочитаны только клиентом и сервером.

Далее: [Репозитории данных (англ. hubs) и проекты](/ru-RU/datamanagement/hubs/readme)

[Эта страница на английском языке](https://learnforge.autodesk.io/#/oauth/3legged/nodejs).
