# Translate Model (JAVA)

To translate a file we just need one endpoint.

## modelderivative.java

Create a new Java Class named `/src/main/java/modelderivative.java` with the following content. 

```java
package forgesample;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.Arrays;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import com.autodesk.client.auth.OAuth2TwoLegged; 
import com.autodesk.client.ApiException;
import com.autodesk.client.ApiResponse;
import com.autodesk.client.api.*;
import com.autodesk.client.model.*;

@WebServlet({ "/modelderivative" })
public class modelderivative extends HttpServlet {

	public modelderivative() {
	}

	public void init() throws ServletException {

	}

	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

	}

	protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {

		// from
		// https://stackoverflow.com/questions/3831680/httpservletrequest-get-json-post-data/3831791
		StringBuffer jb = new StringBuffer();
		String line = null;
		try {
			BufferedReader reader = req.getReader();
			while ((line = reader.readLine()) != null)
				jb.append(line);
		} catch (Exception e) {
			/* report an error */ }

		try {
			// get oAuth of internal, in order to get the token with higher permissions
			OAuth2TwoLegged forgeOAuth = oauth.getOAuthInternal();

			JSONObject jsonObject = new JSONObject(jb.toString());

			String objectName = jsonObject.getString("objectName");
			DerivativesApi derivativesApi = new DerivativesApi();

			// build the payload to translate the file to svf
			JobPayload job = new JobPayload();

			JobPayloadInput input = new JobPayloadInput();
			input.setUrn(new String(objectName));
			JobPayloadOutput output = new JobPayloadOutput();
			JobPayloadItem formats = new JobPayloadItem();
			formats.setType(JobPayloadItem.TypeEnum.SVF);
			formats.setViews(Arrays.asList(JobPayloadItem.ViewsEnum._3D));
			output.setFormats(Arrays.asList(formats));

			job.setInput(input);
			job.setOutput(output);

			ApiResponse<Job> response = derivativesApi.translate(job, true, forgeOAuth, forgeOAuth.getCredentials());

			res.setStatus(response.getStatusCode());

		} catch (ApiException autodeskExp) {
			System.out.print("get buckets & objects exception: " + autodeskExp.toString());
			res.setStatus(500);

		} catch (Exception exp) {
			System.out.print("get buckets & objects exception: " + exp.toString());
			res.setStatus(500);
		}

	}

	public void destroy() {
		super.destroy();
	}
}
```

Explictly expose the endpoint in `/web/WEB-INF/web.xml`, add the following content before `</web-app>`:
```xml
<servlet>
    <servlet-name>modelderivative</servlet-name>
    <servlet-class>forgesample.modelderivative</servlet-class>
</servlet>

<servlet-mapping>
    <servlet-name>modelderivative</servlet-name>
    <url-pattern>/api/forge/modelderivative/jobs</url-pattern>
</servlet-mapping>
```

The **jobs** endpoint receives the **bucketKey** and **objectName** and post the [translation job](https://forge.autodesk.com/en/docs/model-derivative/v2/reference/http/job-POST/) to extract 2D & 3D views of the model. 

At the end your `/web/WEB-INF/web.xml` should look like this:

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

	<servlet>
		<servlet-name>oss</servlet-name>
		<servlet-class>forgesample.oss</servlet-class>
	</servlet>
	<servlet-mapping>
		<servlet-name>oss</servlet-name>
		<url-pattern>/api/forge/oss/buckets</url-pattern>
	</servlet-mapping>
	<servlet>
		<servlet-name>ossuploads</servlet-name>
		<servlet-class>forgesample.ossuploads</servlet-class>
	</servlet>
	<servlet-mapping>
		<servlet-name>ossuploads</servlet-name>
		<url-pattern>/api/forge/oss/objects</url-pattern>
	</servlet-mapping>

	<servlet>
		<servlet-name>modelderivative</servlet-name>
		<servlet-class>forgesample.modelderivative</servlet-class>
	</servlet>
	<servlet-mapping>
		<servlet-name>modelderivative</servlet-name>
		<url-pattern>/api/forge/modelderivative/jobs</url-pattern>
	</servlet-mapping>

</web-app>
```

To summarize, at this point your **JAVA** project should be like:

![](_media/java/Eclipse_server_side.png)

Next: [Show on Viewer](viewer/2legged/)