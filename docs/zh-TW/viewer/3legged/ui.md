# Viewer (用戶端)

讓我們建立用戶端需要的 4 個檔案：

## index.html

這是您應用程式的進入點。就此範例而言，我們將使用 [jQuery](https://jquery.com) 進行 [DOM](https://www.w3schools.com/js/js_htmldom.asp) 操控、使用 [Bootstrap](https://getbootstrap.com/) 進行樣式設定，並使用 [jsTree](https://www.jstree.com) 列出儲體與物件。所有這些資源庫皆來自 [CDN](https://cdnjs.com/) ([內容遞送網路](https://en.wikipedia.org/wiki/Content_delivery_network))。

當然，還有 Autodesk Forge Viewer 資源庫：viewer3d.min.js、three.min.js 和 style.min.css。

建立含有以下內容的 **index.html** 檔案：

<!-- tabs:start -->

#### \** Viewer v7 \*\*

[index.html](_snippets/viewhubmodels/common/index.v7.html ':include :type=code html')

#### \** Viewer v6 \*\*

[index.html](_snippets/viewhubmodels/common/index.v6.html ':include :type=code html')

#### \** 移轉指南 \*\*

使用 v6 (或更舊版本) 的開發人員若要升級至 v7，請造訪 [Forge 網站](https://forge.autodesk.com/en/docs/viewer/v7/change_history/changelog_v7/migration_guide_v6_to_v7/)取得完整指南。

<!-- tabs:end -->

## Main.css

CSS 是一種描述 HTML 文件所用樣式的語言。若要瞭解更多，請到 [W3Schools](https://www.w3schools.com/css/)。就本自學課程而言，請在 `css` 資料夾下建立含有以下內容的 **main.css**：

[main.css](_snippets/viewhubmodels/common/main.css ':include :type=code css')

## ForgeTree.js

此檔案將負責產生樹狀檢視，在其中列出**中樞**、**專案**、**專案**、**資料夾**、**項目**和**版本**。在 `js` 資料夾下，建立含有以下內容的 **ForgeTree.js** 檔案：

[ForgeTree.js](_snippets/viewhubmodels/common/ForgeTree.js ':include :type=code javascript')

## ForgeViewer.js

現在，此檔案將負責 Viewer 的初始化。在 `js` 資料夾中，建立含有以下內容的 **ForgeViewer.js** 檔案：

<!-- tabs:start -->

#### \** Viewer v7 \*\*

以下程式碼是基於 Autodesk Forge Viewer [基本](https://forge.autodesk.com/en/docs/viewer/v7/developers_guide/viewer_basics/initialization/)自學課程。

[ForgeViewer.js](_snippets/viewhubmodels/common/ForgeViewer.v7.js ':include :type=code javascript')

#### \** Viewer v6 \*\*

以下程式碼是基於 Autodesk Forge Viewer [基本應用程式](https://forge.autodesk.com/en/docs/viewer/v6/tutorials/basic-application/)自學課程。

[ForgeViewer.js](_snippets/viewhubmodels/common/ForgeViewer.v6.js ':include :type=code javascript')

#### \** 移轉指南 \*\*

使用 v6 (或更舊版本) 的開發人員若要升級至 v7，請造訪 [Forge 移轉指南](https://forge.autodesk.com/en/docs/viewer/v7/change_history/changelog_v7/migration_guide_v6_to_v7/)取得完整文件。

<!-- tabs:end -->

總而言之：在使用者介面端，您的應用程式應有 4 個檔案：- Index.html - Main.css - ForgeTree.js - ForgeViewer.js

全都設定好了嗎？該執行應用程式看看了！

接下來：[執行您的應用程式](/zh-TW/environment/rundebug/3legged)
