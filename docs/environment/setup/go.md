# Create a new project (Go)

## First time usage

Make sure you [$GOPATH](https://github.com/golang/go/wiki/GOPATH) environment variable is set, this is required for first time usage. You can use a `/go/` folder under your user folder:

```bash
// MacOS & Linux
export GOPATH=$HOME/go

// Windows
ToDo
```

Inside `$GOPATH` create a `/src` folder for source code, do not use spaces and avoid special chars. Then a subfolder for this this tutorial: **forgesample**. The final result should be **$GOPATH/src/forgesample**.

Open **Visual Code**, then go to menu **File** and select **Open** (MacOS) or **Open Folder** (Windows) and select the newly created folder. 


## Files and Folders

To create a new folder or file, right-click on the "Explorer" area on the left and select **New Folder** or **New File**.

For consitency with other Forge samples, create a **/server/** folder for all server-side files and a **/www/** for all client-side files.

At the root folder, create `./main.go` in our main directory, as this will be the entry point of our app.
	
At this point, you project should be something like:

![](_media/go/vs_code_explorer.png) 


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
Note the import `github.com/apprentice3d/forgesample/server`, in your case it should match your folder, as you will make use of server files from your project.

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

This file prepares the server and serve the static files (e.g. `html`) and route the API requests.

Project is ready! At this point your project should have:

![](_media/go/vs_code_project.png) 


Next: [Authenticate](oauth/2legged/)