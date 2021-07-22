# ドッキングパネル

このセクションでは、前のセクションの **基本スケルトン ** を使用しますが、**MyAwesomeExtension** の名前を **ModelSummaryExtension** に変更します。 

## 延長を作成する

各拡張子は別々の JavaScript ファイルである必要があるため、UI フォルダ **/js/modelsummaryextension.js** にファイルを作成し、次の内容をコピーします(異なる名前を持つ場合を除き、基本スケルトンと同じです)。 

[js/modelsummaryextension.js](_snippets/extensions/js/modelsummaryextension.1.js ':include :type=code javascript')

## ツールバーCSS

基本スケルトンと同様に、ツールバー ボタンも **CSS** スタイルを使用します(コードの `.addClass` の呼び出しを参照してください)。**/css/main.css** で、次を追加します。

[css/main.css](_snippets/extensions/css/main.3.css ':include :type=code css')

## エクステンションをロード

最後に、[基本スケルトン](/viewer/extensions/skeleton?id=loading-the-extension)と同じコードを使用して、拡張子をロードします(もちろん、名前を調整します)。参照する場合は、次の 2 つの変更が必要です。`<script>を **index.html** に追加し、ビューアの作成時に拡張機能を含めます。`

```html
<script src="/js/modelsummaryextension.js"></script>
```

```javascript
viewer = new Autodesk.Viewing.GuiViewer3D(document.getElementById('forgeViewer'), { extensions: ['ModelSummaryExtension'] });
```

> `extensions` がどのように配列であるかに注意してください。複数のextension をロードすることができます。たとえば、前の選択サンプルをロードして、これをロードするには、代わりに `['HandleSelectionExtension', 'ModelSummaryExtension']` を使用します。かっこいいでしょ?

この時点で、エクステンションはツールバーアイコンを使用してロードする必要がありますが、何も実行しません。

## リーフノードを列挙する

ビューアには、カテゴリ(ファミリやパーツ定義など)を含むモデルのすべての要素が含まれているため、リーフノードを列挙する必要があります。これは、モデルの実際のインスタンスを意味します。次の `getAllLeafComponents()` 関数を拡張クラスに追加する必要があります。これは、[このブログ投稿](https://forge.autodesk.com/blog/enumerating-leaf-nodes-viewer)に基づいています。 

[js/modelsummaryextension.js](_snippets/extensions/js/modelsummaryextension.2.js ':include :type=code javascript')

## ドッキングパネル

エクステンションは、ビューアの[プロパティ パネル](https://forge.autodesk.com/en/docs/viewer/v7/reference/UI/PropertyPanel/)に結果を表示します。コンテンツを拡張子 **.js** ファイル(ファイル上の任意の場所、その他の関数の外部)にコピーします。

[js/modelsummaryextension.js](_snippets/extensions/js/modelsummaryextension.3.js ':include :type=code javascript')

## .onClick関数を実装する

ここで、`Execute a action here ` placeholder inside `onClick` 関数内のプレースホルダを置き換えます。このサンプルでは、まずプロパティパネルを表示し、リーフノードを列挙し、次にリーフノードの特定のプロパティセットを取得し、次に、これらのプロパティのオカレンスを数えて、パネルに結果を表示します。 

!> 次のコードでは、****モデルに適用されるプロパティ名に`filteredProps` を調整する必要があります。たとえば、**マテリアル ** は大部分のモデルに存在するため、`const filteredProps = ['Material'];` を使用して試すことができます

次の内容を、エクステンションのボタンの `onClick` 関数内のエクステンション **.js** ファイルにコピーします。

[js/modelsummaryextension.js](_snippets/extensions/js/modelsummaryextension.4.js ':include :type=code javascript')

## まとめ

この時点で、エクステンションはロードされ、ツールバーボタンが表示されます。ボタンをクリックすると、パネルが表示されます。次のビデオでは、動作を説明します。

![](_media/javascript/js_dockingpanel.gif)

> 前述のように、モデルに適した **filteredProps** を定義する必要があります。上記のビデオでは、`['Material', 'Design Status', 'Type Name']; ` を使用しました。これは両方のモデルで機能します。

主な学習ポイント:

- **.getObjectTree()** はモデル階層へのアクセスを提供し、**.getChildCount()** および **.enumNodeChildren()** を使用して、ツリーを再帰的に反復することができます
- **.getBulkProperties()** は、コールバックを介して dbIds 配列の特定のプロパティ セットを返す非同期メソッドです。これは通常、Viewer で使用されます。[callbacks の詳細](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function)
- **.addProperty()** パネル メソッドは、カテゴリにプロパティ(名前、値)を追加します

その他の学習ポイント:

- **.forEach()** はコレクションを反復する場合、これは JavaScript 機能です。[詳細](https://www.w3schools.com/jsref/jsref_forEach.asp)

次へ:[例](viewer/extensions/examples)