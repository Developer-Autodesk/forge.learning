# Heroku (PHP)

[步驟 1](/zh-TW/deployment/heroku/heroku_step1.md ':include :type=markdown')

讓我們使用以下內容： 
```
vendor/
.vscode/
.DS_Store
Thumbs.db
```

[步驟 2](/zh-TW/deployment/heroku/heroku_step2.md ':include :type=markdown')

```bash
heroku create forgesample
heroku git:remote -a forgesample
```

[步驟 3](/zh-TW/deployment/heroku/heroku_step3.md ':include :type=markdown')