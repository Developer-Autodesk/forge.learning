# 認証(PHP)

基本的な *OAuth* の実装には 2 つのファイルが必要です。

## OAuthToken.php

`/server/oauthtoken.php` ファイルを作成します。このファイルは、エンドポイントに応答して、アクセストークンを返します。 

[oauthtoken.php](_snippets/viewmodels/php/oauthtoken.php ':include :type=code php')

## OAuth.php

次に、実際に Forge からアクセス トークンを要求する `/sever/oauth.php` ファイルを作成します。このチュートリアルの他の部分では、この設定を再利用します。

[oauth.php](_snippets/viewmodels/php/oauth.php ':include :type=code php')

次へ:[OSSにファイルをアップロード](/datamanagement/oss/)