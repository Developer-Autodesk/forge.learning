> Heroku 應用程式名稱是唯一的，因此，如果在**建立**時收到 `Name is already taken` 錯誤，請嘗試使用其他名稱。

現在，您的本端 **git** 知道 Heroku 上的**遠端**複本。透過以下指令將變更從本端推送至遠端：

```bash
git push heroku master
```

## 設置環境變數

最好擁有本端開發和生產所需的機碼和密碼，請移往 Forge 開發人員入口網站上的應用程式並[建立新的應用程式](/zh-TW/account/?id=create-an-app)，例如 **Forge 範例生產**。 

登入 [Heroku Dashboard](https://dashboard.heroku.com/)，您的應用程式將在此列示。移往 **Settings**，然後建立 **Config Vars**，如以下影片所示：

![](_media/deployment/heroku/env_vars.gif) 

!> 如果您要建立 3 層應用程式 (**檢視 BIM 360 和 Fusion 模型**)，則還需要建立 **FORGE_CALLBACK_URL** 規劃變數，該值應為 `https://YOUR_HEROKU_APP_NAME.herokuapp.com/api/forge/callback/oauth`。請務必在 Heroku 和 Forge 開發人員入口網站上設定相同的值！ 

已準備就緒！您的應用程式應在 Heroku 位址上線，類似如下：**YourAppName.herokuapp.com**。

## 部署變更

當您有新版本的專案時，請視需要登入，然後只需實現 `commit` 和 `push` 即可：

```bash
heroku login
git add .
git commit -m "v2"
git push heroku master
```