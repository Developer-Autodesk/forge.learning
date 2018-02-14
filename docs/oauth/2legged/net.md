# .NET

Create a file 

```csharp
TwoLeggedApi apiInstance = new TwoLeggedApi();
      string grantType = "client_credentials";
      dynamic bearer = await apiInstance.AuthenticateAsync(Config.FORGE_CLIENT_ID, Config.FORGE_CLIENT_SECRET, grantType, scopes);
```