# Add charts

There are many libraries to create charts, for this sample let's use [Chart.js](https://www.chartjs.org/), very simple yet nice to use and with great visual.

At the **index.html** add the `<script>` and `<link>` stylesheet below for the [Chart.js CDN](https://cdnjs.com/libraries/Chart.js) libraries reference. This should go inside the `<head>` 

```html
<!--Chart JS  packages-->
<script src="//cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js" ></script>
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.css" />
```

## Bar chart

Under `/js/dashboard/` folder create a new **PanelBarChart.js** file with the following content:

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

## Pie Chart

Under `/js/dashboard/` folder create a new **PanelPieChart.js** file with the following content:

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

At the **index.html** add 2 `<script>` for these new files. This should go inside the `<head>` and after the **DashboardPanel.js**:

```html
<script src="js/Dashboard/PanelBarChart.js"></script>
<script src="js/Dashboard/PanelPieChart.js"></script>
```

Your dashboard is now ready to run! Launch the browser, go to `http://localhost3000` and select a model.

# Troubleshooting

The popup alert message with *This model does not contain a Material property for the PieChart* (or BarChar) simply indicates that the default **Material** property is not available on the current model, therefore the pie or bar chart cannot be created. The following message will appear.

![](_media/javascript/js_dashboard_propertymissing.png)

To fix it, go to `Dashboard.js` (under `/js/dashboard/` folder), at lines 7 and 8 adjust the property name:

```javascript
new BarChart('Material'),
new PieChart('Material')
```

**Don't know which property is available?**

When the selected property is not available, the code will output a list of all the properties available at the browser console. 

> The browser console is essential for web development and debug. Learn more on how to use it for [Chrome](https://developers.google.com/web/tools/chrome-devtools/console/), [Edge](https://docs.microsoft.com/en-us/microsoft-edge/devtools-guide/console), [Firefox](https://developer.mozilla.org/en-US/docs/Tools/Web_Console/Opening_the_Web_Console) and [Safari](https://developer.apple.com/safari/tools/).

Next: [Deployment](deployment/)