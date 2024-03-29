# Autodesk Account

Autodesk Forge アカウントがメイン ID になります。

## Forge アカウントを作成する

[Forge 開発者ポータル](https://forge.autodesk.com/)に移動し、\[SIGN UP]ボタンをクリックしてアカウントを作成するか、\[SIGN IN]をクリックして既存のアカウントを使用します。新しいアカウントを作成する場合は、送信される確認メールのリンクをクリックしてください。

![](/_media/forge/dev_portal_home.png)

## サブスクリプションをアクティブ化する

**Model Derivative** など、課金対象の API を使用する前に、体験版をアクティブにする必要があります。右上に名前が表示されます。クリックしてメニューを展開し、**My Subscription** に移動します。開いたページで、**START FREE TRIAL** をクリックします。以上で完了です。

![](_media/account/activate_sub.png)

## アプリを作成する

右上に名前が表示されます。クリックしてメニューを展開し、**My Apps** に移動します。\[CREATE APP]ボタンをクリックします。

使用する API を選択します(現時点では、すべてを安全に選択できます)。アプリケーション名と説明を入力し、コールバック URL を入力します: `http://localhost:3000/api/forge/callback/oauth` (このチュートリアルでは、このコールバックは使用しませんが、別の Autodesk Forge サンプルで使用される URL です)

アプリケーションを設定すると、新しく作成したアプリケーション ページに Client ID と Client Secret が表示されます。これらは、他のすべての OAuth フローで必要となります。また、このサイトの他のすべてのチュートリアルを完了するためにも必要です。

![](_media/account/create_app.gif)

!> Client Secret を共有**しないでください**。これは機密情報として扱う必要があります。

準備が完了しました。

次の作業:[ツール](/ja-JP/environment/tools/)
