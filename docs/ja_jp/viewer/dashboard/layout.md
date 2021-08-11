# レイアウトを調整

チュートリアルのこの手順では、アプリの基本的なレイアウトを使用しますが、グラフ用の列が追加されます。

新しいファイルを配置する`/js/`の下に新しい`Dashboard`フォルダを作成します。

## Dashboard.js

このコードはページ レイアウトを調整し、**Viewer** を確認し、モデルの日付がロードされたときにチャートをロードします。[JavaScript クラス](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)を使用します。

次の内容で、`/js/dashboard/` フォルダの下に新しい **Dashboard.js** ファイルを作成します。

[js/Dashboard.js](_snippets/dashboard/js/Dashboard.js ':include :type=code javascript')

**index.html** で、この新しいファイルの `<script>` を追加します。これは`<head>`内になります。

```html
<!-- dashboard files -->
<script src="js/Dashboard/Dashboard.js"></script>  
```

## main.cssを調整します。

また、レイアウトに役立ついくつかのCSSクラスを追加します。`/css/main.css`ファイルに次を追加します。

[css/main.css](_snippets/dashboard/css/main.css ':include :type=code css')

次へ:[パネルの基本](/ja_jp/viewer/dashboard/panelbasics)