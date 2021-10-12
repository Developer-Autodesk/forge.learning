# 运行和调试 (Go)

要启动服务器，只需转到菜单 **View** > **Integrated Terminal** 打开 Visual Studio Code Integrated Terminal（应在项目的根目录打开），然后运行以下命令：

```bash
    go run main.go
```

打开浏览器，然后访问 `http://localhost:3000` 以检查应用程序。

## 调试

对于 Visual Studio Code，通过在 **View** 菜单下的 **Integrated Terminal** 上键入以下命令，安装 [Delve](https://github.com/derekparker/delve)（golang 调试器）：

```bash
go get -u github.com/derekparker/delve/cmd/dlv
```

安装 `delve` 后，可以按 F5 或转到菜单 **Debug** >> **Start debugging**。 

!> 要进行调试，请确保在按 **F5** 之前在 Visual Studio Code 中打开 `main.go` 文件，否则可能会出现错误（请参见[疑难解答](#troubleshooting)）

现在，您将看到为工作空间创建了 launch.json 文件，其中包含用于调试的配置。默认情况下，将有如下所示的单个配置：

```javascript
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Launch",
            "type": "go",
            "request": "launch",
            "mode": "debug",
            "remotePath": "",
            "port": 2345,
            "host": "127.0.0.1",
            "program": "${fileDirname}",
            "env": {},
            "args": [],
            "showLog": true
        }
    ]
}
```

此处没有要更改的内容，因此保存它，您便已准备就绪。

设置断点，然后在 `Code debug viewlet` (F5) 中，按绿色的 `Start Debugging` 按钮开始调试。

转到 **Debug** 菜单，然后选择 **Start debugging**。底部应显示“Debug Console”选项卡，如下所示：

![](_media/go/vs_code_debug.png) 

## 疑难解答

如果您偶然遇到类似 `Can not debug non-main package` 的错误，不要灰心，只需从项目路径中打开 `main.go`，然后重试。 

    NOTE: This is caused by `"program": "${fileDirname}"` line in configuration file, 
    based on which it will try to start your app using the location of your opened file, 
    so if you start debugging your app by selecting non-main file, it will not know where 
    to start.
    This makes more sense when you will have apps generating several 
    executables (g.e. daemon and client).

如果您偶然遇到类似 `could not launch process: exec "lldb-server"` 的错误，那么您一定是在 OSX 上开发并且缺少 `command line developer tools`。要解决此问题，只需按照以下步骤操作：1. 打开新终端（不使用 Visual Studio Code Integrated Terminal） 2. 运行 xcode-select --install 3. 出现提示时，单击“Install”![](_media/go/osx_setup_tools.png) 


## 高级设置

如果您对仅限终端的调试（硬核调试）感兴趣，请查看以下教程：

- [GDB 方法](https://golang.org/doc/gdb) \- 用于使用 GDB 调试 golang 应用程序；
- [LLDB 方式](http://blog.ralch.com/tutorial/golang-debug-with-lldb/) \- 用于使用 LLDB 调试 golang 应用程序；


对于不喜欢设置任何内容的用户，可使用 [Goland](https://www.jetbrains.com/go/)，其中包含所有需要的可视化工具，使用 JetBrains 产品的用户应该熟悉它。



下一步：[Viewer 扩展](/zh-CN/tutorials/extensions)