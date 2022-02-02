# Веб-технологии (PHP)

Загрузите [PHP](http://php.net/downloads.php), чтобы запустить ваш код.

Загрузите [Composer](https://getcomposer.org/download/), чтобы управлять вашими зависимостями. 

>Примечание: Если команда Composer не может быть распознана после установки, переименуйте composer.phar и переместите её в папку /usr/local/bin/ с помощью следующей команды:

>$ mv composer.phar /usr/local/bin/composer 

> Подробности по ссылке [Answer on StackOverflow](https://stackoverflow.com/questions/25018894/osx-bash-composer-command-not-found).
  
 Загрузите [xDebug](https://xdebug.org/index.php) который является расширением PHP для помощи в отладке и разработке, позже мы настроим его с помощью **PHP Debug**. 

Нам понадобится интегрированная среда разработки, чтобы написать код. Существует множество вариантов, в этом руководстве мы будем использовать [Visual Studio Code](https://code.visualstudio.com/).

> В этом руководстве в ходе установки инструментов используйте параметры по умолчанию.

Наконец, загрузите расширения **PHP Server** и **PHP Debug** для Visual Code, 
- Перейдите в Visual Code extension manager (слева внизу),
- Введите `PHP` и выберите/установите плагин `PHP Debug` и `PHP Server`.

![](_media/php/vs_code_extension.png) 

- Расширение **PHP Server** поможет легко разместить/обработать текущую рабочую область (или подпапку) с помощью PHP.
> Если у вас установлено несколько версий PHP, вы можете указать расположение исполняемого файла PHP, переопределив **phpserver.phpPath** в Visual Code **User Settings**. Если установленные версии отсутствуют (if empty), расширение будет использовать исполняемый файл PHP, который отображается в переменной среды $PATH.
 

- Расширение **PHP Debug** - это адаптер отладки между Visual Code и XDebug
> Расширение **PHP Debug** требует настройки с помощью XDebug. Пожалуйста, узнайте подробности в расширении PHP Debug или в [блоге](https://blogs.msdn.microsoft.com/nicktrog/2016/02/11/configuring-visual-studio-code-for-php-development/), вот крактие инструкции:
> 1. установите PHP и xDebug, как показано выше.
> 2. обновите ваш файл php.ini со следующими настройками, убедитесь, что zend_extension указывает на правильное расположение. 

      [xdebug]
        zend_extension="<<path/to/xdebug>>"
        xdebug.remote_enable=1
        xdebug.remote_host=localhost
        xdebug.remote_port=9000
        xdebug.remote_autostart=1


Далее: [Аутентификация](/ru-RU/oauth/)

[Эта страница на английском языке](https://learnforge.autodesk.io/#/environment/tools/php).
