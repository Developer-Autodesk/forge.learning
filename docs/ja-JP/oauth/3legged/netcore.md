# 承認する

基本的な *OAuth* 実装には 1 つのファイルが必要です。

### OAuthController.cs

プロジェクト ルート レベルで `Controllers` という名前のフォルダを作成し、同じ名前(`OAuthController.cs`)のクラス ファイル内に **OAuthController** という名前のクラスを作成して、次の内容を追加します。

[OAuthController.cs](_snippets/viewhubmodels/netcore/OAuthController.cs ':include :type=code csharp')

このコードは、**リフレッシュ トークン**や**有効期限** とともに、両方の**アクセス トークン**をセッションに保存します。有効期限が切れると、コードはリフレッシュ トークンを使用して 2 つの新しいアクセス トークン(内部およびパブリック)を要求します。このプラグインには、`OAuthController` と `Credentials` の 2 つのクラスが含まれています。1 番目のクラスはエンドポイントを公開し、2 番目のクラスはアクセス トークン(リフレッシュを含む)を処理します。

次の作業:[ハブとプロジェクトを一覧表示する](/datamanagement/hubs/readme)