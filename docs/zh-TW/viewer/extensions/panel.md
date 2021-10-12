# 停靠面板

本節使用上一節的**基本骨架**，但讓我們將 **MyAwesomeExtension** 更名為 **ModelSummaryExtension**。 

## 建立擴充功能

由於每個擴充功能都應為一個獨立的 JavaScript 檔案，因此請在 UI 資料夾中建立檔案 (**/js/modelsummaryextension.js**)，然後複製以下內容 (除了名稱不同外，其他內容皆與基本骨架相同)： 

[js/modelsummaryextension.js](_snippets/extensions/js/modelsummaryextension.1.js ':include :type=code javascript')

## 工具列 CSS

就像在基本骨架中一樣，工具列按鈕使用 **CSS** 樣式設定 (請參閱程式碼中對 `.addClass` 的呼叫)。在 **/css/main.css** 中加入以下內容：

[css/main.css](_snippets/extensions/css/main.3.css ':include :type=code css')

## 載入擴充功能

最後，使用與**基本骨架**相同的程式碼[載入擴充功能](/zh-TW/viewer/extensions/skeleton?id=loading-the-extension) (當然，要調整名稱)。提醒您，以下是您需做的 2 處變更：在 **index.html** 中加上 `<script>`，還有在建立 Viewer 時加上擴充功能：

```html
<script src="/js/modelsummaryextension.js"></script>
```

```javascript
viewer = new Autodesk.Viewing.GuiViewer3D(document.getElementById('forgeViewer'), { extensions: ['ModelSummaryExtension'] });
```

> 請注意 `extensions` 的陣列形式，換句話說，您可以在其中載入多個擴充功能！例如，若要載入先前的選取範例和這個範例，直接改用 `['HandleSelectionExtension', 'ModelSummaryExtension']` 即可！很酷，對吧？

此時應會載入該擴充功能並顯示工具列圖示，但什麼都不會執行。

## 列舉零件節點

Viewer 會包含模型中的所有元素，包括品類 (例如族群或零件定義) 在內，所以我們需要列舉零件節點 (即模型中的實際例證)。我們的擴充功能類別中應加入以下 `getAllLeafComponents()` 函式。這基於[此部落格文章](https://forge.autodesk.com/blog/enumerating-leaf-nodes-viewer)。 

[js/modelsummaryextension.js](_snippets/extensions/js/modelsummaryextension.2.js ':include :type=code javascript')

## 停靠面板

該擴充功能將在 Viewer 的[性質面板](https://forge.autodesk.com/en/docs/viewer/v7/reference/UI/PropertyPanel/)上展示結果。將以下內容複製到擴充功能 **.js** 檔案中 (檔案中其他函式之外的任意位置)。

[js/modelsummaryextension.js](_snippets/extensions/js/modelsummaryextension.3.js ':include :type=code javascript')

## 實作 .onClick 函式

現在，該取代 `onClick` 函式內的 `Execute an action here` 預留位置了。就此範例而言，讓我們先展示性質面板，然後列舉零件節點、取得零件節點的一組特定性質、計算這些性質出現的次數，最後在面板上展示結果。 

!> 在下方的程式碼中，您**必須**將 `filteredProps` 調整為您模型適用的性質名稱。例如，由於幾乎所有模型都有 **Material**，因此您可以用 `const filteredProps = ['Material'];` 試試

將以下內容複製到擴充功能 **.js** 檔案中擴充功能按鈕的 `onClick` 函式內：

[js/modelsummaryextension.js](_snippets/extensions/js/modelsummaryextension.4.js ':include :type=code javascript')

## 結論

此時應會載入擴充功能並展示工具列按鈕。按一下按鈕，應會顯示面板。以下影片展示了其行為。

![](_media/javascript/js_dockingpanel.gif)

> 如前所述，您需要為自己的模型適當定義 **filteredProps**。以上影片所用的 `['Material', 'Design Status', 'Type Name'];` 對兩個模型都適用。

學習重點：

- **.getObjectTree()** 可讓您存取模型架構，再搭配 **.getChildCount()** 和 **.enumNodeChildren()**，即可對樹狀目錄進行遞迴疊代運算
- **.getBulkProperties()** 是個非同步方法，會透過回呼傳回陣列中所列 dbld 的一組特定性質；此方法在 Viewer 中很常用，[進一步瞭解回呼](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function)
- **.addProperty()** 面板方法會在品類中加入性質 (名稱、值)

其他學習重點：

- **.forEach()** 會對整個集合進行疊代運算，這是 JavaScript 功能，[瞭解更多](https://www.w3schools.com/jsref/jsref_forEach.asp)

下一步：[範例](/zh-TW/viewer/extensions/examples)