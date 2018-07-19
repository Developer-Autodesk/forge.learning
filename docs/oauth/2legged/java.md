# Authenticate (JAVA)

For a basic *OAuth* implementation we need 2 files.

## oauth.java

Create a new **Java Class** named `/src/main/java/oauth.java` and copy the following content. This will request the access token from Forge. This will be reused on other parts of this tutorial.

```java
package forgesample;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.joda.time.Instant;
import org.json.simple.JSONObject;

import com.autodesk.client.auth.Credentials;
import com.autodesk.client.auth.OAuth2TwoLegged;

public class oauth {

	private static Credentials twoLeggedCredentials = null;

	//build the oAuth object with public scope
	public static OAuth2TwoLegged getOAuthPublic() throws Exception {
		return OAuthRequest(config.scopePublic, "public");
	}

	//build the oAuth object with internal scope 
	public static OAuth2TwoLegged getOAuthInternal() throws Exception {
		return OAuthRequest(config.scopeInternal, "internal");
	}

	private static Map<String, OAuth2TwoLegged> _cached = new HashMap<String, OAuth2TwoLegged>();

	private static OAuth2TwoLegged OAuthRequest(ArrayList<String> scopes, String cache) throws Exception {

		// API call of Forge SDK will refresh credentials (token etc) automatically
		// so, store the oauth objects only
		// public scope and internal scope separately
		if (_cached.containsKey(cache)) {
			return (OAuth2TwoLegged) _cached.get(cache);
		} else {
			String client_id = config.credentials.client_id;
			String client_secret = config.credentials.client_secret;
			OAuth2TwoLegged forgeOAuth = OAuthClient(scopes);
			// in the first time, call authenticate once to initialize the credentials
			forgeOAuth.authenticate();
			_cached.put(cache, forgeOAuth);
			return forgeOAuth;
		}
	}

	public static OAuth2TwoLegged OAuthClient(ArrayList<String> scopes) throws Exception {

		String client_id = config.credentials.client_id;
		String client_secret = config.credentials.client_secret;
		if (scopes == null)
			scopes = config.scopeInternal;

		// by the 3rd parameter, the oAuth object will refresh credentials (token etc)
		// automatically
		return new OAuth2TwoLegged(client_id, client_secret, scopes, Boolean.valueOf(true));

	}
}
```

To avoid getting a new access token for each end-user request, which adds unnecessary latency, let's cache them in global variables. Note we still need to refresh it after `expires_in` seconds.

!> Share access token between users is only valid in this case, where all users are accessing the same information (2-legged). If your app uses per-user data (3-legged), **DOT NOT** use this approach.

## oauthtoken.java

Now create a `/src/main/java/oauthtoken.java` and copy the following content. This file takes care of creating the endpoint router.  

```java
package forgesample;

import org.codehaus.jettison.json.JSONObject;
import org.joda.time.DateTime;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Date;

import com.autodesk.client.auth.OAuth2TwoLegged;

@WebServlet({ "/oauthtoken" })
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

		try {
			// get oAuth of public, in order to get the token with limited permission
			OAuth2TwoLegged forgeOAuth = oauth.getOAuthPublic();
			String token = forgeOAuth.getCredentials().getAccessToken();
			// this is a timestamp, not the exact value of expires_in, so calculate back
			// client side will need this. though not necessary
			long expire_time_from_SDK = forgeOAuth.getCredentials().getExpiresAt();
			// because we do not know when the token is got, align to current time
			// which will be a bit less than what Forge sets (say 3599 seconds). This makes
			// sense.
			long expires_in = (long) (expire_time_from_SDK - DateTime.now().toDate().getTime()) / 1000;
			// send to client
			obj.put("access_token", token);
			obj.put("expires_in", expires_in);

			out.print(obj);
		} catch (Exception var2) {
			System.out.print("get token exception: " + var2.toString());
			resp.setStatus(500);
		}

	}

	public void destroy() {
		super.destroy();
	}
}
```

Note the `@WebServlet` annotation to make the class `oauthtoken` as web service by [WebServlet](http://blog.caucho.com/2009/10/06/servlet-30-tutorial-weblistener-webservlet-webfilter-and-webinitparam/). 

Finally expose the endpoint in `src/webapp/WEB-INF/web.xml`, replace the existing content with:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_3_1.xsd"
	version="3.1">

	<servlet>
		<servlet-name>oauthtoken</servlet-name>
		<servlet-class>forgesample.oauthtoken</servlet-class>
	</servlet>
	<servlet-mapping>
		<servlet-name>oauthtoken</servlet-name>
		<url-pattern>/api/forge/oauth/token</url-pattern>
	</servlet-mapping>

</web-app>
```

Next: [Upload file to OSS](/datamanagement/oss/)