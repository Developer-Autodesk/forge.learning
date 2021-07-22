# モデルを変換(Node.js)

ファイルを変換するには、端点を1つ指定する必要があります。

## routes/modelderivative.js

次の内容で `routes/modelderivative.js` ファイルを作成します。

[routes/modelderivative.js](_snippets/viewmodels/node/routes/modelderivative.js ':include :type=code javascript')

**jobs** エンドポイントは **objectName** を受け取り、[移動ジョブ](https://forge.autodesk.com/en/docs/model-derivative/v2/reference/http/job-POST/)をポストして、モデルの 2D および 3D ビューを抽出します。 

要約すると、この時点で **NodeJS** プロジェクトは次のようになります。

![](_media/nodejs/vs_code_allfiles.png)

次へ:[ビューアに表示](viewer/2legged/)