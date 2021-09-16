# 認証する(.NET Framework)

## OAuthController.cs

**OAuthController** という名前の .NET WebAPI コントローラを作成し(「[コントローラの作成方法](/ja-JP/environment/setup/net_controller)」を参照)、次の内容を追加します。

[OAuthController.cs](_snippets/viewmodels/net/OAuthController.cs ':include :type=code csharp')

**Get2LeggedTokenAsync** メソッドは Autodesk Forge に接続して、アクセス トークンを取得します。パブリック(読み取り専用)トークンおよび内部(書き込み対応)トークンが必要なため、**GetPublicAsync** はエンドポイントとして公開されますが、**GetInternalAsync** はアプリケーションに使用されます。 

エンドユーザのリクエストごとに新しいアクセス トークンを取得すると、不要な遅延が発生するため、これを防ぐには、いくつかの `static` 変数にアクセス トークンをキャッシュします。`expires_in` 秒が経過したら、アクセス トークンを更新する必要があることに注意してください。

!> ユーザ間でアクセス トークンを共有できるのは、すべてのユーザが同じ情報にアクセスしている場合のみです(2-legged)。アプリでユーザ単位のデータを使用する場合は(3-legged)、この方法を**使用しないでください**。

コメントに従って、**GetAppSetting** は **Web.Config** ファイルから ID と Secret を取得します。

次の作業:[ファイルを OSS にアップロードする](/ja-JP/datamanagement/oss/)