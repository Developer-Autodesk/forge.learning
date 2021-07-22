# 実行中およびデバッグ(実行)

サーバを起動するには、Visual Studio コードの統合ターミナルを開き、**View** > **Integrated Terminal** メニューを表示します。このメニューは、プロジェクトのルートで開きます。次に、次のコマンドを実行します。

```bash
    go run main.go
```

ブラウザを開き、`http://localhost:3000` に移動してアプリを確認します。

## デバッグ

ビジュアル コードの場合、[Delve](https://github.com/derekparker/delve) (ゴランデバッガ)を **Integrated Terminal** メニュー(**View** の下)に入力してインストールします。

```bash
go get -u github.com/derekparker/delve/cmd/dlv
```

`delve` をインストールしたら、F5 を押すか、メニュー **Debug** >> **デバッグを開始**します。 

!> デバッグの場合は、`main.go` ファイルがビジュアル コードで開いていることを確認してから **F5** を渡してください。開いていないとエラーが発生する可能性があります([トラブルシューティング](#troubleshooting)を参照)

これで、ワークスペースに対してlaunch.jsonファイルが作成され、デバッグ用の設定が含まれるようになります。既定では、次のような単一の設定が存在します。

```javascript
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Launch",
            "type": "go",
            "request": "launch",
            "mode": "debug",
            "remotePath": "",
            "port": 2345,
            "host": "127.0.0.1",
            "program": "${fileDirname}",
            "env": {},
            "args": [],
            "showLog": true
        }
    ]
}
```

ここでは変更する必要がないため、保存すると、すべてが設定されます。

ブレークポイントを設定し、`コード デバッグ ビューポート`(F5)で緑の `デバッグを開始(Start Debugging)`ボタンを押してデバッグを開始します。

**デバッグ(Debug)**メニューに移動し、**デバッグを開始(Start debugging)**を選択します。次に示すように、\[デバッグコンソール]タブが下部に表示されます。

![](_media/go/vs_code_debug.png) 

## トラブルシューティング

場合によっては、`メイン以外のパッケージをデバッグすることはできません。絶望してもかまわないので、プロジェクトのルートから `main.go` を開いてもう一度試してください。 

    NOTE: This is caused by `"program": "${fileDirname}"` line in configuration file, 
    based on which it will try to start your app using the location of your opened file, 
    so if you start debugging your app by selecting non-main file, it will not know where 
    to start.
    This makes more sense when you will have apps generating several 
    executables (g.e. daemon and client).

何らかの理由で、`プロセスを起動できないというエラーが表示される場合は、exec "lldb-server"` を使用します。OSX で開発していて、`コマンド ライン デベロッパー ツール`が不足していることを確認してください。この問題を解決するには、次の手順に従います。1\.新しい端子(ビジュアルコード統合端子を使用しない) 2を開きます。xcode-select --install 3を実行します。プロンプトが表示されたら、\[インストール]をクリックします ![](_media/go/osx_setup_tools.png) 


## 高度な設定

ターミナルのみのデバッグ(ハードコアデバッグ)に関心がある場合は、次のチュートリアルを参照してください。

- [GDB](https://golang.org/doc/gdb) の方法 - GDB を使用して golang アプリケーションをデバッグする場合
- [LLDB](http://blog.ralch.com/tutorial/golang-debug-with-lldb/) の方法 - LLDB を使用して golang アプリケーションをデバッグする場合


何も設定するのが好ましくない場合は、[Goland](https://www.jetbrains.com/go/) という名前が付いています。この名前には、必要なすべてのビジュアル ツールが含まれており、JetBrains 製品を使用するユーザに馴染みがあるはずです。



次へ:[ビューアの拡張機能](tutorials/extensions)