# Графики

Существует множество библиотек для создания графиков, мы воспользуемся [Chart.js](https://www.chartjs.org/), очень простая библиотека с отличными возможностями для визуализации.

В файл **index.html** добавьте `<script>` и `<link>` для библиотек [Chart.js CDN](https://cdnjs.com/libraries/Chart.js). Это должно находиться в блоке `<head>`. 

```html
<!--Chart JS  packages-->
<script src="//cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js" ></script>
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.css" />
```

## Гистограмма (англ. bar chart)

В папке `/js/dashboard/` создайте новый файл **PanelBarChart.js** со следующим кодом:

```javascript
class BarChart extends DashboardPanelChart {
    constructor(property) {
        super();
        this.propertyToUse = property;
    }

    load(parentDivId, viewer, modelData) {
        if (!super.load(parentDivId, this.constructor.name, viewer, modelData)) return;
        this.drawChart();
    }

    drawChart() {
        var _this = this; // need this for the onClick event

        var ctx = document.getElementById(this.canvasId).getContext('2d');
        var colors = this.generateColors(this.modelData.getLabels(this.propertyToUse).length);

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: this.modelData.getLabels(this.propertyToUse),
                datasets: [{
                    data: this.modelData.getCountInstances(this.propertyToUse),
                    backgroundColor: colors.background,
                    borderColor: colors.borders,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                legend: {
                    display: false
                },
                'onClick': function (evt, item) {
                    _this.viewer.isolate(_this.modelData.getIds(_this.propertyToUse, item[0]._model.label));
                }
            }
        });
    }
}
```

## Диаграмма (англ. pie chart)

В папке `/js/dashboard/` создайте новый файл **PanelPieChart.js** со следующим кодом:

```javascript
class PieChart extends DashboardPanelChart {
    constructor(property) {
        super();
        this.propertyToUse = property;
    }

    load(parentDivId, viewer, modelData) {
        if (!super.load(parentDivId, this.constructor.name, viewer, modelData)) return;
        this.drawChart();
    }

    drawChart() {
        var _this = this; // need this for the onClick event

        var ctx = document.getElementById(this.canvasId);
        var colors = this.generateColors(this.modelData.getLabels(this.propertyToUse).length);

        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: this.modelData.getLabels(this.propertyToUse),
                datasets: [{
                    data: this.modelData.getCountInstances(this.propertyToUse),
                    backgroundColor: colors.background,
                    borderColor: colors.borders,
                    borderWidth: 1
                }]
            },
            options: {
                legend: {
                    display: true
                },
                'onClick': function (evt, item) {
                    _this.viewer.isolate(_this.modelData.getIds(_this.propertyToUse, item[0]._model.label));
                }
            }
        });
    }
}
```

В файл **index.html** добавьте 2 `<script>` для этих файлов. Это должно находиться в блоке `<head>`, после **DashboardPanel.js**:

```html
<script src="js/Dashboard/PanelBarChart.js"></script>
<script src="js/Dashboard/PanelPieChart.js"></script>
```

Ваш dashboard готов! Откройте браузер, перейдите по ссылке `http://localhost3000` и выберите модель.

# Устранение проблем

Всплывающее окно с надписью *This model does not contain a Material property for the PieChart* (или BarChar) означает, что свойство **Material** не доступно для данной модели, поэтому графики не могут быть созданы. Вы увидите следующее сообщение: 

![](_media/javascript/js_dashboard_propertymissing.png)

Чтобы это исправить, перейдите в `Dashboard.js` (в папке `/js/dashboard/`), и измените названия свойств в строчках 7 и 8:

```javascript
new BarChart('Material'),
new PieChart('Material')
```

**Не знаете, какие свойства вам доступны?**

Если выбранное свойство недоступно, код выведет список всех свойств, доступных в консоли браузера.

> Консоль браузера необходима для веб-разработки и проверки кода. Узнайте больше о том, как её использовать для [Chrome](https://developers.google.com/web/tools/chrome-devtools/console/), [Edge](https://docs.microsoft.com/en-us/microsoft-edge/devtools-guide/console), [Firefox](https://developer.mozilla.org/en-US/docs/Tools/Web_Console/Opening_the_Web_Console) and [Safari](https://developer.apple.com/safari/tools/).

Далее: [Развертывание](/ru-RU/deployment/)

[Эта страница на английском языке](https://learnforge.autodesk.io/#/viewer/dashboard/charts).
