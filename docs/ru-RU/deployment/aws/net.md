# Amazon Web Services (AWS)

Сначала создайте и активируйте [аккаунт AWS](https://aws.amazon.com/).

## Требования

AWS Toolkit for Visual Studio представляет собой расширение для Microsoft Visual Studio в системе Microsoft Windows, облегчающее процесс разработки, отладки и развертывания приложений .NET с использованием Amazon Web Services.

- [Загрузка AWS Toolkit for Visual Studio](https://aws.amazon.com/visualstudio/)

## Подготовьте ваш проект

Elastic Beanstalk не может переопределить ваши `appSettings`, поэтому их нужно удалить до публикации. Это довольно просто, если добавить код ниже в ваш файл `web.release.config`. Следующий раздел **Пошаговое видео** содержит видео с подробным объяснением процесса.

```xml
<appSettings>
  <add key="FORGE_CLIENT_ID" xdt:Transform="Remove" xdt:Locator="Match(key)" />
  <add key="FORGE_CLIENT_SECRET" xdt:Transform="Remove" xdt:Locator="Match(key)" />
</appSettings>
```

## Пошаговое видео

Ниже вы найдете 7-минутное видео о развертывании на AWS Elastic Beanstalk.

[Видео](https://www.youtube.com/embed/49X4ROI6PWs ':include :type=iframe width=100% height=400px')

[Эта страница на английском языке](https://learnforge.autodesk.io/#/deployment/aws/net).
