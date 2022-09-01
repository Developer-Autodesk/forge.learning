# Выделение элементов

Этот раздел использует **базовую структуру** из предыдущего раздела, но давайте изменим название с **MyAwesomeExtension** на **HandleSelectionExtension**. 

## Создание расширения

Поскольку каждое расширение должно быть отдельным файлом JavaScript, создайте файл в папке UI ** / js / handleselectionextension.js ** и скопируйте следующий код (который совпадает с базовой структурой, но имеет другое название):

```javascript
class HandleSelectionExtension extends Autodesk.Viewing.Extension {
    constructor(/ru-RU/viewer, options) {
        super(/ru-RU/viewer, options);
        this._group = null;
        this._button = null;
    }

    load() {
        console.log('HandleSelectionExtension has been loaded');
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
        console.log('HandleSelectionExtension has been unloaded');
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
        this._button = new Autodesk.Viewing.UI.Button('handleSelectionExtensionButton');
        this._button.onClick = (ev) => {
            // Execute an action here
        };
        this._button.setToolTip('Handle Selection Extension');
        this._button.addClass('handleSelectionExtensionIcon');
        this._group.addControl(this._button);
    }
}

Autodesk.Viewing.theExtensionManager.registerExtension('HandleSelectionExtension', HandleSelectionExtension);
```
## Панель инструментов CSS

Как и в базовой структуре, панель инструментов использует форматирование **CSS**. В **/css/main.css** добавьте:

```css
.handleSelectionExtensionIcon {
    background-image: url(https://github.com/encharm/Font-Awesome-SVG-PNG/raw/master/white/png/24/object-group.png);
    background-size: 24px;
    background-repeat: no-repeat;
    background-position: center;
}
```

> Вы можете использовать свои собственные изображения или изображения из библиотеки, в этом случае используйте значки [Font Awesome] (https://fontawesome.com/) в формате PNG.

## Загрузка расширения

[Загрузите расширение](/ru-RU/viewer/extensions/skeleton?id=loading-the-extension), используя тот же код, как и в разделе **базовая структура** (конечно, изменив название). Для справки, необходимо внести 2 изменения: включить `<script>` в ** index.html ** и включить расширение при настройке Viewer:

 Откройте файл **/index.html** и добавьте следующую строчку:

```html
<script src="/js/handleselectionextension.js"></script>
```

В **/www/js/ForgeViewer.js** найдите строку:

```javascript
viewer = new Autodesk.Viewing.GuiViewer3D(document.getElementById('forgeViewer'));
```

И замените её на:

```javascript
viewer = new Autodesk.Viewing.GuiViewer3D(document.getElementById('forgeViewer'), { extensions: ['HandleSelectionExtension'] });
```

Важно: Если одно расширение уже загружено, тогда HandleSelectionExtension может быть добавлено с использованием **запятой (',')** в множестве:

```javascript
viewer = new Autodesk.Viewing.GuiViewer3D(document.getElementById('forgeViewer'), { extensions['MyAwesomeExtension','HandleSelectionExtension'] }); 
```

На этом этапе расширение должно загрузиться, и на панели инструментов появится кнопка, но она не будет работать.

## Добавление функции .onClick 

Теперь пора заменить `Execute an action here` внутри функции` .onClick`. Для этого примера давайте будем выделять элементы модели. Скопируйте следующий код в файл вашего расширения **.js** внутри функции `.onClick`:

```javascript
// Get current selection
const selection = this.viewer.getSelection();
this.viewer.clearSelection();
// Anything selected?
if (selection.length > 0) {
    let isolated = [];
    // Iterate through the list of selected dbIds
    selection.forEach((dbId) => {
        // Get properties of each dbId
        this.viewer.getProperties(dbId, (props) => {
            // Output properties to console
            console.log(props);
            // Ask if want to isolate
            if (confirm(`Isolate ${props.name} (${props.externalId})?`)) {
                isolated.push(dbId);
                this.viewer.isolate(isolated);
            }
        });
    });
} else {
    // If nothing selected, restore
    this.viewer.isolate(0);
}
```

## Завершение

На этом этапе расширение должно загрузиться и отобразить кнопку на панели инструментов. Выберите один или несколько объектов и нажмите кнопку, чтобы подтвердить, какие элементы нужно выделить. Следующее видео демонстрирует то, как это выглядит.

![](_media/javascript/js_isolate.gif)

> Консоль браузера необходима для веб-разработки и проверки кода. Узнайте больше о том, как её использовать для [Chrome](https://developers.google.com/web/tools/chrome-devtools/console/), [Edge](https://docs.microsoft.com/en-us/microsoft-edge/devtools-guide/console), [Firefox](https://developer.mozilla.org/en-US/docs/Tools/Web_Console/Opening_the_Web_Console) и [Safari](https://developer.apple.com/safari/tools/).

Ключевые функции:

- **.getSelection()** возвращает массив **dbId** и **.clearSelection()**
- **.getProperties()** это асинхронный метод, который возвращает все свойства для данного dbId через обратный вызов (англ. callback), который широко используется в Viewer, [подробнее о callback](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function)
- **.isolate()** метод, делает все остальные элементы прозрачными ("ghosted")

Дополнительные функции:

- **.forEach()** для перебора коллекции, это функция JavaScript, [узнать больше](https://www.w3schools.com/jsref/jsref_forEach.asp)
- **.push()** для добавления элементов в массив, [узнать больше](https://www.w3schools.com/jsref/jsref_push.asp)

Далее: [Панель свойств](/ru-RU/viewer/extensions/panel)

[Эта страница на английском языке](https://learnforge.autodesk.io/#/viewer/extensions/selection).
