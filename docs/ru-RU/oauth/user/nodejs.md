# Обработка информации профиля пользователя (Node.js)

Эта конечная точка запросит данные конечного пользователя и вернет **имя** и **фотографию профиля** (40px).

## routes/user.js

Создайте файл `routes/user.js` и скопируйте следующий код:

```javascript
const express = require('express');
const { UserProfileApi } = require('forge-apis');

const { OAuth } = require('./common/oauth');

let router = express.Router();

router.get('/user/profile', async (req, res) => {
    const oauth = new OAuth(req.session);
    const internalToken = await oauth.getInternalToken();
    const user = new UserProfileApi();
    const profile = await user.getUserProfile(/ru-RU/oauth.getClient(), internalToken);
    res.json({
        name: profile.body.firstName + ' ' + profile.body.lastName,
        picture: profile.body.profileImages.sizeX40
    });
});

module.exports = router;
```

Далее: [Отображение файлов в Viewer](/ru-RU/viewer/3legged/readme)

[Эта страница на английском языке](https://learnforge.autodesk.io/#/oauth/user/nodejs).
