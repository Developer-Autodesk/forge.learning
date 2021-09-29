# 驗證 (JAVA)

就基本的 *OAuth* 實作而言，我們需要 2 個檔案。

## oauth.java

建立名為 `/src/main/java/oauth.java` 的新 **Java 類別**，然後複製以下內容。這將會向 Forge 請求 access token。這將會重複用在本自學課程的其他部分。

[oauth.java](_snippets/viewmodels/java/oauth.java ':include :type=code java')

為避免每次一有終端使用者請求，就得取得新的 access token，造成延遲時間無謂增加，讓我們將這些 token 快取在一些全域變數中。請注意，過了 `expires_in` 秒之後，我們仍需重新整理它。

!> 在此情況下，只能讓使用者共用存取 access token，也就是說，所有使用者都會存取相同資訊 (2 條腿)。如果您的應用程式需要使用個別使用者特有的資料 (3 條腿)，**切勿**使用此方法。

## oauthtoken.java

現在，請建立 `/src/main/java/oauthtoken.java`，然後複製以下內容。此檔案將負責建立 endpoint 路由器。  

[oauthtoken.java](_snippets/viewmodels/java/oauthtoken.java ':include :type=code java')

請注意，`@WebServlet` 標註會讓 [WebServlet](https://www.javaguides.net/2019/02/webservlet-annotation-example.html) 將 `oauthtoken` 類別設為網路服務。**urlPatterns** 屬性則指定用於存取此 endpoint 的最終 URL。

若要確認此 endpoint 是否正常運作，請切換至[執行與除錯 Java](//environment/rundebug/java?id=running-amp-debugging-java)、輸入 **FORGE_CLIENT_ID** 和 **FORGE_CLIENT_SECRET**。最後執行或除錯。

當應用程式執行時，請開啟瀏覽器，然後輸入 http://localhost:3000/api/forge/oauth/token。如果頁面中印出含有 access_token 的回應，則表示 endpoint /api/forge/oauth/token 的定義正確。

![](_media/java/endpoint_oauth.png)


下一步：[將檔案上傳到 OSS](/zh-TW/datamanagement/oss/)