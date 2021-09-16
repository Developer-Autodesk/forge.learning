# 新規プロジェクトを作成する(Node.js)

マシンにフォルダを作成します。スペースや特殊文字は使用しないでください。このチュートリアルでは、**forgesample** を使用してみましょう。

[Visual Studio Code](https://code.visualstudio.com/download) を開き、**File** メニューに移動し、**Open**(MacOS)または **Open Folder**(Windows)を選択して、新しく作成されたフォルダを選択します。 

ターミナルが必要なため、**View** メニュー >> **Terminal** の順に選択します。下部にウィンドウが表示されます。次のコマンドを入力して手順に従うと、**エントリ ポイント**を除く既定の入力候補を安全に受け入れることができます。エントリ ポイントには、**start.js** (ほとんどの Forge サンプルで使用されます)を使用します。

```
npm init
```

これで、プロジェクトで使用するパッケージ定義用の **package.json** ファイルが作成されます。[詳細はこちら](https://docs.npmjs.com/files/package.json)。

## パッケージをインストールする

既定では、Node.js プロジェクトは空であるため、**npm install** を使用していくつかのパッケージをインストールする必要があります。まず、基本的な **Express** サーバ、**body-parser** (JSON 処理用)、**multer** (ファイル アップロード用)から始めましょう。もちろん、**Autodesk Forge** もインストールします。

!> **npm install** は 1 つずつ実行します。

```
npm install express --save
npm install multer --save
npm install cookie-session --save
npm install forge-apis --save
npm install autodesk.forge.designautomation --save
npm install body-parser --save
npm install form-data --save
npm install socket.io --save
```

> `--save` パラメータは、モジュールを依存関係として **package.json** ファイルに含める必要があることを示します。

最後に **package.json** を開き、`"scripts"` 内に `"start": "node start.js",` 行を追加します。これで、フォルダに **node_modules** フォルダが作成されました。**package.json** は次のようになります。

[package.json](_snippets/modifymodels/node/package.json ':include :type=code json')

> バージョン番号(forge-apis 0.8.5 など)は異なる場合があります。このバージョンは、このチュートリアルが作成された時点の最新バージョンです。

## ファイルとフォルダ

新しいフォルダまたはファイルを作成するには、左側の Explorer 領域を右クリックして、**New Folder** または **New File** を選択します。

すべてのサーバ側ファイル用に **/route/** フォルダを作成し、すべてのクライアント側ファイル用に **/public/** フォルダを作成します。

この時点で、プロジェクトは次のような構造になっています。

![](_media/nodejs/vs_code_explorer_da.png) 

## launch.json

このファイルは、Visual Studio Code にプロジェクトの実行方法を指定します。**Run** メニュー >> **Add Configuration...** の順に選択し、上部に表示される **Select Environmen** ウィンドウで **Node.js** を選択します。作成された **/.vscode/launch.json** ファイルに、次のように入力します。

!> 指定されたスペースに **Forge の Client ID と Secret** を入力する必要があります。

[launch.json](_snippets/modifymodels/node/launch.json ':include :type=code json')

> 後でプロジェクトをオンラインでデプロイできるように、**ID と Secret** を環境変数として定義することが重要です。詳細については、後で「**デプロイ**」を参照してください。

## start.js

このファイルは、**express** サーバを起動します。ルート フォルダで、次の内容を含む `start.js` ファイルを作成します。

!> デプロイによっては、**Heroku** のように、ファイル名の大文字と小文字が区別されることがあります。このチュートリアルでは、小文字を使用しましょう。

[start.js](_snippets/modifymodels/node/start.js ':include :type=code javascript')

## server.js

このファイルは、静的ファイル(`html` など)を提供して、API リクエストをルーティングします。ルート フォルダで、次の内容を含む、`server.js` という名前のファイルを作成します。

[server.js](_snippets/modifymodels/node/server.js ':include :type=code javascript')

## socket.io.js

ルート フォルダで、次の内容を含む、`socket.io.js` という名前のファイルを作成します。

[socket.io.js](_snippets/modifymodels/node/socket.io.js ':include :type=code javascript')

## config.js

ルート フォルダで、次の内容を含む、`config.js` という名前のファイルを作成します。

[config.js](_snippets/modifymodels/node/config.js ':include :type=code javascript')

ここでは、環境変数を使用します。Express サーバの実行時に、これらの変数の値を使用して、Autodesk Forge に接続します。

## routes/common/oauth.js

`routes` フォルダ内に `common` サブフォルダを作成し、Forge に対してアクセス トークンを実際にリクエストする `routes/common/oauth.js` ファイルを準備します。このファイルは、このチュートリアルの他の部分で再利用されます。

[routes/common/oauth.js](_snippets/modifymodels/node/routes/common/oauth.js ':include :type=code javascript')

プロジェクトの準備ができました!この時点で、プロジェクトは次のようになります。

![](_media/nodejs/vs_code_project_da.PNG) 

> **package-lock.json** が **npm** によって作成されましたが、問題はありません。

次の作業:[基本アプリの UI](/ja-JP/designautomation/html/README.md)
