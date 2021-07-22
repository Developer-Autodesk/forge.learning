# OSS (JAVA)にファイルをアップロード

このセクションでは、実際に3つの機能が必要です。

1. バケットを作成
2. バケットとオブジェクトをリスト(ファイル)
3. オブジェクト(ファイル)をアップロード

## oss.java

`/src/main/java/oss.java` という名前の新しい Java クラスを次の内容で作成します。このファイルは、バケットの作成とリストの処理を行います。

[oss.java](_snippets/viewmodels/java/oss.java ':include :type=code java')

[jsTree](https://www.jstree.com/) ライブラリをサポートする予定なので、**GET oss/buckets** は `id` querystring パラメータを返し、`id=#` および `id=bucketKey` として渡されたバケット キーのオブジェクトを返す必要があります。

## ossuploads.java

次の内容で `/src/main/ossuploads.java` ファイルを作成します。このファイルはファイルのアップロードを処理します。ワークフローでファイルストリームを取得し、Forgeにアップロードします。

[ossuploads.java](_snippets/viewmodels/java/ossuploads.java ':include :type=code java')

すべての関数で `/src/main/java/oauth.java` ファイルを再利用して `.getTokenInternal()` を呼び出す方法に注意してください。 

!> クライアント(ブラウザ)から Autodesk Forge に直接ファイルをアップロードできますが、クライアントに **書き込み可能** アクセス トークン(**安全ではない**)を指定する必要があります。

次へ:[ファイルを変換する](modelderivative/translate/)