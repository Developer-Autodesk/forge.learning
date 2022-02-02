# Аутентификация (Go)


 Все, что нам нужно для нашего сервера в контексте аутентификации, - это предоставить конечную точку `GET /api/forge/oauth/token`. Она будет использоваться интерфейсом для запроса токенов с областью видимости `viewables:read`, чтобы отображать ваши модели в браузере.

Для этого нам понадобится всего один файл. 

## oauth.go

Создайте файл `/server/oauth.go`. Этот файл раскроет (англ. expose) вышеупомянутую конечную точку.

```go
package server

import (
	"net/http"
	"encoding/json"
)

// AccessTokenResponse reflects the data expected by frontend when asking for a token
type AccessTokenResponse struct {
	AccessToken string `json:"access_token"`
	ExpiresIn   int32  `json:"expires_in"`
}

// getAccessToken returns a valid access token in the form of {'access_token':value, 'expires_in':value}
func (service ForgeServices) getAccessToken(writer http.ResponseWriter, request *http.Request) {

	if request.Method != http.MethodGet {
		http.Error(writer, "Unsupported request method", http.StatusMethodNotAllowed)
		return
	}

	writer.Header().Add("Content-Type", "application/json")
	encoder := json.NewEncoder(writer)
	bearer, err := service.Authenticate("viewables:read")

	if err != nil {
		http.Error(writer, err.Error(), http.StatusInternalServerError)
		return
	}

	err = encoder.Encode(AccessTokenResponse{
		bearer.AccessToken,
		bearer.ExpiresIn,
	})

	if err != nil {
		http.Error(writer, err.Error(), http.StatusInternalServerError)
	}

}
```

Это гарантирует, что любой вызов `GET /api/forge/oauth/token` на наш сервер вернет токен доступа в виде

```json
{
	'access_token': value, 
	'expires_in': value
}
```

Далее: [Загрузка файла в OSS (Object Storage Service)](/ru-RU/datamanagement/oss/)

[Эта страница на английском языке](https://learnforge.autodesk.io/#/oauth/2legged/go).
