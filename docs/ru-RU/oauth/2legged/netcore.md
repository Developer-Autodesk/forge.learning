# Аутентификация (.NET Core)

## OAuthController.cs

Создайте папку `Controllers` в корневой папке проекта (англ. project root level), затем создайте класс **OAuthController** в файле класса с тем же названием (`OAuthController.cs`) и добавьте следующий код:

```csharp
using Autodesk.Forge;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace forgeSample.Controllers
{
    [ApiController]
    public class OAuthController : ControllerBase
    {
        // As both internal & public tokens are used for all visitors
        // we don't need to request a new token on every request, so let's
        // cache them using static variables. Note we still need to refresh
        // them after the expires_in time (in seconds)
        private static dynamic InternalToken { get; set; }
        private static dynamic PublicToken { get; set; }

        /// <summary>
        /// Get access token with public (viewables:read) scope
        /// </summary>
        [HttpGet]
        [Route("api/forge/oauth/token")]
        public async Task<dynamic> GetPublicAsync()
        {
            if (PublicToken == null || PublicToken.ExpiresAt < DateTime.UtcNow)
            {
                PublicToken = await Get2LeggedTokenAsync(new Scope[] { Scope.ViewablesRead });
                PublicToken.ExpiresAt = DateTime.UtcNow.AddSeconds(PublicToken.expires_in);
            }
            return PublicToken;
        }

        /// <summary>
        /// Get access token with internal (write) scope
        /// </summary>
        public static async Task<dynamic> GetInternalAsync()
        {
            if (InternalToken == null || InternalToken.ExpiresAt < DateTime.UtcNow)
            {
                InternalToken = await Get2LeggedTokenAsync(new Scope[] { Scope.BucketCreate, Scope.BucketRead, Scope.BucketDelete, Scope.DataRead, Scope.DataWrite, Scope.DataCreate, Scope.CodeAll });
                InternalToken.ExpiresAt = DateTime.UtcNow.AddSeconds(InternalToken.expires_in);
            }

            return InternalToken;
        }

        /// <summary>
        /// Get the access token from Autodesk
        /// </summary>
        private static async Task<dynamic> Get2LeggedTokenAsync(Scope[] scopes)
        {
            TwoLeggedApi oauth = new TwoLeggedApi();
            string grantType = "client_credentials";
            dynamic bearer = await oauth.AuthenticateAsync(
              GetAppSetting("FORGE_CLIENT_ID"),
              GetAppSetting("FORGE_CLIENT_SECRET"),
              grantType,
              scopes);
            return bearer;
        }

        /// <summary>
        /// Reads appsettings from web.config
        /// </summary>
        public static string GetAppSetting(string settingKey)
        {
            return Environment.GetEnvironmentVariable(settingKey).Trim();
        }
    }
}
```

Метод **Get2LeggedTokenAsync** подключается к Autodesk Forge и получает токен доступа. Поскольку нам нужны открытые (только для read) и внутренние (с возможностью write) токены, **GetPublicAsync** предоставляется как конечная точка, а **GetInternalAsync** вызывается только в веб-приложении.

Чтобы избежать получения нового токена доступа на каждый запрос конечного пользователя (т.к. это создает ненужную задержку работы), давайте кэшируем их в переменных `static`. Обратите внимание, что нам все еще нужно обновлять его после времени окончания действия (`expires_in` seconds).

!> Обмен токенами доступа между пользователями возможен только в том случае, когда все пользователи получают доступ к одним и тем же данным (2-legged токены). Если ваше приложение использует данные для каждого пользователя (3-legged токены), **НЕ** используйте этот подход.

Комментарий: **GetAppSetting** просто получает ID & Secret из файла **Web.Config**.

Далее: [Загрузка файла в OSS (Object Storage Service)](/ru-RU/datamanagement/oss/)

[Эта страница на английском языке](https://learnforge.autodesk.io/#/oauth/2legged/netcore).
