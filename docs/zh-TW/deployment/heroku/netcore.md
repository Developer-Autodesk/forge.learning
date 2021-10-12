# Heroku (.NET Core)

[步驟 1](/zh-TW/deployment/heroku/heroku_step1.md ':include :type=markdown')

讓我們使用適用於 Visual Studio 的 Github 樣板：https://github.com/github/gitignore/blob/master/VisualStudio.gitignore

> 如果使用的是 Visual Studio Code，請考慮加入 `.vscode` (即包含環境變數的 `launch.json` 資料夾)。

[步驟 2](/zh-TW/deployment/heroku/heroku_step2.md ':include :type=markdown')

```bash
heroku create forgesample --buildpack https://github.com/jincod/dotnetcore-buildpack.git
heroku git:remote -a forgesample
```

[步驟 3](/zh-TW/deployment/heroku/heroku_step3.md ':include :type=markdown')