# Authenticate (Node.js)

## routes/common/oauth.js

Now create a `common` subfolder in the `routes` folder, and prepare a `routes/common/oauth.js` file that will actually request
the access token from Forge. This will be reused in other parts of this tutorial.

```javascript
const { AuthClientTwoLegged } = require('forge-apis');
const config = require('../../config');

// Tokens are auto-refreshed, keeping clients in simple cache
let cache = {};

// Since we got 3 calls at the first page loading, let's initialize this one now,
// to avoid concurrent requests.
getClient (/*config.scopes.internal*/);

/**
 * Initializes a Forge client for 2-legged authentication.
 * @param {string[]} scopes List of resource access scopes.
 * @returns {AuthClientTwoLegged} 2-legged authentication client.
 */
async function getClient(scopes) {
    scopes = scopes || config.scopes.internal;
    const key = scopes.join('+');
    if ( cache[key] )
        return (cache[key]);
    
    try {
        const { client_id, client_secret } = config.credentials;
        let client = new AuthClientTwoLegged(client_id, client_secret, scopes || config.scopes.internal, true);
        let credentials = await client.authenticate();
        cache[key] = client;
        console.log (`OAuth2 client created for ${key}`);
        return (client);
    } catch ( ex ) {
        return (null);
    }
}

module.exports = {
    getClient
};
```

To avoid getting a new access token for each end-user request, which adds unnecessary latency, let's cache them in global variables. Note that we still need to refresh the tokens after `expires_in` seconds.

!> Share access token between users is only valid in this case, where all users are accessing the same information (2-legged). If your app uses per-user data (3-legged), **DOT NOT** use this approach.

Next: [Basic app UI](designautomation/html/README.md)