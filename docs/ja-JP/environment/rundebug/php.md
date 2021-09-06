# 実行とデバッグ(PHP)

**PHP サーバ**および **PHP デバッグ**の拡張機能が Visual Code にインストールされていることを確認します。インストールされていない場合は、最初に [**Tools**](/ja-JP/environment/tools/php) セクションを確認してください。

## サーバを開始/停止する

VS Code でコマンド パレットを開き、**Serve Project With PHP** コマンドを実行して、ポート 3000 で PHP サーバを起動します。サーバを停止するには、**Stop PHP Server** コマンドを実行します。

![](_media/php/vs_code_debug.png) 

ブラウザを開き、`http://localhost:3000` に移動します。


## デバッグする
デバッグを開始するには、VS Code の **Debugging** タブに移動します。次に、小さな歯車アイコンをクリックして、PHP の launch.json ファイルを生成します。このファイルには、デバッグ用の設定が含まれます。既定では、次のような単一の設定が含まれています。

```javascript
    {
        "name": "Listen for XDebug",
        "type": "php",
        "request": "launch",
        "port": 9000
    },
```
行を選択し、\[F9]キーを押して、ソース コードにブレークポイントを設定したり、この設定を使用してデバッグを開始したりできます。

特定の Web ページをクリックすると、VS Code は指定したブレークポイントで中断し、ソース コードを開きます。次に、左側のペインで変数やコール スタックなどの情報を取得します。


![](_media/php/vs_code_debug.gif) 


次の作業:[ビューアの拡張機能](/ja-JP/tutorials/extensions)