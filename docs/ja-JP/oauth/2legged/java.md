# 認証する(JAVA)

基本的な *OAuth* 実装には 2 つのファイルが必要です。

## oauth.java

`/src/main/java/oauth.java` という名前の新しい **Java クラス**を作成して、次の内容をコピーします。これにより、Forg e からアクセス トークンが要求されます。このファイルは、このチュートリアルの他の部分で再利用されます。

[oauth.java](_snippets/viewmodels/java/oauth.java ':include :type=code java')

エンドユーザの要求ごとに新しいアクセス トークンを取得すると、不要な遅延が発生するため、これを防ぐには、グローバル変数にアクセス トークンをキャッシュします。`expires_in` 秒が経過したら、アクセス トークンを更新する必要があることに注意してください。

!> ユーザ間でアクセス トークンを共有できるのは、すべてのユーザが同じ情報にアクセスしている場合のみです(2-legged)。アプリでユーザ単位のデータを使用する場合は(3-legged)、この方法を**使用しないでください**。

## oauthtoken.java

`/src/main/java/oauthtoken.java` を作成して、次の内容をコピーします。このファイルは、エンドポイント ルータを作成します。  

[oauthtoken.java](_snippets/viewmodels/java/oauthtoken.java ':include :type=code java')

[WebServlet](https://www.javaguides.net/2019/02/webservlet-annotation-example.html) を使用してクラス `oauthtoken` を Web サービスとして作成するには、`@WebServlet` の注釈に注意してください。アトリビュート **urlPatterns** は、このエンドポイントにアクセスするための最終 URL を指定します。

このエンドポイントが正常に機能することを確認するには、「[Java を実行してとデバッグする](//environment/rundebug/java?id=running-amp-debugging-java)」に移動して、**FORGE_CLIENT_ID** および **FORGE_CLIENT_SECRET** を入力します。最後に、実行またはデバッグします。

アプリケーションの実行中にブラウザを開いて、http://localhost:3000/api/forge/oauth/token と入力します。access_token を使用しているときにページに応答が出力される場合は、エンドポイント /api/forge/oauth/token が正しく定義されています。

![](_media/java/endpoint_oauth.png)


次の作業:[ファイルを OSS にアップロードする](/ja-JP/datamanagement/oss/)