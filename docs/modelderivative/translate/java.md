# Translate Model (JAVA)

To translate a file we just need one endpoint.

## ModelDerivative.js

Create a `/src/main/java/modelderivative.java` file with the following content:

```java
@WebServlet({"/modelderivative"})
public class modelderivative  extends HttpServlet {

    public modelderivative() {
    }

    public void init() throws ServletException {

    }

    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

    }

    protected void doPost(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {

        //from https://stackoverflow.com/questions/3831680/httpservletrequest-get-json-post-data/3831791

        StringBuffer jb = new StringBuffer();
        String line = null;
        try {
            BufferedReader reader = req.getReader();
            while ((line = reader.readLine()) != null)
                jb.append(line);
        } catch (Exception e) { /*report an error*/ }

        try
        {
            JSONObject jsonObject = new JSONObject(jb.toString());

            String objectName = jsonObject.getString("objectName");
            String internalToken = oauth.getTokenInternal();
            DerivativesApi derivativesApi = new DerivativesApi();

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

            ApiResponse<Job> response = derivativesApi.translate(job,true,oauth.OAuthClient(null),oauth.getCredentials());

            res.setStatus(response.getStatusCode());

        }
        catch (ApiException autodeskExp) {
            System.out.print("get buckets & objects exception: "+ autodeskExp.toString());
            res.setStatus(500);

        }
        catch(Exception exp){
            System.out.print("get buckets & objects exception: "+ exp.toString());
            res.setStatus(500);
        }


    }
    public void destroy() {
        super.destroy();
    }
}
```

Explictly expose the endpoint in `/web/WEB-INF/web.xml`:
```xml
<servlet>
    <servlet-name>modelderivative</servlet-name>
    <servlet-class>modelderivative</servlet-class>
</servlet>

<servlet-mapping>
    <servlet-name>modelderivative</servlet-name>
    <url-pattern>/api/forge/modelderivative/jobs</url-pattern>
</servlet-mapping>

```


The **jobs** endpoint receives the **bucketKey** and **objectName** and post the [translation job](https://developer.autodesk.com/en/docs/model-derivative/v2/reference/http/job-POST/) to extract 2D & 3D views of the model. 

To summarize, at this point your **JAVA** project should be like:

![](_media/java/Eclipse_server_side.png)

Next: [Show on Viewer](viewer/)