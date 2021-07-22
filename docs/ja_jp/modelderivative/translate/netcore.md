# モデルを変換する(.NET Core)

ファイルを変換するには、端点を1つ指定する必要があります。

## ModelDerivativeController.cs

**Controllers** フォルダの下に、**ModelDerivativeController** という名前のクラス/ファイルを作成し、次の内容を追加します。

[ModelDerivativeController.cs](_snippets/viewmodels/netcore/ModelDerivativeController.cs ':include :type=code csharp')

**TranslateObject** は、**bucketKey** および **objectName** を受け取り、[移動ジョブ](https://forge.autodesk.com/en/docs/model-derivative/v2/reference/http/job-POST/)をポストしてモデルの 2D および 3D ビューを抽出します。 

次へ:[ビューアに表示](/ja_jp/viewer/2legged/)
