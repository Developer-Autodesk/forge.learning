# Authorize

For a basic *OAuth* implementation we need 1 file.

### OAuthController.cs

Create folder named `Controllers` at project root level, then create a class named **OAuthController** in a class file with the same name (`OAuthController.cs`) and add the following content:

[OAuthController.cs](_snippets/viewhubmodels/netcore/OAuthController.cs ':include :type=code csharp')

This code will store both **access tokens** on the session with the **refresh token** and **expiration time**. When it expires, it will use the refresh token to request 2 new access tokens (internal & public). Note how it contains 2 classes: `OAuthController` and `Credentials`, where the first exposes the endpoints and the second handles the access tokens (including refresh).

Next: [List hubs & projects](/datamanagement/hubs/readme)