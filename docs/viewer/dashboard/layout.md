# Adjust layout

This step of the tutorial uses the basic layout of your app, but adds an extra column for charts.

Let's create a new `Dashboard` folder under `/js/` to place the new files.

## Dashboard.js

This code will adjust the page layout, watch the **Viewer** and load the charts when the model date is loaded. It uses [JavaScript classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes).

Create a new **Dashboard.js** file under `/js/dashboard/` folder with the following content:

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
    constructor(viewer, panels) {
        var _this = this;
        this._viewer = viewer;
        this._panels = panels;
        this.adjustLayout();
        this._viewer.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, (viewer) => {
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

At the **index.html** add a `<script>` for this new file. This should go inside the `<head>`:

```html
<!-- dashboard files -->
<script src="js/Dashboard/Dashboard.js"></script>  
```

## Adjust the main.css

Let's also add a couple extra CSS classes to help on the layout. Add the following to your `/css/main.css` file:

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

Next: [Panel basics](viewer/dashboard/panelbasics)