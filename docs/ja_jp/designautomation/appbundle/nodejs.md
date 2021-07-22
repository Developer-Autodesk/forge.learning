# アプリバンドル(ノードJs)を作成するためのコード


`route/` フォルダ内に、`DesignAutomation.js` ファイルを作成します。このファイルには、すべてのエンドポイントが書き込まれます。

**1\.ユーティリティ**

エンドポイントを作成する前に、デザイン自動化SDKインスタンスの作成、ファイルのアップロード、このサンプルで使用されるその他の便利な関数など、すべてのユーティリティ関数で構成されるユーティリティクラスを追加します。

[routes/DesignAutomation.js](_snippets/modifymodels/node/routes/DesignAutomation.1.js ':include :type=code javascript')

**2\.アプリバンドル**

アクティビティを作成する前に、プラグインを使用してアプリバンドルを定義し、適切なエンジンを選択する必要があります。utilsクラスの後の次の端点をコピーして貼り付けます。

[routes/DesignAutomation.js](_snippets/modifymodels/node/routes/DesignAutomation.2.js ':include :type=code javascript')

ここで Web アプリを実行し、** \[設定] ** (右上)をクリックすると、AppBundle と使用可能なすべてのエンジンのリストが表示されます。**ボタンはまだ機能しません。**先に進みましょう。

![](_media/designautomation/list_engines.png)

次へ:[アクティビティを定義する](/ja_jp/designautomation/activity/)