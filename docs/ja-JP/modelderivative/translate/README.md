# ファイルを変換する

Model Derivative API を使用すると、ユーザは設計をさまざまな形式で表現および共有できるほかに、価値のあるメタデータを抽出することもできます。

![](/_media/forge/md_diagram.png)

ファイルに互換性があるかどうか不明な場合は、[サポートされている変換](https://forge.autodesk.com/en/docs/model-derivative/v2/developers_guide/supported-translations/)を確認します。

このセクションで、[POST Job](https://forge.autodesk.com/en/docs/model-derivative/v2/reference/http/job-POST/) を呼び出して、変換プロセスを開始してみましょう。このエンドポイントは非同期です。プロセスを開始したら、完了するまで HTTP 接続を開いたままにするのではなく、バックグラウンドで実行することに注意してください。

言語を選択:[Node.js](modelderivative/translate/nodejs) | [.NET Framework](modelderivative/translate/net) | [.NET Core](modelderivative/translate/netcore) | [Go](modelderivative/translate/go) | [PHP](modelderivative/translate/php) | [Java](modelderivative/translate/java)

