现在，为文件夹初始化 **git** 并提交当前文件。在终端（菜单 **View** >> **Integrated terminal**）上，键入以下内容（一次一行）：

```bash
git init
git add .
git commit -m "v1"
```

## 连接到 Heroku

现在，我们来部署示例的这个 `v1`。在同一终端上，登录到您的帐户：

```bash
heroku login
```

然后创建 Heroku 应用程序并链接到本地文件夹（一次一行）：