# 準備資料

Viewer 會包含模型中的大量資料，但我們需要篩選並調整這些資料，以便顯示在管控面板中。以下類別將對此有所幫助。

組織資料的方式有數種，像[陣列](https://www.w3schools.com/js/js_arrays.asp)；就此範例而言，讓我們使用 JavaScript 物件 (作為雜湊表)。它基本上會像這樣：

```javascript
var data = {};
data['key'] = someValue;
```

但我們有多個層級，所以會像這樣：

```javascript
var data = {};
data['key'] = {};
data['key']['subkey'] = someValue;
```

利用該方法，讓我們儲存性質名稱、性質值以及具有該值之 dbId 的陣列。例如：

```javascript
data['Category']['Walls'] = [123, 456, 789];
```

以下程式碼將準備該資料。

## DashboardPanel.js

讓我們重複使用「Viewer 延伸」自學課程中的 [getAllLeafComponents](/zh-TW/viewer/extensions/panel?id=enumerate-leaf-nodes) 方法，尋找模型上所有可見的 dbId，然後使用 `getProperties` 取得資訊。這些是原始資料。 

在 `/js/dashboard/` 資料夾下，建立含有以下內容的新 **DashboardPanel.js**：

[js/DashboardPanel.js](_snippets/dashboard/js/DashboardPanel.js ':include :type=code javascript')

在 **index.html** 中，為此新檔案加入 `<script>`。這應放在 `<head>` 內、**Dashboard.js** 之後：

```html
<script src="js/Dashboard/DashboardPanel.js"></script>  
```

接下來：[加入圖表](/zh-TW/viewer/dashboard/charts)