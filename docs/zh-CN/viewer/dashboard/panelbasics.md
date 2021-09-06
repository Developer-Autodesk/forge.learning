# 准备数据

Viewer 包含模型中的大量数据，但我们需要根据面板进行过滤和调整。以下类对此有所帮助。

有多种方法来组织数据（例如[数组](https://www.w3schools.com/js/js_arrays.asp)），在本示例中，我们使用 JavaScript 对象（作为哈希表）。实际上，它类似于以下内容：

```javascript
var data = {};
data['key'] = someValue;
```

但我们有多个级别，例如：

```javascript
var data = {};
data['key'] = {};
data['key']['subkey'] = someValue;
```

我们通过使用此方法来存储属性名称、属性值和包含相应值的 dbId 数组。例如：

```javascript
data['Category']['Walls'] = [123, 456, 789];
```

以下代码将准备数据。

## DashboardPanel.js

我们重用 [getAllLeafComponents](/zh-CN/viewer/extensions/panel?id=enumerate-leaf-nodes) 方法（来自“Viewer 扩展”教程）查找模型上的所有可见 dbId，然后使用 `getProperties` 获取信息。这是原始数据。 

在 `/js/dashboard/` 文件夹下，创建一个包含以下内容的新 **DashboardPanel.js**：

[js/DashboardPanel.js](_snippets/dashboard/js/DashboardPanel.js ':include :type=code javascript')

在 **index.html** 中，针对此新文件添加一个 `<script>`。此内容应位于 `<head>` 内，并且位于 **Dashboard.js** 后面：

```html
<script src="js/Dashboard/DashboardPanel.js"></script>  
```

下一步：[添加图表](/zh-CN/viewer/dashboard/charts)