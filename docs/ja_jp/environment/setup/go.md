# 新しいプロジェクトを作成(Go)

`$GOPATH` の内部には、ソース コードの `/src` フォルダを作成します。スペースを使用せず、特殊文字を使用しないでください。このチュートリアルのサブフォルダ**forgesample** です。最終結果は **$GOPATH/src/forgesample** である必要があります。

**ビジュアル コード**を開き、メニュー **ファイル**に移動して、**開く**(MacOS)または **開く**(Windows)を選択し、新しく作成されたフォルダを選択します。 


## ファイルとフォルダ

新しいフォルダまたはファイルを作成するには、左側の「エクスプローラ」領域を右クリックし、**New Folder** または **New File** を選択します。

その他の Forge サンプルと整合性を保つため、すべてのサーバ側ファイルに **/server/** フォルダを作成し、すべてのクライアント側ファイルに **/www/** を作成します。

ルート フォルダで、メイン フォルダに `./main.go` を作成します。これはアプリのエントリ ポイントになります。
	
この時点で、プロジェクトは次のようになります。

![](_media/go/vs_code_explorer.png) 


## 資格情報を設定する

プロジェクトが承認済みの要求に使用できるように、環境変数としてIDとシークレットを定義することが重要です。

環境変数を設定するには、オペレーティングシステムに応じて、次の手順に従います。    
***Mac OSX/Linux (ターミナル)***

```bash
export FORGE_CLIENT_ID=<<YOUR CLIENT ID FROM DEVELOPER PORTAL>>
export FORGE_CLIENT_SECRET=<<YOUR CLIENT SECRET>>
```    

***Windows (コマンドプロンプト)***

```bash
set FORGE_CLIENT_ID=<<YOUR CLIENT ID FROM DEVELOPER PORTAL>>
set FORGE_CLIENT_SECRET=<<YOUR CLIENT SECRET>>
```

## main.go

以前にルート フォルダに作成した `main.go` に次のように書き込みます。

[main.go](_snippets/viewmodels/go/main.go ':include :type=code go')

このファイルの目的は、Forge資格情報を設定し、サーバを起動することです。    
プロジェクトのサーバ ファイルを使用するため、インポート `forgesample/server` はフォルダと一致している必要があります。  
また、IDとシークレットを取得してサーバを設定したり、いずれかのサーバが見つからない場合に失敗する方法にも注意してください。

## server.go

次に、**/server/** フォルダの下に、`server.go` という名前のファイルを作成します。

[server.go](_snippets/viewmodels/go/server.go ':include :type=code go')

このファイルはサーバを準備し、静的ファイル(`html`、`js` など)を提供し、API 要求をルーティングします。

Go の方法は [forge-api-go-client](https://github.com/apprentice3d/forge-api-go-client) に依存しており、このライブラリを使用するには、ターミナルで呼び出して取得する必要があります。

```bash
	go get -u github.com/apprentice3d/forge-api-go-client
```

Go はこれを `$GOPATH/src/github.com/apprentice3d/forge-api-go-client` にコピーします。これにより、このプロジェクトと Go で作成された将来のすべてのプロジェクトで使用できるようになります。

このライブラリは、タスクに適切な範囲を持つトークンを要求するように設計されています。このため、`ForgeService` 構造体があります。

```go
// ForgeServices holds reference to all services required in this server
type ForgeServices struct {
	oauth.TwoLeggedAuth
	dm.BucketAPI
	md.ModelDerivativeAPI
}

```
を使用すると、使用するすべてのForge APIクライアントが含まれ、各クライアントは同じファイル内のforge資格情報で初期化されます。

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



プロジェクトの準備ができました。この時点で、プロジェクトには次の条件が設定されています。

![](_media/go/vs_code_project.png) 


次へ:[認証](oauth/2legged/)