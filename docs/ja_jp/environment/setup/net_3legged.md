[net setup](/ja_jp/environment/setup/net.md ':include :type=markdown')

## Global.asax

追加のステップの1つ:通常、REST APIは状態を保持する必要はありません。つまり、セッションでユーザのコントロールを維持しません。このアプリはユーザごとにデータを表示するため、呼び出しを行っているユーザを特定する必要があります。そこで、`/api/` エンドポイントのみのセッションを有効にします。次のコードは、既存の `Global.asax ` コード ファイルにコピーする必要があります。

[Global.asax](_snippets/viewhubmodels/net/Global.asax ':include :type=code csharp')

プロジェクトの準備ができました。

次へ:[承認](/ja_jp/oauth/3legged/)