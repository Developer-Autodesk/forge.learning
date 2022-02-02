> Названия приложений Heroku должны быть уникальны, потому, если вы получаете ошибку `Name is already taken` при нажатии **create**, измените имя вашего приложения.

Сейчас ваш локальный **git** знает о **копии** в Heroku. Отправляйте изменения с локального **git** на копию с помощью:

```bash
git push heroku master
```

## Настройте переменные среды

Лучше всего иметь Keys&Secrets для локальной разработки, поэтому перейдите к своим приложениям на сайте платформы Autodesk Forge и [создайте новое приложение](/ru-RU/account/?id=create-an-app), например, **forge sample production**.

Войдите в учетную запись [Heroku Dashboard](https://dashboard.heroku.com/), где должно быть указано ваше приложение. Перейдите в **Settings** и создайте **Config Vars**, как показано на видео ниже:

![](_media/deployment/heroku/env_vars.gif) 

!>Если вы создаете приложение, которое требует трёхфакторную аутентификацию (**Просмотр моделей из репозиториев Autodesk BIM 360 & Fusion 360**), вам также нужно создать переменную **FORGE_CALLBACK_URL** - `https://YOUR_HEROKU_APP_NAME.herokuapp.com/api/forge/callback/oauth`. Помните, что Callback URL должна совпадать в вашем аккаунте Heroku и Autodesk Forge!

Готово! Ваше приложение будет доступно по адресу Heroku, что-то похожее на: **YourAppName.herokuapp.com**.

## Разверните изменения

Когда у вас появится новая версия проекта, войдите в аккаунт и просто добавьте `commit` и `push` live:

```bash
heroku login
git add .
git commit -m "v2"
git push heroku master
```
