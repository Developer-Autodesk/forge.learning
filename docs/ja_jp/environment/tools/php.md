# ツール(PHP)

コードを実行するには、[PHP](http://php.net/downloads.php) エンジンをインストールします。 

[Composer ](https://getcomposer.org/download/) をインストールして依存関係を管理します。 

>注:インストール後にComposerコマンドが認識できない場合は、次のコマンドを使用してcomposer.pharを/usr/local/bin/フォルダに移動して名前を変更してください。 

>$ mv composer.phar /usr/local/bin/composer 

> [StackOverflow](https://stackoverflow.com/questions/25018894/osx-bash-composer-command-not-found) の詳細を確認します。
  
 デバッグや開発を支援する PHP の拡張である [xDebug](https://xdebug.org/index.php) をインストールします。この設定は、後で **PHP Debug** を使用して設定します。

次に、コードを記述するためのIDEが必要です。多くのオプションがありますが、このチュートリアルでは、[Visual Studio Code](https://code.visualstudio.com/) を使用します。

> このチュートリアルでは、すべての既定のインストールオプションを使用します。

最後に、Visual Code 用に **PHP Server** および **PHP Debug** の拡張機能をインストールします。 - Visual Code Extension manager (左側、下部アイコン) - Type `PHP` を入力し、`PHP Debug` および `PHP Server` プラグインを選択してインストールします。

![](_media/php/vs_code_extension.png) 

- **PHP Server** 拡張機能を使用すると、PHP を使用して現在のワークスペース(またはサブフォルダ)を簡単にホスト/提供することができます。
> 複数の PHP バージョンがインストールされている場合は、ビジュアル コード **ユーザ設定**の **phpserver.phpPath** をオーバーライドして、PHP 実行可能ファイルの場所を指定することができます。空の場合、拡張子は$PATH環境変数に表示されるPHP実行可能ファイルを使用します
 

- **PHP Debug** 拡張機能は、Visual Code と XDebug の間のデバッグ アダプタです。 
> **PHP Debug** Extension では、動作させるには XDebug を使用して設定する必要があります。PHP Debug Extension の詳細、または設定に関する適切な [ブログの投稿を確認してください。](https://blogs.msdn.microsoft.com/nicktrog/2016/02/11/configuring-visual-studio-code-for-php-development/)次に簡単な手順を示します。1.上記のようにPHPとxDebugをインストールします。2\. php.iniファイルを次の設定で更新し、zend_extensionが正しい場所を指していることを確認します。

      [xdebug]
        zend_extension="<<path/to/xdebug>>"
        xdebug.remote_enable=1
        xdebug.remote_host=localhost
        xdebug.remote_port=9000
        xdebug.remote_autostart=1


次へ:[認証](/ja_jp/oauth/)