# Translate Model (Go)

To translate a file we just need one endpoint.

## modelderivative.go

Create a `/server/modelderivative.go` file with the following content:

```go
package server

import (
	"net/http"
	"encoding/json"
	"log"
	"github.com/apprentice3d/forge-api-go-client/md"
)


// TranslationInput reflects the expected body when processing the POST request to bucket managing endpoint
type TranslationInput struct {
	BucketKey  string `json:"bucketKey"`
	ObjectName string `json:"objectName"`
}


// translate Object translates the file, given input in the form of {'bucketKey': 'theKey', 'objectName': 'theName'}
func (service ForgeServices) translateObject(writer http.ResponseWriter, request *http.Request) {
	if request.Method != http.MethodPost {
		http.Error(writer, "Unsupported request method", http.StatusMethodNotAllowed)
		return
	}

	decoder := json.NewDecoder(request.Body)
	defer request.Body.Close()

	translationRequest := &TranslationInput{}
	err := decoder.Decode(translationRequest)
	if err != nil {
		http.Error(writer, "Could not parse body: "+err.Error(), http.StatusBadRequest)
	}

	log.Printf("Request for translating object %s from bucket %s",
		translationRequest.ObjectName,
		translationRequest.BucketKey)

	translationParameters := md.TranslationSVFPreset
	translationParameters.Input.URN = translationRequest.ObjectName

	response, err := service.TranslateWithParams(translationParameters)
	if err != nil {
		log.Println("Could not translate object: "+err.Error())
		http.Error(writer, "Could not translate object: "+err.Error(), http.StatusInternalServerError)
		return
	}
	//log.Println("Translation result: ", response.Result)
	log.Printf("Translation result: %s", response.Result)
	writer.WriteHeader(http.StatusOK)
	return
}
```

The **jobs** endpoint receives the **bucketKey** and **objectName** and post the [translation job](https://forge.autodesk.com/en/docs/model-derivative/v2/reference/http/job-POST/) to extract 2D & 3D views of the model. 

To summarize, at this point your **Go** project should be like:

![](_media/go/vs_code_allfiles.png)

Next: [Show on Viewer](viewer/2legged/)