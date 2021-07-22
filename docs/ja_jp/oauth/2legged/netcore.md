# 認証(.NET Core)

## OAuthController.cs

プロジェクト ルート レベルで `Controllers` という名前のフォルダを作成し、同じ名前(`OAuthController.cs`)のクラス ファイルに **OAuthController** という名前のクラスを作成して、次のコンテンツを追加します。

[OAuthController.cs](_snippets/viewmodels/netcore/OAuthController.cs ':include :type=code csharp')

**Get2LeggedTokenAsync** メソッドは、Autodesk Forge に接続してアクセス トークンを取得します。パブリック(読み取り専用)および内部(書き込み可能)トークンが必要なため、**GetPublicAsync** はパブリック アクセスのエンドポイントを公開しますが、**GetInternalAsync** はアプリケーション内でのみ呼び出されます。

エンドユーザの各要求に対して新しいアクセス トークンが返されて不要な遅延が発生するのを回避するために、いくつかの `静的な ` 変数にキャッシュします。`expires_in` (秒単位)で指定された時間が経過した後も、更新する必要があります。

!>アクセストークンのユーザ間での共有は、すべてのユーザが同じ情報(2レッグ)にアクセスしている場合にのみ有効です。アプリケーションでユーザ固有のデータ(3 本足)が必要な場合は、<スパン id="1">ドットは使用しません。

上記のコードのコメントに従って、**GetAppSetting** は単に **Web.Config** ファイルから ID とシークレットを取得します。

次へ:[OSSにファイルをアップロード](/ja_jp/datamanagement/oss/)
