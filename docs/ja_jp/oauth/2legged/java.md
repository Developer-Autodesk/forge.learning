# 認証(JAVA)

基本的な *OAuth* の実装には 2 つのファイルが必要です。

## oauth.java

**Java クラス ** を `/src/main/java/oauth.java` という名前で新規作成し、次の内容をコピーします。これにより、Forgeからアクセストークンが要求されます。このチュートリアルの他の部分では、この設定を再利用します。

[oauth.java](_snippets/viewmodels/java/oauth.java ':include :type=code java')

エンドユーザの要求ごとに新しいアクセストークンが取得されて不要な遅延が発生するのを防ぐには、グローバル変数にアクセストークンをキャッシュします。ただし、`expires_in`秒の後で、更新する必要があります。

!>ユーザ間でアクセストークンを共有できるのは、この場合に限られます。この場合、すべてのユーザが同じ情報(2レッグ)にアクセスします。アプリケーションでユーザ単位のデータ(3 本足)を使用する場合、<スパン id="1">ドットは使用しません。

## oauthtoken.java

次に、`/src/main/java/oauthtoken.java`を作成して、次の内容をコピーします。このファイルは、エンドポイントルータの作成を行います。  

[oauthtoken.java](_snippets/viewmodels/java/oauthtoken.java ':include :type=code java')

`@WebServlet` 注釈に注意してください。この注釈は、[WebServlet](https://www.javaguides.net/2019/02/webservlet-annotation-example.html) によって、クラス `oauthtoken` を Web サービスとして作成されます。属性 **urlPatterns** は、このエンドポイントにアクセスするための最終 URL を指定します。

このエンドポイントが正常に機能することを確認するには、[Run and Debug Java](//environment/rundebug/java?id=running-amp-debugging-java) に切り替え、入力 **FORGE_CLIENT_ID** および **FORGE_CLIENT_SECRET** を入力します。最後に、実行またはデバッグします。

アプリケーションを実行したら、ブラウザを開いてhttp://localhost:3000/api/forge/oauth/tokenと入力します。access_tokenを使用してページに応答を出力する場合は、エンドポイント/api/forge/oauth/tokenが正しく定義されていることを意味します。

![](_media/java/endpoint_oauth.png)


次へ:[OSSにファイルをアップロード](/ja_jp/datamanagement/oss/)