# Create a new project (PHP)

Create a folder on your machine, do not use spaces and avoid special chars. For this tutorial, let's use **forgesample**.

Open **Visual Code**, then go to menu **File** and select **Open** (MacOS) or **Open Folder** (Windows) and select the newly created folder. 

Now we need the terminal, go to menu **View** >> **Integrated Terminal**. A window should appear on the bottom. Type the following command and follow the steps.

```
composer init
```

This creates the **composer.json** file, which defines which packages our project will be using. [Learn more](https://getcomposer.org/doc/04-schema.md).

## Install packages

By default, a PHP project is empty, so we need to install a few packages with **composer require**. Let's start with a basic **PHP** server, **klein** for router handling, of course, **Autodesk Forge**.
* Check [klein](https://packagist.org/packages/klein/klein) if you want to know more about usage of klein. 
* Check [Autodesk Forge](https://packagist.org/packages/autodesk/forge-client) if you want to know more about usage of Forge PHP SDK. 


!> Run one **composer require** at a time.

```
composer require autodesk/forge-client
composer require klein/klein
```

> The libary would be also saved on the **composer.json** file. 

Now your folder should have a **vendor** folder and your **composer.json** should look like:

```json
{
    "name": "wuz/forgesample",
    "description": "a forge sample of PHP",
    "type": "project",
    "license": "ISC",
    "authors": [
        {
            "name": "Zhong Wu",
            "email": "zhong.wu@autodesk.com"
        }
    ],
    "require": {
        "autodesk/forge-client": "^1.0",
        "klein/klein": "^2.1"
    }
}
```

> The version number (e.g. forge-client 1.0) may vary, this was the latest version when tutorial was created.

## Files and Folders

To create a new folder or file, right-click on the "Exporer" area on the left and select **New Folder** or **New File**.

For consitency with other Forge samples, create a **/server/** folder for all server-side files and a **/www/** for all client-side files.

At this point, you project should be something like:

![](_media/php/vs_code_explorer.png) 

## Setup credentials

> It's important to define **ID & Secret** as environment variables so our project can use it for authorized requests..

To setup the environment variables, follow these steps, depending on your operationg system.
Mac OSX/Linux (Terminal)

    export FORGE_CLIENT_ID=<<YOUR CLIENT ID FROM DEVELOPER PORTAL>>
    export FORGE_CLIENT_SECRET=<<YOUR CLIENT SECRET>>
Click to copy
Windows (Command Prompt)

    set FORGE_CLIENT_ID=<<YOUR CLIENT ID FROM DEVELOPER PORTAL>>
    set FORGE_CLIENT_SECRET=<<YOUR CLIENT SECRET>>


## index.php

Now, under **root** folder, create a file named `index.php`.

!> Note: when you are developing the app, you need to create the endpoint implementation like AccessToken/DataManagement/ModelDerivative first, and then create the routes by this file, but as an introduction, to make it clear, we will introduce this file first:

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

This file routes the API requests.

## Config.php

Under **/server/** create a file named `config.php` with the following content:

```php
<?php
namespace Autodesk\ForgeServices;

class ForgeConfig{
    private static $forge_id = null;
    private static $forge_secret = null;

    public static function getForgeID(){
      $forge_id = getenv('FORGE_CLIENT_ID');
      return $forge_id? $forge_id : "<<YOUR CLIENT ID FROM DEVELOPER PORTAL>>";
    }

    public static function getForgeSecret(){
      $forge_secret = getenv('FORGE_CLIENT_SECRET');
      return $forge_secret? $forge_secret : "<<YOUR CLIENT SECRET FROM DEVELOPER PORTAL>>";
    }

    // Required scopes for your application on server-side
    public static function getScopeInternal(){
      return ['bucket:create', 'bucket:read', 'data:read', 'data:create', 'data:write'];
    }

    // Required scope of the token sent to the client
    public static function getScopePublic(){
      return ['data:read'];
    }
}
```

We are defining our ENV variables here, at the time of running our PHP server the values on these variables will be use to connect to the different Autodesk Forge services we will need.

Last we see there are 2 definitions about scopes. These scopes give our Token the right permission for the use of the different services of the Forge We Services. This tutorial is dedicated to the use of the Viewer only, we will only need the "viewables:read" scope.


## .htaccess
This file is used to do URL Rewrite for Apache, please check [.htaccess](https://httpd.apache.org/docs/2.4/howto/htaccess.html) for more details.

```json
<IfModule mod_rewrite.c>
 RewriteEngine on
 RewriteCond %{REQUEST_FILENAME} !-d
 RewriteCond %{REQUEST_FILENAME} !-f
 RewriteRule ^(.*)$ index.php/$1 [QSA,PT,L]
</IfModule>
```


Project is ready! At this point your project should have:

![](_media/php/vs_code_project.png) 

> The **composer.lock** was created by Composer install, don't worry :wink: 

Next: [Authenticate](oauth/2legged/)