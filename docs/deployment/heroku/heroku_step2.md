Now initialize **git** for the folder and commit current files. On the terminal (menu **View** >> **Integrated terminal**) type (one line at a time):

```bash
git init
git add .
git commit -m "v1"
```

## Conect to Heroku

Now time to deploy this `v1` of our sample. On the same terminal, sign in to your account:

```bash
heroku login
```

Then create the Heroku app and link with your local folder (one line at a time):