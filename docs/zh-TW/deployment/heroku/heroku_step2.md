現在，針對資料夾初始化 **git** 並交付目前檔案。在終端機 (功能表 **View** >> **Integrated terminal**) 上輸入 (一次一行)：

```bash
git init
git add .
git commit -m "v1"
```

## 連接至 Heroku

現在是時候在範例中部署此 `v1` 了。在同一終端機上，登入您的帳戶：

```bash
heroku login
```

然後，建立 Heroku 應用程式並與您的本端資料夾連結 (一次一行)：