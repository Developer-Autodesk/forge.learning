# OSSにファイルをアップロードする(.NET Framework)

このセクションでは、実際に3つの機能が必要です。

1. バケットを作成
2. バケットとオブジェクトをリスト(ファイル)
3. オブジェクト(ファイル)をアップロード

## OSSController.cs

**OSSController** という名前の .NET WebAPI コントローラを作成し([コントローラの作成方法](environment/setup/net_controller)を参照)、次のコンテンツを追加します。

[OSSController.cs](_snippets/viewmodels/net/OSSController.cs ':include :type=code csharp')

[jsTree](https://www.jstree.com/) をサポートする予定なので、**GetOSSAsync** は `id=#` および `id=bucketKey` として渡されたバケット キーのオブジェクトの場合は、バケットを返す必要があります。**CreateBucket** は、バケットを作成するために **bucketKey** パラメータを必要とします。最後に、**UploadObject** はクライアント(ブラウザ)からファイルを受け取り、**/App_Data/** に一時的に保存してから、それぞれのバケットにアップロードします。

!> クライアント(ブラウザ)から Autodesk Forge に直接ファイルをアップロードできますが、クライアントに **書き込み可能** アクセス トークン(**安全ではない**)を指定する必要があります。

次へ:[ファイルを変換する](modelderivative/translate/)