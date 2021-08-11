# 新しいプロジェクト(Node.js)を作成する

コンピュータにフォルダを作成し、スペースを使用せず、特殊文字を使用しないでください。このチュートリアルでは、**forgesample** を使用します。

[ビジュアル コード](https://code.visualstudio.com/download)を開き、メニュー **ファイル**に移動して、**開く**(MacOS)または **開く**(Windows)を選択し、新しく作成されたフォルダを選択します。 

ここでターミナルが必要です。**View** >> **Terminal** メニューを選択します。ウィンドウが下部に表示されます。次のコマンドを入力して手順に従うと、**エントリ ポイントを除く既定の候補を安全に受け入れることができます。**は、**start.js** (ほとんどの Forge サンプルで使用されます)を使用します。

```
npm init
```

これにより、**package.json** ファイルが作成され、プロジェクトで使用するパッケージが定義されます。[詳細はこちら](https://docs.npmjs.com/files/package.json)

## パッケージをインストール

既定では、Node.js プロジェクトは空であるため、**npm のインストール**を使用して複数のパッケージをインストールする必要があります。まず、基本的な **express ** サーバ、**body-parser**(JSON 処理用)、**mult**(ファイル アップロード用)、もちろん **Autodesk Forge** から始めましょう。

!> 一度に 1 つの **npm のインストール**を実行します。

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

> `--save` パラメータは、モジュールが依存関係として **package.json** ファイルに含まれる必要があることを示します。

最後に **package.json** を開き、`"scripts"` 内で `"start": "node start.js",` 行を追加します。これで、フォルダに **node_modules** フォルダが作成され、**package.json** は次のようになります。

[package.json](_snippets/modifymodels/node/package.json ':include :type=code json')

> バージョン番号(forge-api 0.8.5など)は異なる場合があり、このチュートリアルが作成された最新バージョンです。

## ファイルとフォルダ

新しいフォルダまたはファイルを作成するには、左側の「エクスプローラ」領域を右クリックし、**New Folder** または **New File** を選択します。

すべてのサーバ側ファイルに **/route/** フォルダを、すべてのクライアント側ファイルに **/public/** フォルダを作成します。

この時点で、プロジェクトは次の構造になっています。

![](_media/nodejs/vs_code_explorer_da.png) 

## launch.json

このファイルは、プロジェクトの実行方法をVisual Studio Codeに示しています。**メニューに移動し、** >> **Add Configuration...** を実行します。上部に表示される **Select Environment** ウィンドウで、**Node.js** を選択します。作成された **/.vscode/launch.json** ファイルに、次のように入力します。

!> 示されたスペースに **Forge Client ID & Secret** を入力する必要があります。

[launch.json](_snippets/modifymodels/node/launch.json ':include :type=code json')

> 後でプロジェクトをオンラインで配置できるように、**ID & Secret** を環境変数として定義することが重要です。詳細については、**配置**を参照してください。

## start.js

このファイルは、**express** サーバを起動します。ルートフォルダで、次のファイルを使用して`start.js`ファイルを作成します。

!> ファイル名は、**Herok** のような一部の配置では大文字と小文字が区別されます。このチュートリアルでは、小文字を使用します。

[start.js](_snippets/modifymodels/node/start.js ':include :type=code javascript')

## server.js

このファイルは静的ファイル(`html`など)を提供し、API要求をルーティングします。ルートフォルダで、`server.js`という名前のファイルを次の内容で作成します。

[server.js](_snippets/modifymodels/node/server.js ':include :type=code javascript')

## socket.io.js

ルートフォルダで、`socket.io.js`という名前のファイルを次の内容で作成します。

[socket.io.js](_snippets/modifymodels/node/socket.io.js ':include :type=code javascript')

## config.js

ルートフォルダで、`config.js`という名前のファイルを次の内容で作成します。

[config.js](_snippets/modifymodels/node/config.js ':include :type=code javascript')

ここでは、環境変数を使用します。Expressサーバの実行時には、これらの変数の値を使用してAutodesk Forge.comに接続します。

## routes/common/oauth.js

次に、`routes`フォルダに`common`サブフォルダを作成し、Forgeから実際にアクセストークンを要求する`routes/common/oauth.js`ファイルを準備します。このチュートリアルの他の部分では、この設定が再利用されます。

[routes/common/oauth.js](_snippets/modifymodels/node/routes/common/oauth.js ':include :type=code javascript')

プロジェクトの準備ができました。この時点で、プロジェクトは次のようになります。

![](_media/nodejs/vs_code_project_da.PNG) 

> **package-lock.json** は **npm** によって作成されましたが、心配ありません

次へ:[基本アプリUI](/ja_jp/designautomation/html/README.md)
