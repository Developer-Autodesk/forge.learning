# 固定面板

本部分使用上一部分中的**基本框架**，但我们将 **MyAwesomeExtension** 重命名为 **ModelSummaryExtension**。 

## 创建扩展

由于每个扩展都应该是一个单独的 JavaScript 文件，因此在 UI 文件夹 **/js/modelsummaryextension.js** 中创建一个文件，并复制以下内容（与基本框架相同，只是名称不同）： 

[js/modelsummaryextension.js](_snippets/extensions/js/modelsummaryextension.1.js ':include :type=code javascript')

## 工具栏 CSS

与基本框架中一样，工具栏按钮使用 **CSS** 样式（请参见代码中对 `.addClass` 的调用）。在 **/css/main.css** 中，添加以下内容：

[css/main.css](_snippets/extensions/css/main.3.css ':include :type=code css')

## 加载扩展

最后，使用与**基本框架**相同的代码[加载扩展](/zh-CN/viewer/extensions/skeleton?id=loading-the-extension)（当然，要调整名称）。下面提供了所需的 2 项更改供您参考：在 **index.html** 中包含 `<script>`，以及在 Viewer 创建时包含扩展：

```html
<script src="/js/modelsummaryextension.js"></script>
```

```javascript
viewer = new Autodesk.Viewing.GuiViewer3D(document.getElementById('forgeViewer'), { extensions: ['ModelSummaryExtension'] });
```

> 请注意 `extensions` 是一个数组，因此您可以加载多个扩展！例如，要加载上一个选择示例和这个选择示例，只需改用 `['HandleSelectionExtension', 'ModelSummaryExtension']`！很酷吧！

此时，应加载扩展并显示工具栏图标，但它不执行任何操作。

## 枚举叶节点

Viewer 包含模型上的所有元素，包括类别（例如族或零件定义），因此我们需要枚举叶节点，即模型上的实际实例。应将以下 `getAllLeafComponents()` 函数添加到扩展类。这是基于[此博客帖子](https://forge.autodesk.com/blog/enumerating-leaf-nodes-viewer)。 

[js/modelsummaryextension.js](_snippets/extensions/js/modelsummaryextension.2.js ':include :type=code javascript')

## 固定面板

扩展将在 Viewer [属性面板](https://forge.autodesk.com/en/docs/viewer/v7/reference/UI/PropertyPanel/)上显示结果。将内容复制到扩展 **.js** 文件（文件中的任何位置，其他函数以外）。

[js/modelsummaryextension.js](_snippets/extensions/js/modelsummaryextension.3.js ':include :type=code javascript')

## 实现 .onClick 函数

现在，是时候替换 `onClick` 函数内的 `Execute an action here` 占位符了。在本示例中，我们首先显示属性面板，接着枚举叶节点，然后获取叶节点的一组特定属性，最后计算这些属性的出现次数，并在面板上显示结果。 

!> 在下面的代码中，**必须**将 `filteredProps` 调整为适用于模型的属性名称。例如，几乎所有模型上都存在 **Material**，因此您可以尝试使用 `const filteredProps = ['Material'];`

将以下内容复制到扩展按钮的 `onClick` 函数内的扩展 **.js** 文件中：

[js/modelsummaryextension.js](_snippets/extensions/js/modelsummaryextension.4.js ':include :type=code javascript')

## 总结

此时，扩展应该已加载并显示工具栏按钮。单击按钮，面板应该会显示。以下视频演示了该行为。

![](_media/javascript/js_dockingpanel.gif)

> 如前所述，您需要定义适合您的模型的 **filteredProps**。上述视频使用了 `['Material', 'Design Status', 'Type Name'];`，它适用于两个模型。

主要学习要点：

- **.getObjectTree()** 用于访问模型层次，与 **.getChildCount()** 和 **.enumNodeChildren()** 一起使用时，可以递归迭代树
- **.getProperties()** 是一种异步方法，它通过回调返回 dbId 数组的一组特定属性（在 Viewer 中广泛使用），[详细了解回调](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function)
- **.addProperty()** 面板方法用于在类别上添加属性（名称、值）

其他学习要点：

- **.forEach()** 用于遍历集合，这是 JavaScript 功能，[了解更多信息](https://www.w3schools.com/jsref/jsref_forEach.asp)

下一步：[示例](/zh-CN/viewer/extensions/examples)