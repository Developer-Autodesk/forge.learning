# Authenticate (PHP)

For a basic *OAuth* implementation we need 2 files.

## OAuthToken.php

Create a `/server/oauthtoken.php` file. This file takes care of responding to the endpoint and returning the access token. 

```php
<?php
namespace Autodesk\ForgeServices;

class AccessToken
{
    public function __construct(){
        set_time_limit(0);
    }    

    public function getAccessToken(){
        global $twoLeggedAuth;
        try{
            $accessToken = $twoLeggedAuth->getTokenInternal();
            $tokenInfo = array(
                'access_token'  => $accessToken->getAccessToken(),
                'expires_in'    => $accessToken->getExpiresIn(),
            );
            print_r( json_encode($tokenInfo));
        }catch (Exception $e) {
            echo 'Exception when calling twoLeggedAuth->getTokenInternal: ', $e->getMessage(), PHP_EOL;
        }
    }
}
```

## OAuth.php

Now create a `/sever/oauth.php` file that will actually request the access token from Forge. This will be reused on other parts of this tutorial.

```php
<?php
namespace Autodesk\ForgeServices;

use Autodesk\Auth\Configuration;
use Autodesk\Auth\OAuth2\TwoLeggedAuth;

class AuthClientTwoLegged{
    private $twoLeggedAuthInternal = NULL;
    private $twoLeggedAuthPublic   = NULL;
    
    public function __construct( )
    {
        set_time_limit(0);
        Configuration::getDefaultConfiguration()
            ->setClientId(ForgeConfig::$forge_id)
            ->setClientSecret(ForgeConfig::$forge_secret);
    }    

    public function getTokenPublic(){
        if($this->twoLeggedAuthPublic != NULL )
            return $this->twoLeggedAuthPublic;

        $this->twoLeggedAuthPublic = new TwoLeggedAuth();
        $this->twoLeggedAuthPublic->setScopes(ForgeConfig::$scopePublic);
        $this->twoLeggedAuthPublic->fetchToken();
        return $this->twoLeggedAuthPublic;
    }

    public function getTokenInternal(){
        if($this->twoLeggedAuthInternal != NULL )
            return $this->twoLeggedAuthInternal;
            
        $this->twoLeggedAuthInternal = new TwoLeggedAuth();
        $this->twoLeggedAuthInternal->setScopes(ForgeConfig::$scopeInternal);
        $this->twoLeggedAuthInternal->fetchToken();
        return $this->twoLeggedAuthInternal;
    }
}
$twoLeggedAuth = new AuthClientTwoLegged();
```


Next: [Upload file to OSS](/datamanagement/oss/)