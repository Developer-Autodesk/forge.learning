> Heroku 应用程序名称是唯一的，因此，如果在**创建**时出现 `Name is already taken` 错误，请尝试使用其他名称。

现在，您的本地 **git** 知道 Heroku 上的**远程**副本。使用以下命令将更改从本地推送到远程：

```bash
git push heroku master
```

## 设置环境变量

这是为本地开发和制作提供密钥的最佳实践。转到 Forge 开发人员门户上的应用程序，并[创建新应用程序](/zh-CN/account/?id=create-an-app)，例如 **forge 示例制作**。 

登录 [Heroku 面板](https://dashboard.heroku.com/)，您的应用程序应列在其中。转到 **Settings**，然后创建 **Config Vars**，如以下视频中所示：

![](_media/deployment/heroku/env_vars.gif) 

!> 如果要创建三条腿的应用程序（**查看 BIM 360 和 Fusion 模型**），还需要创建 **FORGE_CALLBACK_URL** 配置变量，值应为 `https://YOUR_HEROKU_APP_NAME.herokuapp.com/api/forge/callback/oauth`。请务必在 Heroku 和 Forge 开发人员门户上设置相同的值！ 

准备就绪！您的应用程序应该在 Heroku 地址上运行，例如：**YourAppName.herokuapp.com**。

## 部署更改

如果您的项目有新版本，请登录（如果需要），然后执行 `commit` 和 `push` 命令即可：

```bash
heroku login
git add .
git commit -m "v2"
git push heroku master
```