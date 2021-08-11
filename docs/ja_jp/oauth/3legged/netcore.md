# 承認

基本的な *OAuth* の実装には 1 つのファイルが必要です。

### OAuthController.cs

プロジェクト ルート レベルで `Controllers` という名前のフォルダを作成し、同じ名前(`OAuthController.cs`)のクラス ファイルで **OAuthController** という名前のクラスを作成して、次のコンテンツを追加します。

[OAuthController.cs](_snippets/viewhubmodels/netcore/OAuthController.cs ':include :type=code csharp')

このコードは、**アクセストークン**を **リフレッシュ トークン**と **有効期限付きセッションに保存します。**有効期限が切れると、リフレッシュトークンを使用して2つの新しいアクセストークン(内部およびパブリック)を要求します。このプラグインには、`OAuthController`と`Credentials`の2つのクラスが含まれています。ここで、1番目のクラスはエンドポイントを公開し、2番目のクラスはアクセストークン(リフレッシュを含む)を処理します。

次へ:[ハブとプロジェクトをリスト](/ja_jp/datamanagement/hubs/readme)