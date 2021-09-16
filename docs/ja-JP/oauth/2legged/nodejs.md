# 認証する(Node.js)

基本的な *OAuth* 実装には 2 つのファイルが必要です。

## routes/oauth.js

`routes/oauth.js` ファイルを作成します。このファイルは、OAuth 関連エンドポイント用の Express ルーターを作成します。

[routes/oauth.js](_snippets/viewmodels/node/routes/oauth.js ':include :type=code javascript')

## routes/common/oauth.js

`routes` フォルダ内に `common` サブフォルダを作成し、Forge に対してアクセス トークンを実際にリクエストする `routes/common/oauth.js` ファイルを準備します。このファイルは、このチュートリアルの他の部分で再利用されます。

[routes/common/oauth.js](_snippets/viewmodels/node/routes/common/oauth.js ':include :type=code javascript')

エンドユーザのリクエストごとに新しいアクセス トークンを取得すると、不要な遅延が発生するため、これを防ぐには、グローバル変数にアクセス トークンをキャッシュします。`expires_in` 秒が経過したら、アクセス トークンを更新する必要があることに注意してください。

!> ユーザ間でアクセス トークンを共有できるのは、すべてのユーザが同じ情報にアクセスしている場合のみです(2-legged)。アプリでユーザ単位のデータを使用する場合は(3-legged)、この方法を**使用しないでください**。

次の作業:[ファイルを OSS にアップロードする](/ja-JP/datamanagement/oss/)