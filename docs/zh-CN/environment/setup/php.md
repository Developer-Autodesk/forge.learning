# 创建新项目 (PHP)

在计算机上创建一个文件夹，不要使用空格并避免使用特殊字符。在本教程中，我们使用 **forgesample**。

打开 **Visual Code**，然后转到 **File** 菜单，选择 **Open** (MacOS) 或 **Open Folder** (Windows)，并选择新创建的文件夹。

现在，我们需要使用终端，转到菜单 **View** >> **Integrated Terminal**。底部应显示一个窗口。键入以下命令，然后按照步骤操作。

```
composer init
```

这将创建 **composer.json** 文件，该文件定义项目将使用的软件包。[了解更多信息](https://getcomposer.org/doc/04-schema.md)。

## 安装软件包

默认情况下，PHP 项目为空，因此我们需要使用 **composer require** 安装几个软件包。我们先安装基本的 **PHP** 服务器、用于路由器处理的 **klein**、用于将环境变量从 `.env` 自动加载到 `getenv()`、`$_ENV` 和 `$_SERVER` 的 **phpdotenv** 以及 **Autodesk Forge**。* 如果您想了解有关 klein 用法的详细信息，请查看 [klein](https://packagist.org/packages/klein/klein)。* 如果您想了解有关 phpdotenv 用法的详细信息，请查看 [phpdotenv](https://packagist.org/packages/vlucas/phpdotenv)。* 如果您想了解有关 Forge PHP SDK 用法的详细信息，请查看 [Autodesk Forge](https://packagist.org/packages/autodesk/forge-client)。


!> 一次运行一个 **composer require**。

```
composer require autodesk/forge-client
composer require klein/klein
composer require vlucas/phpdotenv
```

> 该库也将保存在 **composer.json** 文件中。

现在，您的文件夹应包含 **vendor** 文件夹，并且您的 **composer.json** 应如下所示：

[composer.json](_snippets/viewmodels/php/composer.json ':include :type=code json')

> 版本号（例如 forge-client 1.0）可能会有所不同，这个版本号是创建本教程时的最新版本。

## 文件和文件夹

要创建新文件夹或文件，请在左侧“Explorer”区域上单击鼠标右键，然后选择 **New Folder** 或 **New File**。

为了与其他 Forge 示例保持一致，请创建一个用于存放所有服务器端文件的 **/server/** 文件夹和一个用于存放所有客户端文件的 **/www/** 文件夹。

此时，您的项目应类似于：

![](_media/php/vs_code_explorer.png)


## index.php

现在，在**根**文件夹下，创建一个名为 `index.php` 的文件。

!> 注意：在开发应用程序时，需要先创建 endpoint 实现（如 AccessToken/DataManagement/ModelDerivative），然后通过此文件创建路由，但作为简介，为了清楚地说明，我们将首先介绍此文件：

[index.php](_snippets/viewmodels/php/index.php ':include :type=code php')

此文件用于路由 API 请求。


## .htaccess
此文件用于执行 Apache 的 URL 重写，我们将重定向以下 URL：1. 将主页重定向到 **/www/index.html** 2. 将 js 和 css 文件重定向到文件夹 **www** 3. 重定向任何 API 调用，以 **index.php** 为前缀

有关更多详细信息，请查看 [.htaccess](https://httpd.apache.org/docs/2.4/howto/htaccess.html)。

[.htaccess](_snippets/viewmodels/php/_htaccess ':include :type=xml')

## .env

!> 请务必将 **ID 和 Secret** 定义为环境变量，以便我们的项目可以将其用于授权请求。

要设置环境变量，请在 **/server/** 文件夹下创建一个名为 **.env** 的文件，然后将 Forge Client ID 和 Client Secret 添加到 .env，如下所示：

    FORGE_CLIENT_ID="<<YOUR CLIENT ID FROM DEVELOPER PORTAL>>"
    FORGE_CLIENT_SECRET="<<YOUR CLIENT SECRET FROM DEVELOPER PORTAL>>"

我们将在下一部分中介绍如何加载环境变量。

## Config.php

在 **/server/** 下，创建一个名为 `config.php` 的文件，其内容如下：

[config.php](_snippets/viewmodels/php/config.php ':include :type=code php')

我们通过加载具有以下代码的 .env 文件来获取 ENV 变量：

```php
<?php
    $dotenv = Dotenv::create(__DIR__);
    $dotenv->load();
    $forge_secret = getenv('FORGE_CLIENT_SECRET');
    $forge_secret = getenv('FORGE_CLIENT_SECRET');
```

在运行 PHP 服务器时，将使用这些变量的值连接到我们需要的不同 Autodesk Forge 服务。

最后，我们看到有 2 个有关范围的定义。这些范围为 token 提供适当权限，以使用 Forge Web 服务的不同服务。本教程专门介绍 Viewer 的使用，我们只需要“viewables:read”范围。



项目已准备就绪！此时，项目应如下所示：

![](_media/php/vs_code_project.png)

> **composer.lock** 是由 Composer 安装创建的，不用担心

下一步：[身份验证](/zh-CN/oauth/2legged/)