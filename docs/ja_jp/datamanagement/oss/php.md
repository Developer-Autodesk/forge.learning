# OSS (PHP)にファイルをアップロード

このセクションでは、実際に3つの機能が必要です。

1. バケットを作成-注:技術的には、バケット名はプラットフォーム全体でグローバルに一意である必要があります。このチュートリアルを使用して簡単に説明するには、クライアントIDの先頭にバケット名を付け、次にUIでマスクします。そのため、バケット名が現在のForgeアプリ内で一意であることを確認する必要があります。
2. バケットとオブジェクトをリスト(ファイル)
3. オブジェクト(ファイル)をアップロード

## OSS.php

次の内容で `/server/oss.php` ファイルを作成します。

[oss.php](_snippets/viewmodels/php/oss.php ':include :type=code php')

[jsTree](https://www.jstree.com/) をサポートする予定なので、**GET oss/buckets** は `id` querystring パラメータを返し、`id=#` および `id=bucketKey` として渡されたバケット キーのオブジェクトを返す必要があります。アップロードのエンドポイントで、アップロードに問題が発生しました。後で確認します。

すべての関数で `/server/oauth.php` ファイルを再利用して `.getTokenInternal()` を呼び出す方法に注意してください。


次へ:[ファイルを変換する](modelderivative/translate/)