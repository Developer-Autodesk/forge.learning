# Heroku 

First, create and activate your [Heroku account](https://www.heroku.com/).

## Prerequisites

Heroku manages app deployments with Git, the popular version control system. The Heroku Command Line Interface (CLI) makes it easy to create and manage your Heroku apps directly from the terminal. It’s an essential part of using Heroku.

- [Install Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Install Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)

## Prepare your project

On the **forgesample** project root folder create a `.gitignore` file and add the content that should not be controlled by **git**, for example:

- Node.js:
```
node_modules/
.vscode
Thumbs.db
```

- PHP:
```
vendor/
.DS_Store
.vscode
```

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

```bash
heroku create forgesample
heroku git:remote -a forgesample
```

> Heroku app names are unique, so try a different name if you get `Name is already taken` error on **create**.

Now your local **git** knows about the **remote** copy on Heroku. Push changes from your local to remote with:

```bash
git push heroku master
```

## Setup environment variables

Is a best practice to have keys & secrets for local development and for production, so go to your apps on Forge Developer Portal and [create a new app](/account/?id=create-an-app), for instance, **forge sample production**. 

Sign in on [Heroku Dashboard](https://dashboard.heroku.com/) where you app should be listed. Go to **Settings** and create the **Config Vars** as shown on the video below:

![](_media/deployment/heroku/env_vars.gif) 

Ready! You app should be live at your Heroku address, something like: **YourAppName.herokuapp.com**.

## Deploy changes

When you have a new version of your project, login if needed, then just `commit` and `push` live:

```bash
heroku login
git add .
git commit -m "v2"
git push heroku master
```