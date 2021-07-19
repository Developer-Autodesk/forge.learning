# Authorize (.NET Framework)

For a basic *OAuth* implementation we need 1 file.

### OAuthController.cs

Create a .NET WebAPI Controller named **OAuthController** (see [how to create a controller](environment/setup/net_controller)) and add the following content:

[OAuthController.cs](_snippets/viewhubmodels/net/OAuthController.cs ':include :type=code csharp')

This code will store both **access tokens** on the session with the **refresh token** and **expiration time**. When it expires, it will use the refresh token to request 2 new access tokens (internal & public). Note how it contains 2 classes: `OAuthController` and `Credentials`, where the first exposes the endpoints and the second handles the access tokens (including refresh).

Next: [List hubs & projects](/datamanagement/hubs/readme)