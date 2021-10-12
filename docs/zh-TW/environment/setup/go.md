# 建立新專案 (Go)

在 `$GOPATH` 內建立 `/src` 資料夾用來放置專案原始碼，請勿使用空格並避免使用特殊字元。然後，建立本自學課程的子資料夾：**forgesample**。最終結果應為 **$GOPATH/src/forgesample**。

開啟 **Visual Studio Code**，移往功能表 **File**，並選取 **Open** (MacOS) 或 **Open Folder** (Windows)，然後選取新建立的資料夾。 


## 檔案和資料夾

若要建立新資料夾或檔案，請在左側的「Explorer」區域上按一下右鍵，然後選取 **New Folder** 或 **New File**。

為了與其他 Forge 範例保持一致，請為所有伺服器端檔案建立 **/server/** 資料夾，為所有用戶端檔案建立 **/www/**。

在根資料夾中，於主目錄中建立 `./main.go`，因為這將是應用程式的進入點。
	
此時，您的專案應類似如下：

![](_media/go/vs_code_explorer.png) 


## 設定認證

將您的 Client ID 和 Secret 定義為環境變數很重要，這樣專案就可以將其用於授權請求。

若要設定環境變數，請遵循以下步驟，具體取決於您的作業系統。    
***Mac OSX/Linux (終端機)***

```bash
export FORGE_CLIENT_ID=<<YOUR CLIENT ID FROM DEVELOPER PORTAL>>
export FORGE_CLIENT_SECRET=<<YOUR CLIENT SECRET>>
```    

***Windows (指令提示)***

```bash
set FORGE_CLIENT_ID=<<YOUR CLIENT ID FROM DEVELOPER PORTAL>>
set FORGE_CLIENT_SECRET=<<YOUR CLIENT SECRET>>
```

## main.go

將以下內容寫入 `main.go` (先前在根目錄建立的)：

[main.go](_snippets/viewmodels/go/main.go ':include :type=code go')

此檔案的用途是設定 Forge 開發憑證 (您的 Client ID 和 Secret) 並啟動伺服器。    
請注意匯入 `forgesample/server`，就您的情況而言，它應該與您的資料夾相符，因為您將使用專案中的伺服器檔案。  
另請注意我們如何取得您的 Client ID 和 Secret 以設定伺服器，如果找不到其中一項，則會失敗。

## server.go

現在，在 **/server/** 資料夾下，建立含有以下內容的名為 `server.go` 的檔案：

[server.go](_snippets/viewmodels/go/server.go ':include :type=code go')

此檔案用於準備伺服器，提供靜態檔案 (例如 `html`、`js`) 以及路由 API 請求。

請注意，這個 GO 的自學章節是依賴於 [forge-api-go-client](https://github.com/apprentice3d/forge-api-go-client)，若要使用該程式庫，請在終端機裡輸入下面命令進行安裝：

```bash
	go get -u github.com/apprentice3d/forge-api-go-client
```

Go 將其複製到 `$GOPATH/src/github.com/apprentice3d/forge-api-go-client`，以套用於本專案或往後您其他的 Go 專案。

該程式庫旨在處理請求具有適當工作範圍的 token。這就是為什麼我們要宣告 `ForgeService` 結構體：

```go
// ForgeServices holds reference to all services required in this server
type ForgeServices struct {
	oauth.TwoLeggedAuth
	dm.BucketAPI
	md.ModelDerivativeAPI
}

```
這包含了所有我們會使用到的 Forge API 實體。我們將在這一個檔案裡將它們都初始化完成：

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



專案已準備就緒！此時，您的專案應具有以下結構：

![](_media/go/vs_code_project.png) 


下一步：[驗證](/zh-TW/oauth/2legged/)