> Herok アプリ名は一意であるため、`Name is already taken on **create** というエラーが発生した場合は、別の名前を指定してください。`

現在は、ローカル **git** が Herok の **remote** コピーを認識するようになりました。ローカルからリモートに変更をプッシュするには、次の操作を行います。

```bash
git push heroku master
```

## 環境変数を設定する

ローカル開発とプロダクション用にキーとテクニックを持つベストプラクティスです。Forge Developer Portal でアプリにアクセスし、[新しいアプリを作成します](/ja_jp/account/?id=create-an-app)(たとえば、**forge サンプル プロダクション**)。 

[Herok Dashboard](https://dashboard.heroku.com/) にサインインします。このダッシュボードにアプリを表示します。**設定**に移動し、次のビデオに示すように、**環境設定変数**を作成します。

![](_media/deployment/heroku/env_vars.gif) 

!> 3 本足のアプリ(**BIM 360 および Fusion モデルの表示**)を作成する場合は、環境変数 **FORGE_CALLBACK_URL** を作成する必要もあります。値は `https://YOUR_HEROKU_APP_NAME.herokuapp.com/api/forge/callback/oauth` である必要があります。HerokとForgeデベロッパーポータルで同じ値を設定してください。 

準備ができました。アプリはHerokアドレスに配置する必要があります。たとえば、次のようになります。**YourAppName.herokuapp.com**.

## 変更を配置する

プロジェクトの新しいバージョンが作成されたら、必要に応じてログインし、`commit` と `push` を実行します。

```bash
heroku login
git add .
git commit -m "v2"
git push heroku master
```