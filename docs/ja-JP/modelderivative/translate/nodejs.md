# モデルを変換する(Node.js)

ファイルを変換するには、1 つのエンドポイントが必要です。

## routes/modelderivative.js

次の内容を含む `routes/modelderivative.js` ファイルを作成します。

[routes/modelderivative.js](_snippets/viewmodels/node/routes/modelderivative.js ':include :type=code javascript')

**jobs** エンドポイントは **objectName** を受け取り、[変換ジョブ](https://forge.autodesk.com/en/docs/model-derivative/v2/reference/http/job-POST/)を送信して、モデルの 2D ビューおよび 3D ビューを抽出します。 

要約すると、この時点で **NodeJS** プロジェクトは次のようになります。

![](_media/nodejs/vs_code_allfiles.png)

次の作業:[ビューアに表示する](viewer/2legged/)