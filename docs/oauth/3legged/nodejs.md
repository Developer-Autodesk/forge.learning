# Authenticate (Node.js)

For a basic *OAuth* implementation we need 2 files.

## routes/oauth.js

Create a `routes/oauth.js` file. This file takes care of creating an express router for OAuth-related endpoints.

[routes/oauth.js](_snippets/viewhubmodels/node/routes/oauth.js ':include :type=code javascript')

## routes/common/oauth.js

Now create a `common` subfolder in the `routes` folder, and prepare a `routes/common/oauth.js` file that will actually request
the access token from Forge. This will be reused in other parts of this tutorial.

[routes/common/oauth.js](_snippets/viewhubmodels/node/routes/common/oauth.js ':include :type=code javascript')

This code will store both **access tokens** on the session (cookie-based) with the **refresh token** and **expiration time**. When it expires, it will use the refresh token to request 2 new access tokens (internal & public). 

!> Our server was specified with `https` access only and the cookie can only be read by the client and server. 

Next: [List hubs & projects](/datamanagement/hubs/readme)