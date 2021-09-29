# 建立新專案 (Node.js)

在您的電腦上建立資料夾，請勿使用空格並避免使用特殊字元。在本自學課程中，讓我們使用 **forgesample** 作為資料夾名稱。

開啟 **Visual Code**，移往功能表 **File**，並選取 **Open** (MacOS) 或 **Open Folder** (Windows)，然後選取新建立的資料夾。 

現在，我們需要終端機，請移往功能表 **View** >> **Integrated Terminal**。視窗應顯示在底部。輸入下列指令並遵循這些步驟。為了與其他 Forge 範例保持一致，當系統提示輸入 **entry point:** 時，請使用 **start.js**。

```
npm init
```

這會建立 **package.json** 檔案，用於定義專案將使用哪些套件。[瞭解更多](https://docs.npmjs.com/files/package.json)。

## 安裝套件

依預設，Node.js 專案是空的，因此我們需要透過 **npm install** 安裝一些套件。讓我們從以下內容開始：基本 **Express** 伺服器、**cookie-session** (用於處理驗證階段作業資料)、**multer** (用於檔案上傳)，當然還有 **Autodesk Forge**。

!> 一次執行一個 **npm install**。

```
npm install express --save
npm install cookie-session --save
npm install forge-apis --save
```

> `--save` 參數指示模組應作為從屬項包含在 **package.json** 檔案中。

最後，開啟 **package.json**，並在 `"scripts"` 內加入 `"start": "node start.js",` 行。現在，您的資料夾應包含 **node_modules** 資料夾，並且 **package.json** 應如下所示：

[package.json](_snippets/viewhubmodels/node/package.json ':include :type=code json')

> 版本號碼 (例如 forge-apis 0.4.1) 可能有所不同，這是建立本自學課程時的最新版本。

## 檔案和資料夾

若要建立新資料夾或檔案，請在左側的「Explorer」區域上按一下右鍵，然後選取 **New Folder** 或 **New File**。

請為所有伺服器端檔案建立 **/routes/** 資料夾，為所有用戶端檔案建立 **/public/** 資料夾。

此時，您的專案應具有以下結構：

![](_media/nodejs/vs_code_explorer.png) 

> **package-lock.json **是因執行上面的 **npm** 命令所產生，請不用擔心。

## launch.json

此檔案用來告訴 Visual Studio Code 如何執行我們的 node.js 專案。移往功能表 **Debug** >> **Add Configuration...**，然後在顯示於頂部的 **Select Environment** 視窗中選擇 **Node.js**。在建立的 **/.vscode/launch.json** 檔案中輸入以下內容：

!> 請注意，您需要在指定的空白處輸入 **Forge Client ID & Secret**。

[launch.json](_snippets/viewhubmodels/node/launch.json ':include :type=code json')

> 將 **ID & Secret** 定義為環境變數很重要，這樣我們的專案稍後就可以在線上部署。稍後可在**「部署」**章節中瞭解更多相關資訊。

## start.js

在根資料夾中建立 `start.js` 檔案，其中包含：

!> 有些部署方式的檔案命名方式是有區分大小寫，例如 **Heroku**。所以，在本自學課程中，讓我們在檔名的部分一律使用小寫進行命名。

[start.js](_snippets/viewhubmodels/node/start.js ':include :type=code javascript')

此檔案用於啟動 **Express **伺服器，提供靜態檔案 (例如 `html`) 以及路由 API 請求。

## config.js

在根資料夾中，建立含有以下內容名為 `config.js` 的檔案：

[config.js](_snippets/viewhubmodels/node/config.js ':include :type=code javascript')

在這裡，我們將定義 ENV 變數。執行 Express 伺服器時，這些變數的值將用於連接至我們需要的其他 Autodesk Forge 服務。

最後，我們看到有 2 種範圍定義。內部範圍為 access Token 提供了使用 Forge Web Services (伺服器端) 不同服務的適當權限。本自學課程專門介紹 Viewer 的使用，針對公開專案，我們將僅需要「viewables:read」範圍。

專案已準備就緒！此時，您的專案應如下所示：

![](_media/nodejs/vs_code_project.png) 

下一步：[授權](/zh-TW/oauth/3legged/)
