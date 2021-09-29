# 创建新项目 (Node.js)

在计算机上创建一个文件夹，不要使用空格并避免使用特殊字符。在本教程中，我们使用 **forgesample**。

打开 **Visual Code**，然后转到 **File** 菜单，选择 **Open** (MacOS) 或 **Open Folder** (Windows)，并选择新创建的文件夹。 

现在，我们需要使用终端，转到菜单 **View** >> **Integrated Terminal**。底部应显示一个窗口。键入以下命令，然后按照步骤操作。为了与其他 Forge 示例保持一致，当系统提示您输入 **entry point:** 时，请使用 **start.js**。

```
npm init
```

这将创建 **package.json** 文件，该文件定义项目将使用的软件包。[了解更多信息](https://docs.npmjs.com/files/package.json)。

## 安装软件包

默认情况下，Node.js 项目为空，因此我们需要使用 **npm install** 安装几个软件包。我们先安装基本的 **express** 服务器、用于 JSON 处理的 **body-parser**、用于文件上传的 **multer** 以及 **Autodesk Forge**。

!> 一次运行一个 **npm install**。

```
npm install express --save
npm install multer --save
npm install cookie-session --save
npm install forge-apis --save
```

> `--save` 参数指示模块应作为依存关系包含在 **package.json** 文件中。

最后，打开 **package.json**，然后在 `"scripts"` 内添加 `"start": "node start.js",` 行。现在，您的文件夹应包含 **node_modules** 文件夹，并且您的 **package.json** 应如下所示：

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

> 版本号（例如 forge-apis 0.4.1）可能会有所不同，这个版本号是创建本教程时的最新版本。

## 文件和文件夹

要创建新文件夹或文件，请在左侧“Explorer”区域上单击鼠标右键，然后选择 **New Folder** 或 **New File**。

创建一个用于存放所有服务器端文件的 **/routes/** 文件夹和一个用于存放所有客户端文件的 **/public/** 文件夹。

此时，项目应具有以下结构：

![](_media/nodejs/vs_code_explorer.png) 

## launch.json

此文件向 Visual Studio Code 指示应如何运行项目。转到菜单 **Run** >> **Add Configuration...**，然后在顶部显示的 **Select Environment** 窗口中，选择 **Node.js**。在创建的 **/.vscode/launch.json** 文件中，输入以下内容：

!> 请注意，您需要在指示位置输入您的 **Forge Client ID 和 Secret**。

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

> 请务必将 **ID 和 Secret** 定义为环境变量，以便日后可以在线部署项目。稍后将在**部署**中详细介绍此内容。

## start.js

在根文件夹中，创建一个包含以下内容的 `start.js` 文件：

!> 对于某些部署（例如 **Heroku**），文件名区分大小写。在本教程中，我们使用小写。

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

此文件用于启动 **express** 服务器，提供静态文件（例如 `html`），并路由 API 请求。

## config.js

在根文件夹下，创建一个名为 `config.js` 的文件，其内容如下：

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

我们在此定义 ENV 变量。在运行 Express 服务器时，将使用这些变量的值连接到我们需要的不同 Autodesk Forge 服务。

最后，我们看到有 2 个范围定义。内部范围为访问 token 提供适当权限，以使用 Forge Web 服务（服务器端）的不同服务。本教程专门介绍 Viewer 的使用，对于 public，我们只需要“viewables:read”范围。

项目已准备就绪！此时，项目应如下所示：

![](_media/nodejs/vs_code_project.png) 

> **package-lock.json** 是 **npm** 创建的，不用担心
