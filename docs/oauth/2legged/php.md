# Authenticate (PHP)

For a basic *OAuth* implementation we need 2 files.

## OAuthToken.php

Create a `/server/oauthtoken.php` file. This file takes care of responding to the endpoint and returning the access token. 

```php
<?php
namespace Autodesk\ForgeServices;

class AccessToken{
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
    private $twoLeggedAuthInternal = null;
    private $twoLeggedAuthPublic   = null;
    
    public function __construct(){
        set_time_limit(0);
        Configuration::getDefaultConfiguration()
            ->setClientId(ForgeConfig::getForgeID())
            ->setClientSecret(ForgeConfig::getForgeSecret());

        $this->createTwoLeggedAuth();
    }    

    private function createTwoLeggedAuth(){
        if($this->twoLeggedAuthInternal == null ){
            $this->twoLeggedAuthInternal = new TwoLeggedAuth();
            $this->twoLeggedAuthInternal->setScopes(ForgeConfig::getScopeInternal());
            $this->twoLeggedAuthInternal->fetchToken();
        }
        
        if($this->twoLeggedAuthPublic == null ){
            $this->twoLeggedAuthPublic = new TwoLeggedAuth();
            $this->twoLeggedAuthPublic->setScopes(ForgeConfig::getScopePublic());
            $this->twoLeggedAuthPublic->fetchToken();
        }
    }

    public function getTokenPublic(){
        return $this->twoLeggedAuthPublic;
    }

    public function getTokenInternal(){
        return $this->twoLeggedAuthInternal;
    }
}

$twoLeggedAuth = new AuthClientTwoLegged();
```


Next: [Upload file to OSS](/datamanagement/oss/)