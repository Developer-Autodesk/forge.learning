# 調整配置

本自學課程的此步驟會使用您應用程式的基本配置，但會加入額外一欄來顯示圖表。

讓我們在 `/js/` 下建立新的 `Dashboard` 資料夾來放置新檔案。

## Dashboard.js

此程式碼將調整頁面配置、監看 **Viewer**，並在載入模型日期時載入圖表。它會使用 [JavaScript 類別](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)。

在 `/js/dashboard/` 資料夾下建立含有以下內容的新 **Dashboard.js** 檔案：

[js/Dashboard.js](_snippets/dashboard/js/Dashboard.js ':include :type=code javascript')

在 **index.html** 中，為此新檔案加入 `<script>`。這應放在 `<head>` 內：

```html
<!-- dashboard files -->
<script src="js/Dashboard/Dashboard.js"></script>  
```

## 調整 main.css

讓我們再加入額外幾個 CSS 類別，以便輔助配置。在您的 `/css/main.css` 檔案中加入以下內容：

[css/main.css](_snippets/dashboard/css/main.css ':include :type=code css')

接下來：[面板基礎知識](/zh-TW/viewer/dashboard/panelbasics)