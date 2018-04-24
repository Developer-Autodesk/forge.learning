# Authenticate (JAVA)

For a basic *OAuth* implementation we need 2 files.

## oauth.java

Create a new **Java Class** named `/src/main/java/oauth.java` and copy the following content. This will request the access token from Forge. This will be reused on other parts of this tutorial.

```java
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.joda.time.Instant;
import org.json.simple.JSONObject;

import com.autodesk.client.auth.Credentials;
import com.autodesk.client.auth.OAuth2TwoLegged;

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

    //token cache map
    private static Map<String,JSONObject> _cached = new HashMap<String,JSONObject>();
    private static String OAuthRequest(ArrayList<String> scopes, String cache) throws Exception{

        
    	if(_cached.containsKey(cache)) {
            //check if the token expires or not
    		JSONObject cacheJsonObj =(JSONObject) _cached.get(cache);
    		Instant instant = Instant.now();
    		Long currentTime = instant.getMillis(); 
    		Long expire_at = (Long) cacheJsonObj.get("expire_at");
    		if(expire_at >currentTime)
                //use current token
    			return  String.valueOf(cacheJsonObj.get("access_token")); 
    	}
    	
        //get new token
        String client_id = config.credentials.client_id;
        String client_secret = config.credentials.client_secret;

        OAuth2TwoLegged forgeOAuth = OAuthClient(scopes);

        twoLeggedCredentials = forgeOAuth.authenticate();
        String token = twoLeggedCredentials.getAccessToken();
        long expire_at = twoLeggedCredentials.getExpiresAt();
        
        //store the token to cache
        JSONObject obj = new JSONObject(); 
        obj.put("access_token", token);
    	Instant instant = Instant.now();
    	Long currentTime = instant.getMillis(); 
        obj.put("expire_at", currentTime + expire_at); 
        _cached.put(cache, obj); 
        
         
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

To avoid getting a new access token for each end-user request, which adds unnecessary latency, let's cache them in global variables. Note we still need to refresh it after `expires_in` seconds.

!> Share access token between users is only valid in this case, where all users are accessing the same information (2-legged). If your app uses per-user data (3-legged), **DOT NOT** use this approach.

## oauthtoken.java

Now create a `/src/main/java/oauthtoken.java` and copy the following content. This file takes care of creating the endpoint router.  

```java
import org.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

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

Note the `@WebServlet` annotation to make the class `oauthtoken` as web service by [WebServlet](http://blog.caucho.com/2009/10/06/servlet-30-tutorial-weblistener-webservlet-webfilter-and-webinitparam/). 

Finally expose the endpoint in `src/webapp/WEB-INF/web.xml`, add the following content before `</web-app>`:

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

Next: [Upload file to OSS](/datamanagement/oss/)