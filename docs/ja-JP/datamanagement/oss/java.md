# ファイルを OSS にアップロードする(JAVA)

このセクションでは、実際に 3 つの機能が必要です。

1. バケットを作成する
2. バケットとオブジェクト(ファイル)をリストする
3. オブジェクト(ファイル)をアップロードする

## oss.java

次の内容を使用して、`/src/main/java/oss.java` という名前の新しい Java クラスを作成します。このファイルは、バケットの作成とリストの処理を行います。

[oss.java](_snippets/viewmodels/java/oss.java ':include :type=code java')

[jsTree](https://www.jstree.com/) ライブラリをサポートする予定なので、**GET oss/buckets** は、`id` querystring パラメータのハンドルを返し、`id=#`、および指定の bucketKey のオブジェクトが `id=bucketKey` として渡されたときにバケットを返す必要があります。

## ossuploads.java

次の内容を含む `/src/main/ossuploads.java` ファイルを作成します。このファイルはファイルのアップロードを処理します。ワークフローはファイル ストリームを取得し、Forge にアップロードします。

[ossuploads.java](_snippets/viewmodels/java/ossuploads.java ':include :type=code java')

すべての関数で `/src/main/java/oauth.java` ファイルを再利用して `.getTokenInternal()` を呼び出す方法に注意してください。 

!> クライアント(ブラウザ)から Autodesk Forge に直接ファイルをアップロードするには、クライアントに**書き込み許可**アクセス トークンを付与する必要がありますが、これは**安全ではありません**。

次の作業:[ファイルを変換する](modelderivative/translate/)