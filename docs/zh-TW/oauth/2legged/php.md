# 驗證 (PHP)

就基本的 *OAuth* 實作而言，我們需要 2 個檔案。

## OAuthToken.php

建立 `/server/oauthtoken.php` 檔案。此檔案將負責回應 endpoint 並傳回 access token。 

[oauthtoken.php](_snippets/viewmodels/php/oauthtoken.php ':include :type=code php')

## OAuth.php

現在，請建立會實際向 Forge 請求 access token 的 `/sever/oauth.php` 檔案。這將會重複用在本自學課程的其他部分。

[oauth.php](_snippets/viewmodels/php/oauth.php ':include :type=code php')

下一步：[將檔案上傳到 OSS](/zh-TW/datamanagement/oss/)