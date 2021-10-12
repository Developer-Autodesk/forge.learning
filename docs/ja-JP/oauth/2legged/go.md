# 認証する(Go)


認証のコンテキストでサーバに必要なのは、`viewables:read` スコープを持つトークンをリクエストするためにフロントエンドで使用されるエンドポイント `GET /api/forge/oauth/token` を公開して、表示可能な内容をブラウザに表示する機能です。

この場合、必要なファイルは 1 つだけです。

## oauth.go

`/server/oauth.go` ファイルを作成します。このファイルは、上記のエンドポイントを公開します。 

[oauth.go](_snippets/viewmodels/go/oauth.go ':include :type=code go')

このファイルがあることで、oauth に対する `GET /api/forge/oauth/token` 呼び出しを行ったときに、次の形式のアクセス トークンが確実に返されます。

```json
{
	'access_token': value, 
	'expires_in': value
}
```

次の作業:[ファイルを OSS にアップロードする](/ja-JP/datamanagement/oss/)