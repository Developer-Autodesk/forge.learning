# データを準備する

ビューアにはモデルのデータが多数含まれていますが、ダッシュボードに合わせてフィルタして調整する必要があります。次のクラスがそれをサポートします。

このサンプルでは、[配列](https://www.w3schools.com/js/js_arrays.asp)のように、JavaScript オブジェクトを(ハッシュ テーブルとして)使用してデータを整理する方法がいくつかあります。基本的には、次のようになります。

```javascript
var data = {};
data['key'] = someValue;
```

しかし、次のように複数のレベルがあります。

```javascript
var data = {};
data['key'] = {};
data['key']['subkey'] = someValue;
```

この方法を使用して、プロパティ名、プロパティ値、およびデータベースIDの配列をその値とともに格納します。たとえば、次のようになります。

```javascript
data['Category']['Walls'] = [123, 456, 789];
```

次のコードはそのデータを準備します。

## DashboardPanel.js

(Viewer Extension チュートリアルの) [getAllLeafComponents](/ja_jp/viewer/extensions/panel?id=enumerate-leaf-nodes) メソッドを再利用してモデル上に表示されているすべての dbId を検索し、次に `getProperties` を使用して情報を取得します。それは生データです。 

`/js/dashboard/` フォルダの下に、次の内容を含む新しい **DashboardPanel.js** を作成します。

[js/DashboardPanel.js](_snippets/dashboard/js/DashboardPanel.js ':include :type=code javascript')

**index.html** で、この新しいファイルの `<script>` を追加します。これは、`<head>` の内部で、**Dashboard.js** の後に設定されます。

```html
<script src="js/Dashboard/DashboardPanel.js"></script>  
```

次へ:[チャートを追加する](/ja_jp/viewer/dashboard/charts)