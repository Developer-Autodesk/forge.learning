# Запуск и проверка кода (Java)

Нам нужно будет установить наши переменные ENV для **FORGE_CLIENT_ID** и **FORGE_CLIENT_SECRET**.

Убедитесь, что ваш Tomcat Server НЕ запущен, перейдите в меню **Run** и выберите **Run Configurations...**. Выберите сервер Tomcat в дереве слева, перейдите на вкладку **Environment** и нажмите **New**, чтобы добавить переменную. Мы можем оставить настройки по умолчанию.
 
 ![](_media/java/Eclipse_new_env_var.png) 

 > Обязательно добавьте и **FORGE_CLIENT_ID**, и **FORGE_CLIENT_SECRET**.

Наконец, нажмите **Apply** внизу справа и закройте диалоговое окно.

Теперь мы можем запустить наш сервер Tomcat

![](_media/java/Eclipse_start_server_final.png) 

Откройте браузер и перейдите по ссылке `http://localhost:3000`

Далее: [Расширения для Viewer](/ru-RU/tutorials/extensions)

[Эта страница на английском языке](https://learnforge.autodesk.io/#/environment/rundebug/java).
