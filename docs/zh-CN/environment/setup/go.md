# 创建新项目 (Go)

在 `$GOPATH` 内，为源代码创建一个 `/src` 文件夹，不要使用空格并避免使用特殊字符。然后，为本教程创建一个子文件夹：**forgesample**。最终结果应为 **$GOPATH/src/forgesample**。

打开 **Visual Code**，然后转到 **File** 菜单，选择 **Open** (MacOS) 或 **Open Folder** (Windows)，并选择新创建的文件夹。 


## 文件和文件夹

要创建新文件夹或文件，请在左侧“Explorer”区域上单击鼠标右键，然后选择 **New Folder** 或 **New File**。

为了与其他 Forge 示例保持一致，请创建一个用于存放所有服务器端文件的 **/server/** 文件夹和一个用于存放所有客户端文件的 **/www/** 文件夹。

在根文件夹中，在主目录中创建 `./main.go`，因为这将是我们应用程序的入口点。
	
此时，您的项目应类似于：

![](_media/go/vs_code_explorer.png) 


## 设置凭据

请务必将 ID 和密钥定义为环境变量，以便我们的项目可以将其用于授权请求。

要设置环境变量，请按照以下步骤操作，具体取决于您的操作系统。    
***Mac OSX/Linux（终端）***

```bash
export FORGE_CLIENT_ID=<<YOUR CLIENT ID FROM DEVELOPER PORTAL>>
export FORGE_CLIENT_SECRET=<<YOUR CLIENT SECRET>>
```    

***Windows（命令提示符）***

```bash
set FORGE_CLIENT_ID=<<YOUR CLIENT ID FROM DEVELOPER PORTAL>>
set FORGE_CLIENT_SECRET=<<YOUR CLIENT SECRET>>
```

## main.go

将以下内容写入之前在根文件夹中创建的 `main.go`：

[main.go](_snippets/viewmodels/go/main.go ':include :type=code go')

此文件的用途是设置 Forge 凭据并启动服务器。    
请注意导入 `forgesample/server` 部分，在您的情况下，它应该与您的文件夹匹配，因为您将使用项目中的服务器文件。  
另请注意我们如何获取 ID 和密钥来设置服务器，如果找不到其中之一，则会失败。

## server.go

现在，在 **/server/** 文件夹下，创建一个名为 `server.go` 的文件，其内容如下：

[server.go](_snippets/viewmodels/go/server.go ':include :type=code go')

此文件用于准备服务器，提供静态文件（例如 `html`、`js`），并路由 API 请求。

请注意，Go 方法依赖于 [forge-api-go-client](https://github.com/apprentice3d/forge-api-go-client)，要使用该库，您应该通过在终端中调用来获取它：

```bash
	go get -u github.com/apprentice3d/forge-api-go-client
```

Go 会将其复制到 `$GOPATH/src/github.com/apprentice3d/forge-api-go-client`，以便可用于此内容以及在 Go 中编写的所有未来项目。

该库旨在处理为其任务请求具有适当范围的代币。因此，我们拥有 `ForgeService` 结构：

```go
// ForgeServices holds reference to all services required in this server
type ForgeServices struct {
	oauth.TwoLeggedAuth
	dm.BucketAPI
	md.ModelDerivativeAPI
}

```
它包含我们将使用的所有 Forge API 客户端，并且每个客户端都使用同一文件中的 Forge 凭据进行初始化：

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



项目已准备就绪！此时，项目应如下所示：

![](_media/go/vs_code_project.png) 


下一步：[身份验证](/zh-CN/oauth/2legged/)