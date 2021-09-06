[net 設置](/zh-TW/environment/setup/net.md ':include :type=markdown')

## Global.asax

一個額外步驟：通常，REST API 應該是無狀態的，這意味著它不會在階段作業中保持對使用者的控制。由於此應用程式將展示每個使用者的資料，我們需要確定發出呼叫的使用者，因此僅針對 `/api/` 端點啟用階段作業。應將以下程式碼複製到既有的 `Global.asax` 程式碼檔案：

[Global.asax](_snippets/viewhubmodels/net/Global.asax ':include :type=code csharp')

專案已準備就緒！

接下來：[授權](/zh-TW/oauth/3legged/)