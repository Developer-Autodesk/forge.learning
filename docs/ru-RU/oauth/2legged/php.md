# Аутентификация (PHP)

Для настройки **базового процесса аутентификации (OAuth)** нам понадобится два файла.

## OAuthToken.php

Создайте файл `/server/oauthtoken.php`. Этой файл ответит на конечную точку и вернет токен доступа.

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

Создайте файл `/sever/oauth.php`, который будет запрашивать токен доступа у Forge. Мы будем повторно использовать это в других частях этого руководства.

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


Далее: [Загрузка файла в OSS (Object Storage Service)](/ru-RU/datamanagement/oss/)

[Эта страница на английском языке](https://learnforge.autodesk.io/#/oauth/2legged/php).

