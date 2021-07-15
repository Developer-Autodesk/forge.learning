> Heroku app names are unique, so try a different name if you get `Name is already taken` error on **create**.

Now your local **git** knows about the **remote** copy on Heroku. Push changes from your local to remote with:

```bash
git push heroku master
```

## Setup environment variables

Is a best practice to have keys & secrets for local development and for production, so go to your apps on Forge Developer Portal and [create a new app](/account/?id=create-an-app), for instance, **forge sample production**. 

Sign in on [Heroku Dashboard](https://dashboard.heroku.com/) where you app should be listed. Go to **Settings** and create the **Config Vars** as shown on the video below:

![](_media/deployment/heroku/env_vars.gif) 

!> If you're create a 3-legged app (**View BIM 360 & Fusion models**) you also need to create the **FORGE_CALLBACK_URL** config var, th the value should be `https://YOUR_HEROKU_APP_NAME.herokuapp.com/api/forge/callback/oauth`. Remember to set the same value on Heroku and Forge Developer Portal! 

Ready! You app should be live at your Heroku address, something like: **YourAppName.herokuapp.com**.

## Deploy changes

When you have a new version of your project, login if needed, then just `commit` and `push` live:

```bash
heroku login
git add .
git commit -m "v2"
git push heroku master
```