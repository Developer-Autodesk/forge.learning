# Translate the model (.NET)

To translate a file we just need one endpoint.

## ModelDerivativeController.cs

Create a .NET WebAPI Controller named **ModelDerivativeController** (see [how to create a controller](environment/setup/net_controller)) and add the following content:

```csharp
using Autodesk.Forge;
using Autodesk.Forge.Model;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;

namespace forgesample.Controllers
{
  public class ModelDerivativeController : ApiController
  {
    public class TranslateObjectModel
    {
      public string bucketKey { get; set; }
      public string objectKey { get; set; }
    }

    [HttpPost]
    [Route("api/forge/modelderivate/translate")]
    public async Task<dynamic> TranslateObject([FromBody]TranslateObjectModel objModel)
    {
      dynamic oauth = await OAuthController.GetInternalAsync();

      List<JobPayloadItem> outputs = new List<JobPayloadItem>()
      {
       new JobPayloadItem(
         JobPayloadItem.TypeEnum.Svf,
         new List<JobPayloadItem.ViewsEnum>()
         {
           JobPayloadItem.ViewsEnum._2d,
           JobPayloadItem.ViewsEnum._3d
         })
      };
      JobPayload job;
      job = new JobPayload(new JobPayloadInput(objModel.objectKey), new JobPayloadOutput(outputs));

      DerivativesApi derivative = new DerivativesApi();
      derivative.Configuration.AccessToken = oauth.access_token;
      dynamic jobPosted = await derivative.TranslateAsync(job);
      return jobPosted;
    }
  }
}
```

The **TranslateObject** receives the **bucketKey** and **objectName** and post the [translation job](https://developer.autodesk.com/en/docs/model-derivative/v2/reference/http/job-POST/).

Next: [Show on Viewer](viewer/)