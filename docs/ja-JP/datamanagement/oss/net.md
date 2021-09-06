# ファイルを OSS にアップロードする(.NET Framework)

このセクションでは、実際に 3 つの機能が必要です。

1. バケットを作成する
2. バケットとオブジェクト(ファイル)をリストする
3. オブジェクト(ファイル)をアップロードする

## OSSController.cs

**OSSController** という名前の .NET WebAPI コントローラを作成し(「[コントローラの作成方法](environment/setup/net_controller)」を参照)、次のコンテンツを追加します。

[OSSController.cs](_snippets/viewmodels/net/OSSController.cs ':include :type=code csharp')

[jsTree](https://www.jstree.com/) をサポートする予定なので、**GetOSSAsync** は `id` querystring パラメータのハンドルを返し、`id=#`、および指定の bucketKey が `id=bucketKey` として渡されたときにバケットを返す必要があります。**CreateBucket** は、バケットを作成するために **bucketKey** パラメータを期待します。最後に、**UploadObject** はクライアント(ブラウザ)からファイルを受信し、**/App_Data/** に一時的に保存してから、それぞれのバケットにアップロードします。

!> クライアント(ブラウザ)から Autodesk Forge に直接ファイルをアップロードするには、クライアントに**書き込み許可**アクセス トークンを付与する必要がありますが、これは**安全ではありません**。

次の作業:[ファイルを変換する](modelderivative/translate/)