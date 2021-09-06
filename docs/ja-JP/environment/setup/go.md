# 新しいプロジェクトを作成する(Go)

`$GOPATH` 内にソース コード用の `/src` フォルダを作成します。スペースおよび特殊文字を使用しないでください。このチュートリアルのサブフォルダは **forgesample** です。最終結果は **$GOPATH/src/forgesample** である必要があります。

**Visual Code** を開き、**File** メニューに移動し、**Open**(MacOS)または **Open Folder**(Windows)を選択して、新しく作成されたフォルダを選択します。 


## ファイルとフォルダ

新しいフォルダまたはファイルを作成するには、左側の Explorer 領域を右クリックして、**New Folder** または **New File** を選択します。

その他の Forge サンプルと整合性を保つため、すべてのサーバ側ファイルに **/server/** フォルダを作成し、すべてのクライアント側ファイルに **/www/** を作成します。

ルート フォルダで、メイン フォルダに `./main.go` を作成します。これはアプリのエントリ ポイントになります。
	
この時点で、プロジェクトは次のようになります。

![](_media/go/vs_code_explorer.png) 


## 資格情報を設定する

環境変数として ID とシークレットを定義し、プロジェクトが承認済みの要求に対してそれらを使用できるようにすることが重要です。

環境変数を設定するには、オペレーティング システムに応じて、次の手順に従います。    
***Mac OSX/Linux (ターミナル)***

```bash
export FORGE_CLIENT_ID=<<YOUR CLIENT ID FROM DEVELOPER PORTAL>>
export FORGE_CLIENT_SECRET=<<YOUR CLIENT SECRET>>
```    

***Windows (コマンド プロンプト)***

```bash
set FORGE_CLIENT_ID=<<YOUR CLIENT ID FROM DEVELOPER PORTAL>>
set FORGE_CLIENT_SECRET=<<YOUR CLIENT SECRET>>
```

## main.go

以前にルート フォルダに作成した `main.go` に次のように書き込みます。

[main.go](_snippets/viewmodels/go/main.go ':include :type=code go')

このファイルの目的は、Forge 資格情報を設定し、サーバを起動することです。    
プロジェクトのサーバ ファイルを使用するため、インポート `forgesample/server` はフォルダと一致する必要があります。  
また、ID とシークレットを取得してサーバを設定する方法を確認してください。それらのいずれかが見つからない場合は失敗します。

## server.go

次に、**/server/** フォルダの下に、以下を使用して `server.go` という名前のファイルを作成します。

[server.go](_snippets/viewmodels/go/server.go ':include :type=code go')

このファイルはサーバを準備し、静的ファイル(`html`、`js`など)を提供し、API 要求をルーティングします。

Go の使用方法は、[forge-api-go-client](https://github.com/apprentice3d/forge-api-go-client) に依存しており、そのライブラリを使用するには、ターミナルで呼び出して取得する必要があります。

```bash
	go get -u github.com/apprentice3d/forge-api-go-client
```

Go はこれを `$GOPATH/src/github.com/apprentice3d/forge-api-go-client` にコピーします。これで、このライブラリや Go で記述された今後のすべてのプロジェクトで使用できるようになります。

このライブラリは、タスクの適切な範囲を持つトークンを要求するように設計されています。このため、`ForgeService` 構造体があります。

```go
// ForgeServices holds reference to all services required in this server
type ForgeServices struct {
	oauth.TwoLeggedAuth
	dm.BucketAPI
	md.ModelDerivativeAPI
}

```
これには、使用するすべての Forge API クライアントが含まれ、各クライアントは同じファイル内の forge 資格情報で初期化されます。

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



プロジェクトの準備ができました!この時点で、プロジェクトには以下が設定されています。

![](_media/go/vs_code_project.png) 


次の作業:[認証する](oauth/2legged/)