# Загрузка файлов в OSS (Go)

В этом разделе нам нужны 3 функции:

1. Создание бакетов
2. Указание репозиториев данных и объектов (файлов)
3. Загрузка объектов (файлов)

Мы структурируем это в 2 файлах:

## oss.go

Создайте файл `/server/oss.go`, который отвечает за реализацию 1  и 2 пункта, и добавьте следующий код:

```go
package server

import (
	"log"
	"net/http"
	"encoding/json"
	"encoding/base64"
)

// BucketCreateInput reflects the expected body when processing the POST request to bucket managing endpoint
type BucketCreateInput struct {
	BucketKey string `json:"bucketKey"`
}


type Node struct {
	ID       string `json:"id"`
	Text     string `json:"text"`
	Type     string `json:"type"`
	Children bool   `json:"children"`
}

// manageBuckets performs depending on the request method:
// 	case POST: creates a new bucket, receive input in the form of {'bucketKey': 'theKey'} and return 200.
//	case GET: return all buckets or objects in form of list of nodes
func (service ForgeServices) manageBuckets(writer http.ResponseWriter, request *http.Request) {
	if request.Method == http.MethodPost {
		decoder := json.NewDecoder(request.Body)
		defer request.Body.Close()

		createBucketRequest := &BucketCreateInput{}
		err := decoder.Decode(createBucketRequest)
		if err != nil {
			http.Error(writer, "Could not parse body: "+err.Error(), http.StatusBadRequest)
		}

		log.Println("Request for creating a bucket with key = ", createBucketRequest.BucketKey)

		_, err = service.CreateBucket(createBucketRequest.BucketKey, "transient")
		if err != nil {
			http.Error(writer, "Could not create bucket: "+err.Error(), http.StatusInternalServerError)
			return
		}

		writer.WriteHeader(http.StatusOK)
		return
	}

	if request.Method == http.MethodGet {
		encoder := json.NewEncoder(writer)
		var result []Node

		id := request.URL.Query().Get("id")
		log.Println("Received listing request with id=", id)
		if id != "#" {
			log.Printf("Got bucketKey=%s, returning list of object in that bucket", id)
			objectList, err := service.ListObjects(id, "", "", "")
			if err != nil {
				http.Error(writer, "Could not get the object list: "+err.Error(), http.StatusInternalServerError)
				return
			}

			for _, item := range objectList.Items {
				result = append(result, Node{
					ID:   base64.RawStdEncoding.EncodeToString([]byte(item.ObjectID)),
					Text: item.ObjectKey,
					Type: "object",
					Children: false,
				})
			}

		} else {
			log.Println("Returning list of buckets")
			bucketList, err := service.ListBuckets("", "", "")
			if err != nil {
				http.Error(writer, "Could not get the bucket list: "+err.Error(), http.StatusInternalServerError)
				return
			}


			nodeChannel := make(chan Node, len(bucketList.Items))

			for _, bucket := range bucketList.Items {

				go func(bucketKey string) {
					children := false
					objectList, err := service.ListObjects(bucketKey, "", "", "")
					if err == nil && len(objectList.Items) > 0 {
						children = true
					}

					node := Node {
						ID:   bucketKey,
						Text: bucketKey,
						Type: "bucket",
						Children: children,
					}
					nodeChannel <- node

				}(bucket.BucketKey)

			}

			for range bucketList.Items {
				result = append(result, <- nodeChannel)
			}
		}

		writer.Header().Add("Content-Type", "application/json")
		err := encoder.Encode(result)
		if err != nil {
			http.Error(writer,
				"Could not encode bucket/object list into response body: "+err.Error(),
				http.StatusInternalServerError)
			return
		}

		return
	}

	http.Error(writer, "Unsupported request method", http.StatusMethodNotAllowed)
	return
}

```

Мы планируем поддерживать [jsTree](https://www.jstree.com/) со стороны frontend, поэтому наш **GET oss/buckets** должен возвращать параметр строки запроса (англ. querystring parameter) `id` и бакеты, если `id=#` и объекты для данного bucketKey переданы как `id=bucketKey`.


## uploader.go

Создайте файл `/server/uploader.go` со следующим кодом:

```go
package server

import (
	"net/http"
	"io/ioutil"
	"log"
	"encoding/binary"
)

// manageObjects uploads an object given a file and bucketKey as a multipart/form-data.
// For simplicity, non-resumable.
func (service ForgeServices) manageObjects(writer http.ResponseWriter, request *http.Request) {

	if request.Method != http.MethodPost {
		http.Error(writer, "Unsupported request method", http.StatusMethodNotAllowed)
		return
	}

	request.ParseMultipartForm(32 << 20)
	bucketKey := request.FormValue("bucketKey")

	file, header, err := request.FormFile("fileToUpload")
	if err != nil {
		http.Error(writer, "Could not get the file from form: "+err.Error(), http.StatusBadRequest)
		return
	}
	defer file.Close()

	data, err := ioutil.ReadAll(file)
	if err != nil {
		http.Error(writer, "Problem reading the file content: "+err.Error(), http.StatusBadRequest)
		return
	}
	defer request.Body.Close()

	log.Printf("Received request to upload a file of size %v to bucket %s\n", binary.Size(data), bucketKey)

	_, err = service.UploadObject(bucketKey, header.Filename, data)
	if err != nil {
		http.Error(writer, "Could not upload file: "+err.Error(), http.StatusBadRequest)
		return
	}

	return
}
```

!> Загрузка файла из браузера напрямую в Atodesk Forge возможна, но требует предоставления токена доступа **write-enabled**, что **НЕ БЕЗОПАСНО**. 

Далее: [Конвертация файлов](/ru-RU/modelderivative/translate/)

[Эта страница на английском языке](https://learnforge.autodesk.io/#/datamanagement/oss/go).
