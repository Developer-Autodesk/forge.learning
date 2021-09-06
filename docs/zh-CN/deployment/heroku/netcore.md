# Heroku (.NET Core)

[步骤 1](/zh-CN/deployment/heroku/heroku_step1.md ':include :type=markdown')

我们使用 Visual Studio 的 GitHub 模板：https://github.com/github/gitignore/blob/master/VisualStudio.gitignore

> 如果使用 Visual Code，请考虑添加 `.vscode`（即包含环境变量的 `launch.json` 的文件夹）。

[步骤 2](/zh-CN/deployment/heroku/heroku_step2.md ':include :type=markdown')

```bash
heroku create forgesample --buildpack https://github.com/jincod/dotnetcore-buildpack.git
heroku git:remote -a forgesample
```

[步骤 3](/zh-CN/deployment/heroku/heroku_step3.md ':include :type=markdown')