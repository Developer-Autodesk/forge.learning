# ファイルを OSS にアップロードする(Node.js)

このセクションでは、次の 3 つの機能が必要です。

1. バケットを作成する
2. バケットとオブジェクト(ファイル)をリストする
3. オブジェクト(ファイル)をアップロードする

## routes/oss.js

次の内容を含む `routes/oss.js` ファイルを作成します。

[routes/oss.js](_snippets/viewmodels/node/routes/oss.js ':include :type=code javascript')

[jsTree](https://www.jstree.com/) をサポートする予定なので、**GET /api/forge/oss/buckets** エンドポイントは `id` querystring パラメータを処理する必要があります。`id` が `#` に設定されている場合はすべてのバケットを返すか、`id=bucketKey` として渡された特定の bucketKey 内のすべてのオブジェクトを返します。アップロード エンドポイントは、[multer](https://github.com/expressjs/multer) モジュールを使用してファイルのアップロードを処理します。ファイルはサーバ(**/uploads/** フォルダなど)に保存され、後で Forge にアップロードすることができます。

このルータのミドルウェアとして `routes/common/oauth.js` からの認証ヘルパーを再利用する方法に注意してください。

!> クライアント(ブラウザ)から Autodesk Forge に直接ファイルをアップロードするには、クライアントに**書き込み許可**アクセス トークンを付与する必要がありますが、これは**安全ではありません**。

次の作業:[ファイルを変換する](/ja-JP/modelderivative/translate/)