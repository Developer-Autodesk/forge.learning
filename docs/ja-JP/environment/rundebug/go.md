# 実行とデバッグ(Go)

サーバを起動するには、**View** メニュー > **Integrated Terminal** の順に選択して、Visual Studio Code Integrated Terminal を開きます。統合ターミナルは、プロジェクトのルートで開きます。次のコマンドを実行します。

```bash
    go run main.go
```

ブラウザを開き、`http://localhost:3000` に移動してアプリを確認します。

## デバッグする

Visual Studio Code の場合、**View** メニューの **Integrated Terminal** で入力して、Go 言語のデバッガである [Delve](https://github.com/derekparker/delve) をインストールします。

```bash
go get -u github.com/derekparker/delve/cmd/dlv
```

`delve` がインストールされたら、[F5]キーを押すか、**Debug** メニュー >> **Start debugging** の順に選択します。 

!> デバッグの場合は、**\[F5]**キーを押す前に、Visual Studio Code で `main.go` ファイルが開いていることを確認してください。このファイルが開いていない場合は、エラーが発生する可能性があります(「[トラブルシューティング](#troubleshooting)」を参照)。

これで、デバッグ用の設定が含まれる、ワークスペース用に作成された launch.json ファイルが表示されるようになりました。既定では、次のような単一の設定が含まれています。

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

ここで変更が必要なものはないため、保存して、すべての設定を完了します。

ブレークポイントを設定し、`Code debug viewlet` ([F5])で緑の`Start Debugging` ボタンを押してデバッグを開始します。

**Debug** メニューに移動し、**Start debugging** を選択します。次のように、下部に Debug Console タブが表示されます。

![](_media/go/vs_code_debug.png) 

## トラブルシューティング

場合によっては、`Can not debug non-main package` のようなエラーが表示されることがありす。でも心配はいりません。プロジェクトのルートから `main.go` を開いて、もう一度試してください。 

    NOTE: This is caused by `"program": "${fileDirname}"` line in configuration file, 
    based on which it will try to start your app using the location of your opened file, 
    so if you start debugging your app by selecting non-main file, it will not know where 
    to start.
    This makes more sense when you will have apps generating several 
    executables (g.e. daemon and client).

場合によっては、`could not launch process: exec "lldb-server"` のようなエラーが表示されることがあります。OSX で開発していること、および `command line developer tools` が欠落していることを確認してください。この問題を解決するには、次の手順に従います。1\.新しいターミナルを開きます(Visual Studio Code Integrated Terminal は使用しないでください)。 2.xcode-select --install を実行します。3.プロンプトが表示されたら、Install をクリックします。![](_media/go/osx_setup_tools.png) 


## アドバンスト設定

ターミナル専用デバッグ(ハードコア デバッグ)に関心がある場合は、次のチュートリアルを参照してください。

- [GDB の方法](https://golang.org/doc/gdb) \- Go 言語のアプリケーションを GDB を使用してデバッグする場合
- [LLDB の方法](http://blog.ralch.com/tutorial/golang-debug-with-lldb/) \- Go 言語のアプリケーションを LLDB を使用してデバッグする場合


何もセットアップしない場合は、[Goland](https://www.jetbrains.com/go/) に、必要なすべてのビジュアル ツールが含まれています。JetBrains 製品を使用するツールに関する詳細な知識が必要になります。



次の作業:[ビューアのエクステンション](/ja-JP/tutorials/extensions)