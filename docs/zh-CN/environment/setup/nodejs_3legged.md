# 创建新项目 (Node.js)

在计算机上创建一个文件夹，不要使用空格并避免使用特殊字符。在本教程中，我们使用 **forgesample**。

打开 **Visual Studio Code**，然后转到 **File** 菜单，选择 **Open** (MacOS) 或 **Open Folder** (Windows)，并选择新创建的文件夹。 

现在，我们需要使用终端，转到菜单 **View** >> **Integrated Terminal**。底部应显示一个窗口。键入以下命令，然后按照步骤操作。为了与其他 Forge 示例保持一致，当系统提示您输入 **entry point:** 时，请使用 **start.js**。

```
npm init
```

这将创建 **package.json** 文件，该文件定义项目将使用的软件包。[了解更多信息](https://docs.npmjs.com/files/package.json)。

## 安装软件包

默认情况下，Node.js 项目为空，因此我们需要使用 **npm install** 安装几个软件包。我们先安装基本的 **express** 服务器、用于处理身份验证会话数据的 **cookie-session**、用于文件上传的 **multer** 以及 **Autodesk Forge**。

!> 一次运行一个 **npm install**。

```
npm install express --save
npm install cookie-session --save
npm install forge-apis --save
```

> `--save` 参数指示模块应作为依存关系包含在 **package.json** 文件中。

最后，打开 **package.json**，然后在 `"scripts"` 内添加 `"start": "node start.js",` 行。现在，您的文件夹应包含 **node_modules** 文件夹，并且您的 **package.json** 应如下所示：

[package.json](_snippets/viewhubmodels/node/package.json ':include :type=code json')

> 版本号（例如 forge-apis 0.4.1）可能会有所不同，这个版本号是创建本教程时的最新版本。

## 文件和文件夹

要创建新文件夹或文件，请在左侧“Explorer”区域上单击鼠标右键，然后选择 **New Folder** 或 **New File**。

创建一个用于存放所有服务器端文件的 **/routes/** 文件夹和一个用于存放所有客户端文件的 **/public/** 文件夹。

此时，项目应具有以下结构：

![](_media/nodejs/vs_code_explorer.png) 

> **package-lock.json** 是 **npm** 创建的，不用担心

## launch.json

此文件向 Visual Studio Code 指示应如何运行项目。转到菜单 **Debug** >> **Add Configuration...**，然后在顶部显示的 **Select Environment** 窗口中，选择 **Node.js**。在创建的 **/.vscode/launch.json** 文件中，输入以下内容：

!> 请注意，您需要在指示位置输入您的 **Forge Client ID 和 Secret**。

[launch.json](_snippets/viewhubmodels/node/launch.json ':include :type=code json')

> 请务必将 **ID 和 Secret** 定义为环境变量，以便日后可以在线部署项目。稍后将在**部署**中详细介绍此内容。

## start.js

在根文件夹中，创建一个包含以下内容的 `start.js` 文件：

!> 对于某些部署（例如 **Heroku**），文件名区分大小写。在本教程中，我们使用小写。

[start.js](_snippets/viewhubmodels/node/start.js ':include :type=code javascript')

此文件用于启动 **express** 服务器，提供静态文件（例如 `html`），并路由 API 请求。

## config.js

在根文件夹下，创建一个名为 `config.js` 的文件，其内容如下：

[config.js](_snippets/viewhubmodels/node/config.js ':include :type=code javascript')

我们在此定义 ENV 变量。在运行 Express 服务器时，将使用这些变量的值连接到我们需要的不同 Autodesk Forge 服务。

最后，我们看到有 2 个范围定义。内部范围为访问 token 提供适当权限，以使用 Forge Web 服务（服务器端）的不同服务。本教程专门介绍 Viewer 的使用，对于 public，我们只需要“viewables:read”范围。

项目已准备就绪！此时，项目应如下所示：

![](_media/nodejs/vs_code_project.png) 

下一步：[授权](/zh-CN/oauth/3legged/)
