# モデルを変換(PHP)

ファイルを変換するには、端点を1つ指定する必要があります。

## ModelDerivative.php

次の内容で `/server/modelderivative.php` ファイルを作成します。

[modelderivative.php](_snippets/viewmodels/php/modelderivative.php ':include :type=code php')

**jobs** エンドポイントは **bucketKey** および **objectName** を受け取り、[移動ジョブ](https://forge.autodesk.com/en/docs/model-derivative/v2/reference/http/job-POST/)をポストして、モデルの 2D および 3D ビューを抽出します。 

要約すると、この時点で **PHP** プロジェクトは次のようになります。

![](_media/php/vs_code_allfiles.png)

次へ:[ビューアに表示](/ja_jp/viewer/2legged/)