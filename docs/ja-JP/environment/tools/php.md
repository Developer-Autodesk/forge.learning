# ツール(PHP)

コードを実行するには、[PHP](http://php.net/downloads.php) エンジンをインストールします。 

依存関係を管理するには、[Composer](https://getcomposer.org/download/) をインストールします。 

>注: インストール後に Composer コマンドが認識できない場合は、次のコマンドを使用して composer.phar を /usr/local/bin/ フォルダに移動し、名前を変更してください。 

>$ mv composer.phar /usr/local/bin/composer 

> [Answer on StackOverflow](https://stackoverflow.com/questions/25018894/osx-bash-composer-command-not-found) で詳細を確認します。
  
 デバッグや開発を支援する PHP のためのエクステンションである [xDebug](https://xdebug.org/index.php) をインストールします。これは、後で **PHP Debug** を使用して設定します。

次に、コードを記述するための IDE が必要です。多くのオプションがありますが、このチュートリアルでは、[Visual Studio Code](https://code.visualstudio.com/) を使用します。

> このチュートリアルでは、すべての既定のインストール オプションを使用します。

最後に、Visual Studio Code のための **PHP Server** および **PHP Debug** のエクステンションをインストールします。 - Visual Studio Code 拡張マネージャ(左側、下部のアイコン)に移動します - `PHP` と入力し、`PHP Debug` および `PHP Server` プラグインを選択/インストールします。

![](_media/php/vs_code_extension.png) 

- **PHP Server** エクステンションを使用すると、PHP を使用して現在のワークスペース(またはサブフォルダ)を簡単にホスト/提供することができます。
> 複数の PHP バージョンがインストールされている場合は、Visual Studio Code の **User Settings** で **phpserver.phpPath** をオーバーライドすることにより、PHP実行可能ファイルの場所を指定できます。空の場合、拡張子は $PATH 環境変数に表示される PHP 実行可能ファイルを使用します
 

- **PHP Debug** エクステンションは、Visual Studio Code と XDebug 間のデバッグ アダプタです。 
> **PHP Debug** エクステンションを動作させるには、XDebug を使用して設定する必要があります。PHP Debug エクステンションの詳細、または[設定に関する適切なブログの投稿](https://blogs.msdn.microsoft.com/nicktrog/2016/02/11/configuring-visual-studio-code-for-php-development/)を確認してください。次に簡単な手順を示します。1\. 上記のように PHP と xDebug をインストールします。2\. php.ini ファイルを次の設定で更新し、zend_extension が正しい場所を指していることを確認します。

      [xdebug]
        zend_extension="<<path/to/xdebug>>"
        xdebug.remote_enable=1
        xdebug.remote_host=localhost
        xdebug.remote_port=9000
        xdebug.remote_autostart=1


次の作業:[認証](/ja-JP/oauth/)