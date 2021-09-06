# ファイルを OSS にアップロードする(.NET Core)

このセクションでは、実際に 3 つの機能が必要です。

1. バケットを作成する
2. バケットとオブジェクト(ファイル)をリストする
3. オブジェクト(ファイル)をアップロードする

## OSSController.cs

**Controllers**フォルダ内の同じ名前(`OSSController.cs`)のクラス ファイル内に **OSSController** という名前のクラスを作成して、次の内容を追加します。

[OSSController.cs](_snippets/viewmodels/netcore/OSSController.cs ':include :type=code csharp')

[jsTree](https://www.jstree.com/) をサポートする予定なので、**GetOSSAsync** は querystring パラメータとして `id` を必要とし、`id=#`、および特定の bucketKey のオブジェクトが querystring で `id=bucketKey` として渡されたときにバケットを返します。**CreateBucket** は、バケットを作成するために **bucketKey** パラメータを期待します。最後に、**UploadObject** はブラウザからファイルを受信し、**/App_Data/** に一時的に保存してから、それぞれのバケットにアップロードします。

!> クライアント(ブラウザ)から Autodesk Forge に直接ファイルをアップロードするには、クライアントに**書き込み許可**アクセス トークンを付与する必要がありますが、これは**安全ではありません**。

次の作業:[ファイルを変換する](/ja-JP/modelderivative/translate/)
