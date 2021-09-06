# Heroku (.NET Core)

[ステップ 1](/ja-JP/deployment/heroku/heroku_step1.md ':include :type=markdown')

Visual Studio 用の Github テンプレートを使用してみましょう: https://github.com/github/gitignore/blob/master/VisualStudio.gitignore

> Visual Code を使用している場合は、`.vscode` (環境変数を含む `launch.json` のフォルダ) を追加することを検討してください。

[ステップ 2](/ja-JP/deployment/heroku/heroku_step2.md ':include :type=markdown')

```bash
heroku create forgesample --buildpack https://github.com/jincod/dotnetcore-buildpack.git
heroku git:remote -a forgesample
```

[ステップ 3](/ja-JP/deployment/heroku/heroku_step3.md ':include :type=markdown')