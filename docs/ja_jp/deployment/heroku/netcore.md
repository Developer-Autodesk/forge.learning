# Herok (.NET Core)

[step1](/ja_jp/deployment/heroku/heroku_step1.md ':include :type=markdown')

Visual Studio用のGithubテンプレートを使用してみましょう: https://github.com/github/gitignore/blob/master/VisualStudio.gitignore

> ビジュアル コードを使用する場合は、`.vscode` (環境変数を持つ `launch.json` のフォルダ)を追加することを検討してください。

[step2](/ja_jp/deployment/heroku/heroku_step2.md ':include :type=markdown')

```bash
heroku create forgesample --buildpack https://github.com/jincod/dotnetcore-buildpack.git
heroku git:remote -a forgesample
```

[step3](/ja_jp/deployment/heroku/heroku_step3.md ':include :type=markdown')