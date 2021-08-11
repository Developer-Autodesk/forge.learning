# 認証(実行)


認証のコンテキストでサーバに必要なのは、フロントエンドが`viewables:read`スコープを持つトークンを要求するエンドポイント`GET /api/forge/oauth/token`を公開して、ブラウザで表示可能項目を表示できるようにすることです。

この場合、必要なファイルは1つだけです。

## oauth.go

`/server/oauth.go`ファイルを作成します。このファイルは、上記のエンドポイントを公開します。 

[oauth.go](_snippets/viewmodels/go/oauth.go ':include :type=code go')

これにより、oauthに対する`GET /api/forge/oauth/token`呼び出しが、次の形式でアクセストークンを返すことが保証されます。

```json
{
	'access_token': value, 
	'expires_in': value
}
```

次へ:[OSSにファイルをアップロード](/ja_jp/datamanagement/oss/)