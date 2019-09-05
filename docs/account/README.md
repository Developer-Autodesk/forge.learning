# Autodesk Account

Your Autodesk Forge account is your main identity.

## Creating your Forge account

Go to [Forge Developer Portal](https://developer.autodesk.com/), click the “SIGN UP” button to create an account or "SIGN IN" to use an existing account. If you create a new account, be sure to click the link in the verification email that will be sent to you.

![](/_media/forge/dev_portal_home.png)

## Activate subscription

Before using any of the paid APIs, like **Model Derivative**, you need to activate your trial. On the top-right, you'll see your name. Click to expand the menu and go to **My Subscription**. On the page that opens, click on **START FREE TRIAL**. That's it.

![](_media/account/activate_sub.png)

## Create an app

On the top-right, you'll see your name. Click to expand the menu and go to **My Apps**. Click the “CREATE APP” button.

Select APIs you are going to use (you can safely select all for now). Enter your application name and description, then enter a callback URL: `http://localhost:3000/api/forge/callback/oauth` (this tutorial will not use this callback, but that's the URL used on other Autodesk Forge samples)

Once you set up an application, you will see a Client ID and Client Secret in your newly created app page. You will need these in all other OAuth flows and, by extension, to complete every other tutorial on this site!

![](_media/account/create_app.gif)

!> **DO NOT** share your Client Secret, this should be kept confidential.

You are now good to go!

Next: [Tools](environment/tools/)
