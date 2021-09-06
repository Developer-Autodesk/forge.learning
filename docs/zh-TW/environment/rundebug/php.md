# 執行和除錯 (PHP)

請確定 Visual Code 中已安裝 **PHP Server** 與 **PHP Debug** 延伸，如未安裝，請先查看[**工具**](/zh-TW/environment/tools/php)一節。

## 啟動/停止伺服器

從 VS Code 開啟 Command Palette 後，執行 **Serve Project With PHP** 指令會在連接埠 3000 啟動 PHP 伺服器，執行 **Stop PHP Server** 指令則會停止伺服器。

![](_media/php/vs_code_debug.png) 

開啟您的瀏覽器，然後移往 `http://localhost:3000`


## 除錯
若要開始除錯，請導覽至 VS Code 中的 **Debugging** 頁籤。接著，按小齒輪圖示來為 PHP 產生 launch.json 檔案，其中將包含除錯所需的規劃。依預設，會有如下所示的單一規劃：

```javascript
    {
        "name": "Listen for XDebug",
        "type": "php",
        "request": "launch",
        "port": 9000
    },
```
您可以先選取原始碼中的一行再按 F9 來設定中斷點，然後才開始使用此規劃來偵錯。

如果您現在點擊特定網頁，VS Code 就會在您原始碼中所指定的中斷點中斷。然後，您便能在左側窗格取得變數、呼叫堆疊等相關資訊。


![](_media/php/vs_code_debug.gif) 


接下來：[Viewer 延伸](/zh-TW/tutorials/extensions)