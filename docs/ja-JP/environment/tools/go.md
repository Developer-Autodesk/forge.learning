# ツール(Go)

[Go distribution](https://golang.org/doc/install) をダウンロードしてインストールし、コードを実行します。 

環境変数 [$GOPATH](https://github.com/golang/go/wiki/GOPATH) が設定されていることを確認してください。これは初めて使用する場合に必要です。OSX および Linux OS の場合は、ユーザ フォルダの下にある `/go/` フォルダを使用します。

```bash
// MacOS & Linux
export GOPATH=$HOME/go
```

Windows の場合、`GOPATH` を `C:\GOPROJECTS` のような単純な場所に設定することをお勧めします。

```cmd
// Windows
set GOPATH=C:\GOPROJECTS
```

次に、コードを記述するための IDE が必要です。多くのオプションがありますが、このチュートリアルでは、[Visual Studio Code](https://code.visualstudio.com/) を使用します。

> このチュートリアルでは、すべての既定のインストール オプションを使用します。

次に、Visual Code パッケージのために Go をインストールします。インストールすると、GoLang がサポートされます。- Visual Code 拡張マネージャ(左側、下部のアイコン)に移動します - `go` と入力し、***lukehoben*** によって作成された `Go` プラグインを選択します。

![](_media/go/install_go_extension.gif) 


!> インストール中またはインストール後に、他の Go 関連パッケージをインストールするための通知が表示された場合、これらのパッケージは Visual Studio Code での Go コーディング エクスペリエンスを向上させるヘルパー ツールなので、安全にインストールできます。     
例:    
 -`github.com/nsf/gocode` - コンテキスト依存のオートコンプリートを追加します。    
 -`github.com/rogpeppe/godef` \- Go ソースでシンボル情報を見つけるのに役立ちます。    
 -`github.com/sqs/goreturns` - 関数の戻り値をオートコンプリートします。    
 -`github.com/tpng/gopkgs` \- インストールされたパッケージを追跡するのに役立ちます。

次の作業:[認証](oauth/)