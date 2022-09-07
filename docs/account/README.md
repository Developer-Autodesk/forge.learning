# Autodesk Account

Your Autodesk Forge account is your main identity.

## Creating your Forge account

Go to [Forge Developer Portal](https://forge.autodesk.com/), click the “SIGN IN” button to create or use an existing account. If you create a new account, be sure to click the link in the verification email that will be sent to you.

![](/_media/forge/01-developer-portal.png)

## Create an app

On the top-right, you'll see your name. Click to expand the menu and go to **Applications**.

![Aplications Menu](/_media/forge/02-my-apps.png)

Click the **Create application** button.

![Create application button](/_media/forge/03-app-list.png)

Enter your application name, and click the `Create` button.

![Create Application Dialog](/_media/forge/04-create-app.png)

Your application is now ready. Let's store your Client ID and Client Secret credentials as we will need these soon!

![Ready Application](/_media/forge/the-app-overview.png)

Finally, set the Callback URL under General Settings to `http://localhost:3000/api/forge/callback/oauth`(this tutorial will not use this callback, but that's the URL used on other Autodesk Forge samples), and select the APIs you are going to use (you can safely select all for now).

![API Selection](/_media/forge/old-tutorials-callback2.png)

Finally, update the application by clicking on the **Save changes** button, and you're all set!

![Save Chnages Button](/_media/forge/save-changes.png)

Once your application(s) is created, you will be able to view them on the **Applications** section of your account.

![Your Apps](/_media/forge/apps-arrangement.png)

!> **DO NOT** share your Client Secret, this should be kept confidential.

You are now good to go!

Next: [Tools](environment/tools/)
