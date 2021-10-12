# 新規プロジェクトを作成する(Node.js)

マシンにフォルダを作成します。スペースや特殊文字は使用しないでください。このチュートリアルでは、**forgesample** を使用してみましょう。

**Visual Studio Code** を開き、**File** メニューに移動し、**Open**(MacOS)または **Open Folder**(Windows)を選択して、新しく作成されたフォルダを選択します。 

ターミナルが必要なため、**View** メニュー >> **Integrated Terminal** の順に選択します。下部にウィンドウが表示されます。次のコマンドを入力して、手順に従います。他の Forge サンプルとの整合性を保つため、**エントリ ポイント**を入力するよう求められたら、**start.js** を使用します。

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
```

> `--save` パラメータは、モジュールを依存関係として **package.json** ファイルに含める必要があることを示します。

最後に **package.json** を開き、`"scripts"` 内に `"start": "node start.js",` 行を追加します。これで、フォルダに **node_modules** フォルダが作成されました。**package.json** は次のようになります。

```json
{
  "name": "forgesample",
  "version": "1.0.0",
  "description": "",
  "main": "start.js",
  "scripts": {
    "start": "node start.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "cookie-session": "^2.0.0-beta.3",
    "express": "^4.16.2",
    "forge-apis": "^0.4.1",
    "multer": "^1.3.0"
  }
}

```

> バージョン番号(forge-apis 0.4.1 など)は異なる場合があります。このバージョンは、このチュートリアルが作成された時点の最新バージョンです。

## ファイルとフォルダ

新しいフォルダまたはファイルを作成するには、左側の Explorer 領域を右クリックして、**New Folder** または **New File** を選択します。

すべてのサーバ側ファイル用に **/route/** フォルダを作成し、すべてのクライアント側ファイル用に **/public/** フォルダを作成します。

この時点で、プロジェクトは次のような構造になっています。

![](_media/nodejs/vs_code_explorer.png) 

## launch.json

このファイルは、Visual Studio Code にプロジェクトの実行方法を指定します。**Run** メニュー >> **Add Configuration...** の順に選択し、上部に表示される **Select Environmen** ウィンドウで **Node.js** を選択します。作成された **/.vscode/launch.json** ファイルに、次のように入力します。

!> 指定されたスペースに **Forge の Client ID と Secret** を入力する必要があります。

```json
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch Program",
            "program": "${workspaceFolder}/start.js",
            "env": {
                "FORGE_CLIENT_ID": "your id here",
                "FORGE_CLIENT_SECRET": "your secret here",
                "FORGE_CALLBACK_URL": "http://localhost:3000/api/forge/callback/oauth"
            }
        }
    ]
}
```

> 後でプロジェクトをオンラインでデプロイできるように、**ID と Secret** を環境変数として定義することが重要です。詳細については、後で「**デプロイ**」を参照してください。

## start.js

ルート フォルダで、次の内容を含む `start.js` ファイルを作成します。

!> デプロイによっては、**Heroku** のように、ファイル名の大文字と小文字が区別されることがあります。このチュートリアルでは、小文字を使用しましょう。

```javascript
const path = require('path');
const express = require('express');
const cookieSession = require('cookie-session');

const PORT = process.env.PORT || 3000;
const config = require('./config');
if (config.credentials.client_id == null || config.credentials.client_secret == null) {
    console.error('Missing FORGE_CLIENT_ID or FORGE_CLIENT_SECRET env. variables.');
    return;
}

let app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieSession({
    name: 'forge_session',
    keys: ['forge_secure_key'],
    secure: (process.env.NODE_ENV === 'production'),
    maxAge: 14 * 24 * 60 * 60 * 1000 // 14 days, same as refresh token
}));
app.use(express.json({ limit: '50mb' }));
app.use('/api/forge', require('./routes/oauth'));
app.use('/api/forge', require('./routes/datamanagement'));
app.use('/api/forge', require('./routes/user'));
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json(err);
});
app.listen(PORT, () => { console.log(`Server listening on port ${PORT}`); });
```

このファイルは、**Express** サーバを起動し、静的ファイル(`html` など)を提供して、API リクエストをルーティングします。

## config.js

ルート フォルダで、次の内容を含む、`config.js` という名前のファイルを作成します。

```javascript
// Autodesk Forge configuration
module.exports = {
    // Set environment variables or hard-code here
    credentials: {
        client_id: process.env.FORGE_CLIENT_ID,
        client_secret: process.env.FORGE_CLIENT_SECRET,
        callback_url: process.env.FORGE_CALLBACK_URL
    },
    scopes: {
        // Required scopes for the server-side application
        internal: ['bucket:create', 'bucket:read', 'data:read', 'data:create', 'data:write'],
        // Required scope for the client-side viewer
        public: ['viewables:read']
    }
};
```

ここで ENV 変数を定義します。Express サーバの実行時に、これらの変数の値を使用して、必要になる別の Autodesk Forge サービスに接続します。

最後に、2 つのスコープが定義されています。内部スコープは、アクセス トークンに、Forge Web サービス(サーバ側)のさまざまなサービスを使用するのに適した権限を付与します。このチュートリアルはビューアの使用に特化しています。一般に必要なのは、「viewables:read」スコープのみです。

プロジェクトの準備ができました!この時点で、プロジェクトは次のようになります。

![](_media/nodejs/vs_code_project.png) 

> **package-lock.json** が **npm** によって作成されましたが、問題はありません。
