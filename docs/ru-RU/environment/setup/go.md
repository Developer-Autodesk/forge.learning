# Создание нового проекта (Go)

Внутри `$GOPATH` создайте папку `/src` для исходного кода, не сипользуйте пробелы и избегайте специальных символов. Название подпапки для этого руководства: **forgesample**. Финальный результат должен быть в **$GOPATH/src/forgesample**.

Откройте **Visual Code**, потом перейдите в меню **File** --> **Open** (MacOS) или **Open Folder** (Windows) и выберите только что созданную папку.

## Файлы и папки

Чтобы создать новую папку или файл, щелкните правой кнопкой мыши на область "Explorer" слева и выберите **New Folder** или **New File**.

Для постоянства, создайте папку **/server/** для всех файлов на стороне сервера и **/www/** для файлов со стороны клиента. 

В корневой папке создайте `./main.go` в нашей основной директории, т.к. это будет точкой входа нашего приложения. 
	
На этом этапе проект должен выглядеть примерно так:

![](_media/go/vs_code_explorer.png) 


## Настройка данных учетной записи

Важно определить ID & Secret как переменные среды, чтобы наш проект мог использовать их для авторизованных запросов. 

Чтобы настроить переменные среды, выполните следующие действия (в зависимости от вашей операционной системы).    
***Mac OSX/Linux (Terminal)***

```bash
export FORGE_CLIENT_ID=<<YOUR CLIENT ID FROM DEVELOPER PORTAL>>
export FORGE_CLIENT_SECRET=<<YOUR CLIENT SECRET>>
```    

***Windows (Command Prompt)***

```bash
set FORGE_CLIENT_ID=<<YOUR CLIENT ID FROM DEVELOPER PORTAL>>
set FORGE_CLIENT_SECRET=<<YOUR CLIENT SECRET>>
```

## main.go

Добавьте код ниже в `main.go`, ранее созданный в корневой папке:

```go
package main

import (
	"log"
	"os"

	"forgesample/server"
)

const (
	PORT = ":3000"
)

func main() {

	clientID := os.Getenv("FORGE_CLIENT_ID")
	clientSecret := os.Getenv("FORGE_CLIENT_SECRET")

	if clientID == "" || clientSecret == "" {
		log.Fatal("The FORGE_CLIENT_ID and FORGE_CLIENT_SECRET env vars are not set. \nExiting ...")
	}

	log.Println("Starting server on port ", PORT)
	server.StartServer(PORT, clientID, clientSecret)
}
```
Цель этого файла - настроить учетные данные Forge и запустить сервер.   
Обратите внимание на импорт `forgesample/server`, в вашем случае он должен соответствовать вашей папке, т.к. вы будете использовать файлы сервера из вашего проекта.
Обратите внимание также на то, как мы получаем ID & Secret для настройки нашего сервера или на то, как происходит сбой, если один из них (ID & Secret) не найден.

## server.go

В папке **/server/** создайте файл с названием `server.go` и кодом ниже:

```go
package server

import (
	"log"
	"net/http"

	"github.com/apprentice3d/forge-api-go-client/dm"
	"github.com/apprentice3d/forge-api-go-client/md"
	"github.com/apprentice3d/forge-api-go-client/oauth"
)

// ForgeServices holds reference to all services required in this server
type ForgeServices struct {
	oauth.TwoLeggedAuth
	dm.BucketAPI
	md.ModelDerivativeAPI
}

func StartServer(port, clientID, clientSecret string) {

	service := ForgeServices{
		oauth.NewTwoLeggedClient(clientID, clientSecret),
		dm.NewBucketAPIWithCredentials(clientID, clientSecret),
		md.NewAPIWithCredentials(clientID, clientSecret),
	}

	// serving static files
	static := http.FileServer(http.Dir("www"))
	http.Handle("/", static)

	// defining other endpoints
	http.HandleFunc("/api/forge/oauth/token", service.getAccessToken)
	http.HandleFunc("/api/forge/oss/buckets", service.manageBuckets)
	http.HandleFunc("/api/forge/oss/objects", service.manageObjects)
	http.HandleFunc("/api/forge/modelderivative/jobs", service.translateObject)

	if err := http.ListenAndServe(port, nil); err != nil {
		log.Fatal(err.Error())
	}

}
```
Этот файл подготавливает сервер, обрабатывает статические файлы (например, `html`, `js`) и направляет запросы API.

Обратите внимание, что подход Go основан на [forge-api-go-client](https://github.com/apprentice3d/forge-api-go-client), чтобы использовать эту библиотеку, направьте запрос в терминале:

```bash
	go get -u github.com/apprentice3d/forge-api-go-client
```

Go скопирует это в `$GOPATH/src/github.com/apprentice3d/forge-api-go-client`, тем самым делая доступными этот и все ваши будущие проекты, написанные на Go.

Эта библиотека разработана для того, чтобы запрашивать токены с соответствующей областью действия для их задач.
Вот почему у нас есть структура `ForgeService`:

```go
// ForgeServices holds reference to all services required in this server
type ForgeServices struct {
	oauth.TwoLeggedAuth
	dm.BucketAPI
	md.ModelDerivativeAPI
}

```
она содержит все Forge API, которые мы будем использовать, и каждый из API был запущен с данными учетной записи Forge внутри одного файла: 

```go
...
func StartServer(port, clientID, clientSecret string) {

	service := ForgeServices{
		oauth.NewTwoLeggedClient(clientID, clientSecret),
		dm.NewBucketAPIWithCredentials(clientID, clientSecret),
		md.NewAPIWithCredentials(clientID, clientSecret),
	}
...
```



Проект готов! На этом этапе он должен иметь:

![](_media/go/vs_code_project.png) 


Далее: [Аутентификация](/ru-RU/oauth/2legged/)

[Эта страница на английском языке](https://learnforge.autodesk.io/#/environment/setup/go).
