# 認証(Node.js)

基本的な *OAuth* の実装には 2 つのファイルが必要です。

## routes/oauth.js

`routes/oauth.js` ファイルを作成します。このファイルは、OAuth関連のエンドポイント用のエクスプレスルータを作成します。

[routes/oauth.js](_snippets/viewmodels/node/routes/oauth.js ':include :type=code javascript')

## routes/common/oauth.js

次に、`routes` フォルダに `common` サブフォルダを作成し、Forge から実際にアクセス トークンを要求する `routes/common/oauth.js` ファイルを準備します。このチュートリアルの他の部分では、この設定が再利用されます。

[routes/common/oauth.js](_snippets/viewmodels/node/routes/common/oauth.js ':include :type=code javascript')

エンドユーザの要求ごとに新しいアクセストークンが取得されて不要な遅延が発生するのを防ぐには、グローバル変数にアクセストークンをキャッシュします。トークンは、`expies_in` 秒の後に更新する必要があります。

!>ユーザ間でアクセストークンを共有できるのは、この場合に限られます。この場合、すべてのユーザが同じ情報(2レッグ)にアクセスします。アプリケーションでユーザ単位のデータ(3 本足)を使用する場合、<スパン id="1">ドットは使用しません。

次へ:[OSSにファイルをアップロード](/ja_jp/datamanagement/oss/)