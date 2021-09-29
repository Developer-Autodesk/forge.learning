# Autodesk 帐户

您的 Autodesk Forge 帐户是您的主要身份。

## 创建 Forge 帐户

转到 [Forge 开发人员门户](https://forge.autodesk.com/)，单击“SIGN UP”按钮以创建帐户，或单击“SIGN IN”以使用现有帐户。如果您创建新帐户，请务必单击将发送给您的验证电子邮件中的链接。

![](/_media/forge/dev_portal_home.png)

## 激活固定期限使用许可

在使用任何付费 API（如 **Model Derivative**）之前，您需要激活试用版。在右上角，您将看到自己的姓名。单击以展开菜单，然后转到 **My Subscription**。在打开的页面上，单击 **START FREE TRIAL**。如下所示。

![](_media/account/activate_sub.png)

## 创建应用程序

在右上角，您将看到自己的姓名。单击以展开菜单，然后转到 **My Apps**。单击“CREATE APP”按钮。

选择您将要使用的 API（您现在可以安全地选择所有 API）。输入应用程序名称和说明，然后输入回调 URL：`http://localhost:3000/api/forge/callback/oauth`（本教程不会使用此回调，但这是其他 Autodesk Forge 示例中使用的 URL）

设置应用程序后，您将在新创建的应用程序页面中看到 Client ID 和 Client Secret。在所有其他 OAuth 流程中，您将需要这些信息；此外，在完成本站点上所有其他教程时，您也需要这些信息。

![](_media/account/create_app.gif)

!> **请勿**共享您的 Client Secret，这应该保持机密。

您现在可以开始了！

下一步：[工具](/zh-CN/environment/tools/)
