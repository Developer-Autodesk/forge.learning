# 認証(Node.js)

基本的な *OAuth* の実装には 2 つのファイルが必要です。

## routes/oauth.js

`routes/oauth.js`ファイルを作成します。このファイルは、OAuth関連のエンドポイント用のエクスプレスルータを作成します。

[routes/oauth.js](_snippets/viewhubmodels/node/routes/oauth.js ':include :type=code javascript')

## routes/common/oauth.js

次に、`routes`フォルダに`common`サブフォルダを作成し、Forgeから実際にアクセストークンを要求する`routes/common/oauth.js`ファイルを準備します。このチュートリアルの他の部分では、この設定が再利用されます。

[routes/common/oauth.js](_snippets/viewhubmodels/node/routes/common/oauth.js ':include :type=code javascript')

このコードは、**access tokens** を **refresh token** および **expiration time** とともに、セッションの**access tokens の両方を(クッキー ベースで)保存します。有効期限が切れると、リフレッシュトークンを使用して2つの新しいアクセストークン(内部およびパブリック)を要求します。 

!>サーバは`https`アクセスのみで指定され、cookieはクライアントとサーバによってのみ読み取ることができます。 

次へ:[ハブとプロジェクトをリスト](/ja_jp/datamanagement/hubs/readme)