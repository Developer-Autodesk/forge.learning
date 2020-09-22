# User information (.NET Framework)

This endpoint will request the end-user information and return the **name** and **picture** (40px).

## UserController.cs

Create a .NET WebAPI Controller named **UserController** (see [how to create a controller](environment/setup/net_controller)) and add the following content:

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

Next: [Show on Viewer](viewer/3legged/readme)