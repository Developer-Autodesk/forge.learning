# Authenticate (JAVA)

For a basic *OAuth* implementation we need 2 files.

## oauth.java

Create a `/src/main/java/oauth.java` file. This file takes care of creating the express router to expose the endpoint. 

```java
public class oauth  {


    private static Credentials twoLeggedCredentials = null;

    public static String getTokenPublic() throws Exception{

        return OAuthRequest(config.scopePublic, "public");

    }

    public  static String getTokenInternal() throws Exception{

        return OAuthRequest(config.scopeInternal, "internal");

    }

    public  static Credentials getCredentials() throws Exception{

        return twoLeggedCredentials;
    }

    private static String OAuthRequest(ArrayList<String> scopes, String cache) throws Exception{

        //cache has not been used...will do


        String client_id = config.credentials.client_id;
        String client_secret = config.credentials.client_secret;

        OAuth2TwoLegged forgeOAuth = OAuthClient(scopes);

        twoLeggedCredentials = forgeOAuth.authenticate();
        String token = twoLeggedCredentials.getAccessToken();

        return  token;
    }

    public static OAuth2TwoLegged OAuthClient(ArrayList<String> scopes) throws Exception{

        String client_id = config.credentials.client_id;
        String client_secret = config.credentials.client_secret;
        if (scopes == null)
            scopes = config.scopeInternal;

        return new OAuth2TwoLegged(client_id, client_secret, scopes,Boolean.valueOf(true));

    }
}
```

## oauthtoken.java

Now create a `/src/main/java/oauthtoken.java` file that will actually request the access token from Forge. This will be reused on other parts of this tutorial.

```java
@WebServlet({"/oauthtoken"})
public class oauthtoken extends HttpServlet {

    public oauthtoken() {
    }

    public void init() throws ServletException {

    }

    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setCharacterEncoding("utf8");

        resp.setContentType("application/json");
        PrintWriter out = resp.getWriter();
        JSONObject obj = new JSONObject();

        String token = "";
        try{
            token = oauth.getTokenPublic();
            obj.put("access_token", token);
            obj.put("expires_in", 3500);
            out.print(obj);
        }
        catch (Exception var2) {
            System.out.print("get token exception: "+ var2.toString());
            resp.setStatus(500);
        }

    }

    public void destroy() {
        super.destroy();
    }
}
```
Add annotation to make the class `oauthtoken` as web service by [WebServlet](http://blog.caucho.com/2009/10/06/servlet-30-tutorial-weblistener-webservlet-webfilter-and-webinitparam/)

Explictly expose the endpoint in `src/webapp/WEB-INF/web.xml`:

```xml
    <servlet>
        <servlet-name>oauthtoken</servlet-name>
        <servlet-class>oauthtoken</servlet-class>
    </servlet>

    <servlet-mapping>
        <servlet-name>oauthtoken</servlet-name>
        <url-pattern>/api/forge/oauth/token</url-pattern>
    </servlet-mapping>
```

To avoid getting a new access token for each end-user request, which adds unnecessary latency, let's cache them in global variables. Note we still need to refresh it after `expires_in` seconds.

!> Share access token between users is only valid in this case, where all users are accessing the same information (2-legged). If your app uses per-user data (3-legged), **DOT NOT** use this approach.

Next: [Upload file to OSS](/datamanagement/oss/)