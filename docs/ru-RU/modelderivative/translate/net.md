# Конвертация файлов (.NET Framework)

Для конвертации файлов нам нужна только одна конечная точка.

## ModelDerivativeController.cs

Создайте .NET WebAPI Controller с названием **ModelDerivativeController** (см. [как создать контроллер](/ru-RU/environment/setup/net_controller)) и добавьте следующий код:

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

**TranslateObject** получает **bucketKey** и **objectName** и размещает [задание на конвертацию](https://forge.autodesk.com/en/docs/model-derivative/v2/reference/http/job-POST/) для извлечения 2D и 3D-видов модели.

Далее: [Отображение файлов в Viewer](/ru-RU/viewer/2legged/)

[Эта страница на английском языке](https://learnforge.autodesk.io/#/modelderivative/translate/net).
