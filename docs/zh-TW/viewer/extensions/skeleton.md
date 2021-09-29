# 擴充功能骨架

本自學課程的此步驟描述帶有一個工具列按鈕的擴充功能的基本骨架，該按鈕可觸發 `.onClick` 函式內的程式碼。如需實際範例，可以跳至[處理選取](/zh-TW/viewer/extensions/selection)。

## 建立擴充功能

讓我們開始吧。每個擴充功能都應為一個 JavaScript 檔案，並至少實作 `.load` 與 `.unload` 函式。在 UI 資料夾中建立檔案 (**/js/myawesomeextension.js**)，然後複製以下內容。 

[js/myawesomeextension.js](_snippets/extensions/js/myawesomeextension.js ':include :type=code javascript')

!> 請注意，上述程式碼中有一個以 `Execute an action here` 註解的預留位置，應取代為您的自訂程式碼。

## 工具列 CSS

工具列按鈕使用 **CSS** 樣式設定 (請參閱程式碼中對 `.addClass` 的呼叫)。在 **/css/main.css** 中加入以下內容：

[css/main.css](_snippets/extensions/css/main.1.css ':include :type=code css')

!> `background-image` URL 應依專案中既有的檔案進行調整。Viewer 使用的是 24 像素的影像。

## 載入擴充功能

擴充功能骨架已準備就緒，現在請開啟 **/index.html** 檔案，然後加入以下行 (用於載入檔案)：

```html
<script src="/js/myawesomeextension.js"></script>
```

注意：- 載入擴充功能 <scripts> 程式碼時，請確定在下方 ForgeViewer.js 中載入 

![](_media/forge/extension_example.png)



最後，我們需要告訴 Viewer 載入擴充功能，請在 **/www/js/ForgeViewer.js** 中找到以下行：

```javascript
viewer = new Autodesk.Viewing.GuiViewer3D(document.getElementById('forgeViewer'));
```

然後取代為：

```javascript
viewer = new Autodesk.Viewing.GuiViewer3D(document.getElementById('forgeViewer'), { extensions: ['MyAwesomeExtension'] });
```

此時應會載入該擴充功能並會展示工具列按鈕，但什麼都不會執行 (請記住，`.onClick` 函式中只有一處預留位置註解)。這是您建立擴充功能時可使用的基本骨架。 

!> 建立您自己的擴充功能時，請務必將擴充功能更名，且名稱必須是唯一的。 


下一步：[處理選取](/zh-TW/viewer/extensions/selection)
