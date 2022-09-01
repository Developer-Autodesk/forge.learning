# Структура расширения

Эта часть руководства описывает базовую структуру расширения с кнопкой на панели инструментов Forge Viewer, которая запускает код внутри функции`.onClick`. Вы можете перейти сразу на пример [Выделение элементов](/ru-RU/viewer/extensions/selection).

## Создания расширения

Давайте начнем! Каждое расширение должно быть файлом JavaScript и реализовывать, по крайней мере, функции `.load` и` .unload`. Создайте файл в папке UI **/js/myawesomeextension.js** и скопируйте код ниже. 

```javascript
class MyAwesomeExtension extends Autodesk.Viewing.Extension {
    constructor(/ru-RU/viewer, options) {
        super(/ru-RU/viewer, options);
        this._group = null;
        this._button = null;
    }

    load() {
        console.log('MyAwesomeExtensions has been loaded');
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
        console.log('MyAwesomeExtensions has been unloaded');
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
        this._button = new Autodesk.Viewing.UI.Button('myAwesomeExtensionButton');
        this._button.onClick = (ev) => {
            // Execute an action here
        };
        this._button.setToolTip('My Awesome Extension');
        this._button.addClass('myAwesomeExtensionIcon');
        this._group.addControl(this._button);
    }
}

Autodesk.Viewing.theExtensionManager.registerExtension('MyAwesomeExtension', MyAwesomeExtension);
```

!> Обратите внимание, что приведенный выше код содержит комментарий `Execute an action here`, который следует заменить вашим пользовательским кодом.

## Панель инструментов CSS

Панель инструментов использует форматирование **CSS**  (см. вызов функции `.addClass` в коде). В **/css/main.css** добавьте:

```css
.myAwesomeExtensionIcon {
    background-image: url(/img/myAwesomeIcon.png);
    background-size: 24px;
    background-repeat: no-repeat;
    background-position: center;
}
```

!> URL `background-image` должен быть скорректирован для существующего файла в вашем проекте. Viewer использует картинки размером 24px.

## Загрузка расширения

Каркас расширения готов, теперь откройте файл **/index.html** и, для загрузки файла, введите: 

```html
<script src="/js/myawesomeextension.js"></script>
```

Важно:   Убедитесь, что при загрузке кода расширений <scripts>, вы загружаете его после ForgeViewer.js

![](_media/forge/extension_example.png)



Наконец, нам нужно задать команду Viewer загрузить расширение, в ** / www / js / ForgeViewer.js ** найдите следующую строку:

```javascript
viewer = new Autodesk.Viewing.GuiViewer3D(document.getElementById('forgeViewer'));
```

И замените её на:

```javascript
viewer = new Autodesk.Viewing.GuiViewer3D(document.getElementById('forgeViewer'), { extensions: ['MyAwesomeExtension'] });
```

На этом этапе расширение должно загрузиться, и на панели инструментов появится кнопка, но она не будет работать (помните, что мы не написали код для функции `.onClick`). Это базовая структура, которую вы можете использовать для создания своих расширений.

!> При создании вашего собственного расширения не забудьте его переименовать - названия должны быть уникальными. 


Далее: [Выделение элементов](/ru-RU/viewer/extensions/selection)

[Эта страница на английском языке](https://learnforge.autodesk.io/#/viewer/extensions/skeleton).
