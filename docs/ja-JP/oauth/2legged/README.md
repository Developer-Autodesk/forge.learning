# OAuth 2-legged

正式な OAuth 用語では、Forge プラットフォームで 
**2-legged** 認証を実行するには、「クライアント資格情報」許可タイプを使用する必要があります。

つまり、アプリは認証およびリソースへのアクセスを行う際に Forge プラットフォームと直接通信します。Web アプリの場合は、Web ブラウザ経由で渡されるものがないため、エンドユーザはこれらのサーバ間通信を直接認識しません。[詳細はこちら](https://forge.autodesk.com/en/docs/oauth/v2/overview/basics/)。

Forge のリソースにアクセスするには、認証が必要です。**2-legged** トークンは、アプリケーション情報へのアクセスを許可します。

言語を選択:[Node.js](oauth/2legged/nodejs) | [.NET Framework](oauth/2legged/net) | [.NET Core](oauth/2legged/netcore) | [Go](oauth/2legged/go) | [PHP](oauth/2legged/php) | [Java](oauth/2legged/java)

