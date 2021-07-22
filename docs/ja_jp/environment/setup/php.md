# 新規プロジェクトを作成する(PHP)

コンピュータにフォルダを作成し、スペースを使用せず、特殊文字を使用しないでください。このチュートリアルでは、**forgesample** を使用します。

**ビジュアル コード**を開き、メニュー **ファイル**に移動して、**開く**(MacOS)または **開く**(Windows)を選択し、新しく作成されたフォルダを選択します。

次に、ターミナルが必要です。**View** >> **Integrated Terminal** メニューを選択します。ウィンドウが下部に表示されます。次のコマンドを入力して、手順に従います。

```
composer init
```

これにより、**composer.json** ファイルが作成され、プロジェクトで使用するパッケージが定義されます。[詳細はこちら](https://getcomposer.org/doc/04-schema.md)

## パッケージをインストール

既定では、PHP プロジェクトは空なので、**composer を使用するパッケージをいくつかインストールする必要があります。**まず、基本的な **PHP** サーバ、**klein**、ルータ処理の **phpdotenv** を使用して、`.env` から `getenv()`、`$_ENV` および `$_SERVER` を自動的にロードします。 span id="9">Autodesk Forge. * Klein の使用法の詳細については、[klein](https://packagist.org/packages/klein/klein) を確認してください。 * phpdotenv の使用法の詳細については、[phpdotenv](https://packagist.org/packages/vlucas/phpdotenv) を確認してください。 * Php SDK の使用法の詳細については、[Autodesk Forge](https://packagist.org/packages/autodesk/forge-client) を確認してください。


!> 一度に 1 つの **composer が ** を必要とします。

```
composer require autodesk/forge-client
composer require klein/klein
composer require vlucas/phpdotenv
```

> ライブラリは、**composer.json** ファイルにも保存されます。

これで、フォルダに **vendor** フォルダが作成され、**composer.json** は次のようになります。

[composer.json](_snippets/viewmodels/php/composer.json ':include :type=code json')

> バージョン番号(forge-client 1.0など)は異なる場合があり、これはチュートリアル作成時の最新バージョンです。

## ファイルとフォルダ

新しいフォルダまたはファイルを作成するには、左側の「エクスプローラ」領域を右クリックし、**新しいフォルダ ** または **新しいファイル**を選択します。

その他の Forge サンプルと整合性を保つため、すべてのサーバ側ファイルに **/server/** フォルダを作成し、すべてのクライアント側ファイルに **/www/** を作成します。

この時点で、プロジェクトは次のようになります。

![](_media/php/vs_code_explorer.png)


## index.php

次に、**root** フォルダの下に、`index.php` という名前のファイルを作成します。

!>注:アプリを開発する場合は、まずAccessToken/DataManagement/ModelDerivativeなどのエンドポイント実装を作成し、次にこのファイルでルートを作成する必要がありますが、概要として、このファイルを最初に導入します。

[index.php](_snippets/viewmodels/php/index.php ':include :type=code php')

このファイルは、API要求をルーティングします。


## .htaccess
このファイルは、ApacheのURL書き換えを実行するために使用されます。ここでは、次のURLを指定します。1\.ホーム ページを **/www/index.html** 2 にリダイレクトします。js および css ファイルを**www** 3 フォルダにリダイレクトします。**index.php** で始まる API 呼び出しのリダイレクト

詳細については、[.htaccess](https://httpd.apache.org/docs/2.4/howto/htaccess.html) を参照してください。

[.htaccess](_snippets/viewmodels/php/_htaccess ':include :type=xml')

## .env

!> オートデスクのプロジェクトが許可された要求に使用できるように、**ID & Secret** を環境変数として定義することが重要です。

環境変数を設定するには、**.env** という名前のファイルを **/server/** フォルダに作成し、次のように Forge クライアント ID とクライアント シークレットを .env に追加します。

    FORGE_CLIENT_ID="<<YOUR CLIENT ID FROM DEVELOPER PORTAL>>"
    FORGE_CLIENT_SECRET="<<YOUR CLIENT SECRET FROM DEVELOPER PORTAL>>"

環境変数をロードする方法については、次のセクションで説明します。

## Config.php

**/server/** の下に、`config.php` という名前のファイルを作成し、次の内容を含めます。

[config.php](_snippets/viewmodels/php/config.php ':include :type=code php')

次のようなコードを使用して.envファイルをロードすることにより、ここにENV変数を取得します。

```php
<?php
    $dotenv = Dotenv::create(__DIR__);
    $dotenv->load();
    $forge_secret = getenv('FORGE_CLIENT_SECRET');
    $forge_secret = getenv('FORGE_CLIENT_SECRET');
```

PHPサーバを実行する際に、これらの変数の値を使用して、必要な異なるAutodesk Forgeサービスに接続します。

最後に、スコープに関する2つの定義があります。これらのスコープは、Forge Weサービスのさまざまなサービスを使用するための適切な権限をトークンに与えます。このチュートリアルは、ビューアのみを使用する場合に使用します。必要なのは「viewables:read」スコープのみです。



プロジェクトの準備ができました。この時点で、プロジェクトには次の条件が設定されています。

![](_media/php/vs_code_project.png)

> **composer.lock** は、Composer のインストールによって作成されました。心配はいりません

次へ:[認証](/ja_jp/oauth/2legged/)