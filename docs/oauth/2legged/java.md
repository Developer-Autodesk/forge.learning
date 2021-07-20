# Authenticate (JAVA)

For a basic *OAuth* implementation we need 2 files.

## oauth.java

Create a new **Java Class** named `/src/main/java/oauth.java` and copy the following content. This will request the access token from Forge. This will be reused on other parts of this tutorial.

[oauth.java](_snippets/viewmodels/java/oauth.java ':include :type=code java')

To avoid getting a new access token for each end-user request, which adds unnecessary latency, let's cache them in global variables. Note we still need to refresh it after `expires_in` seconds.

!> Share access token between users is only valid in this case, where all users are accessing the same information (2-legged). If your app uses per-user data (3-legged), **DOT NOT** use this approach.

## oauthtoken.java

Now create a `/src/main/java/oauthtoken.java` and copy the following content. This file takes care of creating the endpoint router.  

[oauthtoken.java](_snippets/viewmodels/java/oauthtoken.java ':include :type=code java')

Note the `@WebServlet` annotation to make the class `oauthtoken` as web service by [WebServlet](https://www.javaguides.net/2019/02/webservlet-annotation-example.html). The attribute **urlPatterns** specifies the final url to access this endpoint.

To verify this endpoint works well, switch to [Run and Debug Java](//environment/rundebug/java?id=running-amp-debugging-java), input **FORGE_CLIENT_ID** and **FORGE_CLIENT_SECRET**. Finally run or debug.

When the application runs, open browser, and input http://localhost:3000/api/forge/oauth/token. If a response is printed in the page with the access_token, that means the endpoint /api/forge/oauth/token is defined correctly.

![](_media/java/endpoint_oauth.png)


Next: [Upload file to OSS](/datamanagement/oss/)