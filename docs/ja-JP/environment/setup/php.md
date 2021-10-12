# 新規プロジェクトを作成する(PHP)

マシンにフォルダを作成します。スペースや特殊文字は使用しないでください。このチュートリアルでは、**forgesample** を使用してみましょう。

**Visual Studio Code** を開き、**File** メニューに移動し、**Open**(MacOS)または **Open Folder**(Windows)を選択して、新しく作成されたフォルダを選択します。

ターミナルが必要なため、**View** メニュー >> **Integrated Terminal** の順に選択します。下部にウィンドウが表示されます。次のコマンドを入力して、手順に従います。

```
composer init
```

これで、**composer.json** ファイルが作成され、プロジェクトで使用するパッケージが定義されます。[詳細はこちら](https://getcomposer.org/doc/04-schema.md)。

## パッケージをインストールする

既定では、PHP プロジェクトは空であるため、**composer require** を使用していくつかのパッケージをインストールする必要があります。最初に、基本的な **PHP** サーバ、ルーター処理に使用する **klein**、`.env` から `getenv()`、`$_ENV` および `$_SERVER` に環境変数を自動的にロードする **phpdotenv** から始めましょう。もちろん、**Autodesk Forge** もインストールします。* klein の使用方法の詳細は、[klein](https://packagist.org/packages/klein/klein) をチェックしてください。 * phpdotenv の使用方法の詳細は、[phpdotenv](https://packagist.org/packages/vlucas/phpdotenv) をチェックしてください。 * Forge PHP SDK の使用方法の詳細は、[Autodesk Forge](https://packagist.org/packages/autodesk/forge-client) をチェックしてください。


!> 一度に 1 つの **composer require** を実行します。

```
composer require autodesk/forge-client
composer require klein/klein
composer require vlucas/phpdotenv
```

> ライブラリは、**composer.json** ファイルにも保存されます。

これで、フォルダに **vendor** フォルダが作成されました。**composer.json** は次のようになります。

[composer.json](_snippets/viewmodels/php/composer.json ':include :type=code json')

> バージョン番号(forge-client 1.0 など)は異なる場合があります。このバージョンは、チュートリアルが作成された時点の最新バージョンです。

## ファイルとフォルダ

新しいフォルダまたはファイルを作成するには、左側の Explorer 領域を右クリックして、**New Folder** または **New File** を選択します。

その他の Forge サンプルと整合性を保つため、すべてのサーバ側ファイルに **/server/** フォルダを作成し、すべてのクライアント側ファイルに **/www/** を作成します。

この時点で、プロジェクトは次のようになります。

![](_media/php/vs_code_explorer.png)


## index.php

次に、**root** フォルダの下に、`index.php` という名前のファイルを作成します。

!> 注: アプリを開発している場合は、まず AccessToken/DataManagement/ModelDerivative などのエンドポイント実装を作成し、次にこのファイルでルートを作成する必要がありますが、説明を明確にするため、最初にこのファイルについて説明します。

[index.php](_snippets/viewmodels/php/index.php ':include :type=code php')

このファイルは、API リクエストをルーティングします。


## .htaccess
このファイルは、Apache の URL 書き換えを実行するために使用されます。ここでは、次の URL を指定します。1\.ホーム ページを **/www/index.html** にリダイレクトします。2.js および css ファイルを **www** フォルダにリダイレクトします。3.**index.php** で始まる API 呼び出しをリダイレクトします。

詳細については、[.htaccess](https://httpd.apache.org/docs/2.4/howto/htaccess.html) を参照してください。

[.htaccess](_snippets/viewmodels/php/_htaccess ':include :type=xml')

## .env

!> 環境変数として **ID と Secret** を定義し、プロジェクトが認可済みのリクエストに対してそれらを使用できるようにすることが重要です。

環境変数を設定するには、**.env** という名前のファイルを **/server/** フォルダに作成し、次のように Forge Client ID と Client Secret を .env に追加します。

    FORGE_CLIENT_ID="<<YOUR CLIENT ID FROM DEVELOPER PORTAL>>"
    FORGE_CLIENT_SECRET="<<YOUR CLIENT SECRET FROM DEVELOPER PORTAL>>"

環境変数をロードする方法については、次のセクションで説明します。

## Config.php

**/server/** で、次の内容を含む、`config.php` という名前のファイルを作成します。

[config.php](_snippets/viewmodels/php/config.php ':include :type=code php')

次のようなコードを持つ .env ファイルをロードすることにより、ここで ENV 変数を取得します。

```php
<?php
    $dotenv = Dotenv::create(__DIR__);
    $dotenv->load();
    $forge_secret = getenv('FORGE_CLIENT_SECRET');
    $forge_secret = getenv('FORGE_CLIENT_SECRET');
```

PHP サーバの実行時に、これらの変数の値を使用して、必要になる別の Autodesk Forge サービスに接続します。

最後に、スコープに関する 2 つの定義があります。これらのスコープは、トークンに、Forge Web サービスのさまざまなサービスを使用するのに適した権限を付与します。このチュートリアルはビューアの使用に特化しています。必要なのは、「viewables:read」スコープのみです。



プロジェクトの準備ができました!この時点で、プロジェクトには以下が設定されています。

![](_media/php/vs_code_project.png)

> **composer.lock** は、Composer のインストールによって作成されました。心配はいりません

次の作業:[認証する](/ja-JP/oauth/2legged/)