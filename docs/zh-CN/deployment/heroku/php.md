# Heroku (PHP)

[步骤 1](/zh-CN/deployment/heroku/heroku_step1.md ':include :type=markdown')

使用以下内容： 
```
vendor/
.vscode/
.DS_Store
Thumbs.db
```

[步骤 2](/zh-CN/deployment/heroku/heroku_step2.md ':include :type=markdown')

```bash
heroku create forgesample
heroku git:remote -a forgesample
```

[步骤 3](/zh-CN/deployment/heroku/heroku_step3.md ':include :type=markdown')