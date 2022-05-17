# 新規プロジェクトを作成する(Node.js)

マシンにフォルダを作成します。スペースや特殊文字は使用しないでください。このチュートリアルでは、**forgesample** を使用してみましょう。

**Visual Studio Code** を開き、**File** メニューに移動し、**Open**(MacOS)または **Open Folder**(Windows)を選択して、新しく作成されたフォルダを選択します。 

ターミナルが必要なため、**View** メニュー >> **Integrated Terminal** の順に選択します。下部にウィンドウが表示されます。次のコマンドを入力して、手順に従います。他の Forge サンプルとの整合性を保つため、**エントリ ポイント**を入力するよう求められたら、**start.js** を使用します。

```
npm init
```

これで、プロジェクトで使用するパッケージ定義用の **package.json** ファイルが作成されます。[詳細はこちら](https://docs.npmjs.com/files/package.json)。

## パッケージをインストールする

既定では、Node.js プロジェクトは空であるため、**npm install** を使用していくつかのパッケージをインストールする必要があります。まず、基本的な **Express** サーバ、**cookie-session** (認証セッション データ処理用)、**multer** (ファイル アップロード用)から始めましょう。もちろん、**Autodesk Forge** もインストールします。

!> **npm install** は 1 つずつ実行します。

```
npm install express --save
npm install cookie-session --save
npm install forge-apis --save
```

> `--save` パラメータは、モジュールを依存関係として **package.json** ファイルに含める必要があることを示します。

最後に **package.json** を開き、`"scripts"` 内に `"start": "node start.js",` 行を追加します。これで、フォルダに **node_modules** フォルダが作成されました。**package.json** は次のようになります。

[package.json](_snippets/viewhubmodels/node/package.json ':include :type=code json')

> バージョン番号(forge-apis 0.4.1 など)は異なる場合があります。このバージョンは、このチュートリアルが作成された時点の最新バージョンです。

## ファイルとフォルダ

新しいフォルダまたはファイルを作成するには、左側の Explorer 領域を右クリックして、**New Folder** または **New File** を選択します。

すべてのサーバ側ファイル用に **/routes/** フォルダを作成し、すべてのクライアント側ファイル用に **/public/** フォルダを作成します。

この時点で、プロジェクトは次のような構造になっています。

![](_media/nodejs/vs_code_explorer.png) 

> **package-lock.json** が **npm** によって作成されましたが、問題はありません。

## launch.json

このファイルは、Visual Studio Code にプロジェクトの実行方法を指定します。**Debug** メニュー >> **Add Configuration...** に移動し、上部に表示される **Select Environmen** ウィンドウで、**Node.js** を選択します。作成された **/.vscode/launch.json** ファイルに、次のように入力します。

!> 指定されたスペースに **Forge の Client ID と Secret** を入力する必要があります。

[launch.json](_snippets/viewhubmodels/node/launch.json ':include :type=code json')

> 後でプロジェクトをオンラインでデプロイできるように、**ID と Secret** を環境変数として定義することが重要です。詳細については、後で「**デプロイ**」を参照してください。

## start.js

ルート フォルダで、次の内容を含む `start.js` ファイルを作成します。

!> デプロイによっては、**Heroku** のように、ファイル名の大文字と小文字が区別されることがあります。このチュートリアルでは、小文字を使用しましょう。

[start.js](_snippets/viewhubmodels/node/start.js ':include :type=code javascript')

このファイルは、**Express** サーバを起動し、静的ファイル(`html` など)を提供して、API リクエストをルーティングします。

## config.js

ルート フォルダで、次の内容を含む、`config.js` という名前のファイルを作成します。

[config.js](_snippets/viewhubmodels/node/config.js ':include :type=code javascript')

ここで ENV 変数を定義します。Express サーバの実行時に、これらの変数の値を使用して、必要になる別の Autodesk Forge サービスに接続します。

最後に、2 つのスコープが定義されています。内部スコープは、アクセス トークンに、Forge Web サービス(サーバ側)のさまざまなサービスを使用するのに適した権限を付与します。このチュートリアルはビューアの使用に特化しています。一般に必要なのは、「viewables:read」スコープのみです。

プロジェクトの準備ができました!この時点で、プロジェクトは次のようになります。

![](_media/nodejs/vs_code_project.png) 

次の作業:[認可する](/ja-JP/oauth/3legged/)
