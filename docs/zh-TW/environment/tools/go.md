# 開發工具及環境準備 (Go)

下載並安裝 [Go distribution](https://golang.org/doc/install) 以執行程式碼。 

請確保您已設定 [$GOPATH](https://github.com/golang/go/wiki/GOPATH) 環境變數，這是首次使用時必要的操作。若為 OSX 和 Linux 作業系統，您可以在使用者家目錄底下的 `/go/` 資料夾：

```bash
// MacOS & Linux
export GOPATH=$HOME/go
```

若為 Windows，建議將 `GOPATH` 設定到一個簡單的位置，例如 `C:\GOPROJECTS`：

```cmd
// Windows
set GOPATH=C:\GOPROJECTS
```

現在，我們需要 IDE 來撰寫程式碼。有許多選項可供使用，本自學課程將使用 [Visual Studio Code](https://code.visualstudio.com/)。

> 在本自學課程中，將全部使用預設安裝選項。

接下來，安裝 Go for Visual Code 套件，安裝完成後，即可支援 GoLang。- 前往 Visual Code 擴充功能管理員 (左下方的圖示) - 輸入 `go`，然後選取由 ***lukehoben*** 提供的 `Go` 外掛程式。

![](_media/go/install_go_extension.gif) 


!> 如果您在安裝期間或安裝後看到需要安裝其他 Go 相關套件的通知，那您可以放心地安裝它們，因為這些套件是可以用來幫助您改善在 Visual Studio Code 裡面編寫 Go 程式碼的體驗。     
例如：    
 -`github.com/nsf/gocode` - 將加入上下文相關的自動完成；    
 -`github.com/rogpeppe/godef` \- 將協助您在 Go 來源中尋找符號資訊；    
 -`github.com/sqs/goreturns` - 將自動完成函式傳回值；    
 -`github.com/tpng/gopkgs` \- 將協助您追蹤已安裝的套件；

下一步：[驗證](/zh-TW/oauth/)