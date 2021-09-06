# 認証する(Node.js)

基本的な *OAuth* 実装には 2 つのファイルが必要です。

## routes/oauth.js

`routes/oauth.js` ファイルを作成します。このファイルは、OAuth 関連エンドポイント用の Express ルーターを作成します。

[routes/oauth.js](_snippets/viewhubmodels/node/routes/oauth.js ':include :type=code javascript')

## routes/common/oauth.js

`routes` フォルダ内に `common` サブフォルダを作成し、Forge に対してアクセス トークンを実際に要求する `routes/common/oauth.js` ファイルを準備します。このファイルは、このチュートリアルの他の部分で再利用されます。

[routes/common/oauth.js](_snippets/viewhubmodels/node/routes/common/oauth.js ':include :type=code javascript')

このコードは、**リフレッシュ トークン**や**有効期限** とともに、両方の**アクセス トークン**をセッションに保存します(クッキー ベース)。有効期限が切れると、コードはリフレッシュ トークンを使用して 2 つの新しいアクセス トークン(内部およびパブリック)を要求します。 

!> サーバを指定するには、`https` アクセスを使用する必要がありました。cookie はクライアントとサーバのみが読み取ることができます。 

次の作業:[ハブとプロジェクトを一覧表示する](/ja-JP/datamanagement/hubs/readme)