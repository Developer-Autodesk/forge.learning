# 執行 workitem

使用指定的輸入檔案並產生適當的輸出檔案來執行指定 Activity 的工作。

Activity 和 workitem 之間的關係可以分別視為「函式定義」和「函式呼叫」。Activity 指定要使用的 AppBundle，而後者又指定要使用的引擎。然後，呼叫 workitem 以執行這些內容。

在本自學課程範例中，workitem 將指定輸入檔案 URL、具有新參數值的輸入 JSON 資料，以及輸出檔案的目標 URL。此範例將在啟動 workitem 之前將輸入檔案上傳至 OSS bucket。

請選擇您的語言：[Node.js](/zh-TW/designautomation/workitem/nodejs) | [.NET Core](/zh-TW/designautomation/workitem/netcore)