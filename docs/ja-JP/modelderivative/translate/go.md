# モデルを変換する(Go)

ファイルを変換するには、1 つのエンドポイントが必要です。

## modelderivative.go

次の内容を含む `/server/modelderivative.go` ファイルを作成します。

[modelderivative.go](_snippets/viewmodels/go/modelderivative.go ':include :type=code go')

**jobs** エンドポイントは **bucketKey** および **objectName** を受け取り、[変換ジョブ](https://forge.autodesk.com/en/docs/model-derivative/v2/reference/http/job-POST/)を送信して、モデルの 2D ビューおよび 3D ビューを抽出します。 

要約すると、この時点で **Go** プロジェクトは次のようになります。

![](_media/go/vs_code_allfiles.png)

次の作業:[ビューアに表示する](/ja-JP/viewer/2legged/)