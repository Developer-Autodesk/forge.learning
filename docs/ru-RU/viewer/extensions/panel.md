# Панель свойств

Этот раздел использует базовую структуру из предыдущего раздела, но давайте изменим название с **MyAwesomeExtension** на **ModelSummaryExtension**.

## Создание расширения

Каждое расширение должно быть файлом JavaScript и реализовывать, по крайней мере, функции .load и .unload. Создайте файл в папке UI **/js/dockingpanelextension.js** и скопируйте код ниже (который совпадает с базовой структурой, но имеет другое название): 

```javascript
class ModelSummaryExtension extends Autodesk.Viewing.Extension {
    constructor(/ru-RU/viewer, options) {
        super(/ru-RU/viewer, options);
        this._group = null;
        this._button = null;
    }

    load() {
        console.log('ModelSummaryExtension has been loaded');
        return true;
    }

    unload() {
        // Clean our UI elements if we added any
        if (this._group) {
            this._group.removeControl(this._button);
            if (this._group.getNumberOfControls() === 0) {
                this.viewer.toolbar.removeControl(this._group);
            }
        }
        console.log('ModelSummaryExtension has been unloaded');
        return true;
    }

    onToolbarCreated() {
        // Create a new toolbar group if it doesn't exist
        this._group = this.viewer.toolbar.getControl('allMyAwesomeExtensionsToolbar');
        if (!this._group) {
            this._group = new Autodesk.Viewing.UI.ControlGroup('allMyAwesomeExtensionsToolbar');
            this.viewer.toolbar.addControl(this._group);
        }

        // Add a new button to the toolbar group
        this._button = new Autodesk.Viewing.UI.Button('ModelSummaryExtensionButton');
        this._button.onClick = (ev) => {
            // Execute an action here
        };
        this._button.setToolTip('Model Summary Extension');
        this._button.addClass('modelSummaryExtensionIcon');
        this._group.addControl(this._button);
    }
}

Autodesk.Viewing.theExtensionManager.registerExtension('ModelSummaryExtension', ModelSummaryExtension);
```

## Панель инструментов CSS

Как и в базовой структуре, панель инструментов использует форматирование CSS (см. вызов функции `.addClass` в коде). В /css/main.css добавьте: 

```css
.modelSummaryExtensionIcon {
  background-image: url(https://github.com/encharm/Font-Awesome-SVG-PNG/raw/master/white/png/24/dashboard.png);
  background-size: 24px;
  background-repeat: no-repeat;
  background-position: center;
}
```

## Загрузка расширения

[Загрузите расширение](/ru-RU/viewer/extensions/skeleton?id=loading-the-extension), используя тот же код, как и в разделе базовая структура (конечно, изменив название). Для справки, необходимо внести 2 изменения: включить `<script>` в **index.html** и включить расширение при настройке Viewer: 

```html
<script src="/js/dockingpanelextension.js"></script>
```

```javascript
viewer = new Autodesk.Viewing.GuiViewer3D(document.getElementById('forgeViewer'), { extensions: ['ModelSummaryExtension'] });
```

> Примечание: Расширения - это массив, поэтому вы можете загружать сразу несколько расширений! Например, предыдущий пример и этот, для этого вы просто используете `['HandleSelectionExtension', 'ModelSummaryExtension']`! Классно, да?

На этом этапе расширение должно загрузиться, и на панели инструментов появится кнопка, но она не будет работать.

## Перечисление конечных узлов

Viewer содержит все элементы модели, включая категории (например, семейства или определение детали), поэтому нам нужно перечислить конечные узлы, т.е. фактические экземпляры класса в модели. Функция `getAllLeafComponents()` должна быть добавлена к классу нашего расширения. [См. наш блог](https://forge.autodesk.com/blog/enumerating-leaf-nodes-viewer). 

```javascript
getAllLeafComponents(callback) {
    this.viewer.getObjectTree(function (tree) {
        let leaves = [];
        tree.enumNodeChildren(tree.getRootId(), function (dbId) {
            if (tree.getChildCount(dbId) === 0) {
                leaves.push(dbId);
            }
        }, true);
        callback(leaves);
    });
}
```

## Панель свойств

Расширение отобразит результат в [панели свойств Viewer](https://forge.autodesk.com/en/docs/viewer/v7/reference/UI/PropertyPanel/). Скопируйте код в файл вашего расширения **.js** (где угодно в файле, отдельно от других функций).

```javascript
class ModelSummaryPanel extends Autodesk.Viewing.UI.PropertyPanel {
    constructor(/ru-RU/viewer, container, id, title, options) {
        super(container, id, title, options);
        this.viewer = viewer;
    }
}
```

## Добавление функции .onClick

Теперь пора заменить `Execute an action here` внутри функции `onClick`. Для этого примера давайте будем выделять элементы модели. Скопируйте следующий код в файл вашего расширения .js внутри функции .onClick.
Давайте сначала отобразим панель свойств, затем перечислим конечные узлы, затем получим определенный набор свойств для конечных узлов, и, наконец, подсчитаем вхождение этих свойств и отобразим результаты.

!> В коде ниже вам **НЕОБХОДИМО** настроить `filteredProps` под названия свойств, которые применяются к вашим моделям. Например, т.к. **Material** есть практически на всех моделях, вы можете попробовать `const filteredProps = ['Material'];`

Скопируйте следующий код в файл вашего расширения **.js** внутри функции `onClick`. 

```javascript
// Check if the panel is created or not
if (this._panel == null) {
    this._panel = new ModelSummaryPanel(this.viewer, this.viewer.container, 'modelSummaryPanel', 'Model Summary');
}
// Show/hide docking panel
this._panel.setVisible(!this._panel.isVisible());

// If panel is NOT visible, exit the function
if (!this._panel.isVisible())
    return;

// First, the viewer contains all elements on the model, including
// categories (e.g. families or part definition), so we need to enumerate
// the leaf nodes, meaning actual instances of the model. The following
// getAllLeafComponents function is defined at the bottom
this.getAllLeafComponents((dbIds) => {
    // Now for leaf components, let's get some properties and count occurrences of each value
    const filteredProps = ['PropertyNameA', 'PropertyNameB'];
    // Get only the properties we need for the leaf dbIds
    this.viewer.model.getBulkProperties(dbIds, filteredProps, (items) => {
        // Iterate through the elements we found
        items.forEach((item) => {
            // and iterate through each property
            item.properties.forEach(function (prop) {
                // Use the filteredProps to store the count as a subarray
                if (filteredProps[prop.displayName] === undefined)
                    filteredProps[prop.displayName] = {};
                // Start counting: if first time finding it, set as 1, else +1
                if (filteredProps[prop.displayName][prop.displayValue] === undefined)
                    filteredProps[prop.displayName][prop.displayValue] = 1;
                else
                    filteredProps[prop.displayName][prop.displayValue] += 1;
            });
        });
        // Now ready to show!
        // The PropertyPanel has the .addProperty that receives the name, value
        // and category, that simple! So just iterate through the list and add them
        filteredProps.forEach((prop) => {
            if (filteredProps[prop] === undefined) return;
            Object.keys(filteredProps[prop]).forEach((val) => {
                this._panel.addProperty(val, filteredProps[prop][val], prop);
            });
        });
    });
});
```

## Заключение

На этом этапе расширение должно загрузиться и отобразить кнопку во Viewer. Нажмите на кнопку, чтобы получить панель свойств. Видео ниже демонстрирует то, как это выглядит.

![](_media/javascript/js_dockingpanel.gif)

> Как уже было упомянуто, вам нужно определить **filteredProps** в соответсвии с вашими моделями. Видео выше использует `['Material', 'Design Status', 'Type Name'];`, все они работают для обеих моделей. 

Ключевые функции:

- **.getObjectTree()** даёт доступ к структуре модели, а с **.getChildCount()** и **.enumNodeChildren()** можно повторно перебирать дерево объекта
- **.getBulkProperties()** это асинхронный метод, который возвращает определенный набор свойств для массива dbIds через обратный вызов, который широко используется в Viewer, [подробнее о callback](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function)
- **.addProperty()** панельный метод добавляет свойства (имя, значение) в категорию

Дополнительные функции:

- **.forEach()** для перебора коллекции, это функция JavaScript, [узнайте больше](https://www.w3schools.com/jsref/jsref_forEach.asp)

Далее: [Примеры](/ru-RU/viewer/extensions/examples)

[Эта страница на английском языке](https://learnforge.autodesk.io/#/viewer/extensions/panel).
