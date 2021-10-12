# 選取

本節將使用上一節的**基本骨架**，但讓我們將 **MyAwesomeExtension** 更名為 **HandleSelectionExtension**。 

## 建立擴充功能

由於每個擴充功能都應為一個獨立的 JavaScript 檔案，因此請在 UI 資料夾中建立檔案 (**/js/handleselectionextension.js**)，然後複製以下內容 (除了名稱不同外，其他內容皆與基本骨架相同)： 

[js/handleselectionextension.js](_snippets/extensions/js/handleselectionextension.1.js ':include :type=code javascript')

## 工具列 CSS

就像在基本骨架中一樣，工具列按鈕使用 **CSS** 樣式設定。在 **/css/main.css** 中加入以下內容：

[css/main.css](_snippets/extensions/css/main.2.css ':include :type=code css')

> 您可以使用自有影像，也可以使用程式庫中的影像，在此範例中，讓我們使用 PNG 格式的 [Font Awesome](https://fontawesome.com/) 圖示。

## 載入擴充功能

最後，使用與**基本骨架**相同的程式碼[載入擴充功能](/zh-TW/viewer/extensions/skeleton?id=loading-the-extension) (當然，要調整名稱)。提醒您，以下是您需做的 2 處變更：在 **index.html** 中加上 `<script>`，還有在建立 Viewer 時加上擴充功能：

 開啟 **/index.html** 檔案，然後加入以下行：

```html
<script src="/js/handleselectionextension.js"></script>
```

在 **/www/js/ForgeViewer.js** 中，找到以下行：

```javascript
viewer = new Autodesk.Viewing.GuiViewer3D(document.getElementById('forgeViewer'));
```

然後取代為：

```javascript
viewer = new Autodesk.Viewing.GuiViewer3D(document.getElementById('forgeViewer'), { extensions: ['HandleSelectionExtension'] });
```

注意：- 如果之前已載入一個擴充功能，那麼可以在陣列中使用**逗點 (',')** 來加入 HandleSelectionExtension：

```javascript
viewer = new Autodesk.Viewing.GuiViewer3D(document.getElementById('forgeViewer'), { extensions: ['MyAwesomeExtension','HandleSelectionExtension'] }); 
```

此時應會載入該擴充功能並顯示工具列圖示，但什麼都不會執行。

## 實作 .onClick 函式

現在，該取代 `.onClick` 函式內的 `Execute an action here` 預留位置了。就此範例而言，讓我們隔離出選取。將以下內容複製到擴充功能 **.js** 檔案中的 `.onClick` 函式內：

[js/handleselectionextension.js](_snippets/extensions/js/handleselectionextension.2.js ':include :type=code javascript')

## 結論

此時應會載入擴充功能並展示工具列按鈕。選取一個或多個 object，然後按一下按鈕，確認要隔離出哪些元素。以下影片展示了其行為。

![](_media/javascript/js_isolate.gif)

> 進行網頁開發與除錯時，必須用到瀏覽器主控台。進一步瞭解如何在 [Chrome](https://developers.google.com/web/tools/chrome-devtools/console/)、[Edge](https://docs.microsoft.com/en-us/microsoft-edge/devtools-guide/console)、[Firefox](https://developer.mozilla.org/en-US/docs/Tools/Web_Console/Opening_the_Web_Console) 與 [Safari](https://developer.apple.com/safari/tools/) 中使用主控台。

學習重點：

- **.getSelection()** 會從模型傳回 **dbId** 的陣列以及 **.clearSelection()**
- **.getProperties()** 是個非同步方法，會透過回呼傳回所指定 dbld 的所有性質；此方法在 Viewer 中很常用，[進一步瞭解回呼](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function)
- **.isolate()** 方法會使所有其他元素變透明 ("ghosted")

其他學習重點：

- **.forEach()** 會對整個集合進行疊代運算，這是 JavaScript 功能，[瞭解更多](https://www.w3schools.com/jsref/jsref_forEach.asp)
- **.push()** 會將項目加到陣列中，[瞭解更多](https://www.w3schools.com/jsref/jsref_push.asp)

下一步：[停靠面板](/zh-TW/viewer/extensions/panel)