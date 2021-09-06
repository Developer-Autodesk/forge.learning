> Heroku アプリ名は一意であるため、**create** で `Name is already taken` エラーが発生した場合は、別の名前を指定してください。

ローカル **git** が Heroku の **remote** コピーを認識するようになりました。ローカルからリモートに変更をプッシュするには、次の操作を行います。

```bash
git push heroku master
```

## 環境変数を設定する

ローカル開発と本稼働用のキーとシークレットを用意するためのベスト プラクティスです。そのため、Forge Developer Portal でアプリにアクセスして、[新しいアプリを作成します](/account/?id=create-an-app)。たとえば、**forge sample production** などです。 

[Heroku Dashboard](https://dashboard.heroku.com/) にサイン インします。ここにアプリがリストされます。**Settings** に移動し、次のビデオに示すように、**環境設定変数**を作成します。

![](_media/deployment/heroku/env_vars.gif) 

!> 3-legged アプリ(**BIM 360 と Fusion のモデルを表示する**)を作成する場合は、**FORGE_CALLBACK_URL** 環境設定変数も作成する必要があります。値は `https://YOUR_HEROKU_APP_NAME.herokuapp.com/api/forge/callback/oauth` である必要があります。Heroku と Forge 開発者ポータルで同じ値を設定してください。 

準備が完了しました!アプリは、次のような Heroku アドレスでライブ状態にする必要があります。**YourAppName.herokuapp.com**。

## 変更を配置する

プロジェクトの新しいバージョンがある場合は、必要に応じてログインし、`commit` と `push` のみをライブ状態にします。

```bash
heroku login
git add .
git commit -m "v2"
git push heroku master
```