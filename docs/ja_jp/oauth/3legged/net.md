# 承認(.NET Framework)

基本的な *OAuth* の実装には 1 つのファイルが必要です。

### OAuthController.cs

**OAuthController** という名前の .NET WebAPI コントローラを作成し([コントローラの作成方法](environment/setup/net_controller)を参照)、次のコンテンツを追加します。

[OAuthController.cs](_snippets/viewhubmodels/net/OAuthController.cs ':include :type=code csharp')

このコードは、**アクセストークン**を **リフレッシュ トークン**と **有効期限付きセッションに保存します。**有効期限が切れると、リフレッシュトークンを使用して2つの新しいアクセストークン(内部およびパブリック)を要求します。このプラグインには2つのクラスが含まれています。`OAuthController` および `Credentials`。1 つ目のノードはエンドポイントを公開し、2 つ目のノードはアクセス トークン(リフレッシュを含む)を処理します。

次へ:[ハブとプロジェクトをリスト](/datamanagement/hubs/readme)