# データを準備する

ビューアにはモデルのデータが多数含まれていますが、ダッシュボードに合わせてフィルタおよび調整する必要があります。この操作には次のクラスが役立ちます。

データを整理する方法がいくつかあります([配列](https://www.w3schools.com/js/js_arrays.asp)など)。この例では、JavaScript オブジェクトを(ハッシュ テーブルとして)使用してみましょう。基本的には、次のようになります。

```javascript
var data = {};
data['key'] = someValue;
```

ただし、次のように複数のレベルがあります。

```javascript
var data = {};
data['key'] = {};
data['key']['subkey'] = someValue;
```

この方法を使用して、プロパティ名、プロパティ値、および dbIds とその値の配列を格納してみましょう。次に例を示します。

```javascript
data['Category']['Walls'] = [123, 456, 789];
```

次のコードで、このデータの準備を行います。

## DashboardPanel.js

(「ビューアの拡張機能」チュートリアルの) [getAllLeafComponents](viewer/extensions/panel?id=enumerate-leaf-nodes) メソッドを再利用して、モデルに表示されるすべての dbId を検索し、`getProperties` を使用して情報を取得してみましょう。このデータは未処理のデータです。 

`/js/dashboard/` フォルダ内に、次の内容を含む新しい **DashboardPanel.js** を作成します。

[js/DashboardPanel.js](_snippets/dashboard/js/DashboardPanel.js ':include :type=code javascript')

**index.html** に、この新しいファイルの `<script>` を追加します。`<head>` 内の **Dashboard.js** の後に配置してください。

```html
<script src="js/Dashboard/DashboardPanel.js"></script>  
```

次の作業:[チャートを追加する](viewer/dashboard/charts)