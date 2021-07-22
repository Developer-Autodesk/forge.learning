# モデルを変換する(.NET Framework)

ファイルを変換するには、端点を1つ指定する必要があります。

## ModelDerivativeController.cs

**ModelDerivativeController** という名前の .NET WebAPI コントローラを作成し([コントローラの作成方法](environment/setup/net_controller)を参照)、次の内容を追加します。

[ModelDerivativeController.cs](_snippets/viewmodels/net/ModelDerivativeController.cs ':include :type=code csharp')

**TranslateObject** は、**bucketKey** および **objectName** を受け取り、[移動ジョブ](https://forge.autodesk.com/en/docs/model-derivative/v2/reference/http/job-POST/)をポストしてモデルの 2D および 3D ビューを抽出します。 

次へ:[ビューアに表示](viewer/2legged/)