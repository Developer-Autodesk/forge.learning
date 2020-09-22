# Authorize

For a basic *OAuth* implementation we need 1 file.

### OAuthController.cs

Create folder named `Controllers` at project root level, then create a class named **OAuthController** in a class file with the same name (`OAuthController.cs`) and add the following content:

```csharp
using Autodesk.Forge;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Net;
using System.Threading.Tasks;

namespace forgeSample.Controllers
{
    public class OAuthController : ControllerBase
    {
        [HttpGet]
        [Route("api/forge/oauth/token")]
        public async Task<AccessToken> GetPublicTokenAsync()
        {
            Credentials credentials = await Credentials.FromSessionAsync(Request.Cookies, Response.Cookies);

            if (credentials == null)
            {
                base.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                return new AccessToken();
            }

            // return the public (viewables:read) access token
            return new AccessToken()
            {
                access_token = credentials.TokenPublic,
                expires_in = (int)credentials.ExpiresAt.Subtract(DateTime.Now).TotalSeconds
            };
        }

        /// <summary>
        /// Response for GetPublicToken
        /// </summary>
        public struct AccessToken
        {
            public string access_token { get; set; }
            public int expires_in { get; set; }
        }

        [HttpGet]
        [Route("api/forge/oauth/signout")]
        public IActionResult Singout()
        {
            // finish the session
            Credentials.Signout(base.Response.Cookies);

            return Redirect("/");
        }

        [HttpGet]
        [Route("api/forge/oauth/url")]
        public string GetOAuthURL()
        {
            // prepare the sign in URL
            Scope[] scopes = { Scope.DataRead };
            ThreeLeggedApi _threeLeggedApi = new ThreeLeggedApi();
            string oauthUrl = _threeLeggedApi.Authorize(
              Credentials.GetAppSetting("FORGE_CLIENT_ID"),
              oAuthConstants.CODE,
              Credentials.GetAppSetting("FORGE_CALLBACK_URL"),
              new Scope[] { Scope.DataRead, Scope.DataCreate, Scope.DataWrite, Scope.ViewablesRead });

            return oauthUrl;
        }

        [HttpGet]
        [Route("api/forge/callback/oauth")] 
        public async Task<IActionResult> OAuthCallbackAsync(string code)
        {
            if (string.IsNullOrWhiteSpace(code)) return Redirect("/");
            // create credentials form the oAuth CODE
            Credentials credentials = await Credentials.CreateFromCodeAsync(code, Response.Cookies);

            return Redirect("/");
        }

        [HttpGet]
        [Route("api/forge/clientid")] 
        public dynamic GetClientID()
        {
            return new { id = Credentials.GetAppSetting("FORGE_CLIENT_ID") };
        }
    }

    /// <summary>
    /// Store data in session
    /// </summary>
    public class Credentials
    {
        private const string FORGE_COOKIE = "ForgeApp";

        private Credentials() { }

        public string TokenInternal { get; set; }
        public string TokenPublic { get; set; }
        public string RefreshToken { get; set; }
        public DateTime ExpiresAt { get; set; }

        /// <summary>
        /// Perform the OAuth authorization via code
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        public static async Task<Credentials> CreateFromCodeAsync(string code, IResponseCookies cookies)
        {
            ThreeLeggedApi oauth = new ThreeLeggedApi();

            dynamic credentialInternal = await oauth.GettokenAsync(
              GetAppSetting("FORGE_CLIENT_ID"), GetAppSetting("FORGE_CLIENT_SECRET"),
              oAuthConstants.AUTHORIZATION_CODE, code, GetAppSetting("FORGE_CALLBACK_URL"));

            dynamic credentialPublic = await oauth.RefreshtokenAsync(
              GetAppSetting("FORGE_CLIENT_ID"), GetAppSetting("FORGE_CLIENT_SECRET"),
              "refresh_token", credentialInternal.refresh_token, new Scope[] { Scope.ViewablesRead });

            Credentials credentials = new Credentials();
            credentials.TokenInternal = credentialInternal.access_token;
            credentials.TokenPublic = credentialPublic.access_token;
            credentials.RefreshToken = credentialPublic.refresh_token;
            credentials.ExpiresAt = DateTime.Now.AddSeconds(credentialInternal.expires_in);

            cookies.Append(FORGE_COOKIE, JsonConvert.SerializeObject(credentials));

            return credentials;
        }

        /// <summary>
        /// Restore the credentials from the session object, refresh if needed
        /// </summary>
        /// <returns></returns>
        public static async Task<Credentials> FromSessionAsync(IRequestCookieCollection requestCookie, IResponseCookies responseCookie)
        {
            if (requestCookie == null || !requestCookie.ContainsKey(FORGE_COOKIE)) return null;

            Credentials credentials = JsonConvert.DeserializeObject<Credentials>(requestCookie[FORGE_COOKIE]);
            if (credentials.ExpiresAt < DateTime.Now)
            {
                await credentials.RefreshAsync();
                responseCookie.Delete(FORGE_COOKIE);
                responseCookie.Append(FORGE_COOKIE, JsonConvert.SerializeObject(credentials));
            }

            return credentials;
        }

        public static void Signout(IResponseCookies cookies)
        {
            cookies.Delete(FORGE_COOKIE);
        }

        /// <summary>
        /// Refresh the credentials (internal & external)
        /// </summary>
        /// <returns></returns>
        private async Task RefreshAsync()
        {
            ThreeLeggedApi oauth = new ThreeLeggedApi();

            dynamic credentialInternal = await oauth.RefreshtokenAsync(
              GetAppSetting("FORGE_CLIENT_ID"), GetAppSetting("FORGE_CLIENT_SECRET"),
              "refresh_token", RefreshToken, new Scope[] { Scope.DataRead, Scope.DataCreate, Scope.DataWrite, Scope.ViewablesRead });

            dynamic credentialPublic = await oauth.RefreshtokenAsync(
              GetAppSetting("FORGE_CLIENT_ID"), GetAppSetting("FORGE_CLIENT_SECRET"),
              "refresh_token", credentialInternal.refresh_token, new Scope[] { Scope.ViewablesRead });

            TokenInternal = credentialInternal.access_token;
            TokenPublic = credentialPublic.access_token;
            RefreshToken = credentialPublic.refresh_token;
            ExpiresAt = DateTime.Now.AddSeconds(credentialInternal.expires_in);
        }

        /// <summary>
        /// Reads appsettings from web.config
        /// </summary>
        public static string GetAppSetting(string settingKey)
        {
            return Environment.GetEnvironmentVariable(settingKey);
        }
    }
}
```

This code will store both **access tokens** on the session with the **refresh token** and **expiration time**. When it expires, it will use the refresh token to request 2 new access tokens (internal & public). Note how it contains 2 classes: `OAuthController` and `Credentials`, where the first exposes the endpoints and the second handles the access tokens (including refresh).

Next: [List hubs & projects](/datamanagement/hubs/readme)