# 選択

このセクションでは、前のセクションの **基本スケルトン ** を使用しますが、**MyAwesomeExtension** の名前を **HandleSelectionExtension** に変更します。 

## 延長を作成する

各拡張子は別々の JavaScript ファイルである必要があるため、UI フォルダ **/js/handleselectionextension.js** にファイルを作成し、次の内容をコピーします(異なる名前を持つ場合を除き、基本スケルトンと同じです)。 

[js/handleselectionextension.js](_snippets/extensions/js/handleselectionextension.1.js ':include :type=code javascript')

## ツールバーCSS

基本スケルトンと同様に、ツールバー ボタンは **CSS** スタイルを使用します。**/css/main.css** で、次を追加します。

[css/main.css](_snippets/extensions/css/main.2.css ':include :type=code css')

> 独自のイメージやライブラリから使用できます。この場合は、PNG 形式の[Font Awesome](https://fontawesome.com/) アイコンを使用します。

## エクステンションをロード

最後に、[基本スケルトン](/viewer/extensions/skeleton?id=loading-the-extension)と同じコードを使用して、拡張子をロードします(もちろん、名前を調整します)。参照する場合は、次の 2 つの変更が必要です。`<script>を **index.html** に追加し、ビューアの作成時に拡張機能を含めます。`

 **/index.html** ファイルを開き、次の行を追加します。

```html
<script src="/js/handleselectionextension.js"></script>
```

**/www/js/ForgeViewer.js** で、次の行を探します。

```javascript
viewer = new Autodesk.Viewing.GuiViewer3D(document.getElementById('forgeViewer'));
```

次のように置き換えます。

```javascript
viewer = new Autodesk.Viewing.GuiViewer3D(document.getElementById('forgeViewer'), { extensions: ['HandleSelectionExtension'] });
```

注: 1 つの拡張機能が既にロードされている場合は、配列内の **カンマ(',')** を使用して HandleSelectionExtension を追加することができます。

```javascript
viewer = new Autodesk.Viewing.GuiViewer3D(document.getElementById('forgeViewer'), { extensions: ['MyAwesomeExtension','HandleSelectionExtension'] }); 
```

この時点で、エクステンションはツールバーアイコンを使用してロードする必要がありますが、何も実行しません。

## .onClick関数を実装する

ここで、`` 関数を置き換えて、`.onClick` 関数内のプレースホルダでアクションを実行します。このサンプルでは、選択を分離します。次の内容を、**.js** ファイルの `.onClick` 関数内の拡張子にコピーします。

[js/handleselectionextension.js](_snippets/extensions/js/handleselectionextension.2.js ':include :type=code javascript')

## まとめ

この時点で、エクステンションはロードされ、ツールバーボタンが表示されます。1つまたは複数のオブジェクトを選択し、ボタンをクリックして、選択表示する要素を確認します。次のビデオでは、動作を説明します。

![](_media/javascript/js_isolate.gif)

> ブラウザコンソールは、Web開発とデバッグに不可欠です。[Chrome](https://developers.google.com/web/tools/chrome-devtools/console/)、[Edge](https://docs.microsoft.com/en-us/microsoft-edge/devtools-guide/console)、[Firefox](https://developer.mozilla.org/en-US/docs/Tools/Web_Console/Opening_the_Web_Console) および [Safari](https://developer.apple.com/safari/tools/) に使用する方法について説明します。

主な学習ポイント:

- **.getSelection()** は、モデルから **dbId** の配列を返し、**.clearSelection()** を返します
- **.getProperties()** は、コールバックを介して指定された dbId のすべてのプロパティを返す非同期メソッドです。これはビューアで一般的に使用されます。[コールバックの詳細](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function)
- **.isolate()** method makes all other elements transparent ("ghosted")

その他の学習ポイント:

- **.forEach()** はコレクションを反復する場合、これは JavaScript 機能です。[詳細](https://www.w3schools.com/jsref/jsref_forEach.asp)
- **.push()** を使用して配列の項目を含める場合は、[詳細を参照してください。](https://www.w3schools.com/jsref/jsref_push.asp)

次へ:[ドッキングパネル](viewer/extensions/panel)