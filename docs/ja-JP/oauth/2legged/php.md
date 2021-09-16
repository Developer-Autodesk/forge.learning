# 認証する(PHP)

基本的な *OAuth* 実装には 2 つのファイルが必要です。

## OAuthToken.php

`/server/oauthtoken.php` ファイルを作成します。このファイルはエンドポイントに応答して、アクセス トークンを返します。 

[oauthtoken.php](_snippets/viewmodels/php/oauthtoken.php ':include :type=code php')

## OAuth.php

Forge に対してアクセス トークンを実際にリクエストする `/sever/oauth.php` ファイルを作成します。このファイルは、このチュートリアルの他の部分で再利用されます。

[oauth.php](_snippets/viewmodels/php/oauth.php ':include :type=code php')

次の作業:[ファイルを OSS にアップロードする](/ja-JP/datamanagement/oss/)