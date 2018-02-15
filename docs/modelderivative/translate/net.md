# Translate the model (.NET)

## ModelDerivativeController.cs

Under `/Controllers/` folder, create a **ModelDerivativeController.cs** file with the following content:

```csharp
using Autodesk.Forge;
using Autodesk.Forge.Model;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;

namespace ForgeTutorial.Controllers
{
  public class ModelDerivativeController : ApiController
  {
    public class TranslateObjectModel
    {
      public string bucketKey { get; set; }
      public string objectKey { get; set; }
      public string rootFilename { get; set; }
    }
    
    [HttpPost]
    [Route("api/forge/modelderivative/translateObject")]
    public async Task<dynamic> TranslateObject([FromBody]TranslateObjectModel objModel)
    {
      dynamic oauth = await Utility.OAuth.Get2LeggedTokenAsync(new Scope[] { Scope.DataRead, Scope.DataWrite, Scope.DataCreate });

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
      if (string.IsNullOrEmpty(objModel.rootFilename))
        job = new JobPayload(new JobPayloadInput(objModel.objectKey), new JobPayloadOutput(outputs));
      else
        job = new JobPayload(new JobPayloadInput(objModel.objectKey, true, objModel.rootFilename), new JobPayloadOutput(outputs));


      DerivativesApi derivative = new DerivativesApi();
      derivative.Configuration.AccessToken = oauth.access_token;
      dynamic jobPosted = await derivative.TranslateAsync(job);
      return jobPosted;
    }
  }
}
```