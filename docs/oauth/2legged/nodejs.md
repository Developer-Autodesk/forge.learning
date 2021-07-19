# Authenticate (Node.js)

For a basic *OAuth* implementation we need 2 files.

## routes/oauth.js

Create a `routes/oauth.js` file. This file takes care of creating an express router for OAuth-related endpoints.

[routes/oauth.js](_snippets/viewmodels/node/routes/oauth.js ':include :type=code javascript')

## routes/common/oauth.js

Now create a `common` subfolder in the `routes` folder, and prepare a `routes/common/oauth.js` file that will actually request
the access token from Forge. This will be reused in other parts of this tutorial.

[routes/common/oauth.js](_snippets/viewmodels/node/routes/common/oauth.js ':include :type=code javascript')

To avoid getting a new access token for each end-user request, which adds unnecessary latency, let's cache them in global variables. Note that we still need to refresh the tokens after `expires_in` seconds.

!> Share access token between users is only valid in this case, where all users are accessing the same information (2-legged). If your app uses per-user data (3-legged), **DOT NOT** use this approach.

Next: [Upload file to OSS](/datamanagement/oss/)