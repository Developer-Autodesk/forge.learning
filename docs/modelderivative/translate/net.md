# Translate the model (.NET Framework)

To translate a file we just need one endpoint.

## ModelDerivativeController.cs

Create a .NET WebAPI Controller named **ModelDerivativeController** (see [how to create a controller](environment/setup/net_controller)) and add the following content:

```csharp
using Autodesk.Forge;
using Autodesk.Forge.Model;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;

namespace forgeSample.Controllers
{
  public class ModelDerivativeController : ApiController
  {
    /// <summary>
    /// Start the translation job for a give bucketKey/objectName
    /// </summary>
    /// <param name="objModel"></param>
    /// <returns></returns>
    [HttpPost]
    [Route("api/forge/modelderivative/jobs")]
    public async Task<dynamic> TranslateObject([FromBody]TranslateObjectModel objModel)
    {
      dynamic oauth = await OAuthController.GetInternalAsync();

      // prepare the payload
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
      job = new JobPayload(new JobPayloadInput(objModel.objectName), new JobPayloadOutput(outputs));

      // start the translation
      DerivativesApi derivative = new DerivativesApi();
      derivative.Configuration.AccessToken = oauth.access_token;
      dynamic jobPosted = await derivative.TranslateAsync(job);
      return jobPosted;
    }

    /// <summary>
    /// Model for TranslateObject method
    /// </summary>
    public class TranslateObjectModel
    {
      public string bucketKey { get; set; }
      public string objectName { get; set; }
    }
  }
}
```

The **TranslateObject** receives the **bucketKey** and **objectName** and post the [translation job](https://forge.autodesk.com/en/docs/model-derivative/v2/reference/http/job-POST/) to extract 2D & 3D views of the model. 

Next: [Show on Viewer](viewer/2legged/)