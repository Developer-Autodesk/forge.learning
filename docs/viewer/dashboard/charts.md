# Add charts

There are many libraries to create charts, for this sample let's use [Chart.js](https://www.chartjs.org/), very simple yet nice to use and with great visual.

## Category Bar chart

Under `/js/dashboard/` folder create a new **PanelCategoryChart.js** file with the following content:

```javascript
class CategoryChart extends DashboardPanelChart {
    load(parentDivId, viewer, modelData) {
        super.load(parentDivId, this.constructor.name, viewer, modelData);
        this.propertyToUse = 'Category';
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

## Materials Pie Chart

Under `/js/dashboard/` folder create a new **PanelMaterialChart.js** file with the following content:

```javascript
class MaterialChart extends DashboardPanelChart {
    load(parentDivId, viewer, modelData) {
        super.load(parentDivId, this.constructor.name, viewer, modelData);
        this.propertyToUse = 'Material';
        this.drawChart();
    }

    drawChart() {
        var _this = this; // need this for the onClick event

        var ctx = document.getElementById(this.canvasId)
        var colors = this.generateColors(this.modelData.getLabels(this.propertyToUse).length);

        new Chart(ctx, {
            type: 'pie',
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
<script src="js/Dashboard/PanelCategoryChart.js"></script>
<script src="js/Dashboard/PanelMaterialChart.js"></script>
```

Your dashboard is now ready to run!

Next: [Deployment](deployment/)