# Tools (PHP)

Install [PHP](http://php.net/downloads.php) engine to run your code. 

Install [Composer](https://getcomposer.org/download/) to manage your dependency. 

>Note: If Composer command can not be recognized after installation, please move and rename composer.phar to folder /usr/local/bin/ with the following command: 

>$ mv composer.phar /usr/local/bin/composer 

> Check the detail at [Answer on StackOverflow](https://stackoverflow.com/questions/25018894/osx-bash-composer-command-not-found).
  
 Install [xDebug](https://xdebug.org/index.php) which is an extension for PHP to assist with debugging and development, we will config this with **PHP Debug** later.

Now we need an IDE to write the code. There are many options, this tutorial will use [Visual Studio Code](https://code.visualstudio.com/).

> For this tutorial, use all default install options.

Finally, install the extensions of **PHP Server** and **PHP Debug** for Visual Code, 
- Go to Visual Code extension manager (left side, bottom icon)
- Type `PHP` and select/install `PHP Debug` & `PHP Server` plugin.

![](_media/php/vs_code_extension.png) 

- **PHP Server** extension can help host/serve current workspace (or subfolder) with PHP easily.
> If you have mulitple PHP versions installed, you can specify the location of your PHP executable by override the **phpserver.phpPath** in Visual Code **User Settings**. If empty, the extension will use the PHP executable which appears in the $PATH environment variable
 

- **PHP Debug** extension is a debug adapter between Visual Code and XDebug. 
> **PHP Debug** extension requires to configure with XDebug to make it work, please check the details at PHP Debug extension or a good [blog post about configuration](https://blogs.msdn.microsoft.com/nicktrog/2016/02/11/configuring-visual-studio-code-for-php-development/), and here is the brief steps:
> 1. install PHP & xDebug as shown above.
> 2. update your php.ini file with the following settings, make sure that zend_extension points to the correct location.

      [xdebug]
        zend_extension="<<path/to/xdebug>>"
        xdebug.remote_enable=1
        xdebug.remote_host=localhost
        xdebug.remote_port=9000
        xdebug.remote_autostart=1


Next: [Authentication](oauth/)