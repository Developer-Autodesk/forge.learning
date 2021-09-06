# ドッキング パネル

このセクションでは、前のセクションの**基本スケルトン **を使用しますが、**MyAwesomeExtension** の名前を **ModelSummaryExtension** に変更してみましょう。 

## 拡張機能を作成する

拡張機能はそれぞれ個別の JavaScript ファイルである必要があるため、UI フォルダ **/js/modelsummaryextension.js** 内にファイルを作成し、次の内容をコピーします(名前が異なる以外は基本スケルトンと同じです)。 

[js/modelsummaryextension.js](_snippets/extensions/js/modelsummaryextension.1.js ':include :type=code javascript')

## ツールバー CSS

基本スケルトンと同様に、ツールバー ボタンには **CSS** スタイルが使用されます(コードで `.addClass` の呼び出しを参照)。**/css/main.css** に次の内容を追加します。

[css/main.css](_snippets/extensions/css/main.3.css ':include :type=code css')

## 拡張機能をロードする

最後に、**基本スケルトン**と同じコードを使用して、[拡張子をロード](/viewer/extensions/skeleton?id=loading-the-extension)します(もちろん、名前を調整します)。参考のために、次に、必要な 2 つの変更を示します。**index.html** に `<script>` を含めて、ビューアを作成するときに拡張機能をインクルードします。

```html
<script src="/js/modelsummaryextension.js"></script>
```

```javascript
viewer = new Autodesk.Viewing.GuiViewer3D(document.getElementById('forgeViewer'), { extensions: ['ModelSummaryExtension'] });
```

> `extensions` が配列になっていて、複数の拡張機能をロードできることに注目してください。たとえば、以前に選択したサンプルとこの拡張機能をロードするには、代わりに `['HandleSelectionExtension', 'ModelSummaryExtension']` を使用します。便利です。

この時点で、拡張機能はツールバー アイコンと一緒にロードされますが、何も実行しません。

## リーフ ノードを列挙する

ビューアには、カテゴリ(ファミリやパーツの定義など)を含むモデルのすべての要素が含まれているため、リーフ ノード、つまりモデル上の実際のインスタンスを列挙する必要があります。次の `getAllLeafComponents()` 関数を拡張機能クラスに追加する必要があります。これは、[こちらのブログ投稿](https://forge.autodesk.com/blog/enumerating-leaf-nodes-viewer)に基づいています。 

[js/modelsummaryextension.js](_snippets/extensions/js/modelsummaryextension.2.js ':include :type=code javascript')

## ドッキング パネル

拡張機能はビューアの[プロパティ パネル](https://forge.autodesk.com/en/docs/viewer/v7/reference/UI/PropertyPanel/)に結果を表示します。内容を拡張機能 **.js** ファイル(ファイル内の、他の関数の外部の任意の場所)にコピーします。

[js/modelsummaryextension.js](_snippets/extensions/js/modelsummaryextension.3.js ':include :type=code javascript')

## .onClick 関数を実装する

ここで、`onClick` 関数内の`Execute an action here` プレースホルダを置き換えます。この例では、まずプロパティ パネルを表示し、リーフ ノードを列挙してから、リーフ ノードの特定のプロパティ セットを取得し、最後にこれらのプロパティの出現回数を数えて、パネルに結果を表示します。 

!> 以下のコードでは、モデルに適用されるプロパティ名に合わせて `filteredProps` を調整する**必要があります**。たとえば、**マテリアル**はほぼすべてのモデルに存在するため、`const filteredProps = ['Material'];` を試すことができます。

次の内容を、拡張機能ボタンの `onClick` 関数内の拡張機能 **.js ** ファイルにコピーします。

[js/modelsummaryextension.js](_snippets/extensions/js/modelsummaryextension.4.js ':include :type=code javascript')

## まとめ

この時点で、拡張機能はロードされ、ツールバー ボタンが表示されます。ボタンをクリックすると、パネルが表示されます。次のビデオでは、この動作を示します。

![](_media/javascript/js_dockingpanel.gif)

> 前述のように、モデルに適した **filteredProps** を定義する必要があります。上記のビデオでは、両方のモデルで機能する `['Material', 'Design Status', 'Type Name'];` を使用しました。

主な学習ポイント:

- **.getObjectTree()** はモデル階層へのアクセスを提供し、**.getChildCount()** および **.enumNodeChildren()** と併用することで、ツリーを再帰的に反復することができます。
- **.getBulkProperties()** は、ビューアで幅広く使用されている、コールバックを介して dbIds 配列の特定のプロパティ セットを返す非同期メソッドです。[コールバックの詳細](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function)
- **.addProperty()** パネル メソッドは、カテゴリにプロパティ(名前、値)を追加します。

その他の学習ポイント

- **.forEach()** はコレクション内で反復処理を行う JavaScript 機能です。[詳細](https://www.w3schools.com/jsref/jsref_forEach.asp)

次の作業:[例](viewer/extensions/examples)