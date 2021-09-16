ここで、フォルダの **git** を初期化し、現在のファイルをコミットします。ターミナル(**View** メニュー >> **Integrated terminal**)で、次のように入力します(一度に 1 行ずつ)。

```bash
git init
git add .
git commit -m "v1"
```

## Heroku に接続

ここで、サンプルのこの `v1` をデプロイします。同じターミナルで、アカウントにサインインします。

```bash
heroku login
```

次に、Heroku アプリを作成し、ローカル フォルダにリンクします(一度に 1 行ずつ)。