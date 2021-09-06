# 驗證 (PHP)

就基本的 *OAuth* 實作而言，我們需要 2 個檔案。

## OAuthToken.php

建立 `/server/oauthtoken.php` 檔案。此檔案將負責回應端點並傳回存取記號。 

[oauthtoken.php](_snippets/viewmodels/php/oauthtoken.php ':include :type=code php')

## OAuth.php

現在，請建立會實際向 Forge 請求存取記號的 `/sever/oauth.php` 檔案。這將會重複用在本自學課程的其他部分。

[oauth.php](_snippets/viewmodels/php/oauth.php ':include :type=code php')

接下來：[將檔案上傳到 OSS](/zh-TW/datamanagement/oss/)