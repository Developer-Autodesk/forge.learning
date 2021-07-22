# モデルを移動(移動)

ファイルを変換するには、端点を1つ指定する必要があります。

## modelderivative.go

次の内容で `/server/modelderivative.go` ファイルを作成します。

[modelderivative.go](_snippets/viewmodels/go/modelderivative.go ':include :type=code go')

**jobs** エンドポイントは **bucketKey** および **objectName** を受け取り、[移動ジョブ](https://forge.autodesk.com/en/docs/model-derivative/v2/reference/http/job-POST/)をポストして、モデルの 2D および 3D ビューを抽出します。 

要約すると、この時点で **Go** プロジェクトは次のようになります。

![](_media/go/vs_code_allfiles.png)

次へ:[ビューアに表示](viewer/2legged/)