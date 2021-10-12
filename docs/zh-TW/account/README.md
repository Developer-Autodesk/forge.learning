# Autodesk 帳號

Autodesk Forge 帳號是用來識別您的 Autodesk Forge 開發者身分。

## 建立您的 Forge 開發者帳號

前往 [Forge 開發者入口網站](https://forge.autodesk.com/)，按一下「SIGN UP」按鈕以建立開發者帳號，或按一下「SIGN IN」以既有 Autodesk 帳號登入。如果您選擇的是建立新帳號，請務必按一下將傳送給您的驗證電子郵件裡的連結。

![](/_media/forge/dev_portal_home.png)

## 開啟試用資格

在使用任何付費 API (例如 **Model Derivative**) 之前，您需要先開啟您的試用資格。按一下網站右上角顯示您的名字的部分，展開功能表，按一下並前往**「My Subscription」**。在開啟的頁面上，按一下**「START FREE TRIAL」**就可以了！這樣就可以了！

![](_media/account/activate_sub.png)

## 建立應用程式

按一下網站右上角顯示您的名字的部分，展開功能表，按一下並前往**「My Apps」**。按一下「CREATE APP」按鈕。

選取您將要使用的 API (您現在可以安全地全選)。輸入您的應用程式名稱和描述，然後輸入回呼 URL (callback URL)：`http://localhost:3000/api/forge/callback/oauth` (在「查看您的模型」和「Viewer 擴充功能」章節裡不會用到這個 callback URL，其他章節請依照指示設定)

設定應用程式後，您將在新建立的應用程式頁面中看到 Client ID 和 Client Secret。在往後的課程裡，您會在「OAuth」章節使用到這組金鑰，進而完成這網站課程裡的每個步驟。

![](_media/account/create_app.gif)

!> **請勿**透露或分享您的 Client Secret 於他人，應保持其機密性。

您現已準備就緒！

下一步：[開發工具及環境準備](/zh-TW/environment/tools/)
