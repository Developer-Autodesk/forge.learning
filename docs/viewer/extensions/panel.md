# Docking Panel

This section uses the **basic skeleton** from previous section, but let's rename the **MyAwesomeExtension** to **ModelSummaryExtension**. 

## Create the extension

As each extension should be a separeted JavaScript file, create a file in the UI folder **/js/dockingpanelextension.js** and copy the following content (which is same as the basic skeleton, except with a different name): 

```javascript
// *******************************************
// Model Summary Extension
// *******************************************
function ModelSummaryExtension(viewer, options) {
    Autodesk.Viewing.Extension.call(this, viewer, options);
    this.panel = null; // create the panel variable
}

ModelSummaryExtension.prototype = Object.create(Autodesk.Viewing.Extension.prototype);
ModelSummaryExtension.prototype.constructor = ModelSummaryExtension;

ModelSummaryExtension.prototype.load = function () {
    if (this.viewer.toolbar) {
        // Toolbar is already available, create the UI
        this.createUI();
    } else {
        // Toolbar hasn't been created yet, wait until we get notification of its creation
        this.onToolbarCreatedBinded = this.onToolbarCreated.bind(this);
        this.viewer.addEventListener(av.TOOLBAR_CREATED_EVENT, this.onToolbarCreatedBinded);
    }
    return true;
};

ModelSummaryExtension.prototype.onToolbarCreated = function () {
    this.viewer.removeEventListener(av.TOOLBAR_CREATED_EVENT, this.onToolbarCreatedBinded);
    this.onToolbarCreatedBinded = null;
    this.createUI();
};

ModelSummaryExtension.prototype.createUI = function () {
    var _this = this;

    // prepare to execute the button action
    var modelSummaryToolbarButton = new Autodesk.Viewing.UI.Button('runModelSummaryCode');
    modelSummaryToolbarButton.onClick = function (e) {
        
        // **********************
        //
        //
        // Execute an action here
        //
        //
        // **********************

    };
    // modelSummaryToolbarButton CSS class should be defined on your .css file
    // you may include icons, below is a sample class:
    modelSummaryToolbarButton.addClass('modelSummaryToolbarButton');
    modelSummaryToolbarButton.setToolTip('Model Summary');

    // SubToolbar
    this.subToolbar = (this.viewer.toolbar.getControl("MyAppToolbar") ?
        this.viewer.toolbar.getControl("MyAppToolbar") :
        new Autodesk.Viewing.UI.ControlGroup('MyAppToolbar'));
    this.subToolbar.addControl(modelSummaryToolbarButton);

    this.viewer.toolbar.addControl(this.subToolbar);
};

ModelSummaryExtension.prototype.unload = function () {
    this.viewer.toolbar.removeControl(this.subToolbar);
    return true;
};

Autodesk.Viewing.theExtensionManager.registerExtension('ModelSummaryExtension', ModelSummaryExtension);
```

## Toolbar CSS

Just like in the basic skeleton, the toolbar button uses a **CSS** styling (see call to `.addClass` on the code). In the **/css/main.css** add the following:

```css
.modelSummaryToolbarButton {
  background-image: url(https://github.com/encharm/Font-Awesome-SVG-PNG/raw/master/white/png/24/dashboard.png);
  background-size: 24px;
  background-repeat: no-repeat;
  background-position: center;
}
```

## Load the extension

Finally, [load the extension](/viewer/extensions/skeleton?id=loading-the-extension) using the same code as the **basic skeleton** (of course, adjust the names). For your reference, here are the 2 changes needed: include the `<script>` on **index.html** and include the extension on `.registerViewer()` call.

```html
<script src="/js/dockingpanelextension.js"></script>
```

```javascript
viewerApp.registerViewer(viewerApp.k3D, Autodesk.Viewing.Private.GuiViewer3D, { extensions: ['ModelSummaryExtension'] });
```

> Note how `extensions` is an array, so you can load multiple extensions! For instance, to load the previous selection sample and this, just use `['HandleSelectionExtension', 'ModelSummaryExtension']` instead! Cool, right?

At this point the extension should load with a toolbar icon, but it doesn't do anything.

## Enumerate leaf nodes

The Viewer contains all elements on the model, including categories (e.g. families or part definition), so we need to enumerate the leaf nodes, meaning actual instances on the model. The following `.getAllLeafComponents()` function should be added to our extension (anywhere on the file, outside other functions). This is based on [this blog post](https://forge.autodesk.com/blog/enumerating-leaf-nodes-viewer). 

```javascript
ModelSummaryExtension.prototype.getAllLeafComponents = function (callback) {
    var cbCount = 0; // count pending callbacks
    var components = []; // store the results
    var tree; // the instance tree

    function getLeafComponentsRec(parent) {
        cbCount++;
        if (tree.getChildCount(parent) != 0) {
            tree.enumNodeChildren(parent, function (children) {
                getLeafComponentsRec(children);
            }, false);
        } else {
            components.push(parent);
        }
        if (--cbCount == 0) callback(components);
    }
    this.viewer.getObjectTree(function (objectTree) {
        tree = objectTree;
        var allLeafComponents = getLeafComponentsRec(tree.getRootId());
    });
};
```

> Note how `.getAllLeafComponents()` if defined as a prototype method of **ModelSummaryExtension**. [Learn more about JavaScript Prototype](https://www.w3schools.com/js/js_object_prototypes.asp).

## Docking panel

The extension will show the results on a Viewer [property panel](https://developer.autodesk.com/en/docs/viewer/v2/reference/javascript/propertypanel/). Copy the content to your extension **.js** file (anywhere on the file, outside other functions).

```javascript
// *******************************************
// Model Summary Panel
// *******************************************
function ModelSummaryPanel(viewer, container, id, title, options) {
    this.viewer = viewer;
    Autodesk.Viewing.UI.PropertyPanel.call(this, container, id, title, options);
}
ModelSummaryPanel.prototype = Object.create(Autodesk.Viewing.UI.PropertyPanel.prototype);
ModelSummaryPanel.prototype.constructor = ModelSummaryPanel;
```

## Implement .onClick function

Now it's time to replace the `Execute an action here` placeholder inside the `.onClick` function. For this sample, let's first show the property panel, then enumerate leaf nodes, then get a specific set of properties for leaf nodes, finally count ocurrences of those properties and show results on the panel. 

!> In the code below you **MUST** adjust `var propsToList = ['PropName1', 'PropName2'];` to the property names that applies to your models. For instance, as **Material** exists on almost all models, you can try with `var propsToList = ['Material'];`

Copy the following content to your extension **.js** file inside the `.onClick = function (e)` function:

```javascript
// check if the panel is created or not
if (_this.panel == null) {
    _this.panel = new ModelSummaryPanel(_this.viewer, _this.viewer.container, 'modelSummaryPanel', 'Model Summary');
}
// show/hide docking panel
_this.panel.setVisible(!_this.panel.isVisible());

// if panel is NOT visible, exit the function
if (!_this.panel.isVisible()) return;
// ok, it's visible, let's get the summary!

// first, the Viewer contains all elements on the model, including
// categories (e.g. families or part definition), so we need to enumerate
// the leaf nodes, meaning actual instances of the model. The following
// getAllLeafComponents function is defined at the bottom
_this.getAllLeafComponents(function (dbIds) {

    // now for leaf components, let's get some properties
    // and count occurrences of each value.
    var propsToList = ['PropName1', 'PropName2'];

    // get only the properties we need for the leaf dbIds
    _this.viewer.model.getBulkProperties(dbIds, propsToList, function (dbIdsProps) {

        // iterate through the elements we found
        dbIdsProps.forEach(function (item) {

            // and iterate through each property
            item.properties.forEach(function (itemProp) {

                // now use the propsToList to store the count as a subarray
                if (propsToList[itemProp.displayName] === undefined)
                    propsToList[itemProp.displayName] = {};

                // now start counting: if first time finding it, set as 1, else +1
                if (propsToList[itemProp.displayName][itemProp.displayValue] === undefined)
                    propsToList[itemProp.displayName][itemProp.displayValue] = 1;
                else
                    propsToList[itemProp.displayName][itemProp.displayValue] += 1;
            });
        });

        // now ready to show!
        // the Viewer PropertyPanel has the .addProperty that receives the name, value
        // and category, that simple! So just iterate through the list and add them
        propsToList.forEach(function (propName) {
            if (propsToList[propName] === undefined) return;
            Object.keys(propsToList[propName]).forEach(function (propValue) {
                _this.panel.addProperty(
                    /*name*/     propValue,
                    /*value*/    propsToList[propName][propValue],
                    /*category*/ propName);
            });
        });
    })
})
```

## Conclusion

At this point the extension should load and show a toolbar button. Click on the button and the panel should appear. The following video demonstrate its behaviour.

![](_media/javascript/js_dockingpanel.gif)

> As mentioned, you need to define the **propsToList** appropriate for your models. The above video used `['Material', 'Design Status', 'Type Name'];` which works for both models.

Key learning points:

- **.getObjectTree()** gives access to the model hierarchy and with **.getChildCount()** and **.enumNodeChildren()** is possible to recursively iterate the tree
- **.getBulkProperties()** is an asynchronous method that returns a specific set of properties for an array of dbIds via callback, which is widelly used on Viewer, [learn more about callbacks](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function)
- **.addProperty()** panel method adds properties (name, value) on a category

Additional learning points:

- **.forEach()** to iterate through a collection, this is a JavaScript feature, [learn more](https://www.w3schools.com/jsref/jsref_forEach.asp)

Next: [Examples](viewer/extensions/examples)