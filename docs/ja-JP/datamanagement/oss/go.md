# ファイルを OSS にアップロードする(Go)

このセクションでは、実際に 3 つの機能が必要です。

1. バケットを作成する
2. バケットとオブジェクト(ファイル)をリストする
3. オブジェクト(ファイル)をアップロードする

このファイルは 2 つのファイルで構成されます。

## oss.go

`/server/oss.go` ファイルを作成します。これは最初の2 つの機能を処理し、次の内容が含まれます。

[oss.go](_snippets/viewmodels/go/oss.go ':include :type=code go')

フロントエンドで [jsTree](https://www.jstree.com/) をサポートする予定です。したがって、**GET oss/buckets** は、`id` querystring パラメータのハンドルを返し、`id=#`、および指定の bucketKey のオブジェクトが `id=bucketKey` として渡されたときにバケットを返す必要があります。


## uploader.go

次の内容を含む `/server/uploader.go` ファイルを作成します。

[uploader.go](_snippets/viewmodels/go/uploader.go ':include :type=code go')

!> クライアント(ブラウザ)から Autodesk Forge に直接ファイルをアップロードするには、クライアントに**書き込み許可**アクセス トークンを付与する必要がありますが、これは**安全ではありません**。

次の作業:[ファイルを変換する](modelderivative/translate/)