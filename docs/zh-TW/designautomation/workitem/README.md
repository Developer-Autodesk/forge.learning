# 執行工作項目

使用指定的輸入檔案並產生適當的輸出檔案來執行指定活動的工作。

活動和工作項目之間的關係可以分別視為「函式定義」和「函式呼叫」。活動指定要使用的 AppBundle，而後者又指定要使用的引擎。然後，呼叫工作項目以執行這些內容。

在本自學課程範例中，工作項目將指定輸入檔案 URL、具有新參數值的輸入 JSON 資料，以及輸出檔案的目標 URL。此範例將在啟動工作項目之前將輸入檔案上傳至 OSS 儲體。

請選擇您的語言：[Node.js](/zh-TW/designautomation/workitem/nodejs) | [.NET Core](/zh-TW/designautomation/workitem/netcore)