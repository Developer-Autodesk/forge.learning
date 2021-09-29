# 建立新專案 (Node.js)

在您的電腦上建立資料夾，請勿使用空格並避免使用特殊字元。在本自學課程中，讓我們使用 **forgesample** 作為資料夾名稱。

開啟 [Visual Code](https://code.visualstudio.com/download)，移往功能表 **File**，並選取 **Open** (MacOS) 或 **Open Folder** (Windows)，然後選取新建立的資料夾。 

現在，我們需要終端機，請移往功能表 **View** >> **Terminal**。視窗應顯示在底部。輸入下列指令並遵循這些步驟，您可以安全地接受預設建議 (**entry point:** 除外)，使用 **start.js** (用於大多數 Forge 範例)。

```
npm init
```

這會建立 **package.json** 檔案，用於定義專案將使用哪些套件。[瞭解更多](https://docs.npmjs.com/files/package.json)。

## 安裝套件

依預設，Node.js 專案是空的，因此我們需要透過 **npm install** 安裝一些套件。讓我們從以下內容開始：基本 **Express** 伺服器、**body-parser** (用於 JSON 處理)、**multer** (用於檔案上傳)，當然還有 **Autodesk Forge**。

!> 一次執行一個 **npm install**。

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

> `--save` 參數指示模組應作為從屬項包含在 **package.json** 檔案中。

最後，開啟 **package.json**，並在 `"scripts"` 內加入 `"start": "node start.js",` 行。現在，您的資料夾應包含 **node_modules** 資料夾，並且 **package.json** 應如下所示：

[package.json](_snippets/modifymodels/node/package.json ':include :type=code json')

> 版本號碼 (例如 forge-apis 0.8.5) 可能有所不同，這是建立本自學課程時的最新版本。

## 檔案和資料夾

若要建立新資料夾或檔案，請在左側的「Explorer」區域上按一下右鍵，然後選取 **New Folder** 或 **New File**。

請為所有伺服器端檔案建立 **/routes/** 資料夾，為所有用戶端檔案建立 **/public/** 資料夾。

此時，您的專案應具有以下結構：

![](_media/nodejs/vs_code_explorer_da.png) 

## launch.json

此檔案用來告訴 Visual Studio Code 如何執行我們的 node.js 專案。移往功能表 **Run** >> **Add Configuration...**，然後在顯示於頂部的 **Select Environment** 視窗中選擇 **Node.js**。在建立的 **/.vscode/launch.json** 檔案中輸入以下內容：

!> 請注意，您需要在指定的空白處輸入 **Forge Client ID & Secret**。

[launch.json](_snippets/modifymodels/node/launch.json ':include :type=code json')

> 將 **ID & Secret** 定義為環境變數很重要，這樣我們的專案稍後就可以在線上部署。稍後可在**「部署」**章節中瞭解更多相關資訊。

## start.js

此檔案用於啟動 **Express **伺服器。在根資料夾中建立 `start.js` 檔案，其中包含：

!> 有些部署方式的檔案命名方式是有區分大小寫，例如 **Heroku**。所以，在本自學課程中，讓我們在檔名的部分一律使用小寫進行命名。

[start.js](_snippets/modifymodels/node/start.js ':include :type=code javascript')

## server.js

此檔案用於提供靜態檔案 (例如 `html`) 和路由 API 請求。在根資料夾中，建立含有以下內容名為 `server.js` 的檔案：

[server.js](_snippets/modifymodels/node/server.js ':include :type=code javascript')

## socket.io.js

在根資料夾中，建立含有以下內容名為 `socket.io.js` 的檔案：

[socket.io.js](_snippets/modifymodels/node/socket.io.js ':include :type=code javascript')

## config.js

在根資料夾中，建立含有以下內容名為 `config.js` 的檔案：

[config.js](_snippets/modifymodels/node/config.js ':include :type=code javascript')

在此處，我們使用的是環境變數。執行 Express 伺服器時，這些變數的值將用於連接至 Autodesk Forge。

## routes/common/oauth.js

現在，請在 `routes` 資料夾中建立 `common` 子資料夾，然後準備一個會實際向 Forge 請求 access Token 的 `routes/common/oauth.js` 檔案。這將會重複用於本自學課程的其他部分。

[routes/common/oauth.js](_snippets/modifymodels/node/routes/common/oauth.js ':include :type=code javascript')

專案已準備就緒！此時，您的專案應如下所示：

![](_media/nodejs/vs_code_project_da.PNG) 

> **package-lock.json **是因執行上面的 **npm** 命令所產生，請不用擔心。

下一步：[基本應用程式使用者介面](/zh-TW/designautomation/html/README.md)
