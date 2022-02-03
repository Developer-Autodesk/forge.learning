# Примеры

Мы создали автономные расширения для Viewer, которые вы с легкостью можете использовать повторно:

- [GitHub Repo](https://github.com/Autodesk-Forge/forge-extensions)
- [Ссылка на демо](https://forge-extensions.autodesk.io/)

Вот еще несколько примеров расширений, основанных на каркасном подходе:

- [Изменение цвета](https://forge.autodesk.com/blog/happy-easter-setthemingcolor-model-material): добавляет 3 кнопки на панель инструментов для изменения цвета выбранных элементов модели.
Расширение может взаимодействовать с сервером для реализации более сложных функций, как и любой другой код JavaScript. Примеры ниже демонстрируют это:

**Node.js**

- [Синхронизация пространственного отображения модели в Viewer](https://forge.autodesk.com/blog/share-viewer-state-websockets): использует websocket для обмена состоянием между 2+ экземплярами Viewer.

**.NET**

- [Настраиваемые свойства](https://forge.autodesk.com/blog/custom-properties-viewer-net-lambda-dynamodb): хранит настраиваемые свойства в базе данных (AWS DynamoDB) и использует код .NET WebAPI для обслуживания через конечные точки REST.

Далее: [Развертывание](/ru-RU/deployment/)

[Эта страница на английском языке](https://learnforge.autodesk.io/#/viewer/extensions/examples).
