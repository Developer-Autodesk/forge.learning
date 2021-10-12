# 选择

本部分使用上一部分中的**基本框架**，但我们将 **MyAwesomeExtension** 重命名为 **HandleSelectionExtension**。 

## 创建扩展

由于每个扩展都应该是一个单独的 JavaScript 文件，因此在 UI 文件夹 **/js/handleselectionextension.js** 中创建一个文件，并复制以下内容（与基本框架相同，只是名称不同）： 

[js/handleselectionextension.js](_snippets/extensions/js/handleselectionextension.1.js ':include :type=code javascript')

## 工具栏 CSS

与基本框架中一样，工具栏按钮使用 **CSS** 样式。在 **/css/main.css** 中，添加以下内容：

[css/main.css](_snippets/extensions/css/main.2.css ':include :type=code css')

> 您可以使用您自己的图像，也可以使用代码库中的图像，在本例中，我们使用 PNG 格式的 [Font Awesome](https://fontawesome.com/) 图标。

## 加载扩展

最后，使用与**基本框架**相同的代码[加载扩展](/zh-CN/viewer/extensions/skeleton?id=loading-the-extension)（当然，要调整名称）。下面提供了所需的 2 项更改供您参考：在 **index.html** 中包含 `<script>`，以及在 Viewer 创建时包含扩展：

 打开 **/index.html** 文件并添加以下行：

```html
<script src="/js/handleselectionextension.js"></script>
```

在 **/www/js/ForgeViewer.js** 中，找到以下行：

```javascript
viewer = new Autodesk.Viewing.GuiViewer3D(document.getElementById('forgeViewer'));
```

替换为：

```javascript
viewer = new Autodesk.Viewing.GuiViewer3D(document.getElementById('forgeViewer'), { extensions: ['HandleSelectionExtension'] });
```

注意：如果已加载一个扩展，则可以使用**逗号 (',')** 在数组中添加 HandleSelectionExtension：

```javascript
viewer = new Autodesk.Viewing.GuiViewer3D(document.getElementById('forgeViewer'), { extensions: ['MyAwesomeExtension','HandleSelectionExtension'] }); 
```

此时，应加载扩展并显示工具栏图标，但它不执行任何操作。

## 实现 .onClick 函数

现在，是时候替换 `.onClick` 函数内的 `Execute an action here` 占位符了。在本示例中，我们隔离选择。将以下内容复制到 `.onClick` 函数内的扩展 **.js** 文件中：

[js/handleselectionextension.js](_snippets/extensions/js/handleselectionextension.2.js ':include :type=code javascript')

## 总结

此时，扩展应该已加载并显示工具栏按钮。选择一个或多个 object 并单击按钮，确认要隔离的元素。以下视频演示了该行为。

![](_media/javascript/js_isolate.gif)

> 浏览器控制台对于 Web 开发和调试至关重要。详细了解如何在 [Chrome](https://developers.google.com/web/tools/chrome-devtools/console/)、[Edge](https://docs.microsoft.com/en-us/microsoft-edge/devtools-guide/console)、[Firefox](https://developer.mozilla.org/en-US/docs/Tools/Web_Console/Opening_the_Web_Console) 和 [Safari](https://developer.apple.com/safari/tools/) 中使用控制台。

主要学习要点：

- **.getSelection()** 从模型返回 **dbId** 数组，**.clearSelection()**
- **.getProperties()** 是一种异步方法，它通过回调返回给定 dbId 的所有属性（在 Viewer 中广泛使用），[详细了解回调](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function)
- **.isolate()** 方法使所有其他元素透明 ("ghosted")

其他学习要点：

- **.forEach()** 用于遍历集合，这是 JavaScript 功能，[了解更多信息](https://www.w3schools.com/jsref/jsref_forEach.asp)
- **.push()** 用于在数组中包含项，[了解更多信息](https://www.w3schools.com/jsref/jsref_push.asp)

下一步：[固定面板](/zh-CN/viewer/extensions/panel)