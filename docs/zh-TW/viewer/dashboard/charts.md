# 加入圖表

有許多資源庫可用來建立圖表，就此範例而言，讓我們使用 [Chart.js](https://www.chartjs.org/)，因為它很簡單卻好用，而且視覺效果很好。

在 **index.html** 中，為 [Chart.js CDN](https://cdnjs.com/libraries/Chart.js) 資源庫參考加入下方的 `<script>` 和 `<link>` 樣式表。這應放在 `<head>` 內 

```html
<!--Chart JS  packages-->
<script src="//cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js" ></script>
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.css" />
```

## 長條圖

在 `/js/dashboard/` 資料夾下，建立含有以下內容的新 **PanelBarChart.js** 檔案：

[js/PanelBarChart.js](_snippets/dashboard/js/PanelBarChart.js ':include :type=code javascript')

## 圓形圖

在 `/js/dashboard/` 資料夾下，建立含有以下內容的新 **PanelPieChart.js** 檔案：

[js/PanelPieChart.js](_snippets/dashboard/js/PanelPieChart.js ':include :type=code javascript')

在 **index.html** 中，為這些新檔案加入 2 個 `<script>`。這應放在 `<head>` 內、**DashboardPanel.js** 之後：

```html
<script src="js/Dashboard/PanelBarChart.js"></script>
<script src="js/Dashboard/PanelPieChart.js"></script>
```

您的管控面板現已準備就緒，可以執行了！啟動瀏覽器，移往 `http://localhost3000`，然後選取模型。

# 疑難排解

彈出的警示訊息 *This model does not contain a Material property for the PieChart* (或 BarChar) 簡單地指出目前模型中並無預設的 **Material** 性質，因此無法建立圓形圖或長條圖。將出現的以下訊息。

![](_media/javascript/js_dashboard_propertymissing.png)

若要修正此問題，請移往 `Dashboard.js` (位於 `/js/dashboard/` 資料夾下) 的第 7 行和第 8 行來調整性質名稱：

```javascript
new BarChart('Material'),
new PieChart('Material')
```

**不知道有什麼性質可用嗎？**

當選取的性質不可用時，程式碼將在瀏覽器主控台中輸出所有可用的性質清單。 

> 進行網頁開發與除錯時，必須用到瀏覽器主控台。進一步瞭解如何將其用於 [Chrome](https://developers.google.com/web/tools/chrome-devtools/console/)、[Edge](https://docs.microsoft.com/en-us/microsoft-edge/devtools-guide/console)、[Firefox](https://developer.mozilla.org/en-US/docs/Tools/Web_Console/Opening_the_Web_Console) 與 [Safari](https://developer.apple.com/safari/tools/)。

接下來：[部署](/zh-TW/deployment/)