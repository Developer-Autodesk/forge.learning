# アプリ バンドル(Node Js)を作成するためのコード


`route/` フォルダ内で `DesignAutomation.js` ファイルを作成します。このファイルに、すべてのエンドポイントを書き込みます。

**1\.Utils**

エンドポイントを作成する前に、Design Automation SDK インスタンスの作成、ファイルのアップロード、およびこのサンプルで使用されるその他の便利な関数など、すべてのユーティリティ関数で構成される Utils クラスを追加します。

[routes/DesignAutomation.js](_snippets/modifymodels/node/routes/DesignAutomation.1.js ':include :type=code javascript')

**2\.アプリ バンドル**

アクティビティを作成する前に、プラグインを使用してアプリ バンドルを定義し、適切なエンジンを選択する必要があります。Utils クラスの後に次のエンドポイントをコピーして貼り付けます。

[routes/DesignAutomation.js](_snippets/modifymodels/node/routes/DesignAutomation.2.js ':include :type=code javascript')

ここで Web アプリを実行し、**Configure** (右上)をクリックすると、AppBundle および使用可能なすべてのエンジンのリストが表示されます。**ボタンはまだ機能しません。**先に進みましょう。

![](_media/designautomation/list_engines.png)

次の作業:[アクティビティを定義する](/ja-JP/designautomation/activity/)