# Создание нового проекта (Node.js)

Создайте папку на вашем ПК, не используйте пробелы или специальные символы в названии. Для этого руководства давайте использовать название **forgesample**.

Откройте **Visual Code**, перейдите в меню **File** --> **Open** (MacOS) или **Open Folder** (Windows) и выберите только что созданную папку.

Сейчас нам нужен терминал, перейдите в меню **View** >> **Integrated Terminal**. Внизу должно появиться окно. Введите следующую команду и следуйте инструкциям. Для постоянства, при запросе **entry point:** используйте **start.js**.

```
npm init
```

Это создает файл **package.json**, который определяет, какие пакеты будет использовать наш проект. [Узнайте больше](https://docs.npmjs.com/files/package.json).

## Загрузка пакетов

По умолчанию пакет Node.js пустой, поэтому нам нужно установить несколько пакетов с **npm install**. Давайте начнем с базового сервера **express**, **body-parser** для обработки данных JSON, **multer** для загрузки файлов и, конечно, **Autodesk Forge**.

!> Запускайте одну **npm install** за раз.

```
npm install express --save
npm install multer --save
npm install cookie-session --save
npm install forge-apis --save
```

> Параметр `--save` указывает, что модуль должен быть включен в файл **package.json** в качестве зависимости.

Откройте **package.json** и внутри `"scripts"`добавьте строчку `"start": "node start.js",`. Сейчас в вашей папке должна быть папка **node_modules**, а ваш **package.json** должен выглядеть вот так:
```json
{
  "name": "forgesample",
  "version": "1.0.0",
  "description": "",
  "main": "start.js",
  "scripts": {
    "start": "node start.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "cookie-session": "^2.0.0-beta.3",
    "express": "^4.16.2",
    "forge-apis": "^0.4.1",
    "multer": "^1.3.0"
  }
}

```

> Номер версии (например, forge-apis 0.4.1) может отличаться, Эта было последней версией на момент создания этого руководства. 

## Файлы и папки

Чтобы создать новую папку или файл, щелкните правой кнопкой мыши на область "Explorer" слева и выберите **New Folder** или **New File**.

Создайте папку **/routes/** для файлов на стороне сервера и папку **/public/** для файлов со стороны клиента.

На этом этапе ваш проект должен иметь следующую структуру:

![](_media/nodejs/vs_code_explorer.png) 

## launch.json

Этот файл указывает Visual Studio Code, как мы должны запускать наш проект. Перейдите в меню **Run** >> **Add Configuration...** и в окне **Select Environment** выберите **Node.js**. В созданном файле **/.vscode/launch.json** введите:

!> Примечание: вам нужно ввести **Forge Client ID & Secret** в указанном поле.

```json
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch Program",
            "program": "${workspaceFolder}/start.js",
            "env": {
                "FORGE_CLIENT_ID": "your id here",
                "FORGE_CLIENT_SECRET": "your secret here",
                "FORGE_CALLBACK_URL": "http://localhost:3000/api/forge/callback/oauth"
            }
        }
    ]
}
```

> Важно определить **ID & Secret** как переменные среды, чтобы наш проект смог запуститься в вебе. Подробнее об этом в разделе **Развертывание**. 

## start.js

В корневой папке создайте файл `start.js` с:

!> Следите за размером букв (заглавные/строчные) для некоторых способов развертывания, например, **Heroku** - там это имеет большое значение. В этом уроке мы будем использовать строчные буквы.

```javascript
const path = require('path');
const express = require('express');
const cookieSession = require('cookie-session');

const PORT = process.env.PORT || 3000;
const config = require('./config');
if (config.credentials.client_id == null || config.credentials.client_secret == null) {
    console.error('Missing FORGE_CLIENT_ID or FORGE_CLIENT_SECRET env. variables.');
    return;
}

let app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieSession({
    name: 'forge_session',
    keys: ['forge_secure_key'],
    secure: (process.env.NODE_ENV === 'production'),
    maxAge: 14 * 24 * 60 * 60 * 1000 // 14 days, same as refresh token
}));
app.use(express.json({ limit: '50mb' }));
app.use('/api/forge', require('./routes/oauth'));
app.use('/api/forge', require('./routes/datamanagement'));
app.use('/api/forge', require('./routes/user'));
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json(err);
});
app.listen(PORT, () => { console.log(`Server listening on port ${PORT}`); });
```

Этой файл запускает сервер **express**, обрабатывает статические файлы (например, `html`), и направляет запросы API.

## config.js

В корневой папке создайте `config.js` со следующим кодом:

```javascript
// Autodesk Forge configuration
module.exports = {
    // Set environment variables or hard-code here
    credentials: {
        client_id: process.env.FORGE_CLIENT_ID,
        client_secret: process.env.FORGE_CLIENT_SECRET,
        callback_url: process.env.FORGE_CALLBACK_URL
    },
    scopes: {
        // Required scopes for the server-side application
        internal: ['bucket:create', 'bucket:read', 'data:read', 'data:create', 'data:write'],
        // Required scope for the client-side viewer
        public: ['viewables:read']
    }
};
```

Здесь мы определяем наши переменные ENV. Во время запуска нашего сервера Express значения этих переменных будут использоваться для подключения к различным веб-сервисам Autodesk Forge, которые нам понадобятся.

Мы видим, что у области действия есть два определения. Эти области дают нашему токену право на использование различных веб-сервисов Forge (со стороны сервера). Это руководство посвящено использованию Forge Viewer, поэтому нам понадобится только область действия "viewables:read".

Проект готов! На этом этапе он должен выглядеть вот так:

![](_media/nodejs/vs_code_project.png) 

> **package-lock.json** был создан **npm**, не волнуйтесь
