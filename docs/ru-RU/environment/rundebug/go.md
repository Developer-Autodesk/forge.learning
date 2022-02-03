# Запуск и проверка кода (Go)

Чтобы запустить сервер, просто откройте интегрированный терминал кода Visual Studio, выбрав меню **View** > **Integrated Terminal**, который должен открыться в корне вашего проекта, затем запустите:

```bash
    go run main.go
```

Откройте браузер и перейдите по адресу `http://localhost:3000`, чтобы проверить приложение.

## Отладка

Для Visual Code загрузите [Delve](https://github.com/derekparker/delve), отладчик golang, введя код ниже в **Integrated Terminal** (под **View**):

```bash
go get -u github.com/derekparker/delve/cmd/dlv
```

После установки `delve` вы можете либо нажать F5, либо перейти в меню **Debug** >> **Start debugging**.

!> Для отладки убедитесь, что файл `main.go` открыт в Visual Code перед нажатием **F5**, иначе вы можете увидеть ошибку (см. [Устранение ошибок](#troubleshooting))

Теперь вы увидите файл launch.json, созданный для вашей рабочей области, который будет содержать конфигурации для отладки. По умолчанию будет одна конфигурация, как показано ниже:

```javascript
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Launch",
            "type": "go",
            "request": "launch",
            "mode": "debug",
            "remotePath": "",
            "port": 2345,
            "host": "127.0.0.1",
            "program": "${fileDirname}",
            "env": {},
            "args": [],
            "showLog": true
        }
    ]
}
```

Здесь не нужно ничего менять, так что просто сохраните его.

Установите брейкпоинты (англ. breakpoints), и в `Code debug viewlet` (F5) нажмите зеленую кнопку `Start Debugging`, чтобы начать отладку.

Перейдите в меню **Debug** и выберите **Start debugging**. Вкладка "Debug Console" должна появиться внизу, как показано ниже:

![](_media/go/vs_code_debug.png) 

## Устранение проблем

Если случайно вы получите сообщение об ошибке типа `Can not debug non-main package`, не отчаивайтесь! Просто откройте `main.go` из вашего проекта и попробуйте еще раз.

    NOTE: This is caused by `"program": "${fileDirname}"` line in configuration file, 
    based on which it will try to start your app using the location of your opened file, 
    so if you start debugging your app by selecting non-main file, it will not know where 
    to start.
    This makes more sense when you will have apps generating several 
    executables (g.e. daemon and client).

Если по какой-либо причине вы получите сообщение об ошибке типа `could not launch process: exec "lldb-server"`, то вы наверняка разрабатываете на OSX, и вам не хватает `command line developer tools`. Чтобы исправить это, просто выполните следующие действия:
    1. Откройте новый Терминал (не используйте Visual Code Integrated Terminal)
    2. Запустите xcode-select --install
    3. При появлении запроса нажмите Install
![](_media/go/osx_setup_tools.png) 


## Расширенные настройки

Если вас интересует только отладка терминала (хардкорная отладка), ознакомьтесь с этими руководствами:

- [Way of GDB](https://golang.org/doc/gdb) - для отладки приложений golang с использованием GDB;
- [Way of LLDB](http://blog.ralch.com/tutorial/golang-debug-with-lldb/) - для отладки приложений golang с использованием LLDB;


Для тех, кто не любит ничего настраивать, есть [Goland](https://www.jetbrains.com/go/), который включает все необходимые визуальные инструменты и, скорее всего, знаком тем, кто использует продукты JetBrains.


Далее: [Расширения для Viewer](/ru-RU/tutorials/extensions)

[Эта страница на английском языке](https://learnforge.autodesk.io/#/environment/rundebug/go).
