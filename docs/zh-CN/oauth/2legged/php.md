# 身份验证 (PHP)

对于基本 *OAuth* 实现，我们需要 2 个文件。

## OAuthToken.php

创建一个 `/server/oauthtoken.php` 文件。此文件负责响应端点并返回访问代币。 

[oauthtoken.php](_snippets/viewmodels/php/oauthtoken.php ':include :type=code php')

## OAuth.php

现在，创建一个 `/sever/oauth.php` 文件，用于实际从 Forge 请求访问代币。本教程的其他部分将会重用此文件。

[oauth.php](_snippets/viewmodels/php/oauth.php ':include :type=code php')

下一步：[将文件上传到 OSS](/zh-CN/datamanagement/oss/)