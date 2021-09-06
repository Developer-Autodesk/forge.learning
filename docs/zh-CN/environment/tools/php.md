# 工具 (PHP)

安装 [PHP](http://php.net/downloads.php) 引擎以运行代码。 

安装 [Composer](https://getcomposer.org/download/) 以管理依存关系。 

>注意：如果安装后无法识别 Composer 命令，请使用以下命令将 composer.phar 移动到文件夹 /usr/local/bin/ 并将其重命名： 

>$ mv composer.phar /usr/local/bin/composer 

> 有关详细信息，请参见 [StackOverflow 解答](https://stackoverflow.com/questions/25018894/osx-bash-composer-command-not-found)。
  
 安装 PHP 的扩展 [xDebug](https://xdebug.org/index.php) 以协助调试和开发，稍后我们将使用 **PHP 调试**对其进行配置。

现在，我们需要 IDE 来编写代码。有许多选项，本教程将使用 [Visual Studio Code](https://code.visualstudio.com/)。

> 在本教程中，使用所有默认安装选项。

最后，安装适用于 Visual Code 的 **PHP 服务器**和 **PHP 调试**扩展 - 转到 Visual Code 扩展管理器（左侧底部图标）- 键入 `PHP`，然后选择/安装 `PHP Debug` 和 `PHP Server` 插件。

![](_media/php/vs_code_extension.png) 

- **PHP 服务器**扩展可以使用 PHP 轻松托管/提供当前工作空间（或子文件夹）。
> 如果安装了多个 PHP 版本，可以通过覆盖 Visual Code **User Settings** 中的 **phpserver.phpPath** 来指定 PHP 可执行文件的位置。如果为空，扩展将使用 $PATH 环境变量中显示的 PHP 可执行文件
 

- **PHP 调试**扩展是 Visual Code 和 XDebug 之间的调试适配器。 
> **PHP 调试**扩展需要使用 XDebug 进行配置才能正常工作，请查看 PHP 调试扩展中的详细信息或[关于配置的详尽博客帖子](https://blogs.msdn.microsoft.com/nicktrog/2016/02/11/configuring-visual-studio-code-for-php-development/)，以下是简要步骤：1\. 安装 PHP 和 xDebug，如上所示。2\. 使用以下设置更新 php.ini 文件，确保 zend_extension 指向正确的位置。

      [xdebug]
        zend_extension="<<path/to/xdebug>>"
        xdebug.remote_enable=1
        xdebug.remote_host=localhost
        xdebug.remote_port=9000
        xdebug.remote_autostart=1


下一步：[身份验证](/zh-CN/oauth/)