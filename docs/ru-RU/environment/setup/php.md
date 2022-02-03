# Создание нового проекта (PHP)

Создайте папку на вашем ПК, не используйте пробелы или специальные символы в названии. Для этого руководства давайте использовать название **forgesample**.

Откройте **Visual Code**, перейдите в меню **File** --> **Open** (MacOS) или **Open Folder** (Windows) и выберите только что созданную папку.

Сейчас нам нужен терминал, перейдите в меню **View** >> **Integrated Terminal**. Внизу должно появиться окно. Введите следующую команду и следуйте инструкциям. 

```
composer init
```

Это создает файл **composer.json**, который определяет, какие пакеты будет использовать наш проект. [Узнайте больше](https://getcomposer.org/doc/04-schema.md).

## Загрузка пакетов

По умолчанию проект PHP пустой, поэтому нам нужно установить несколько пакетов с **composer require**. Давайте начнем с базового сервера **PHP**, **klein** для маршрутизации, **phpdotenv** для загрузки переменных среды из `.env` в `getenv()`, `$_ENV` и `$_SERVER` автоматически, и, конечно, **Autodesk Forge**.
* [klein](https://packagist.org/packages/klein/klein) если вы хотите узнать больше про использование klein.
* [phpdotenv](https://packagist.org/packages/vlucas/phpdotenv) если вы хотите узнать больше про использование phpdotenv.
* [Autodesk Forge](https://packagist.org/packages/autodesk/forge-client) если вы хотите узнать больше про использование Forge PHP SDK.


!> Запускайте одну **npm install** за раз.

```
composer require autodesk/forge-client
composer require klein/klein
composer require vlucas/phpdotenv
```

> Библиотека будет сохранена как файл **composer.json**.

Сейчас ваша папка должна содержать папку **vendor**, а **composer.json** должен выглядеть вот так:

```json
{
    "name": "yourcompanyname/forgesample",
    "description": "a forge sample of PHP",
    "type": "project",
    "license": "ISC",
    "authors": [
        {
            "name": "Your Name",
            "email": "name@example.com"
        }
    ],
    "require": {
        "autodesk/forge-client": "^1.0",
        "klein/klein": "^2.1",
        "vlucas/phpdotenv": "^3.0.0"
    }
}
```

> Номер версии (например, forge-apis 0.4.1) может отличаться, Эта было последней версией на момент создания этого руководства.

## Файлы и папки

Чтобы создать новую папку или файл, щелкните правой кнопкой мыши на область "Explorer" слева и выберите **New Folder** или **New File**.

Создайте папку **/server/** для файлов на стороне сервера and **/www/** для файлов со стороны клиента.

На этом этапе ваш проект должен быть примерно таким:

![](_media/php/vs_code_explorer.png)


## index.php

В **корневой** папке создайте файл `index.php`.

!> Примечание: когда вы разрабатываете приложение, вам необходимо сначала обеспечить реализацию конечной точки, такой как AccessToken/DataManagement/ModelDerivative, а затем создать маршруты с помощью этого файла. Тем не менее, чтобы вам было проще, мы начнем с этого файла:
 
```php
<?php
session_start();
include_once "./vendor/autoload.php";
include_once "./server/oauthtoken.php";
include_once "./server/modelderivative.php";
include_once "./server/oss.php";
include_once "./server/config.php";
include_once "./server/oauth.php";

use Klein\Klein;
use Autodesk\ForgeServices\AccessToken;
use Autodesk\ForgeServices\ModelDerivative;
use Autodesk\ForgeServices\DataManagement;

$klein = new Klein();

// Get the access token
$klein->respond('GET', '/api/forge/oauth/token', function () {
    $accessToken = new AccessToken();
    return $accessToken->getAccessToken();
});

// Get all the buckets & objects
$klein->respond('GET', '/api/forge/oss/buckets', function () {
    $dataManagement = new DataManagement();
    return $dataManagement->getBucketsAndObjects();
});

// Create a new bucket
$klein->respond('POST', '/api/forge/oss/buckets', function(){
    $dataManagement = new DataManagement();
    return $dataManagement->createOneBucket();
});

// Upload a file to a bucket
$klein->respond('POST', '/api/forge/oss/objects', function () {
    $dataManagement = new DataManagement();
    return $dataManagement->uploadFile();
});

// Start translate the model
$klein->respond('POST', '/api/forge/modelderivative/jobs', function () {
    $modelDerivative = new ModelDerivative();
    return $modelDerivative->translateFile();
});

$klein->dispatch();
```

Этот файл направляет запросы API.


## .htaccess
Этот файл используется для перезаписи URL-адреса для Apache, мы направим следующий URL-адрес:
1. Перенаправить домашную страницу на **/www/index.html**
2. Перенаправить файлы js & css в папку **www**
3. Перенаправить вызов API с префиксом **index.php**

Подробнее здесь [.htaccess](https://httpd.apache.org/docs/2.4/howto/htaccess.html).

```json
<IfModule mod_rewrite.c>
 RewriteEngine on
 RewriteBase /

 RewriteCond %{REQUEST_URI} !^/www(.*)$
 RewriteCond %{REQUEST_URI} ^/$
 RewriteRule ^(.*)$ /www/index.html [NC,R=301],L]

 RewriteCond %{REQUEST_URI} !^/www(.*)$
 RewriteCond %{REQUEST_URI} ^.*.(js|css)$
 RewriteRule ^(.*)$ /www/$1 [NC,R=301],L]

 RewriteCond %{REQUEST_URI} !^/www(.*)$
 RewriteCond %{REQUEST_FILENAME} !-d
 RewriteCond %{REQUEST_FILENAME} !-f
 RewriteRule ^(.*)$ index.php/$1 [QSA,PT,L]
</IfModule>
```


## .env

!> Важно определить **ID & Secret** как переменные среды, чтобы наш проект мог использовать авторизованные запросы. 

Чтобы настроить переменные среды, создайте файл с именем **.env ** в папке **/server/** и добавьте сlient id и client secret в файл .env следующим образом:

    FORGE_CLIENT_ID="<<YOUR CLIENT ID FROM DEVELOPER PORTAL>>"
    FORGE_CLIENT_SECRET="<<YOUR CLIENT SECRET FROM DEVELOPER PORTAL>>"

О том, как загрузить переменные среды, мы поговорим в следующем разделе.

## Config.php

В **/server/** создайте файл с названием `config.php` и следующим кодом:

```php
<?php
namespace Autodesk\ForgeServices;
use Dotenv\Dotenv;

class ForgeConfig{
    private static $forge_id = null;
    private static $forge_secret = null;
    public static $prepend_bucketkey = true; //toggle client ID prefix to avoid conflict with existing buckets

    public static function getForgeID(){
      $forge_id = getenv('FORGE_CLIENT_ID');
      if(!$forge_id){
        // load the environment variable from .env into your application
        $dotenv = Dotenv::create(__DIR__);
        $dotenv->load();
        $forge_id = getenv('FORGE_CLIENT_ID');
     }
      return $forge_id;
    }

    public static function getForgeSecret(){
      $forge_secret = getenv('FORGE_CLIENT_SECRET');
      if(!$forge_secret){
        // load the environment variable from .env into your application
        $dotenv = Dotenv::create(__DIR__);
        $dotenv->load();
        $forge_secret = getenv('FORGE_CLIENT_SECRET');
     }
      return $forge_secret;
    }

    // Required scopes for your application on server-side
    public static function getScopeInternal(){
      return ['bucket:create', 'bucket:read', 'data:read', 'data:create', 'data:write'];
    }

    // Required scope of the token sent to the client
    public static function getScopePublic(){
      // Will update the scope to viewables:read when #13 of autodesk/forge-client is fixed
      return ['data:read'];
    }
}
```

Здесь мы получаем наши переменные ENV, загружая файл .env с кодом ниже:

```php
<?php
    $dotenv = Dotenv::create(__DIR__);
    $dotenv->load();
    $forge_secret = getenv('FORGE_CLIENT_SECRET');
    $forge_secret = getenv('FORGE_CLIENT_SECRET');
```

Во время запуска нашего PHP-сервера значения этих переменных будут использоваться для подключения к различным веб-сервисам Autodesk Forge, которые нам понадобятся.

Мы видим, что у области действия есть два определения. Эти области дают нашему токену право на использование различных веб-сервисов Forge (со стороны сервера). Это руководство посвящено использованию Forge Viewer, поэтому нам понадобится только область действия "viewables:read".



Проект готов! На этом этапе он должен иметь:

![](_media/php/vs_code_project.png)

> **composer.lock** был создан Composer install, не волнуйтесь

Далее: [Аутентификация](/ru-RU/oauth/2legged/)

[Эта страница на английском языке](https://learnforge.autodesk.io/#/environment/setup/php).
