# Create a new project (Go)

Inside `$GOPATH` create a `/src` folder for source code, do not use spaces and avoid special chars. Then a subfolder for this this tutorial: **forgesample**. The final result should be **$GOPATH/src/forgesample**.

Open **Visual Code**, then go to menu **File** and select **Open** (MacOS) or **Open Folder** (Windows) and select the newly created folder. 


## Files and Folders

To create a new folder or file, right-click on the "Explorer" area on the left and select **New Folder** or **New File**.

For consitency with other Forge samples, create a **/server/** folder for all server-side files and a **/www/** for all client-side files.

At the root folder, create `./main.go` in our main directory, as this will be the entry point of our app.
	
At this point, you project should be something like:

![](_media/go/vs_code_explorer.png) 


## Setup credentials

It's important to define ID & Secret as environment variables so our project can use it for authorized requests.

To setup the environment variables, follow these steps, depending on your operationg system.    
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

Write the following into `main.go`, previously created in the rood folder:

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
The purpose of this file is to setup Forge credentials and start the server.    
Note the import `forgesample/server`, in your case it should match your folder, as you will make use of server files from your project.  
Note also how we get the ID & Secret to setup our server, or failing if one of them is not found.

## server.go

Now, under **/server/** folder, create a file named `server.go` with:

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
This file prepares the server and serves the static files (e.g. `html`, `js`) and routes the API requests.

Note that the Go approach is relying on [forge-api-go-client](https://github.com/apprentice3d/forge-api-go-client), and
to use that library you should get it by calling in terminal:

```bash
	go get -u github.com/apprentice3d/forge-api-go-client
```

Go will copy it into `$GOPATH/src/github.com/apprentice3d/forge-api-go-client`, 
thus making available to this and all your future projects written in Go.

That library was designed to take care of requesting tokens with appropriate scope for their tasks.
This is why we have the `ForgeService` struct:

```go
// ForgeServices holds reference to all services required in this server
type ForgeServices struct {
	oauth.TwoLeggedAuth
	dm.BucketAPI
	md.ModelDerivativeAPI
}

```
that contains all Forge API clients we will be using and each of them was initialized with forge credentials within the same file:

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



Project is ready! At this point your project should have:

![](_media/go/vs_code_project.png) 


Next: [Authenticate](oauth/2legged/)