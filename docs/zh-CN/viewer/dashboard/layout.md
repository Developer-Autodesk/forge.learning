# 调整布局

本教程的此步骤使用应用程序的基本布局，但为图表添加了一个额外的列。

我们在 `/js/` 下创建一个新的 `Dashboard` 文件夹，用于放置新文件。

## Dashboard.js

此代码将调整页面布局，监控 **Viewer**，并在加载模型日期时加载图表。它使用 [JavaScript 类](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)。

在 `/js/dashboard/` 文件夹下，创建一个包含以下内容的新 **Dashboard.js** 文件：

[js/Dashboard.js](_snippets/dashboard/js/Dashboard.js ':include :type=code javascript')

在 **index.html** 中，针对此新文件添加一个 `<script>`。此内容应位于 `<head>` 内：

```html
<!-- dashboard files -->
<script src="js/Dashboard/Dashboard.js"></script>  
```

## 调整 main.css

我们还添加几个额外的 CSS 类，以帮助调整布局。将以下内容添加到 `/css/main.css` 文件：

[css/main.css](_snippets/dashboard/css/main.css ':include :type=code css')

下一步：[面板基础知识](/zh-CN/viewer/dashboard/panelbasics)