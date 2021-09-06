# 執行和除錯 (Go)

若要啟動伺服器，請移往 **View** 功能表 > **Integrated Terminal** 直接開啟 Visual Studio Code Integrated Terminal (其應會在您專案的根位置開啟)，然後執行：

```bash
    go run main.go
```

開啟您的瀏覽器，然後移往 `http://localhost:3000` 查看應用程式。

## 除錯

如果是使用 Visual Code，請在 **Integrated Terminal** (在 **View** 功能表下) 輸入以下指令，以便安裝 [Delve](https://github.com/derekparker/delve) (Golang 除錯器)：

```bash
go get -u github.com/derekparker/delve/cmd/dlv
```

`delve` 安裝後，您可以按 F5 或是移往 **Debug** 功能表 >> **Start debugging**。 

!> 若要進行除錯，請在按 **F5** 之前，確定 `main.go` 檔案已在 Visual Code 中開啟，否則您可能會看到錯誤 (請參閱[疑難排解](#troubleshooting))

現在，您將看到一個為您工作區建立的 launch.json 檔案，其中將包含偵錯所用的規劃。依預設，會有如下所示的單一規劃：

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

此處沒有要變更的內容，因此請儲存，這樣就設定好了。

設置中斷點，然後在 `Code debug viewlet` (F5) 中按綠色的 `Start Debugging` 按鈕開始除錯。

移往 **Debug** 功能表，然後選取 **Start debugging**。「Debug Console」頁籤應會出現在底部，如下所示：

![](_media/go/vs_code_debug.png) 

## 疑難排解

萬一您收到 `Can not debug non-main package` 之類的錯誤，請不要感到絕望，只需從專案的路徑開啟 `main.go`，然後再試一次即可。 

    NOTE: This is caused by `"program": "${fileDirname}"` line in configuration file, 
    based on which it will try to start your app using the location of your opened file, 
    so if you start debugging your app by selecting non-main file, it will not know where 
    to start.
    This makes more sense when you will have apps generating several 
    executables (g.e. daemon and client).

萬一您收到 `could not launch process: exec "lldb-server"` 之類的錯誤，那麼您肯定是在 OSX 上進行開發，而且缺少 `command line developer tools`。若要修正此問題，按照以下步驟操作即可：1\.開啟新終端 (請勿使用 Visual Code Integrated Terminal) 2.執行 xcode-select --install 3.出現提示時，按一下 Install ![](_media/go/osx_setup_tools.png) 


## 進階設定

如果您僅想對終端機除錯 (硬核除錯)，請查看以下自學課程：

- [GDB 的方式](https://golang.org/doc/gdb) \- 適用於使用 GDB 對 golang 應用程式進行除錯；
- [LDB 的方式](http://blog.ralch.com/tutorial/golang-debug-with-lldb/) \- 適用於使用 LLDB 對 golang 應用程式進行除錯；


對於不喜歡進行任何設置的人而言，有 [Goland](https://www.jetbrains.com/go/) 包含了所有需要的視覺工具，使用 JetBrains 產品的人應該會覺得它用起來很熟悉。



接下來：[Viewer 延伸](/zh-TW/tutorials/extensions)