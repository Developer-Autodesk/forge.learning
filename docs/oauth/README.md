# OAuth

OAuth, specifically OAuth2, is the open standard used across the Forge Platform for token-based authentication and authorization.

## 2-legged vs 3-legged

Learn more about the [2-legged workflow](https://developer.autodesk.com/en/docs/oauth/v2/tutorials/get-2-legged-token/) used in the [View your models](tutorials/viewmodels) tutorial, and the [3-legged workflow](https://developer.autodesk.com/en/docs/oauth/v2/tutorials/get-3-legged-token/) used in the [View BIM 360 & Fusion models](tutorials/viewhubmodels) tutorial.

## Scopes

A scope is a permission that is set on a token, a context in which that token may act. For example, a token with _data:read_ scope is permitted to read data within the Forge ecosystem and can be used on those endpoints that require that scope. Tokens without that scope would be denied access to such endpoints. (Individual endpoint reference pages list the required scopes.)

Scopes serve two principal functions:

- **Privacy and Control**: In a three-legged context, they act as a mechanism for requesting and securing permission to act on an end user’s behalf in specified ways.
- **Security**: In both two- and three-legged contexts, they ensure that if you lose control of your token, it cannot be misused to access resources for which it was not intended.

[Learn more](https://developer.autodesk.com/en/docs/oauth/v2/overview/scopes/)

## Public and Internal tokens

This tutorial will use 2 types of access tokens: public and internal. The **public** token is used for the Forge Viewer which runs and requires an access token on the client. There is a special scope for this scenario: **viewables:read**. 

Now on the server-side we need write access, so the **internal** token will use **bucket:create**, **bucket:read**, **data:read**, **data:create**, and **data:write** scopes.

> Don't know which tutorial to follow? 
> 
> Answer this: where are the files you want to access and view? 
> 
> If on your computer or in some other place, then **View your models**. If the models are on any BIM 360 (Team, Design or Docs) or Fusion Team, then **View BIM 360 & Fusion models**.
>
> If you want to modify models, then say no more, check the **Modify your models** tutorial.

Next: [View your models](tutorials/viewmodels) or [View BIM 360 & Fusion models](tutorials/viewhubmodels) or [Modify your models](tutorials/modifymodels)