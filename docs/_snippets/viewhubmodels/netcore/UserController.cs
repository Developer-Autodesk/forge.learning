using Autodesk.Forge;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System.Threading.Tasks;

namespace forgeSample.Controllers
{
  public class UserController : ControllerBase
  {
    [HttpGet]
    [Route("api/forge/user/profile")]
    public async Task<JObject> GetUserProfileAsync()
    {
      Credentials credentials = await Credentials.FromSessionAsync(Request.Cookies, Response.Cookies);
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
