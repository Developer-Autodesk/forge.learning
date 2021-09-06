# Autodesk 帳戶

您的 Autodesk Forge 帳戶是您的主要身分識別。

## 建立您的 Forge 帳戶

移往 [Forge Developer Portal](https://forge.autodesk.com/)，按一下「SIGN UP」按鈕以建立帳戶，或按一下「SIGN IN」以使用既有帳戶。如果建立新帳戶，請務必按一下將傳送給您的驗證電子郵件中的連結。

![](/_media/forge/dev_portal_home.png)

## 啟用固定期限使用授權

使用任何付費版 API (例如 **Model Derivative**) 之前，需要啟用您的試用版。在右上角，您會看到您的名字。按一下以展開功能表，並移往 **My Subscription**。在開啟的頁面上，按一下 **START FREE TRIAL**。這樣就可以了！

![](_media/account/activate_sub.png)

## 建立應用程式

在右上角，您會看到您的名字。按一下以展開功能表，並移往 **My Apps**。按一下「CREATE APP」按鈕。

選取您將要使用的 API (您現在可以安全地全選)。輸入您的應用程式名稱和描述，然後輸入回呼 URL：`http://localhost:3000/api/forge/callback/oauth` (本自學課程將不使用此回呼，但這是在其他 Autodesk Forge 範例中使用的 URL)

設置應用程式後，您將在新建立的應用程式頁面中看到用戶端 ID 和用戶端密碼。您將需要在所有其他 OAuth 流程中用到這些內容，進而完成此網站上的所有其他自學課程！

![](_media/account/create_app.gif)

!> **請勿**共用您的用戶端密碼，應將其保持機密性。

您現已準備就緒！

接下來：[工具](/zh-TW/environment/tools/)
