# 扩展框架

本教程的此步骤介绍包含工具栏按钮的扩展的基本框架，该按钮可触发 `.onClick` 函数中的代码。要了解真实示例，可以跳到[处理选择](/zh-CN/viewer/extensions/selection)。

## 创建扩展

首先，每个扩展都应该是一个 JavaScript 文件，并且至少实现 `.load` 和 `.unload` 函数。在 UI 文件夹 **/js/myawesomeextension.js** 中创建一个文件，并复制以下内容。 

[js/myawesomeextension.js](_snippets/extensions/js/myawesomeextension.js ':include :type=code javascript')

!> 请注意，上述代码包含一个带有 `Execute an action here` 注释的占位符，应将其替换为您的自定义代码。

## 工具栏 CSS

工具栏按钮使用 **CSS** 样式（请参见代码中对 `.addClass` 的调用）。在 **/css/main.css** 中，添加以下内容：

[css/main.css](_snippets/extensions/css/main.1.css ':include :type=code css')

!> 应针对项目中的现有文件调整 `background-image` URL。Viewer 使用 24px 图像。

## 加载扩展

扩展框架已准备就绪，现在打开 **/index.html** 文件并添加以下行（用于加载文件）：

```html
<script src="/js/myawesomeextension.js"></script>
```

注意：请确保在加载扩展 <scripts> 代码时，将其加载到 ForgeViewer.js 下面 

![](_media/forge/extension_example.png)



最后，我们需要告知 Viewer 加载扩展，在 **/www/js/ForgeViewer.js** 中找到以下行：

```javascript
viewer = new Autodesk.Viewing.GuiViewer3D(document.getElementById('forgeViewer'));
```

替换为：

```javascript
viewer = new Autodesk.Viewing.GuiViewer3D(document.getElementById('forgeViewer'), { extensions: ['MyAwesomeExtension'] });
```

此时，应加载扩展并显示工具栏按钮，但它不执行任何操作（请记住，`.onClick` 函数中有一个占位符注释）。这是可用于创建扩展的基本框架。 

!> 创建自己的扩展时，请务必将其重命名，且名称必须唯一。 


下一步：[处理选择](/zh-CN/viewer/extensions/selection)
