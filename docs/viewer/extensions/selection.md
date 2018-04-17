# Selection

This section uses the **basic skeleton** from previous section, but let's rename the **MyAwesomeExtension** to **HandleSelectionExtension**. 

## Create the extension

As each extension should be a separeted JavaScript file, create a file in the UI folder **/js/handleselectionextension.js** and copy the following content (which is same as the basic skeleton, except with a different name): 

```javascript
// *******************************************
// Handle Selection Extension
// *******************************************
function HandleSelectionExtension(viewer, options) {
    Autodesk.Viewing.Extension.call(this, viewer, options);
}

HandleSelectionExtension.prototype = Object.create(Autodesk.Viewing.Extension.prototype);
HandleSelectionExtension.prototype.constructor = HandleSelectionExtension;

HandleSelectionExtension.prototype.load = function () {
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

HandleSelectionExtension.prototype.onToolbarCreated = function () {
    this.viewer.removeEventListener(av.TOOLBAR_CREATED_EVENT, this.onToolbarCreatedBinded);
    this.onToolbarCreatedBinded = null;
    this.createUI();
};

HandleSelectionExtension.prototype.createUI = function () {
    var _this = this;

    // prepare to execute the button action
    var handleSelectionToolbarButton = new Autodesk.Viewing.UI.Button('handleSelectionButton');
    handleSelectionToolbarButton.onClick = function (e) {
       
        // **********************
        //
        //
        // Execute an action here
        //
        //
        // **********************

    };
    // handleSelectionToolbarButton CSS class should be defined on your .css file
    // you may include icons, below is a sample class:
    handleSelectionToolbarButton.addClass('handleSelectionToolbarButton');
    handleSelectionToolbarButton.setToolTip('Handle current selection');

    // SubToolbar
    this.subToolbar = (this.viewer.toolbar.getControl("MyAppToolbar") ?
        this.viewer.toolbar.getControl("MyAppToolbar") :
        new Autodesk.Viewing.UI.ControlGroup('MyAppToolbar'));
    this.subToolbar.addControl(handleSelectionToolbarButton);

    this.viewer.toolbar.addControl(this.subToolbar);
};

HandleSelectionExtension.prototype.unload = function () {
    this.viewer.toolbar.removeControl(this.subToolbar);
    return true;
};

Autodesk.Viewing.theExtensionManager.registerExtension('HandleSelectionExtension', HandleSelectionExtension);
```
## Toolbar CSS

Just like in the basic skeleton, the toolbar button uses a **CSS** styling (see call to `.addClass` on the code). In the **/css/main.css** add the following:

```css
.handleSelectionToolbarButton {
    background-image: url(https://github.com/encharm/Font-Awesome-SVG-PNG/raw/master/white/png/24/object-group.png);
    background-size: 24px;
    background-repeat: no-repeat;
    background-position: center;
}
```

> You can use your own images or from a library, in this case let's use [Font Awesome](https://fontawesome.com/) icons in PNG format.

## Load the extension

Finally, [load the extension](/viewer/extensions/skeleton?id=loading-the-extension) using the same code as the **basic skeleton** (of course, adjust the names). For your reference, here are the 2 changes needed: include the `<script>` on **index.html** and include the extension on `.registerViewer()` call.

```html
<script src="/js/handleselectionextension.js"></script>
```

```javascript
viewerApp.registerViewer(viewerApp.k3D, Autodesk.Viewing.Private.GuiViewer3D, { extensions: ['HandleSelectionExtension'] });
```

At this point the extension should load with a toolbar icon, but it doesn't do anything.

## Implement .onClick function

Now it's time to replace the `Execute an action here` placeholder inside the `.onClick` function. For this sample, let's isolate the selection. Copy the following content to your extension **.js** file inside the `.onClick = function (e)` function:

```javascript
/// get current selection
var selection = _this.viewer.getSelection();
_this.viewer.clearSelection();
// anything selected?
if (selection.length > 0) {
    // create an array to store dbIds to isolate
    var dbIdsToChange = [];

    // iterate through the list of selected dbIds
    selection.forEach(function (dbId) {
        // get properties of each dbId
        _this.viewer.getProperties(dbId, function (props) {
            // output on console, for fun...
            console.log(props);

            // ask if want to isolate
            if (confirm('Confirm ' + props.name + ' (' + props.externalId + ')?')) {
                dbIdsToChange.push(dbId);

                // at this point we know which elements to isolate
                if (dbIdsToChange.length > 0) {
                    // isolate selected (and confirmed) dbIds
                    _this.viewer.isolate(dbIdsToChange);
                }
            }
        })
    })

}
else {
    // if nothing selected, restore
    _this.viewer.isolate(0);
}
```

## Conclusion

At this point the extension should load and show a toolbar button. Select one or more object and click on the button, confirm which elements to isolate. The following video demonstrate its behaviour.

![](_media/javascript/js_isolate.gif)

> The browser console is essential for web development and debug. Learn more on how to use it for [Chrome](https://developers.google.com/web/tools/chrome-devtools/console/), [Edge](https://docs.microsoft.com/en-us/microsoft-edge/devtools-guide/console), [Firefox](https://developer.mozilla.org/en-US/docs/Tools/Web_Console/Opening_the_Web_Console) and [Safari](https://developer.apple.com/safari/tools/).

Key learning points:

- **.getSelection()** returns an array of **dbId** from the model, and **.clearSelection()**
- **.getProperties()** is an asynchronous method that returns all properties for a given dbId via callback, which is widelly used on Viewer, [learn more about callbacks](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function)
- **.isolate()** method make all other elements transparents (ghost)

Additional learning points:

- **.forEach()** to iterate through a collection, this is a JavaScript feature, [learn more](https://www.w3schools.com/jsref/jsref_forEach.asp)
- **.push()** to to include items on an array, [learn more](https://www.w3schools.com/jsref/jsref_push.asp)

Next: [Docking panel](viewer/extensions/panel)