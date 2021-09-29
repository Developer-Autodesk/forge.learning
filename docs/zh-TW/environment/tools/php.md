# 開發工具及環境準備 (PHP)

安裝 [PHP](http://php.net/downloads.php) 引擎以執行程式碼。 

安裝 [Composer ](https://getcomposer.org/download/)以管理套件相依性。 

>注意：如安裝完成後系統找不到 Composer 指令，請使用以下指令將 composer.phar 移至資料夾 /usr/local/bin/ 並重新命名為 composer： 

>$ mv composer.phar /usr/local/bin/composer 

> 相關步驟細節請參考[ StackOverflow 的答案](https://stackoverflow.com/questions/25018894/osx-bash-composer-command-not-found)。
  
 安裝 [xDebug](https://xdebug.org/index.php) (這是 PHP 的擴充功能，用於協助除錯和開發)，我們稍後將使用 **PHP Debug** 設定此程式。

現在，我們需要 IDE 來撰寫程式碼。有許多選項可供使用，本自學課程將使用 [Visual Studio Code](https://code.visualstudio.com/)。

> 在本自學課程中，將全部使用預設安裝選項。

最後，安裝 Visual Studio Code 的 **PHP Server** 和 **PHP Debug** 擴充功能 - 前往 Visual Code 擴充功能管理員 (左下方的圖示) - 輸入 `PHP` 並選取、安裝 `PHP Debug` 和 `PHP Server` 擴充功能。

![](_media/php/vs_code_extension.png) 

- **PHP Server** 擴充功能可用來協助托管您目前的工作區 (或子資料夾) 作為 PHP 的伺服器目錄。
> 如果安裝了多個 PHP 版本，則可以透過取代 Visual Code **User Settings** 中的 **phpserver.phpPath** 來指定 PHP 可執行檔的位置。如該變數為空值，該擴充功能將使用環境變數 $PATH 裡設定的 PHP 執行檔
 

- **PHP Debug** 擴充功能是用來串接 Visual Studio Code 除錯器和 XDebug 的工具。 
> **PHP Debug** 擴充功能需要設定好 XDebug 才能正常運作，請參照 PHP Debug 擴充功能的安裝說明，或是參考這篇不錯的[部落格文章](https://blogs.msdn.microsoft.com/nicktrog/2016/02/11/configuring-visual-studio-code-for-php-development/)來完成相關設定，以下是簡短步驟：1\. 依上述步驟完成安裝 PHP 和 xDebug。2\. 使用以下設定更新 php.ini 檔案，確保 zend_extension 指向正確的位置。

      [xdebug]
        zend_extension="<<path/to/xdebug>>"
        xdebug.remote_enable=1
        xdebug.remote_host=localhost
        xdebug.remote_port=9000
        xdebug.remote_autostart=1


下一步：[驗證](/zh-TW/oauth/)