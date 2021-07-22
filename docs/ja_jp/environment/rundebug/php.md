# 実行とデバッグ(PHP)

**PHP Server** および **PHP Debug** 拡張機能がビジュアル コードにインストールされていることを確認します。インストールされていない場合は、最初に [**ツール**](/ja_jp/environment/tools/php)セクションを確認してください。

## サーバを開始/停止

VS Code からコマンド パレットを開き、コマンド **Serve Project With PHP** を実行します。このコマンドは、ポート 3000 で PHP サーバを起動し、**Stop PHP Server** コマンドを実行してサーバを停止します。

![](_media/php/vs_code_debug.png) 

ブラウザを開き、`http://localhost:3000` に移動します。


## デバッグ
デバッグを開始し、VS Code の **Debugging** タブに移動します。次に、小さな歯車アイコンを押してPHPのlaunch.jsonファイルを生成します。このファイルには、デバッグ用の設定が含まれます。既定では、次のような単一の設定が存在します。

```javascript
    {
        "name": "Listen for XDebug",
        "type": "php",
        "request": "launch",
        "port": 9000
    },
```
行を選択して\[F9]を押し、この設定でデバッグを開始することにより、ソースコードにブレークポイントを設定することができます。

特定のWebページをクリックすると、VS Codeは指定したブレークポイントでソースコードにブレークします。次’に、左側のペインで変数やコールスタックなどの情報を取得します。


![](_media/php/vs_code_debug.gif) 


次へ:[ビューアの拡張機能](/ja_jp/tutorials/extensions)