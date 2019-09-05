# OAuth 3-legged

In formal OAuth terminology, to accomplish three-legged authentication and authorization on the Forge Platform, the authorization code grant type can be adopted.

To use a web app as an example, this means that your app first needs to redirect the end user to the Autodesk login page where the user can approve your app's access to their data. Once they did that, an authorization code is returned to your app (via a query parameter in the callback). Your app then exchanges that authorization code for a token by communicating with the Forge authentication server directly. [Learn more](https://developer.autodesk.com/en/docs/oauth/v2/overview/basics/).

A user needs to authorize access to his/her data. A **3-legged** token is required.

Choose your language: [Node.js](oauth/3legged/nodejs) | [.NET Framework](oauth/3legged/net) | [.NET Core](oauth/3legged/netcore)
