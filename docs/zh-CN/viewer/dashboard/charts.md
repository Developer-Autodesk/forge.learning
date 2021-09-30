# 添加图表

有许多代码库可用于创建图表，在本示例中，我们使用 [Chart.js](https://www.chartjs.org/)，它非常简单，还易于使用，并且具有出色的视觉效果。

在 **index.html** 中，针对 [Chart.js CDN](https://cdnjs.com/libraries/Chart.js) 代码库参考添加以下 `<script>` 和 `<link>` 样式表。此内容应位于 `<head>` 内 

```html
<!--Chart JS  packages-->
<script src="//cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js" ></script>
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.css" />
```

## 条形图

在 `/js/dashboard/` 文件夹下，创建一个包含以下内容的新 **PanelBarChart.js** 文件：

[js/PanelBarChart.js](_snippets/dashboard/js/PanelBarChart.js ':include :type=code javascript')

## 饼图

在 `/js/dashboard/` 文件夹下，创建一个包含以下内容的新 **PanelPieChart.js** 文件：

[js/PanelPieChart.js](_snippets/dashboard/js/PanelPieChart.js ':include :type=code javascript')

在 **index.html** 中，针对这些新文件添加两个 `<script>`。此内容应位于 `<head>` 内，并且位于 **DashboardPanel.js** 后面：

```html
<script src="js/Dashboard/PanelBarChart.js"></script>
<script src="js/Dashboard/PanelPieChart.js"></script>
```

您的面板现在可以运行了！启动浏览器，访问 `http://localhost:3000`，然后选择模型。

# 疑难解答

包含 *This model does not contain a Material property for the PieChart*（或 This model does not contain a Material property for the BarChar）的弹出警告消息只是表示默认的 **Material** 属性在当前模型上不可用，因此无法创建饼图或条形图。否则，将显示以下消息。

![](_media/javascript/js_dashboard_propertymissing.png)

要解决此问题，请转到 `Dashboard.js`（在 `/js/dashboard/` 文件夹下），在第 7 行和第 8 行调整属性名称：

```javascript
new BarChart('Material'),
new PieChart('Material')
```

**不知道哪个属性可用？**

如果选定的属性不可用，则代码将在浏览器控制台上输出所有可用属性的列表。 

> 浏览器控制台对于 Web 开发和调试至关重要。详细了解如何在 [Chrome](https://developers.google.com/web/tools/chrome-devtools/console/)、[Edge](https://docs.microsoft.com/en-us/microsoft-edge/devtools-guide/console)、[Firefox](https://developer.mozilla.org/en-US/docs/Tools/Web_Console/Opening_the_Web_Console) 和 [Safari](https://developer.apple.com/safari/tools/) 中使用控制台。

下一步：[部署](/zh-CN/deployment/)