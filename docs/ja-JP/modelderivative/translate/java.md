# モデルを変換する(JAVA)

ファイルを変換するには、1 つのエンドポイントが必要です。

## modelderivative.java

次の内容を使用して、`/src/main/java/modelderivative.java` という名前の新しい Java クラスを作成します。 

[modelderivative.java](_snippets/viewmodels/java/modelderivative.java ':include :type=code java')

**jobs** エンドポイントは **bucketKey** および **objectName** を受け取り、[変換ジョブ](https://forge.autodesk.com/en/docs/model-derivative/v2/reference/http/job-POST/)を送信して、モデルの 2D ビューおよび 3D ビューを抽出します。 
 
要約すると、この時点で **JAVA** プロジェクトは次のようになります。

![](_media/java/Eclipse_server_side.png)

次の作業:[ビューアに表示する](viewer/2legged/)