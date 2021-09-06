# 工具 (PHP)

安裝 [PHP](http://php.net/downloads.php) 引擎以執行程式碼。 

安裝 [Composer ](https://getcomposer.org/download/)以管理相依性。 

>注意：如果安裝後無法識別 Composer 指令，請使用以下指令將 composer.phar 移至資料夾 /usr/local/bin/ 並進行更名： 

>$ mv composer.phar /usr/local/bin/composer 

> 如需詳細資料，請查看[ StackOverflow 回答](https://stackoverflow.com/questions/25018894/osx-bash-composer-command-not-found)。
  
 安裝 [xDebug](https://xdebug.org/index.php) (這是 PHP 的延伸，用於協助除錯和開發)，我們稍後將使用 **PHP Debug** 規劃此程式。

現在，我們需要 IDE 來撰寫程式碼。有許多選項可供使用，本自學課程將使用 [Visual Studio Code](https://code.visualstudio.com/)。

> 在本自學課程中，將全部使用預設安裝選項。

最後，安裝適用於 Visual Code 的 **PHP Server** 和 **PHP Debug** 延伸 - 移往 Visual Code 延伸管理員 (左下方的圖示) - 輸入 `PHP` 並選取/安裝 `PHP Debug` 和 `PHP Server` 外掛程式。

![](_media/php/vs_code_extension.png) 

- **PHP Server** 延伸可協助使用 PHP 輕鬆托管/服務目前的工作區 (或子資料夾)。
> 如果安裝了多個 PHP 版本，則可以透過取代 Visual Code **User Settings** 中的 **phpserver.phpPath** 來指定 PHP 可執行檔的位置。如果為空，則延伸將使用顯示在 $PATH 環境變數中的 PHP 可執行檔
 

- **PHP Debug** 延伸是 Visual Code 和 XDebug 之間的除錯配接器。 
> **PHP Debug** 延伸需要規劃 XDebug 才能正常運作，請查看 PHP Debug 延伸的詳細資料或一篇不錯的[有關規劃的部落格文章](https://blogs.msdn.microsoft.com/nicktrog/2016/02/11/configuring-visual-studio-code-for-php-development/)，以下是簡短步驟：1\. 安裝 PHP 和 xDebug，如上所示。2\. 使用以下設定更新 php.ini 檔案，確保 zend_extension 指向正確的位置。

      [xdebug]
        zend_extension="<<path/to/xdebug>>"
        xdebug.remote_enable=1
        xdebug.remote_host=localhost
        xdebug.remote_port=9000
        xdebug.remote_autostart=1


接下來：[驗證](/zh-TW/oauth/)