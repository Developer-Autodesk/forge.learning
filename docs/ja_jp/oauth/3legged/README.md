# OAuth 3本足

正式なOAuth用語では、Forgeプラットフォームで3本足の認証と承認を実行するために、承認コード許可タイプを採用できます。

たとえば、Webアプリを使用するには、アプリケーションが最初にエンドユーザをAutodeskログインページにリダイレクトする必要があります。このページでユーザはアプリケーションからデータへのアクセスを承認することができます。これを行うと、承認コードがアプリに返されます(コールバックのクエリーパラメータを使用)。アプリは、Forge認証サーバと直接通信して、トークンの認証コードを交換します。[詳細はこちら](https://forge.autodesk.com/en/docs/oauth/v2/overview/basics/)

ユーザは、データへのアクセスを許可する必要があります。**3 本足の ** トークンが必要です。

言語を選択:[Node.js](oauth/3legged/nodejs) | [.NET Framework](oauth/3legged/net) | [.NET Core](oauth/3legged/netcore)
