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
