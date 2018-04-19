# OAuth 3-legged

In formal OAuth terminology, to accomplish three-legged authentication and authorization on the Forge Platform, the authorization code grant type can be adopted.

To use a web app as an example, this means that your app redirects the end user to an Autodesk login and authorization flow, and an authorization code is returned to your app (via a query parameter in the callback). Your app then exchanges that authorization code for a token by communicating with the Forge authentication server directly. [Learn more](https://developer.autodesk.com/en/docs/oauth/v2/overview/basics/).

A user needs to authorize access to his/her data. A **3-legged** token is required.

Choose your language: [NodeJS](oauth/3legged/nodejs)