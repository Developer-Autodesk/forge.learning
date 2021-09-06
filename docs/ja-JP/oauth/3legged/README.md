# OAuth 3-legged

正式な OAuth 用語では、Forge プラットフォームで 3-legged の認証と承認を実行する場合、承認コード許可タイプを採用できます。

例として Web アプリを使用する場合は、まず、アプリがエンドユーザをオートデスク ログイン ページにリダイレクトする必要があります。ユーザはログイン ページで、アプリから自分のデータへのアクセスを承認することができます。この操作を行うと、承認コードがアプリに返されます(コールバックのクエリー パラメータを使用)。アプリは、Forge 認証サーバと直接通信して、トークンの承認コードを交換します。[詳細はこちら](https://forge.autodesk.com/en/docs/oauth/v2/overview/basics/)。

ユーザは、自分のデータへのアクセスを承認する必要があります。**3-legged** トークンが必要です。

言語を選択:[Node.js](oauth/3legged/nodejs) | [.NET Framework](oauth/3legged/net) | [.NET Core](oauth/3legged/netcore)
