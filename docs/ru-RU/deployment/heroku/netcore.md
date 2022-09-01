# Heroku (.NET Core)

[Шаг 1](/ru-RU/deployment/heroku/heroku_step1.md ':include :type=markdown')

Давайте использовать шаблон Github для Visual Studio: https://github.com/github/gitignore/blob/master/VisualStudio.gitignore

> При использовании Visual Code вы можете добавить `.vscode` (это папка вашего `launch.json` с переменными среды).

[Шаг 2](/ru-RU/deployment/heroku/heroku_step2.md ':include :type=markdown')

```bash
heroku create forgesample --buildpack https://github.com/jincod/dotnetcore-buildpack.git
heroku git:remote -a forgesample
```

[Шаг 3](/ru-RU/deployment/heroku/heroku_step3.md ':include :type=markdown')

[Эта страница на английском языке](https://learnforge.autodesk.io/#/deployment/heroku/netcore).
