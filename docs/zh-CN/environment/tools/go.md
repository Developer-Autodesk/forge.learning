# 工具 (Go)

下载并安装 [Go Distribution](https://golang.org/doc/install) 以运行代码。 

确保设置了 [$GOPATH](https://github.com/golang/go/wiki/GOPATH) 环境变量，第一次使用时需要该环境变量。对于 OSX 和 Linux 操作系统，您可以使用用户文件夹下的 `/go/` 文件夹：

```bash
// MacOS & Linux
export GOPATH=$HOME/go
```

对于 Windows，我们建议将 `GOPATH` 设置为一个简单的位置，如 `C:\GOPROJECTS`：

```cmd
// Windows
set GOPATH=C:\GOPROJECTS
```

现在，我们需要 IDE 来编写代码。有许多选项，本教程将使用 [Visual Studio Code](https://code.visualstudio.com/)。

> 在本教程中，使用所有默认安装选项。

接下来，安装 Go for Visual Studio Code 软件包，该软件包安装后即可支持 GoLang。- 转到 Visual Studio Code 扩展管理器（左侧底部图标）- 键入 `go`，然后选择 ***luchoben*** 制作的 `Go` 插件。

![](_media/go/install_go_extension.gif) 


!> 如果在安装期间或安装后收到要安装其他与 Go 相关的软件包的通知，您可以安全地安装它们，因为这些是帮助工具，可以改进 Visual Studio Code 中的 Go 编码体验。     
例如：    
 -`github.com/nsf/gocode` - 将添加上下文相关的自动完成；    
 -`github.com/rogpeppe/godef` \- 将帮助您在 Go 源中查找符号信息；    
 -`github.com/sqs/goreturns` - 自动完成函数将为您返回值；    
 -`github.com/tpng/gopkgs` \- 将帮助您跟踪已安装的软件包；

下一步：[身份验证](/zh-CN/oauth/)