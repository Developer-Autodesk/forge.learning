# 認証する(.NET Core)

## OAuthController.cs

プロジェクト ルート レベルで `Controllers` という名前のフォルダを作成し、同じ名前(`OAuthController.cs`)のクラス ファイル内に **OAuthController** という名前のクラスを作成して、次の内容を追加します。

[OAuthController.cs](_snippets/viewmodels/netcore/OAuthController.cs ':include :type=code csharp')

**Get2LeggedTokenAsync** メソッドは Autodesk Forge に接続して、アクセス トークンを取得します。パブリック(読み取り専用)トークンおよび内部(書き込み対応)トークンが必要なため、**GetPublicAsync** はパブリック アクセス用のエンドポイントを公開しますが、**GetInternalAsync** はアプリケーション内でのみ呼び出されます。

エンドユーザの要求ごとに新しいアクセス トークンを取得すると、不要な遅延が発生するため、これを防ぐには、いくつかの `static` 変数にアクセス トークンをキャッシュします。`expires_in` で指定した時間(秒)が経過したら、アクセス トークンをを更新する必要があることに注意してください。

!> ユーザ間でアクセス トークンを共有できるのは、すべてのユーザが同じ情報にアクセスしている場合のみです(2-legged)。アプリでユーザ固有のデータが必要な場合は(3-legged)、この方法を**使用しないでください**。

上記コードのコメントに従って、**GetAppSetting** は **Web.Config** ファイルから ID とシークレットを取得します。

次の作業:[ファイルを OSS にアップロードする](/datamanagement/oss/)
