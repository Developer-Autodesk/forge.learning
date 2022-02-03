# Загрузка файлов в OSS (JAVA)

В этом разделе нам нужны 3 функции:

1. Создание бакетов
2. Указание репозиториев данных и объектов (файлов)
3. Загрузка объектов (файлов)

## oss.java

Создайте Java Class с названием `/src/main/java/oss.java`, который отвечает за создание и указание бакетов. 


```java
package forgesample;

import java.io.*;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import javax.xml.bind.DatatypeConverter;

import org.json.*;

import com.autodesk.client.auth.OAuth2TwoLegged; 
import com.autodesk.client.ApiException;
import com.autodesk.client.ApiResponse;
import com.autodesk.client.api.*;
import com.autodesk.client.model.*;


@WebServlet({ "/oss" })
public class oss extends HttpServlet {

	public oss() {
	}

	public void init() throws ServletException {

	}

	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

		// for get buckets info

		String id = req.getParameter("id");
		resp.setCharacterEncoding("utf8");
		resp.setContentType("application/json");
		try {
			// get oAuth of internal, in order to get the token with higher permissions
			OAuth2TwoLegged forgeOAuth = oauth.getOAuthInternal();
			if (id.equals("#")) {// root
				BucketsApi bucketsApi = new BucketsApi();

				ApiResponse<Buckets> buckets = bucketsApi.getBuckets("us", 100, "abc", forgeOAuth,
						forgeOAuth.getCredentials());

				JSONArray bucketsArray = new JSONArray();
				PrintWriter out = resp.getWriter();

				// iterate buckets
				for (int i = 0; i < buckets.getData().getItems().size(); i++) {

					// get bucker info
					BucketsItems eachItem = buckets.getData().getItems().get(i);
					JSONObject obj = new JSONObject();

					obj.put("id", eachItem.getBucketKey());
					obj.put("text", eachItem.getBucketKey());
					obj.put("type", "bucket");
					obj.put("children", true);

					bucketsArray.put(obj);

				}

				out.print(bucketsArray);

			} else {

				// as we have the id (bucketKey), let's return all objects
				ObjectsApi objectsApi = new ObjectsApi();

				ApiResponse<BucketObjects> objects = objectsApi.getObjects(id, 100, null, null, forgeOAuth,
						forgeOAuth.getCredentials());

				JSONArray objectsArray = new JSONArray();
				PrintWriter out = resp.getWriter();

				// iterate each items of the bucket
				for (int i = 0; i < objects.getData().getItems().size(); i++) {

					// make a note with the base64 urn of the item
					ObjectDetails eachItem = objects.getData().getItems().get(i);
					String base64Urn = DatatypeConverter.printBase64Binary(eachItem.getObjectId().getBytes());

					JSONObject obj = new JSONObject();

					obj.put("id", base64Urn);
					obj.put("text", eachItem.getObjectKey());
					obj.put("type", "object");
					obj.put("children", false);

					objectsArray.put(obj);

				}

				out.print(objectsArray);

			}
		} catch (ApiException autodeskExp) {
			System.out.print("get buckets & objects exception: " + autodeskExp.toString());
			resp.setStatus(500);

		} catch (Exception exp) {
			System.out.print("get buckets & objects exception: " + exp.toString());
			resp.setStatus(500);
		}

	}

	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

		// for create bucket

		try {

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

			// Create a new bucket
			try {
				// get oAuth of internal, in order to get the token with higher permissions
				OAuth2TwoLegged forgeOAuth = oauth.getOAuthInternal();

				JSONObject jsonObject = new JSONObject(jb.toString());
				String bucketKey = jsonObject.getString("bucketKey");

				// build the payload of the http request
				BucketsApi bucketsApi = new BucketsApi();
				PostBucketsPayload postBuckets = new PostBucketsPayload();
				postBuckets.setBucketKey(bucketKey);
				// expires in 24h
				postBuckets.setPolicyKey(PostBucketsPayload.PolicyKeyEnum.TRANSIENT);

				ApiResponse<Bucket> newbucket = bucketsApi.createBucket(postBuckets, null, forgeOAuth,
						forgeOAuth.getCredentials());

				resp.setStatus(200);

			} catch (ApiException autodeskExp) {
				System.out.print("get buckets & objects exception: " + autodeskExp.toString());
				resp.setStatus(500);

			} catch (Exception exp) {
				System.out.print("get buckets & objects exception: " + exp.toString());
				resp.setStatus(500);

			}

		} catch (JSONException e) {
			// crash and burn
			throw new IOException("Error parsing JSON request string");
		}

	}

	public void destroy() {
		super.destroy();
	}
}
```



Мы планируем поддерживать [jsTree](https://www.jstree.com/) со стороны frontend, поэтому наш **GET oss/buckets** должен возвращать параметр строки запроса (англ. querystring parameter) `id` и бакеты, если `id=#` и объекты для данного bucketKey переданы как `id=bucketKey`.

## ossuploads.java

Создайте файл `/src/main/ossuploads.java` со следующим кодом. Он отвечает за загрузку файлов. Рабочий процесс (англ. workflow) получает файлы и загружает их в Forge.

```java
package forgesample;

import java.io.*;
import java.util.Iterator;
import java.util.List;
import java.util.regex.*;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import com.autodesk.client.auth.OAuth2TwoLegged; 

import com.autodesk.client.ApiException;
import com.autodesk.client.ApiResponse;
import com.autodesk.client.api.ObjectsApi;
import com.autodesk.client.model.ObjectDetails;

@WebServlet({ "/ossuploads" })
public class ossuploads extends HttpServlet {

	public ossuploads() {
	}

	public void init() throws ServletException {

	}

	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

	}

	private String filename(String contentTxt) throws UnsupportedEncodingException {
		Pattern pattern = Pattern.compile("filename=\"(.*)\"");
		Matcher matcher = pattern.matcher(contentTxt);
		matcher.find();
		return matcher.group(1);
	}

	private byte[] bodyContent(HttpServletRequest request) throws IOException {
		try (ByteArrayOutputStream out = new ByteArrayOutputStream()) {
			InputStream in = request.getInputStream();
			byte[] buffer = new byte[1024];
			int length = -1;
			while ((length = in.read(buffer)) != -1) {
				out.write(buffer, 0, length);
			}
			return out.toByteArray();
		}
	}

	protected void doPost(HttpServletRequest req, HttpServletResponse res)
			throws ServletException, IOException, FileNotFoundException {

		// for uploading file

		try {
			// from
			// https://stackoverflow.com/questions/13048939/file-upload-with-servletfileuploads-parserequest
			if (!ServletFileUpload.isMultipartContent(req)) {
				// not multiparts/formdata
				res.setStatus(500);
			} else {
				// bucket name to store the file
				String bucketKey = "";
				// name of the new file
				String filename = "";
				// path on server to store the new file temporarily
				String serverFilesPath = "/fileuploads";

				// from
				// https://stackoverflow.com/questions/3831680/httpservletrequest-get-json-post-data/3831791

				List<FileItem> items = new ServletFileUpload(new DiskFileItemFactory()).parseRequest(req);
				Iterator iter = items.iterator();

				File fileToUpload = null;

				// get post body to extract file name and bucket name
				while (iter.hasNext()) {
					FileItem item = (FileItem) iter.next();

					if (!item.isFormField()) {
						filename = item.getName();

						String root = getServletContext().getRealPath("/");
						File path = new File(root + serverFilesPath);
						if (!path.exists()) {
							boolean status = path.mkdirs();
						}

						// store the file stream on server
						String thisFilePathOnServer = path + "/" + filename;
						fileToUpload = new File(thisFilePathOnServer);
						item.write(fileToUpload);
					} else {
						// get bucket name
						if (item.getFieldName().equals("bucketKey")) {
							bucketKey = item.getString();
						}
					}
				}

				ObjectsApi objectsApi = new ObjectsApi();

				// get oAuth of internal, in order to get the token with higher permissions

				OAuth2TwoLegged forgeOAuth = oauth.getOAuthInternal();

				ApiResponse<ObjectDetails> response = objectsApi.uploadObject(bucketKey, filename,
						(int) fileToUpload.length(), fileToUpload, null, null, forgeOAuth, forgeOAuth.getCredentials());

				res.setStatus(response.getStatusCode());
			}

		} catch (ApiException adskexp) {

		} catch (FileNotFoundException fileexp) {
			System.out.print("get buckets & objects exception: " + fileexp.toString());

		}

		catch (Exception exp) {
			System.out.print("get buckets & objects exception: " + exp.toString());

		}
	}

	public void destroy() {
		super.destroy();
	}
}
```

Теперь предоставьте конечную точку в `/web/WEB-INF/web.xml`, добавьте следующий код перед `</web-app>`:

```xml
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
```

Обратите внимание, что мы повторно используем файл `/src/main/java/oauth.java` для вызова `.getTokenInternal()` у всех функций.

!> Загрузка файла из браузера напрямую в Atodesk Forge возможна, но требует предоставления токена доступа **write-enabled**, что **НЕ БЕЗОПАСНО**. 

Далее: [Конвертация файлов](/ru-RU/modelderivative/translate/)

[Эта страница на английском языке](https://learnforge.autodesk.io/#/datamanagement/oss/java).
