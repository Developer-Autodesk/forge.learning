# モデルを変換(JAVA)

ファイルを変換するには、端点を1つ指定する必要があります。

## modelderivative.java

次のコンテンツを使用して、`/src/main/java/modelderivative.java`という名前の新しいJavaクラスを作成します。 

[modelderivative.java](_snippets/viewmodels/java/modelderivative.java ':include :type=code java')

**jobs** エンドポイントは **bucketKey** および **objectName** を受け取り、[移動ジョブ](https://forge.autodesk.com/en/docs/model-derivative/v2/reference/http/job-POST/)をポストして、モデルの 2D および 3D ビューを抽出します。 
 
要約すると、この時点で **JAVA** プロジェクトは次のようになります。

![](_media/java/Eclipse_server_side.png)

次へ:[ビューアに表示](/ja_jp/viewer/2legged/)