# OSSにファイルをアップロードする(.NET Core)

このセクションでは、実際に3つの機能が必要です。

1. バケットを作成
2. バケットとオブジェクトをリスト(ファイル)
3. オブジェクト(ファイル)をアップロード

## OSSController.cs

**Controllers** フォルダの下で、同じ名前(`OSSController.cs`)のクラス ファイルで **OSSController** という名前のクラスを作成し、次の内容を追加します。

[OSSController.cs](_snippets/viewmodels/netcore/OSSController.cs ':include :type=code csharp')

[jsTree](https://www.jstree.com/) をサポートする予定なので、**GetOSSAsync** はクエリー文字列パラメータとして `id` を必要とし、`id=#` と指定された bucketKey のオブジェクトがクエリー文字列の `id=bucketKey` として渡された場合にバケットを返します。**CreateBucket** は、バケットを作成するために **bucketKey** パラメータを必要とします。最後に、**UploadObject** はブラウザからファイルを受け取り、**/App_Data/** の下に一時的に保存してから、それぞれのバケットにアップロードします。

!> クライアント(ブラウザ)から Autodesk Forge に直接ファイルをアップロードできますが、クライアントに **書き込み可能** アクセス トークン(**安全ではない**)を指定する必要があります。

次へ:[ファイルを変換する](/ja_jp/modelderivative/translate/)
