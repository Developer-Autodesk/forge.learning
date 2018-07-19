# OAuth

OAuth, specifically OAuth2, is the open standard used across the Forge Platform for token-based authentication and authorization.

## 2-legged vs 3-legged

Learn more about [2-legged](https://developer.autodesk.com/en/docs/oauth/v2/tutorials/get-2-legged-token/) used on [View your models](tutorials/viewmodels) tutorial and [3-legged](https://developer.autodesk.com/en/docs/oauth/v2/tutorials/get-3-legged-token/) workflow used on [View BIM 360 & Fusion models](tutorials/viewhubmodels) tutorial.

## Scopes

A scope is a permission that is set on a token, a context in which that token may act. For example, a token with the data:read scope is permitted to read data within the Forge ecosystem and can be used on those endpoints that require that scope. Tokens without that scope would be denied access to such endpoints. (Individual endpoint reference pages list the required scopes.)

Scopes serve two principal functions:

- **Privacy and Control**: In a three-legged context, they act as a mechanism for requesting and securing permission to act on an end user’s behalf in specified ways.
- **Security**: In both two- and three-legged contexts, they ensure that if you lose control of your token, it cannot be misused to access resources for which it was not intended.

[Learn more](https://developer.autodesk.com/en/docs/oauth/v2/overview/scopes/)

## Public and Internal tokens

This tutorial will use the 2 types of access tokens: public and internal. The **public** is used for Viewer, which runs and requires a access token on the client. There is a special scope for this scenario: **viewables:read**. 

Now on the server-side we need it write-enabled, so the **internal** will use **bucket:create**, **bucket:read**, **data:read**, **data:create** and **data:write**.

> Don't know which tutorial to follow? 
> 
> Answer this: where are the files you want to access and view? 
> 
> If on your computer or on some other place, then **View your models**. If the models are on any BIM 360 (Team, Design or Docs) or Fusion Team, then **View BIM 360 & Fusion models**. 

Next: [View your models](tutorials/viewmodels) or [View BIM 360 & Fusion models](tutorials/viewhubmodels)