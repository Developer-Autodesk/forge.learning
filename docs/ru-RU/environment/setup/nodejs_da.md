# Создание нового проекта (Node.js)

Создайте папку на вашем ПК, не используйте пробелы или специальные символы в названии. Для этого руководства давайте использовать название **forgesample**.

Откройте [Visual Code](https://code.visualstudio.com/download), перейдите в меню **File** --> **Open** (MacOS) или **Open Folder** (Windows) и выберите только что созданную папку.

Сейчас нам нужен терминал, перейдите в меню **View** >> **Integrated Terminal**. Внизу должно появиться окно. Введите следующую команду и следуйте инструкциям. Для постоянства, при запросе **entry point:** используйте **start.js** (используется почти для всех примеров Forge).

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
npm install autodesk.forge.designautomation --save
npm install body-parser --save
npm install form-data --save
npm install socket.io --save
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
    "autodesk.forge.designautomation": "^3.0.3",
    "body-parser": "^1.19.0",
    "cookie-session": "^1.4.0",
    "express": "^4.17.1",
    "forge-apis": "^0.7.3",
    "form-data": "^3.0.0",
    "multer": "^1.4.2",
    "socket.io": "^2.3.0"
  }
}

```

> Номер версии (например, forge-apis 0.4.1) может отличаться, Эта было последней версией на момент создания этого руководства. 

## Файлы и папки

Чтобы создать новую папку или файл, щелкните правой кнопкой мыши на область "Explorer" слева и выберите **New Folder** или **New File**.

Создайте папку **/routes/** для файлов на стороне сервера и папку **/public/** для файлов со стороны клиента.

На этом этапе ваш проект должен иметь следующую структуру:

![](_media/nodejs/vs_code_explorer_da.png) 

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
                "FORGE_WEBHOOK_URL": "your ngrok url"
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
const app = require('./server');
const socketIO = require('./socket.io')(app);

let server = socketIO.http.listen(app.get('port'), () => {
    console.log(`Server listening on port ${app.get('port')}`);
});

server.on('error', (err) => {
    if (err.errno === 'EACCES') {
        console.error(`Port ${app.get('port')} already in use.\nExiting...`);
	    process.exit (1) ;
	}
}) ;
```

## server.js

Этот файл обрабатывает статические файлы (например, `html`) и направляет запросы API. В корневой папке создайте файл с названиемм `server.js` и кодом ниже:

```javascript
const _path = require('path');
const express = require('express');
const cookieSession = require('cookie-session');
const config = require('./config');
if (!config.credentials.client_id || !config.credentials.client_secret)
	return (console.error('Missing FORGE_CLIENT_ID or FORGE_CLIENT_SECRET env variables.'));

let app = express();
app.use(express.static(_path.join(__dirname, './public')));
app.use(cookieSession({
	name: 'forge_session',
	keys: ['forge_secure_key'],
	maxAge: 60 * 60 * 1000 // 1 hour, same as the 2 legged lifespan token
}));
app.use(express.json({
	limit: '50mb'
}));
app.use('/api', require('./routes/DesignAutomation'));

app.set('port', process.env.PORT || 3000);

module.exports = app;
```

## socket.io.js

В корневой папке создайте файл `socket.io.js` с кодом ниже:

```javascript
module.exports =(app) => {

	const http = require('http').Server(app);
	const io = require('socket.io')(http);
	app.io = io;

	let clients = 0;
	io.on('connection', (socket) => {
		clients++;
		console.log('a client is connected');

		// Whenever someone disconnects this piece of code executed
		socket.on('disconnect', function () {
			clients--;
			console.log('a client disconnected');
		});
	});

	return ({
		http: http,
		io: io
	});
};
```

## config.js

В корневой папке создайте `config.js` со следующим кодом:

```javascript
// Autodesk Forge configuration
module.exports = {
    // Set environment variables or hard-code here
    credentials: {
        client_id: process.env.FORGE_CLIENT_ID,
        client_secret: process.env.FORGE_CLIENT_SECRET,
        webhook_url: process.env.FORGE_WEBHOOK_URL
    },
    scopes: {
        // Required scopes for the server-side application
        internal: ['bucket:create', 'bucket:read', 'bucket:delete', 'data:read', 'data:create', 'data:write', 'code:all'],
        // Required scope for the client-side viewer
        public: ['viewables:read']
    },
    client: {
        circuitBreaker: {
			threshold: 11,
			interval: 1200
		},
		retry: {
			maxNumberOfRetries: 7,
			backoffDelay: 4000,
			backoffPolicy: 'exponentialBackoffWithJitter'
		},
		requestTimeout: 13000
    }
};
```

Здесь мы используем переменные среды. Во время запуска нашего сервера Express значения этих переменных будут использоваться для подключения к различным веб-сервисам Autodesk Forge.

## routes/common/oauth.js

Теперь создайте подпапку `common` в папке `routes` и подготовьте файл `routes/common/oauth.js`, который будет запрашивать токен доступа у Forge. Это будет повторно использовано в других частях этого руководства.
 
```javascript
const { AuthClientTwoLegged } = require('forge-apis');
const config = require('../../config');

// Tokens are auto-refreshed, keeping clients in simple cache
let cache = {};

// Since we got 3 calls at the first page loading, let's initialize this one now,
// to avoid concurrent requests.
getClient (/*config.scopes.internal*/);

/**
 * Initializes a Forge client for 2-legged authentication.
 * @param {string[]} scopes List of resource access scopes.
 * @returns {AuthClientTwoLegged} 2-legged authentication client.
 */
async function getClient(scopes) {
    scopes = scopes || config.scopes.internal;
    const key = scopes.join('+');
    if ( cache[key] )
        return (cache[key]);
    
    try {
        const { client_id, client_secret } = config.credentials;
        let client = new AuthClientTwoLegged(client_id, client_secret, scopes || config.scopes.internal, true);
        let credentials = await client.authenticate();
        cache[key] = client;
        console.log (`OAuth2 client created for ${key}`);
        return (client);
    } catch ( ex ) {
        return (null);
    }
}

module.exports = {
    getClient
};
```

Проект готов! На этом этапе он должен выглядеть вот так:

![](_media/nodejs/vs_code_project_da.PNG) 

> **package-lock.json** был создан **npm**, не волнуйтесь

Далее: [Базовый пользовательский интерфейс](/ru-RU/designautomation/html/README.md)

[Эта страница на английском языке](https://learnforge.autodesk.io/#/environment/setup/nodejs_da).
