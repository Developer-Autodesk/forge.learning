# Authenticate (PHP)

For a basic *OAuth* implementation we need 2 files.

## OAuthToken.php

Create a `/server/oauthtoken.php` file. This file takes care of responding to the endpoint and returning the access token. 

[oauthtoken.php](_snippets/viewmodels/php/oauthtoken.php ':include :type=code php')

## OAuth.php

Now create a `/sever/oauth.php` file that will actually request the access token from Forge. This will be reused on other parts of this tutorial.

[oauth.php](_snippets/viewmodels/php/oauth.php ':include :type=code php')

Next: [Upload file to OSS](/datamanagement/oss/)