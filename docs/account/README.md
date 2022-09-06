# Autodesk Account

Your Autodesk Forge account is your main identity.

## Creating your Forge account

Go to [Forge Developer Portal](https://forge.autodesk.com/), click the “SIGN IN” button to create or use an existing account. If you create a new account, be sure to click the link in the verification email that will be sent to you.

![](/_media/forge/dev_portal_home.png)

## Create an app

On the top-right, you'll see your name. Click to expand the menu and go to **Applications**.

![Aplications Menu](/_media/forge/02-my-apps.png)

Click the “Create application” button.

![Create application button](/_media/forge/03-app-list.png)

![Create Application Dialog](/_media/forge/04-create-app.png)

Select APIs you are going to use (you can safely select all for now). Enter your application name and description, then enter a callback URL: `http://localhost:3000/api/forge/callback/oauth` (this tutorial will not use this callback, but that's the URL used on other Autodesk Forge samples)

![API Selection](/_media/forge/06-apis.png)

Once you set up an application, you will see a Client ID and Client Secret in your newly created app page. You will need these in all other OAuth flows and, by extension, to complete every other tutorial on this site!

![Appliaction Overview](/_media/forge/app-overview.png)

!> **DO NOT** share your Client Secret, this should be kept confidential.

You are now good to go!

Next: [Tools](environment/tools/)
