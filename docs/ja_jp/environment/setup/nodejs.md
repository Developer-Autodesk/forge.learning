# 新しいプロジェクト(Node.js)を作成する

コンピュータにフォルダを作成し、スペースを使用せず、特殊文字を使用しないでください。このチュートリアルでは、**forgesample** を使用します。

**ビジュアル コード**を開き、メニュー **ファイル**に移動して、**開く**(MacOS)または **開く**(Windows)を選択し、新しく作成されたフォルダを選択します。 

次に、ターミナルが必要です。**View** >> **Integrated Terminal** メニューを選択します。ウィンドウが下部に表示されます。次のコマンドを入力して、手順に従います。他の Forge サンプルとの整合性を保つため、**エントリ ポイント: ** の入力を求めるプロンプトが表示されたら、**start.js** を使用します。

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
```

> `--save` パラメータは、モジュールが依存関係として **package.json** ファイルに含まれる必要があることを示します。

最後に **package.json** を開き、`"scripts"` 内で `"start": "node start.js",` 行を追加します。これで、フォルダに **node_modules** フォルダが作成され、**package.json** は次のようになります。

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

> バージョン番号(forge-api 0.4.1など)は異なる場合があり、このチュートリアルが作成された最新バージョンです。

## ファイルとフォルダ

新しいフォルダまたはファイルを作成するには、左側の「エクスプローラ」領域を右クリックし、**New Folder** または **New File** を選択します。

すべてのサーバ側ファイルに **/route/** フォルダを、すべてのクライアント側ファイルに **/public/** フォルダを作成します。

この時点で、プロジェクトは次の構造になっています。

![](_media/nodejs/vs_code_explorer.png) 

## launch.json

このファイルは、プロジェクトの実行方法をVisual Studio Codeに示しています。**メニューに移動し、** >> **Add Configuration...** を実行します。上部に表示される **Select Environment** ウィンドウで、**Node.js** を選択します。作成された **/.vscode/launch.json** ファイルに、次のように入力します。

!> 示されたスペースに **Forge Client ID & Secret** を入力する必要があります。

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

> 後でプロジェクトをオンラインで配置できるように、**ID & Secret** を環境変数として定義することが重要です。詳細については、**配置**を参照してください。

## start.js

ルートフォルダで、次のファイルを使用して`start.js`ファイルを作成します。

!> ファイル名は、**Herok** のような一部の配置では大文字と小文字が区別されます。このチュートリアルでは、小文字を使用します。

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

このファイルは、**express ** サーバを起動し、静的ファイル(`html` など)を提供し、API 要求をルーティングします。

## config.js

ルートフォルダで、`config.js`という名前のファイルを次の内容で作成します。

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

ここでENV変数を定義します。Expressサーバの実行時には、これらの変数の値を使用して、必要な異なるAutodesk Forgeサービスに接続します。

最後に、2つのスコープ定義が見つかりました。内部スコープは、アクセストークンに対して、Forge Webサービスのさまざまなサービスを使用するための適切な権限(サーバ側)を与えます。このチュートリアルはビューアの使用を目的としており、パブリックの「viewables:read」スコープのみが必要です。

プロジェクトの準備ができました。この時点で、プロジェクトは次のようになります。

![](_media/nodejs/vs_code_project.png) 

> **package-lock.json** は **npm** によって作成されましたが、心配ありません
