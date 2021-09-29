# 在本端執行和除錯

現在，您的應用程式已準備就緒，該執行看看了。在此階段，我們可以進行測試，檢查是否可能有任何錯誤 (透過除錯)。

## 使用範例

在右上方按一下 **Configure**，以便定義 AppBundle 與 Activity。這個動作僅需執行一次。在左側面板上指定新的 `width` 和 `height`，選取 `input file`，然後按一下 `Start workitem`。右側面板應會顯示結果。

您可以在這裡找到[範例檔案](https://github.com/Developer-Autodesk/learn.forge.designautomation/tree/master/sample%20files)。

!> 如果外掛程式碼有所變更，則您需要上傳新的 AppBundle 並增加版本 (例如從 v1 變更為 v2)。此範例將在每次上傳新的 AppBundle 時建立新版本。

> 輸入檔案和輸出檔案均儲存在 OSS buckets 中，您可以使用[檢視模型](/zh-TW/tutorials/viewmodels)自學課程加以檢視。

![](_media/tutorials/run_sample_modifymodels.gif)

## 疑難排解

**1\.結果面板未顯示完整資訊**

請確定 **ngrok** 正在執行，且未過期。請確定環境變數中已正確指定 ngrok 位址。

**2\.Workitem 會執行，但結果不會如預期**

請考慮使用 **Clear Account** 按鈕。這會移除您帳戶中的所有 AppBundle 與 Activity。接著，請重新加以定義。

**3\.在 Configuration 表單中看不到我的 AppBundle**

一旦您「建置」外掛程式之後，相關的 ZIP 套件便會複製到 `wwwroot/bundles`。請確定 `Post-build` 事件已正確定義，並已在建置之後執行。

**4\.確定上傳了正確的 DLL**

要想確定上傳至 Design Automation 的 DLL 是否正確，有個簡單的方法，那就是檢查其日期。[此 StackOverflow 回答](https://stackoverflow.com/a/1600990)說明何取得連結器日期 (即編譯 DLL 的時間)，這樣您就能在程式碼一開始顯示該日期。請注意，日期是採用伺服器的時區。

> 外掛程式是採用 `C#` 撰寫，不受伺服器語言影響。
 
```csharp
LogTrace("DLL {0} compiled on {1}",
    System.IO.Path.GetFileName(System.Reflection.Assembly.GetExecutingAssembly().Location),
    GetLinkerTime(System.Reflection.Assembly.GetExecutingAssembly()));
```

準備好了嗎？讓我們執行它吧！

請選擇您的語言：[Node.js](/zh-TW/environment/rundebug/nodejs_da) | [.NET Core](/zh-TW/environment/rundebug/netcore)