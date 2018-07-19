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
            $accessToken = $twoLeggedAuth->getTokenPublic();
            print_r( json_encode($accessToken));
        }catch (Exception $e) {
            echo 'Exception when calling twoLeggedAuth->getTokenPublic: ', $e->getMessage(), PHP_EOL;
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
    }    

    public function getTokenPublic(){     
        if(!isset($_SESSION['AccessTokenPublic']) || $_SESSION['ExpiresTime']< time() ){
            $this->twoLeggedAuthPublic = new TwoLeggedAuth();
            $this->twoLeggedAuthPublic->setScopes(ForgeConfig::getScopePublic());
            $this->twoLeggedAuthPublic->fetchToken();
            $_SESSION['AccessTokenPublic'] = $this->twoLeggedAuthPublic->getAccessToken();
            $_SESSION['ExpiresInPublic']   = $this->twoLeggedAuthPublic->getExpiresIn();
            $_SESSION['ExpiresTime']       = time() + $_SESSION['ExpiresInPublic'];
        }
        return array(
            'access_token'  => $_SESSION['AccessTokenPublic'],
            'expires_in'    => $_SESSION['ExpiresInPublic'],
        );
    }

    public function getTokenInternal(){
        $this->twoLeggedAuthInternal = new TwoLeggedAuth();
        $this->twoLeggedAuthInternal->setScopes(ForgeConfig::getScopeInternal());

        if(!isset($_SESSION['AccessTokenInternal']) || $_SESSION['ExpiresTime']< time() ){
            $this->twoLeggedAuthInternal->fetchToken();
            $_SESSION['AccessTokenInternal'] =  $this->twoLeggedAuthInternal->getAccessToken();
            $_SESSION['ExpiresInInternal']   =    $this->twoLeggedAuthInternal->getExpiresIn();
            $_SESSION['ExpiresTime']         = time() + $_SESSION['ExpiresInInternal'];
        }

        $this->twoLeggedAuthInternal->setAccessToken($_SESSION['AccessTokenInternal']);
        return $this->twoLeggedAuthInternal;  
    }
}

$twoLeggedAuth = new AuthClientTwoLegged();
```


Next: [Upload file to OSS](/datamanagement/oss/)