# OAuth 3-legged

正式な OAuth 用語では、Forge プラットフォームで 3-legged の認証と認可を実行する場合、認可コード許可タイプを採用できます。

例として Web アプリを使用する場合は、まず、アプリがエンドユーザをオートデスク ログイン ページにリダイレクトする必要があります。ユーザはログイン ページで、アプリから自分のデータへのアクセスを承認することができます。この操作を行うと、認可コードがアプリに返されます(コールバックのクエリー パラメータを使用)。アプリは、Forge 認証サーバと直接通信して、トークンの認可コードを交換します。[詳細はこちら](https://forge.autodesk.com/en/docs/oauth/v2/overview/basics/)。

ユーザは、自分のデータへのアクセスを認可する必要があります。**3-legged** トークンが必要です。

言語を選択:[Node.js](/ja-JP/oauth/3legged/nodejs) | [.NET Framework](/ja-JP/oauth/3legged/net) | [.NET Core](/ja-JP/oauth/3legged/netcore)
