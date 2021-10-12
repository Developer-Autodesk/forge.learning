# 執行 workitem (.NET Core)

以下方法應加入 `DesignAutomationController` 類別中。

**1\.StartWorkitem**

我們實際上就是在這裡啟動 Design Automation。`StartWorkitemInput` 只是一個資料結構。此方法還將輸入檔案上傳至 OSS Bucket，並定義應將輸出儲存在同一 bucket 中。為了協助您識別檔案，輸入和輸出均使用相同的原始檔案名稱，但帶有字尾 (`input` 或 `output`) 加上時間戳記。

[DesignAutomationController.cs](_snippets/modifymodels/netcore/DesignAutomationController.8.cs ':include :type=code csharp')

> 請注意 `StartWorkitemInput` 類別是如何在 **DesignAutomationController** **內**定義的，這是正確的，它將用作 `StartWorkitem` 方法的輸入參數。

**2\.OnCallback**

Workitem 完成後，Design Automation 將回呼我們的應用程式 (使用 ngrok 轉送 URL)。此函式將會處理此情況，並將通知推送至用戶端 (使用 SignalR Hub)。

[DesignAutomationController.cs](_snippets/modifymodels/netcore/DesignAutomationController.9.cs ':include :type=code csharp')

**3\.ClearAccount**

最後，但同樣重要的是，為了協助您測試，此函式會從您的帳號移除所有 AppBundle 和 activity。 

[DesignAutomationController.cs](_snippets/modifymodels/netcore/DesignAutomationController.10.cs ':include :type=code csharp')

一切已準備就緒！

下一步：[執行與除錯](/zh-TW/environment/rundebug/2legged_da)