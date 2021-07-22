# チャートを追加する

チャートを作成するためのライブラリは多数あります。このサンプルでは、[Chart.js](https://www.chartjs.org/) を使用します。これは非常にシンプルですが、使いやすく、ビジュアルにも優れています。

**index.html** で、`<script> ` および `<link> ` スタイルシートを [Chart.js CDN](https://cdnjs.com/libraries/Chart.js) ライブラリ リファレンスの下に追加します。これは `<head>` の内側に入ります 

```html
<!--Chart JS  packages-->
<script src="//cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js" ></script>
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.css" />
```

## 棒グラフ

`/js/dashboard/` フォルダの下に、次の内容を含む新しい **PanelBarChart.js** ファイルを作成します。

[js/PanelBarChart.js](_snippets/dashboard/js/PanelBarChart.js ':include :type=code javascript')

## 円グラフ

`/js/dashboard/` フォルダの下に、次の内容を含む新しい **PanelPieChart.js** ファイルを作成します。

[js/PanelPieChart.js](_snippets/dashboard/js/PanelPieChart.js ':include :type=code javascript')

**index.html**で、これらの新しいファイルに 2 つの `<script>` を追加します。これは、`<head>` の内部で、**DashboardPanel.js** の後になります。

```html
<script src="js/Dashboard/PanelBarChart.js"></script>
<script src="js/Dashboard/PanelPieChart.js"></script>
```

ダッシュボードを実行する準備ができました。ブラウザを起動し、`http://localhost3000` に移動してモデルを選択します。

# トラブルシューティング

ポップアップ警告メッセージに *が表示されます。このモデルには、円グラフ*(または BarChar)の材料プロパティが含まれていません。これは、単に既定の **材料** プロパティが現在のモデルで使用できないことを示しているため、円グラフまたは棒グラフを作成できないことを示しています。次のメッセージが表示されます。

![](_media/javascript/js_dashboard_propertymissing.png)

この問題を解決するには、`Dashboard.js` (`/js/dashboard/` フォルダの下)に移動し、7 行目と 8 行目でプロパティ名を調整します。

```javascript
new BarChart('Material'),
new PieChart('Material')
```

**使用可能なプロパティが分からない場合**

選択したプロパティが使用できない場合、コードはブラウザコンソールで使用できるすべてのプロパティのリストを出力します。 

> ブラウザコンソールは、Web開発とデバッグに不可欠です。[Chrome](https://developers.google.com/web/tools/chrome-devtools/console/)、[Edge](https://docs.microsoft.com/en-us/microsoft-edge/devtools-guide/console)、[Firefox](https://developer.mozilla.org/en-US/docs/Tools/Web_Console/Opening_the_Web_Console) および [Safari](https://developer.apple.com/safari/tools/) に使用する方法について説明します。

次へ:[Deployment](deployment/)