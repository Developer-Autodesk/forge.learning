# 認証(実行)


認証のコンテキストでサーバに必要なのは、フロントエンドが `viewables:read` スコープのトークンを要求し、ブラウザで表示可能項目を表示できるようにするエンドポイント `GET /api/forge/oauth/token` を公開することだけです。

この場合、必要なファイルは1つだけです。

## oauth.go

`/server/oauth.go` ファイルを作成します。このファイルは、上記のエンドポイントを公開します。 

[oauth.go](_snippets/viewmodels/go/oauth.go ':include :type=code go ')

これにより、oauth に対する `GET /api/forge/oauth/token` 呼び出しはすべて、次の形式でアクセス トークンを返すようになります。

```json
{
	'access_token': value, 
	'expires_in': value
}
```

次へ:[OSSにファイルをアップロード](/datamanagement/oss/)