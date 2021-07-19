# Authenticate (.NET Framework)

## OAuthController.cs

Create a .NET WebAPI Controller named **OAuthController** (see [how to create a controller](environment/setup/net_controller)) and add the following content:

[OAuthController.cs](_snippets/viewmodels/net/OAuthController.cs ':include :type=code csharp')

The **Get2LeggedTokenAsync** method connects to Autodesk Forge and get the access token. As we need a public (read-only) and an internal (write-enabled) tokens, **GetPublicAsync** exposes as an endpoint while **GetInternalAsync** is for the application. 

To avoid getting a new access token for each end-user request, which adds unnecessary latency, let's cache them in a couple `static` variables. Note we still need to refresh it after `expires_in` seconds.

!> Share access token between users is only valid in this case, where all users are accessing the same information (2-legged). If your app uses per-user data (3-legged), **DOT NOT** use this approach.

As per comments, the **GetAppSetting** simply gets the ID & Secret from the **Web.Config** file.

Next: [Upload file to OSS](/datamanagement/oss/)