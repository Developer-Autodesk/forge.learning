# 建立新專案 (PHP)

在您的電腦上建立資料夾，請勿使用空格並避免使用特殊字元。在本自學課程中，讓我們使用 **forgesample** 作為資料夾名稱。

開啟 **Visual Code**，移往功能表 **File**，並選取 **Open** (MacOS) 或 **Open Folder** (Windows)，然後選取新建立的資料夾。

現在，我們需要終端機，請移往功能表 **View** >> **Integrated Terminal**。視窗應顯示在底部。輸入下列指令並遵循這些步驟。

```
composer init
```

這會建立 **composer.json** 檔案，用於定義專案將使用哪些套件。[瞭解更多](https://getcomposer.org/doc/04-schema.md)。

## 安裝套件

依預設，PHP 專案是空的，因此我們需要透過 **composer require** 安裝一些套件。讓我們從以下內容開始：基本 **PHP **伺服器、**klein** (用於路由器處理)、**phpdotenv** (自動將環境變數從 `.env` 載入到 `getenv()`、`$_ENV` 和 `$_SERVER`)，當然還有 **Autodesk Forge**。* 如果想要進一步瞭解如何使用 klein，請查看 [klein](https://packagist.org/packages/klein/klein)。* 如果想要進一步瞭解如何使用 phpdotenv，請查看 [phpdotenv](https://packagist.org/packages/vlucas/phpdotenv)。* 如果想要進一步瞭解如何使用 Forge PHP SDK，請查看 [Autodesk Forge](https://packagist.org/packages/autodesk/forge-client)。


!> 一次執行一個 **composer require**。

```
composer require autodesk/forge-client
composer require klein/klein
composer require vlucas/phpdotenv
```

> 上列安裝的程式庫將被記錄在 **composer.json** 檔案裡。

現在，您的資料夾應包含 **vendor** 資料夾，並且 **composer.json** 應如下所示：

[composer.json](_snippets/viewmodels/php/composer.json ':include :type=code json')

> 版本號碼 (例如 forge-client 1.0) 可能有所不同，這是建立自學課程時的最新版本。

## 檔案和資料夾

若要建立新資料夾或檔案，請在左側的「Explorer」區域上按一下右鍵，然後選取 **New Folder** 或 **New File**。

為了與其他 Forge 範例保持一致，請為所有伺服器端檔案建立 **/server/** 資料夾，為所有用戶端檔案建立 **/www/**。

此時，您的專案應類似如下：

![](_media/php/vs_code_explorer.png)


## index.php

現在，在**根**資料夾下，建立名為 `index.php` 的檔案。

!> 注意：開發應用程式時，您需要先建立 endpoint 實作 (例如 AccessToken/DataManagement/ModelDerivative)，然後依此檔案建立路由，但在介紹過程中，為了便於瞭解，我們將首先介紹此檔案：

[index.php](_snippets/viewmodels/php/index.php ':include :type=code php')

此檔案用於路由 API 請求。


## .htaccess
此檔案用於對 Apache 執行 URL Rewrite，我們將導向以下 URL：1\.將首頁重新導向至 **/www/index.html** 2.將 js 和 css 檔案重新導向至資料夾 **www** 3.重新導向任何以 **index.php** 為前綴的 API 呼叫

如需更多詳細資料，請查看 [.htaccess](https://httpd.apache.org/docs/2.4/howto/htaccess.html)。

[.htaccess](_snippets/viewmodels/php/_htaccess ':include :type=xml')

## .env

!> 將 **ID & Secret** 定義為環境變數很重要，這樣專案就可以將其用於授權請求。

若要設定環境變數，請在 **/server/** 資料夾下建立名為 **.env** 的檔案，並將 Forge client ID 和 client secret 加入 .env，如下所示：

    FORGE_CLIENT_ID="<<YOUR CLIENT ID FROM DEVELOPER PORTAL>>"
    FORGE_CLIENT_SECRET="<<YOUR CLIENT SECRET FROM DEVELOPER PORTAL>>"

我們將在下一節討論如何載入環境變數。

## Config.php

在 **/server/** 下，建立含有以下內容名為 `config.php` 的檔案：

[config.php](_snippets/viewmodels/php/config.php ':include :type=code php')

在這裡，我們透過使用如下程式碼載入 .env 檔案來取得 ENV 變數：

```php
<?php
    $dotenv = Dotenv::create(__DIR__);
    $dotenv->load();
    $forge_secret = getenv('FORGE_CLIENT_SECRET');
    $forge_secret = getenv('FORGE_CLIENT_SECRET');
```

執行 PHP 伺服器時，這些變數的值將用於連接至我們需要的其他 Autodesk Forge 服務。

最後，我們看到有 2 種關於範圍的定義。這些範圍為 Token 提供了使用 Forge Web Services 不同服務的適當權限。本自學課程僅專門介紹 Viewer 的使用，我們將僅需要「viewables:read」範圍。



專案已準備就緒！此時，您的專案應具有以下結構：

![](_media/php/vs_code_project.png)

> **composer.lock **是透過 Composer 安裝所建立，不用擔心

下一步：[驗證](/zh-TW/oauth/2legged/)