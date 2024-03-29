# ファイルを OSS にアップロードする(PHP)

このセクションでは、実際に 3 つの機能が必要です。

1. バケットを作成する - 注:技術的には、バケット名はプラットフォーム全体でグローバルに一意である必要があります。このチュートリアルでは説明を簡単にするため、既定でバケット名の前に Client ID が付加され、次に UI によってマスクされます。そのため、バケット名が現在の Forge アプリ内で一意であることを確認するだけで済みます。

2. バケットとオブジェクト(ファイル)をリストする
3. オブジェクト(ファイル)をアップロードする

## OSS.php

次の内容を含む `/server/oss.php` ファイルを作成します。

[oss.php](_snippets/viewmodels/php/oss.php ':include :type=code php')

[jsTree](https://www.jstree.com/) をサポートする予定なので、**GET oss/buckets** は、`id` querystring パラメータのハンドルを返し、`id=#`、および指定の bucketKey のオブジェクトが `id=bucketKey` として渡されたときにバケットを返す必要があります。アップロードのエンドポイントには、まだアップロードできないという問題があります。後で確認します。

すべての関数で `/server/oauth.php` ファイルを再利用して `.getTokenInternal()` を呼び出す方法に注意してください。


次の作業:[ファイルを変換する](/ja-JP/modelderivative/translate/)