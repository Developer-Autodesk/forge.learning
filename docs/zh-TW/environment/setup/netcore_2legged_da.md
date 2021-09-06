# 建立伺服器

您的用戶端 ID 與密碼應受到保護並保持機密性，因為您的所有檔案都將繫結至您的帳戶。對於網頁應用程式，請將其保留在伺服器上。本節將示範如何準備建立本端開發伺服器。

### 必備條件

**1\.Visual Studio**

需要 Visual Studio 2017 或更新版本，請造訪[此連結](https://visualstudio.microsoft.com/vs/)。

**2\.AutoCAD、Inventor 或 Revit**

為了對 Design Automation 外掛程式進行開發、測試和除錯：[AutoCAD](https://www.autodesk.com/products/autocad/overview) | [Inventor](https://www.autodesk.com/products/inventor/overview) | [Revit](https://www.autodesk.com/products/revit/overview)。

**3\. ngrok**

當 Design Automation 修改完模型後，將會發出通知。由於您的電腦未公開到網路上，[ngrok](https://ngrok.com/) 工具會建立一個暫存位址以接收通知。此工具僅在本端需要。 

下載後，請將其解壓縮。開啟 Windows **指令行提示** (CMD) 並導覽至該資料夾。然後執行 `ngrok http 3000 -host-header="localhost:3000"`。複製**轉送** URL 值 (採用 `http://1ab2c3d4.ngrok.com` 形式)

![](/_media/designautomation/ngrok.gif)

> 如果在非 Windows (例如 MacOS) 上執行，請改為開啟**終端機**並遵循相同的步驟。

!> **警告**：`ngrok` 會在您的 localhost 伺服器使用時將其公開到網路。請務必在測試完成後將其關閉。請勿在開發環境以外使用此工具

下一步：[設置專案](/zh-TW/environment/setup/netcore_da)