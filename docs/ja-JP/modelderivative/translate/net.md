# モデルを変換する(.NET Framework)

ファイルを変換するには、1 つのエンドポイントが必要です。

## ModelDerivativeController.cs

**ModelDerivativeController** という名前の .NET WebAPI コントローラを作成し(「[コントローラの作成方法](environment/setup/net_controller)」を参照)、次の内容を追加します。

[ModelDerivativeController.cs](_snippets/viewmodels/net/ModelDerivativeController.cs ':include :type=code csharp')

**TranslateObject** は **bucketKey** および **objectName** を受け取り、[変換ジョブ](https://forge.autodesk.com/en/docs/model-derivative/v2/reference/http/job-POST/)を送信して、モデルの 2D ビューおよび 3D ビューを抽出します。 

次の作業:[ビューアに表示する](viewer/2legged/)