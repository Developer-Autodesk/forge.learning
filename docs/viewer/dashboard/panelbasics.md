# Prepare the data

The Viewer contains a lot of data from the model, but we need to filter and adjust to our dashboard. The following class will help on that.

There are several ways to organize data, like [Arrays](https://www.w3schools.com/js/js_arrays.asp), for this sample let's use JavaScript object (as a hash table). In essence it would be something like:

```javascript
var data = {};
data['key'] = someValue;
```

But we have multiple leves, like:

```javascript
var data = {};
data['key'] = {};
data['key']['subkey'] = someValue;
```

Using that approach, let's store the property name, property value and an array of dbIds with that value. For instance:

```javascript
data['Category']['Walls'] = [123, 456, 789];
```

The following code will prepare that data.

## DashboardPanel.js

Let's reuse the [getAllLeafComponents](viewer/extensions/panel?id=enumerate-leaf-nodes) method (from the Viewer Extension tutorial) to find all the visible dbIds on the model, then use `getProperties` to get the information. That is raw data. 

Under `/js/dashboard/` folder, create a new **DashboardPanel.js** with the following content:

```javascript
// Model data in format for charts
class ModelData {
    constructor(viewer) {
        this._modelData = {};
        this._viewer = viewer;
    }

    init(callback) {
        var _this = this;

        _this.getAllLeafComponents(function (dbIds) {
            var count = dbIds.length;
            dbIds.forEach(function (dbId) {
                viewer.getProperties(dbId, function (props) {
                    props.properties.forEach(function (prop) {
                        if (!isNaN(prop.displayValue)) return; // let's not categorize properties that store numbers

                        // some adjustments for revit:
                        prop.displayValue = prop.displayValue.replace('Revit ', ''); // remove this Revit prefix
                        if (prop.displayValue.indexOf('<') == 0) return; // skip categories that start with <

                        // ok, now let's organize the data into this hash table
                        if (_this._modelData[prop.displayName] == null) _this._modelData[prop.displayName] = {};
                        if (_this._modelData[prop.displayName][prop.displayValue] == null) _this._modelData[prop.displayName][prop.displayValue] = [];
                        _this._modelData[prop.displayName][prop.displayValue].push(dbId);
                    })
                    if ((--count) == 0) callback();
                });
            })
        })
    }

    getAllLeafComponents(callback) {
        // from https://learnforge.autodesk.io/#/viewer/extensions/panel?id=enumerate-leaf-nodes
        viewer.getObjectTree(function (tree) {
            var leaves = [];
            tree.enumNodeChildren(tree.getRootId(), function (dbId) {
                if (tree.getChildCount(dbId) === 0) {
                    leaves.push(dbId);
                }
            }, true);
            callback(leaves);
        });
    }

    getLabels(propertyName) {
        return Object.keys(this._modelData[propertyName]);
    }

    getCountInstances(propertyName) {
        return Object.keys(this._modelData[propertyName]).map(key => this._modelData[propertyName][key].length);
    }

    getIds(propertyName, propertyValue) {
        return this._modelData[propertyName][propertyValue];
    }
}
```

At the **index.html** add a `<script>` for this new file. This should go inside the `<head>` and after the **Dashboard.js**:

```html
<script src="js/Dashboard/DashboardPanel.js"></script>  
```

Next: [Add charts](viewer/dashboard/charts)