# OSS (Node.js)にファイルをアップロード

このセクションでは、次の3つの機能が必要です。

1. バケットを作成する
2. バケットとオブジェクト(ファイル)をリストする
3. オブジェクト(ファイル)をアップロード中

## routes/oss.js

次の内容で `routes/oss.js` ファイルを作成します。

[routes/oss.js](_snippets/viewmodels/node/routes/oss.js ':include :type=code javascript')

[jsTree](https://www.jstree.com/) をサポートするため、**GET /api/forge/oss/buckets** エンドポイントは `id` querystring パラメータを処理し、`id` が `#` に設定されている場合にすべてのバケットを返すか、`id=bucketKey` としてとして渡された指定BucketBucketKey でKey 内のすべてのオブジェクトををのを返します。アップロード エンドポイントは、[multer](https://github.com/expressjs/multer) モジュールを使用して、ファイルのアップロードを処理します。この場合、ファイルはサーバに保存されます(**/uploads/** フォルダなど)。後で Forge にアップロードすることができます。

このルータのミドルウェアとして、`routes/common/oauth.js` の認証ヘルパーを再利用する方法に注意してください。

!> クライアント(ブラウザ)から Autodesk Forge に直接ファイルをアップロードできますが、クライアントに **書き込み可能** アクセス トークン(**安全ではない**)を与える必要があります。

次へ:[ファイルを変換する](modelderivative/translate/)