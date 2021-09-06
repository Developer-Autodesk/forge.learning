# 工具 (Go)

下載並安裝 [Go 發佈](https://golang.org/doc/install)以執行程式碼。 

請確保您已設定 [$GOPATH](https://github.com/golang/go/wiki/GOPATH) 環境變數，這是首次使用時必要的操作。若為 OSX 和 Linux 作業系統，您可以在使用者資料夾下使用 `/go/` 資料夾：

```bash
// MacOS & Linux
export GOPATH=$HOME/go
```

若為 Windows，建議將 `GOPATH` 設置到一個簡單的位置，例如 `C:\GOPROJECTS`：

```cmd
// Windows
set GOPATH=C:\GOPROJECTS
```

現在，我們需要 IDE 來撰寫程式碼。有許多選項可供使用，本自學課程將使用 [Visual Studio Code](https://code.visualstudio.com/)。

> 在本自學課程中，將全部使用預設安裝選項。

接下來，安裝 Go for Visual Code 套件，安裝完成後，即可支援 GoLang。- 移往 Visual Code 延伸管理員 (左下方的圖示) - 輸入 `go`，然後選取透過 ***lukehoben*** 提供的 `Go` 外掛程式。

![](_media/go/install_go_extension.gif) 


!> 如果您在安裝期間或安裝後收到安裝其他 Go 相關套件的通知，便可以安全地安裝這些套件，因為這些是將改善您在 Visual Studio Code 中的 Go 編碼體驗的協助工具。     
例如：    
 -`github.com/nsf/gocode` - 將加入上下文相關的自動完成；    
 -`github.com/rogpeppe/godef` \- 將協助您在 Go 來源中尋找符號資訊；    
 -`github.com/sqs/goreturns` - 將自動完成函式傳回值；    
 -`github.com/tpng/gopkgs` \- 將協助您追蹤已安裝的套件；

接下來：[驗證](/zh-TW/oauth/)