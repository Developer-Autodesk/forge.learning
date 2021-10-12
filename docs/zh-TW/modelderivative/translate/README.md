# 模型轉檔

Model Derivative API 可讓使用者以不同格式呈現及共用自己的設計，還可萃取重要的詮釋資料。

![](/_media/forge/md_diagram.png)

不確定您的檔案是否相容嗎？請查看[支援的轉換](https://forge.autodesk.com/en/docs/model-derivative/v2/developers_guide/supported-translations/)。

在本節中，讓我們呼叫 [POST Job](https://forge.autodesk.com/en/docs/model-derivative/v2/reference/http/job-POST/) 來啟動轉換程序。請注意，此 endpoint 是非同步的；其會啟動在背景執行的程序，而不是讓 HTTP 連接保持開啟狀態直到完成為止。

請選擇您的語言：[Node.js](/zh-TW/modelderivative/translate/nodejs) | [.NET Framework](/zh-TW/modelderivative/translate/net) | [.NET Core](/zh-TW/modelderivative/translate/netcore) | [Go](/zh-TW/modelderivative/translate/go) | [PHP](/zh-TW/modelderivative/translate/php) | [Java](/zh-TW/modelderivative/translate/java)

