# Viewer（客户端）

我们在客户端上创建所需的 4 个文件：

## Index.html

这是应用程序的入口点。在此示例中，我们将使用 [jQuery](https://jquery.com) 来操纵 [DOM](https://www.w3schools.com/js/js_htmldom.asp)，使用 [Bootstrap](https://getbootstrap.com/) 进行样式设置，并使用 [jsTree](https://www.jstree.com) 列出存储段和对象。所有这些库都来自 [CDN](https://cdnjs.com/)（[内容分发网络](https://en.wikipedia.org/wiki/Content_delivery_network)）。

当然还有 Autodesk Forge Viewer 库：viewer3d.min.js、three.min.js 和 style.min.css。

创建一个包含以下内容的 **index.html** 文件：

<!-- tabs:start -->

#### \** Viewer v7 \*\*

[index.html](_snippets/viewhubmodels/common/index.v7.html ':include :type=code html')

#### \** Viewer v6 \*\*

[index.html](_snippets/viewhubmodels/common/index.v6.html ':include :type=code html')

#### \** 迁移手册 \*\*

请访问 [Forge 网站](https://forge.autodesk.com/en/docs/viewer/v7/change_history/changelog_v7/migration_guide_v6_to_v7/)，获取面向一直在使用 v6（或更早版本）并将升级到 v7 的开发人员的完整手册。

<!-- tabs:end -->

## Main.css

CSS 是描述 HTML 文档样式的语言。有关更多信息，请访问 [W3Schools](https://www.w3schools.com/css/)。在本教程中，将在 `css` 文件夹下创建一个包含以下内容的 **main.css**：

[main.css](_snippets/viewhubmodels/common/main.css ':include :type=code css')

## ForgeTree.js

此文件将处理列出**中心**、**项目**、******文件夹**、**项**和**版本**的树视图。在 `js` 文件夹下，创建一个包含以下内容的 **ForgeTree.js** 文件：

[ForgeTree.js](_snippets/viewhubmodels/common/ForgeTree.js ':include :type=code javascript')

## ForgeViewer.js

现在，此文件将处理 Viewer 初始化。在 `js` 文件夹下，创建一个包含以下内容的 **ForgeViewer.js** 文件：

<!-- tabs:start -->

#### \** Viewer v7 \*\*

以下代码基于 Autodesk Forge Viewer [基本](https://forge.autodesk.com/en/docs/viewer/v7/developers_guide/viewer_basics/initialization/)教程。

[ForgeViewer.js](_snippets/viewhubmodels/common/ForgeViewer.v7.js ':include :type=code javascript')

#### \** Viewer v6 \*\*

以下代码基于 Autodesk Forge Viewer [基本应用程序](https://forge.autodesk.com/en/docs/viewer/v6/tutorials/basic-application/)教程。

[ForgeViewer.js](_snippets/viewhubmodels/common/ForgeViewer.v6.js ':include :type=code javascript')

#### \** 迁移手册 \*\*

请访问 [Forge 迁移手册](https://forge.autodesk.com/en/docs/viewer/v7/change_history/changelog_v7/migration_guide_v6_to_v7/)，获取面向一直在使用 v6（或更早版本）并将升级到 v7 的开发人员的完整文档。

<!-- tabs:end -->

总之，在 UI 端，您的应用程序应该有 4 个文件： - Index.html - Main.css - ForgeTree.js - ForgeViewer.js

都准备好了？现在，是时候运行应用程序了！

下一步：[运行应用程序](/zh-CN/environment/rundebug/3legged)
