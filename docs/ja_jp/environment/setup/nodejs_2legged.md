# 新しいプロジェクト(Node.js)を作成する

コンピュータにフォルダを作成し、スペースを使用せず、特殊文字を使用しないでください。このチュートリアルでは、**forgesample** を使用します。

**ビジュアル コード**を開き、メニュー **ファイル**に移動して、**開く**(MacOS)または **開く**(Windows)を選択し、新しく作成されたフォルダを選択します。 

次に、ターミナルが必要です。**View** >> **Integrated Terminal** メニューを選択します。ウィンドウが下部に表示されます。次のコマンドを入力して、手順に従います。他の Forge サンプルとの整合性を保つため、**エントリ ポイント: ** の入力を求めるプロンプトが表示されたら、**start.js** を使用します。

```
npm init
```

これにより、**package.json** ファイルが作成され、プロジェクトで使用するパッケージが定義されます。[詳細はこちら](https://docs.npmjs.com/files/package.json)

## パッケージをインストール

既定では、Node.js プロジェクトは空であるため、**npm のインストール**を使用して複数のパッケージをインストールする必要があります。まず、基本的な **express ** サーバ、**multer**(ファイルのアップロード)から始めましょう。もちろん、**Autodesk Forge** です。

!> 一度に 1 つの **npm のインストール**を実行します。

```
npm install express --save
npm install multer --save
npm install forge-apis --save
```

> `--save` パラメータは、モジュールが依存関係として **package.json** ファイルに含まれる必要があることを示します。

最後に **package.json** を開き、`"scripts"` 内で `"start": "node start.js"、` 行を追加します。これで、フォルダに **node_modules** フォルダが作成され、**package.json** は次のようになります。

[package.json](_snippets/viewmodels/node/package.json ':include :type=code json')

> バージョン番号(forge-api 0.4.1など)は異なる場合があり、このチュートリアルが作成された最新バージョンです。

## ファイルとフォルダ

新しいフォルダまたはファイルを作成するには、左側の「エクスプローラ」領域を右クリックし、**New Folder** または **New File** を選択します。

すべてのサーバ側ファイルに **/route/** フォルダを、すべてのクライアント側ファイルに **/public/** フォルダを作成します。

この時点で、プロジェクトは次の構造になっています。

![](_media/nodejs/vs_code_explorer.png) 

> **package-lock.json** は **npm** によって作成されましたが、心配ありません

## launch.json

このファイルは、プロジェクトの実行方法をVisual Studio Codeに示しています。メニュー **Debug** >> **Add Configuration...** に移動し、上部に表示される **Select Environment** ウィンドウで、**Node.js** を選択します。作成された **/.vscode/launch.json** ファイルに、次のように入力します。

!> 示されたスペースに **Forge Client ID & Secret** を入力する必要があります。

[launch.json](_snippets/viewmodels/node/launch.json ':include :type=code json')

> 後でプロジェクトをオンラインで配置できるように、**ID & Secret** を環境変数として定義することが重要です。詳細については、**配置**を参照してください。

## start.js

ルート フォルダで、次のファイルを使用して `start.js` ファイルを作成します。

!> ファイル名は、**Herok** のような一部の配置では大文字と小文字が区別されます。このチュートリアルでは、小文字を使用します。

[start.js](_snippets/viewmodels/node/start.js ':include :type=code javascript')

このファイルは **express ** サーバを起動し、静的ファイル(`html` など)を提供し、API 要求をルーティングします。

## config.js

ルート フォルダで、`config.js` という名前のファイルを作成し、次の内容を指定します。

[config.js](_snippets/viewmodels/node/config.js ':include :type=code javascript')

ここでENV変数を定義します。Expressサーバの実行時には、これらの変数の値を使用して、必要な異なるAutodesk Forgeサービスに接続します。

最後に、2つのスコープ定義が見つかりました。内部スコープは、アクセストークンに対して、Forge Webサービスのさまざまなサービスを使用するための適切な権限(サーバ側)を与えます。このチュートリアルはビューアの使用を目的としており、パブリックの「viewables:read」スコープのみが必要です。

プロジェクトの準備ができました。この時点で、プロジェクトは次のようになります。

![](_media/nodejs/vs_code_project.png) 

次へ:[認証](oauth/2legged/)