# モデルを変換する(PHP)

ファイルを変換するには、1 つのエンドポイントが必要です。

## ModelDerivative.php

次の内容を含む `/server/modelderivative.php` ファイルを作成します。

[modelderivative.php](_snippets/viewmodels/php/modelderivative.php ':include :type=code php')

**jobs** エンドポイントは **bucketKey** および **objectName** を受け取り、[変換ジョブ](https://forge.autodesk.com/en/docs/model-derivative/v2/reference/http/job-POST/)を送信して、モデルの 2D ビューおよび 3D ビューを抽出します。 

要約すると、この時点で **PHP** プロジェクトは次のようになります。

![](_media/php/vs_code_allfiles.png)

次の作業:[ビューアに表示する](viewer/2legged/)