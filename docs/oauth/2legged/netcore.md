# Authenticate (.NET Core)

## OAuthController.cs

Create folder named `Controllers` at project root level, then create a class named **OAuthController** in a class file with the same name (`OAuthController.cs`) and add the following content:

[OAuthController.cs](_snippets/viewmodels/netcore/OAuthController.cs ':include :type=code csharp')

The **Get2LeggedTokenAsync** method connects to Autodesk Forge and get the access token. As we need a public (read-only) and an internal (write-enabled) token, **GetPublicAsync** exposes an endpoint for public access while **GetInternalAsync** is to be called within the application only.

To avoid getting a new access token for each end-user request causing unnecessary latency, let's cache them in a couple of `static` variables. Note we still need to refresh it after the time given in `expires_in` (in seconds).

!> Sharing access token between users is only valid in this case, where all users are accessing the same information (2-legged). If your app requires user specific data (3-legged), **DOT NOT** use this approach.

As per comments in the code above, the **GetAppSetting** simply gets the ID & Secret from the **Web.Config** file.

Next: [Upload file to OSS](/datamanagement/oss/)
