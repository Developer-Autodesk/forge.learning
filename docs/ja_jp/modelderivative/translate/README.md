# ファイルを変換する

Model Derivative APIを使用すると、ユーザは設計を異なる形式で表現および共有したり、価値のあるメタデータを抽出することができます。

![](/_media/forge/md_diagram.png)

ファイルに互換性があるかどうかを確認できない[対応する変換](https://forge.autodesk.com/en/docs/model-derivative/v2/developers_guide/supported-translations/)を確認します。

このセクションでは、[POST Job](https://forge.autodesk.com/en/docs/model-derivative/v2/reference/http/job-POST/) を呼び出して、変換プロセスを開始します。このエンドポイントは非同期で、完了するまで開いたHTTP接続を維持するのではなく、バックグラウンドで実行されるプロセスを開始することに注意してください。

言語を選択:[Node.js](/ja_jp/modelderivative/translate/nodejs) | [.NET Framework](/ja_jp/modelderivative/translate/net) | [.NET Core](/ja_jp/modelderivative/translate/netcore) | [Go](/ja_jp/modelderivative/translate/go) | [PHP](/ja_jp/modelderivative/translate/php) | [Java](/ja_jp/modelderivative/translate/java)

