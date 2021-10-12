# 用於建立應用程式組合的程式碼 (Node Js)


在 `route/` 資料夾內建立 `DesignAutomation.js` 檔案。在此檔案中，我們將寫入所有 endpoint。

**1\.Utils**

建立 endpoint 之前，我們將加入 Utils 類別，其中包含所有公用程式函式，例如建立 Design Automation SDK 例證、上傳檔案，以及此範例中使用的一些其他有用函式。

[routes/DesignAutomation.js](_snippets/modifymodels/node/routes/DesignAutomation.1.js ':include :type=code javascript')

**2\.應用程式組合**

建立 activity 之前，我們需要定義包含外掛程式的應用程式組合，並選取適當的引擎。複製以下 endpoint 並貼到 utils 類別之後：

[routes/DesignAutomation.js](_snippets/modifymodels/node/routes/DesignAutomation.2.js ':include :type=code javascript')

如果現在執行網頁應用程式並按一下 **Configure** (位於右上方)，您應該會看到您的 AppBundle 以及所有可用引擎的清單。**按鈕尚未起作用**... 我們繼續前進。

![](_media/designautomation/list_engines.png)

下一步：[定義 Activity](/zh-TW/designautomation/activity/)