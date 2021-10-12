# レイアウトを調整する

チュートリアルのこの手順では、アプリの基本的なレイアウトを使用しますが、グラフ用の列が追加されます。

`/js/` の下に新しい `Dashboard` フォルダを作成して、新しいファイルを配置してみましょう。

## Dashboard.js

このコードはページ レイアウトを調整し、**ビューア**を監視して、モデル データがロードされたらチャートをロードします。このコードでは [JavaScript クラス](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)が使用されます。

`/js/dashboard/` フォルダ内に、次の内容を含む新しい **Dashboard.js** ファイルを作成します。

[js/Dashboard.js](_snippets/dashboard/js/Dashboard.js ':include :type=code javascript')

**index.html** に、この新しいファイルの `<script>` を追加します。`<head>` 内に配置してください。

```html
<!-- dashboard files -->
<script src="js/Dashboard/Dashboard.js"></script>  
```

## main.css を調整する

レイアウトに役立つ CSS クラスもいくつか追加しましょう。`/css/main.css` ファイルに以下を追加します。

[css/main.css](_snippets/dashboard/css/main.css ':include :type=code css')

次の作業:[パネルの基本](/ja-JP/viewer/dashboard/panelbasics)