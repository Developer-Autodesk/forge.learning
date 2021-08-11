# 認証(.NET Framework)

## OAuthController.cs

**OAuthController** という名前の .NET WebAPI コントローラを作成し([コントローラの作成方法](/ja_jp/environment/setup/net_controller)を参照)、次のコンテンツを追加します。

[OAuthController.cs](_snippets/viewmodels/net/OAuthController.cs ':include :type=code csharp')

**Get2LeggedTokenAsync** メソッドは、Autodesk Forge に接続してアクセス トークンを取得します。パブリック(読み取り専用)および内部(書き込み可能)トークンが必要なため、**GetPublicAsync** はエンドポイントとして公開されますが、**GetInternalAsync** はアプリケーション用です。 

エンドユーザの要求ごとに新しいアクセストークンが取得されて不要な遅延が発生するのを防ぐには、いくつかの`static`変数でアクセストークンをキャッシュします。ただし、`expires_in`秒の後で更新する必要があります。

!>ユーザ間でアクセストークンを共有できるのは、この場合に限られます。この場合、すべてのユーザが同じ情報(2レッグ)にアクセスします。アプリケーションでユーザ単位のデータ(3 本足)を使用する場合、<スパン id="1">ドットは使用しません。

コメントに従って、**GetAppSetting** は **Web.Config** ファイルから ID とシークレットを取得します。

次へ:[OSSにファイルをアップロード](/ja_jp/datamanagement/oss/)