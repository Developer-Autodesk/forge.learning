# 執行 workitem (Node.js)

應在 `DesignAutomation` js 檔案中最後一行 `module.exports = router;` 前面加入以下 API

**1\.StartWorkitem**

我們實際上就是在這裡啟動 Design Automation。此 endpoint 還將輸入檔案上傳至 OSS Bucket，並定義應將輸出儲存在同一 bucket 中。為了協助您識別檔案，輸入和輸出均使用相同的原始檔案名稱，但帶有字尾 (`input` 或 `output`) 加上時間戳記。 

[routes/DesignAutomation.js](_snippets/modifymodels/node/routes/DesignAutomation.4.js ':include :type=code javascript')

**2\.OnCallback**

Workitem 完成後，Design Automation 將回呼我們的應用程式 (使用 ngrok 轉送 URL)。此函式將會處理此情況，並將通知推送至用戶端 (使用 socketIO)。

[routes/DesignAutomation.js](_snippets/modifymodels/node/routes/DesignAutomation.5.js ':include :type=code javascript')

**3\.ClearAccount**

最後，但同樣重要的是，為了協助您測試，此 API 會從您的帳號移除所有 AppBundle 和 activity。

[routes/DesignAutomation.js](_snippets/modifymodels/node/routes/DesignAutomation.6.js ':include :type=code javascript')

一切已準備就緒！

下一步：[執行與除錯](/zh-TW/environment/rundebug/2legged_da)