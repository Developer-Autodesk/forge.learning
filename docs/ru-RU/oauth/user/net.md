# Обработка информации профиля пользователя (.NET Framework)

Эта конечная точка запросит данные конечного пользователя и вернет **имя** и **фотографию профиля** (40px).

## UserController.cs

Создайте .NET WebAPI Controller с именем **UserController** (см. [как создать контроллер](/ru-RU/environment/setup/net_controller)) и добавьте следующий код:

```csharp
using Autodesk.Forge;
using Newtonsoft.Json.Linq;
using System.Threading.Tasks;
using System.Web.Http;

namespace forgeSample.Controllers
{
  public class UserController : ApiController
  {
    [HttpGet]
    [Route("api/forge/user/profile")]
    public async Task<JObject> GetUserProfileAsync()
    {
      Credentials credentials = await Credentials.FromSessionAsync();
      if (credentials == null)
      {
        return null;
      }

      // the API SDK
      UserProfileApi userApi = new UserProfileApi();
      userApi.Configuration.AccessToken = credentials.TokenInternal;


      // get the user profile
      dynamic userProfile = await userApi.GetUserProfileAsync();

      // prepare a response with name & picture
      dynamic response = new JObject();
      response.name = string.Format("{0} {1}", userProfile.firstName, userProfile.lastName);
      response.picture = userProfile.profileImages.sizeX40;
      return response;
    }
  }
}
```

Далее: [Отображение файлов в Viewer](/ru-RU/viewer/3legged/readme)

[Эта страница на английском языке](https://learnforge.autodesk.io/#/oauth/user/net).
