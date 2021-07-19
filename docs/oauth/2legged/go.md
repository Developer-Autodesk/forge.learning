# Authenticate (Go)


The only thing we need for our server in context of authentication, is to expose the endpoint `GET /api/forge/oauth/token` that will be used by the frontend to request tokens with `viewables:read` scope, to be able to display your viewables in the browser.

For this, we would need just one file.

## oauth.go

Create a `/server/oauth.go` file. This file will take care of exposing the abovementioned endpoint. 

[oauth.go](_snippets/viewmodels/go/oauth.go ':include :type=code go')

This will assure that any `GET /api/forge/oauth/token` call to our oauth, will return an access token in form of

```json
{
	'access_token': value, 
	'expires_in': value
}
```

Next: [Upload file to OSS](/datamanagement/oss/)