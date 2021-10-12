# Create a new project (PHP)

Create a folder on your machine, do not use spaces and avoid special chars. For this tutorial, let's use **forgesample**.

Open **Visual Studio Code**, then go to menu **File** and select **Open** (MacOS) or **Open Folder** (Windows) and select the newly created folder.

Now we need the terminal, go to menu **View** >> **Integrated Terminal**. A window should appear on the bottom. Type the following command and follow the steps.

```
composer init
```

This creates the **composer.json** file, which defines which packages our project will be using. [Learn more](https://getcomposer.org/doc/04-schema.md).

## Install packages

By default, a PHP project is empty, so we need to install a few packages with **composer require**. Let's start with a basic **PHP** server, **klein** for router handling, **phpdotenv** to load environment variables from `.env` to `getenv()`, `$_ENV` and `$_SERVER` automagically, of course, **Autodesk Forge**.
* Check [klein](https://packagist.org/packages/klein/klein) if you want to know more about usage of klein.
* Check [phpdotenv](https://packagist.org/packages/vlucas/phpdotenv) if you want to know more about usage of phpdotenv.
* Check [Autodesk Forge](https://packagist.org/packages/autodesk/forge-client) if you want to know more about usage of Forge PHP SDK.


!> Run one **composer require** at a time.

```
composer require autodesk/forge-client
composer require klein/klein
composer require vlucas/phpdotenv
```

> The libary would be also saved on the **composer.json** file.

Now your folder should have a **vendor** folder and your **composer.json** should look like:

[composer.json](_snippets/viewmodels/php/composer.json ':include :type=code json')

> The version number (e.g. forge-client 1.0) may vary, this was the latest version when tutorial was created.

## Files and Folders

To create a new folder or file, right-click on the "Exporer" area on the left and select **New Folder** or **New File**.

For consitency with other Forge samples, create a **/server/** folder for all server-side files and a **/www/** for all client-side files.

At this point, you project should be something like:

![](_media/php/vs_code_explorer.png)


## index.php

Now, under **root** folder, create a file named `index.php`.

!> Note: when you are developing the app, you need to create the endpoint implementation like AccessToken/DataManagement/ModelDerivative first, and then create the routes by this file, but as an introduction, to make it clear, we will introduce this file first:

[index.php](_snippets/viewmodels/php/index.php ':include :type=code php')

This file routes the API requests.


## .htaccess
This file is used to do URL Rewrite for Apache, we will direct the following URL:
1. Redirect home page to **/www/index.html**
2. Redirect js & css files to folder **www**
3. Redirect any API call to be prefixed with **index.php**

please check [.htaccess](https://httpd.apache.org/docs/2.4/howto/htaccess.html) for more details.

[.htaccess](_snippets/viewmodels/php/_htaccess ':include :type=xml')

## .env

!> It's important to define **ID & Secret** as environment variables so our project can use it for authorized requests..

To setup the environment variables, create a file named **.env** under **/server/** folder, and add your forge client id and client secret to the .env as follow:

    FORGE_CLIENT_ID="<<YOUR CLIENT ID FROM DEVELOPER PORTAL>>"
    FORGE_CLIENT_SECRET="<<YOUR CLIENT SECRET FROM DEVELOPER PORTAL>>"

We will talk about how to load the environment variables in next section.

## Config.php

Under **/server/** create a file named `config.php` with the following content:

[config.php](_snippets/viewmodels/php/config.php ':include :type=code php')

We are getting our ENV variables here by loading the .env file with the code like:

```php
<?php
    $dotenv = Dotenv::create(__DIR__);
    $dotenv->load();
    $forge_secret = getenv('FORGE_CLIENT_SECRET');
    $forge_secret = getenv('FORGE_CLIENT_SECRET');
```

At the time of running our PHP server the values on these variables will be used to connect to the different Autodesk Forge services we will need.

Last we see there are 2 definitions about scopes. These scopes give our Token the right permission for the use of the different services of the Forge We Services. This tutorial is dedicated to the use of the Viewer only, we will only need the "viewables:read" scope.



Project is ready! At this point your project should have:

![](_media/php/vs_code_project.png)

> The **composer.lock** was created by Composer install, don't worry

Next: [Authenticate](oauth/2legged/)