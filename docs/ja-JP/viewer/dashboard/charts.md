# チャートを追加する

チャートを作成するためのライブラリが多数用意されています。この例では、[Chart.js](https://www.chartjs.org/) を使用してみましょう。このファイルは非常にシンプルですが、使い勝手がよく、視覚的に分かりやすくなっています。

**index.html** の [Chart.js CDN](https://cdnjs.com/libraries/Chart.js) ライブラリ リファレンスの下に `<script>` および `<link>` スタイルシートを追加します。`<head>` 内に配置してください。 

```html
<!--Chart JS  packages-->
<script src="//cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js" ></script>
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.css" />
```

## 棒グラフ

`/js/dashboard/` フォルダ内に、次の内容を含む新しい **PanelBarChart.js** ファイルを作成します。

[js/PanelBarChart.js](_snippets/dashboard/js/PanelBarChart.js ':include :type=code javascript')

## 円グラフ

`/js/dashboard/` フォルダ内に、次の内容を含む新しい **PanelPieChart.js** ファイルを作成します。

[js/PanelPieChart.js](_snippets/dashboard/js/PanelPieChart.js ':include :type=code javascript')

**index.html** に、これらの新しいファイルの `<script>` を 2 つ追加します。`<head>` 内の **DashboardPanel.js** の後に配置してください。

```html
<script src="js/Dashboard/PanelBarChart.js"></script>
<script src="js/Dashboard/PanelPieChart.js"></script>
```

ダッシュボードを実行する準備ができました。ブラウザを起動し、`http://localhost3000` に移動してモデルを選択します。

# トラブルシューティング

「*このモデルに円グラフ(または棒グラフ)のマテリアル プロパティは含まれていません*」というポップアップ警告メッセージは、現在のモデルでは既定の**マテリアル** プロパティを使用できないため、円グラフまたは棒グラフを作成できないことを示しています。次のメッセージが表示されます。

![](_media/javascript/js_dashboard_propertymissing.png)

この問題を修正するには、`Dashboard.js` (`/js/dashboard/` フォルダの下)に移動し、7 行目と 8 行目でプロパティ名を調整します。

```javascript
new BarChart('Material'),
new PieChart('Material')
```

**使用可能なプロパティが分からない場合**

選択したプロパティが使用できない場合、コードはブラウザ コンソールで使用できるすべてのプロパティのリストを出力します。 

> ブラウザ コンソールは、Web 開発とデバッグに不可欠です。[Chrome](https://developers.google.com/web/tools/chrome-devtools/console/)、[Edge](https://docs.microsoft.com/en-us/microsoft-edge/devtools-guide/console)、[Firefox](https://developer.mozilla.org/en-US/docs/Tools/Web_Console/Opening_the_Web_Console)、および [Safari](https://developer.apple.com/safari/tools/) での使用方法について説明します。

次の作業:[配置](/ja-JP/deployment/)