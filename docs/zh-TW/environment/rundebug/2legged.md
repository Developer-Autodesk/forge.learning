# 在本端執行和除錯

現在，您的應用程式已準備就緒，該執行看看了。在此階段，我們可以進行測試，檢查是否可能有任何錯誤 (透過除錯)。還有，來看看相關秘訣與竅門。

## 使用範例

下一節將教您如何執行自己的應用程式。當應用程式在瀏覽器中開啟時，請按一下 **New bucket** 建立您的儲體 (名稱應在所有 Forge 帳戶中是唯一)。

在新建立的儲體上按一下右鍵，然後選擇 **Upload file** (這會觸發 OSS 上傳程序)。

以下是一些測試用的範例檔案：- [AutoCAD (.dwg)](https://knowledge.autodesk.com/support/autocad/downloads/caas/downloads/content/autocad-sample-files.html) - [AutoCAD Mechanical (.dwg)](https://knowledge.autodesk.com/support/autocad-mechanical/downloads/caas/downloads/content/autocad-mechanical-2019-sample-files.html) - [Inventor (.ipt)](https://knowledge.autodesk.com/support/inventor/troubleshooting/caas/downloads/content/inventor-sample-files.html) - [Revit (.rvt)](https://knowledge.autodesk.com/support/revit-products/getting-started/caas/CloudHelp/cloudhelp/2019/ENU/Revit-GetStarted/files/GUID-61EF2F22-3A1F-4317-B925-1E85F138BE88-htm.html)


 接著展開儲體樹狀目錄節點，在檔案上按一下右鍵，選取 **Translate** (這會觸發 Model Derivative 工作)。稍待片刻之後，檔案應已準備就緒，再按一下該檔案，該檔案即會顯示在 Viewer 中。

![](_media/tutorials/run_sample_viewmodels.gif)

準備好了嗎？讓我們執行它吧！

請選擇您的語言：[Node.js](/zh-TW/environment/rundebug/nodejs) | [.NET Framework](/zh-TW/environment/rundebug/net) | [.NET Core](/zh-TW/environment/rundebug/netcore) | [Go](/zh-TW/environment/rundebug/go) | [PHP](/zh-TW/environment/rundebug/php) | [Java](/zh-TW/environment/rundebug/java)