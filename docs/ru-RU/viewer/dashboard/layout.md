# Макет веб-приложения

На этом шаге руководства мы используем базовый макет вашего приложения, но при этом добавляем дополнительный столбец для диаграмм.

Давайте создадим папку `Dashboard` в `/js/`, чтобы разместить новый файлы.

## Dashboard.js

Этот код отрегулирует внешний вид веб-страницы, откроет **Viewer** и отобразит графики, когда данные модели будут загружены. Он использует [JavaScript classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes).

Создайте новый файл **Dashboard.js** в папке `/js/dashboard/` со следующим кодом:

```javascript
$(document).ready(function () {
    $(document).on('DOMNodeInserted', function (e) {
        if ($(e.target).hasClass('orbit-gizmo')) {
            // to make sure we get the viewer, let's use the global var NOP_VIEWER
            if (NOP_VIEWER === null || NOP_VIEWER === undefined) return;
            new Dashboard(NOP_VIEWER, [
                new BarChart('Material'),
                new PieChart('Material')
            ])
        }
    });
})

// Handles the Dashboard panels
class Dashboard {
    constructor(/ru-RU/viewer, panels) {
        var _this = this;
        this._viewer = viewer;
        this._panels = panels;
        this.adjustLayout();
        this._viewer.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, (/ru-RU/viewer) => {
            _this.loadPanels();
        });
    }

    adjustLayout() {
        // this function may vary for layout to layout...
        // for learn forge tutorials, let's get the ROW and adjust the size of the 
        // columns so it can fit the new dashboard column, also we added a smooth transition css class for a better user experience
        var row = $(".row").children();
        $(row[0]).removeClass('col-sm-4').addClass('col-sm-2 transition-width');
        $(row[1]).removeClass('col-sm-8').addClass('col-sm-7 transition-width').after('<div class="col-sm-3 transition-width" id="dashboard"></div>');
    }

    loadPanels () {
        var _this = this;
        var data = new ModelData(this);
        data.init(function () {
            $('#dashboard').empty();
            _this._panels.forEach(function (panel) {
                // let's create a DIV with the Panel Function name and load it
                panel.load('dashboard', viewer, data);
            });
        });
    }
}
```

В **index.html** добавьте `<script>` для нового файла. Это должно находиться в блоке `<head>`:
    
```html
<!-- dashboard files -->
<script src="js/Dashboard/Dashboard.js"></script>  
```

## Настройте основной файл .css

Давайте также добавим пару дополнительных классов CSS, чтобы изменить внешний вид веб-приложения. Добавьте следующий код к вашему файлу `/css/main.css`:

```css
#dashboard{
  overflow: auto;
  height: calc(100vh - 100px);
}

.transition-width {
  transition: width 1s ease-in-out;
}

.dashboardPanel {
  width: 100%;
  padding: 3%;
  display: block;
}
```

Далее: [Подготовка данных](/ru-RU/viewer/dashboard/panelbasics)

[Страница на английском языке](https://learnforge.autodesk.io/#/viewer/dashboard/layout).
