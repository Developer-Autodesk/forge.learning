# ツール(実行)

[Go distribution](https://golang.org/doc/install) をダウンロードしてインストールし、コードを実行します。 

環境変数 [$GOPATH](https://github.com/golang/go/wiki/GOPATH) が設定されていることを確認してください。これは初めて使用する場合に必要です。OSX および Linux OS の場合、ユーザ フォルダの下に `/go/` フォルダを使用することができます。

```bash
// MacOS & Linux
export GOPATH=$HOME/go
```

Windows の場合、`GOPATH` を `C:\GOPROJECTS` のような単純な場所に設定することをお勧めします。

```cmd
// Windows
set GOPATH=C:\GOPROJECTS
```

次に、コードを記述するためのIDEが必要です。多くのオプションがありますが、このチュートリアルでは、[Visual Studio Code](https://code.visualstudio.com/) を使用します。

> このチュートリアルでは、すべての既定のインストールオプションを使用します。

次に、インストール後に GoCode パッケージをインストールします。インストールすると GoLang がサポートされます。 - Visual Code Extension manager (左側、下部アイコン) - Type `go` を選択し、***lukehoben* で作成された `Go`** を選択します。

![](_media/go/install_go_extension.gif) 


!>インストール中またはインストール後に、他のGo関連パッケージをインストールするための通知が表示された場合は、これらのパッケージを安全にインストールできます。これらのパッケージは、Visual Studio CodeでGoコーディング機能を向上させるヘルパーツールです。     
例:    
 -`github.com/nsf/gocode` \- コンテキスト依存のオートコンプリートを追加します。    
 -`github.com/rogpeppe/godef` \- Go source でシンボル情報を見つけるのに役立ちます。    
 -`github.com/sqs/goreturns` \- autocomplete function returns for you;    
 -`github.com/tpng/gopkgs` \- ヘルプ のプロパティを指定します。

次へ:[認証](oauth/)