# Tools (PHP)

Install [PHP](http://php.net/downloads.php) engine to run your code. 

Install [Composer](https://getcomposer.org/download/) to manage your dependency. 

>Note: If Composer command can not be recognized after installation, please move and rename composer.phar to folder /usr/local/bin/ with the following command: 

>$ mv composer.phar /usr/local/bin/composer 

> Check the detail at [Answer on StackOverflow](https://stackoverflow.com/questions/25018894/osx-bash-composer-command-not-found).
  
Now we need an IDE to write the code. There are many options, this tutorial will use [Visual Studio Code](https://code.visualstudio.com/).

> For this tutorial, use all default install options.

Next, install the extension of **PHP Server** for Visual Code, this can help serve your current workspace with PHP.

- Go to Visual Code extension manager (left side, bottom icon)
- Type `PHP` and select `PHP Server` plugin made by ***brapifra***.

![](_media/php/vs_code_extension.gif) 

Next: [Authentication](oauth/)