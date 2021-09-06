# 選択

このセクションでは、前のセクションの**基本スケルトン **を使用しますが、**MyAwesomeExtension** の名前を **HandleSelectionExtension** に変更してみましょう。 

## 拡張機能を作成する

拡張機能はそれぞれ個別の JavaScript ファイルである必要があるため、UI フォルダ **/js/handleselectionextension.js** 内にファイルを作成し、次の内容をコピーします(名前が異なること以外は基本スケルトンと同じです)。 

[js/handleselectionextension.js](_snippets/extensions/js/handleselectionextension.1.js ':include :type=code javascript')

## ツールバー CSS

基本スケルトンと同様に、ツールバー ボタンには **CSS** スタイルが使用されます。**/css/main.css** に次の内容を追加します。

[css/main.css](_snippets/extensions/css/main.2.css ':include :type=code css')

> 独自のイメージやライブラリ内のイメージを使用できます。この場合は、PNG 形式の[Font Awesome](https://fontawesome.com/) アイコンを使用します。

## 拡張機能をロードする

最後に、**基本スケルトン**と同じコードを使用して、[拡張子をロード](/ja-JP/viewer/extensions/skeleton?id=loading-the-extension)します(もちろん、名前を調整します)。参考のために、次に、必要な 2 つの変更を示します。**index.html** に `<script>` を含めて、ビューアを作成するときに拡張機能をインクルードします。

 **/index.html** ファイルを開き、次の行を追加します。

```html
<script src="/js/handleselectionextension.js"></script>
```

**/www/js/ForgeViewer.js** で、次の行を検索します。

```javascript
viewer = new Autodesk.Viewing.GuiViewer3D(document.getElementById('forgeViewer'));
```

この行を以下の行に置き換えます。

```javascript
viewer = new Autodesk.Viewing.GuiViewer3D(document.getElementById('forgeViewer'), { extensions: ['HandleSelectionExtension'] });
```

注: 1 つの拡張機能が既にロードされている場合は、配列内で **カンマ(「,」)**を使用して HandleSelectionExtension を追加することができます。

```javascript
viewer = new Autodesk.Viewing.GuiViewer3D(document.getElementById('forgeViewer'), { extensions: ['MyAwesomeExtension','HandleSelectionExtension'] }); 
```

この時点で、拡張機能はツールバー アイコンと一緒にロードされますが、何も実行しません。

## .onClick 関数を実装する

ここで、`.onClick` 関数内の`Execute an action here` プレースホルダを置き換えます。この例では、選択したオブジェクトを選択表示します。次の内容を、**.js ** 拡張機能ファイルの `.onClick` 関数内にコピーします。

[js/handleselectionextension.js](_snippets/extensions/js/handleselectionextension.2.js ':include :type=code javascript')

## まとめ

この時点で、拡張機能はロードされ、ツールバー ボタンが表示されます。1 つまたは複数のオブジェクトを選択し、ボタンをクリックして、選択表示する要素を確認します。次のビデオでは、この動作を示します。

![](_media/javascript/js_isolate.gif)

> ブラウザ コンソールは、Web 開発とデバッグに不可欠です。[Chrome](https://developers.google.com/web/tools/chrome-devtools/console/)、[Edge](https://docs.microsoft.com/en-us/microsoft-edge/devtools-guide/console)、[Firefox](https://developer.mozilla.org/en-US/docs/Tools/Web_Console/Opening_the_Web_Console)、および [Safari](https://developer.apple.com/safari/tools/) での使用方法について説明します。

主な学習ポイント:

- **.getSelection()** は、モデルから **dbId** の配列を返し、**.clearSelection()** は
- **.getProperties()** は、ビューアで幅広く使用されている、コールバックを介して指定された dbId のすべてのプロパティを返す非同期メソッドです。[コールバックの詳細](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function)
- **.isolate()** メソッドは、他のすべての要素を透明にします(「ghosted」)。

その他の学習ポイント

- **.forEach()** はコレクション内で反復処理を行う JavaScript 機能です。[詳細](https://www.w3schools.com/jsref/jsref_forEach.asp)
- **.push()** は配列に項目を追加します。[詳細](https://www.w3schools.com/jsref/jsref_push.asp)

次の作業:[ドッキング パネル](/ja-JP/viewer/extensions/panel)