[net のセットアップ](/ja-JP/environment/setup/net.md ':include :type=markdown')

## Global.asax

追加のステップ: 通常、REST API はステートレスです。つまり、セッション中のユーザのコントロールを維持しません。このアプリはユーザごとにデータを表示するため、呼び出しを行っているユーザを特定する必要があります。そこで、`/api/` エンドポイントのセッションのみを有効にします。次のコードは、既存の `Global.asax` コード ファイルにコピーする必要があります。

[Global.asax](_snippets/viewhubmodels/net/Global.asax ':include :type=code csharp')

プロジェクトの準備ができました!

次の作業:[認可する](/ja-JP/oauth/3legged/)