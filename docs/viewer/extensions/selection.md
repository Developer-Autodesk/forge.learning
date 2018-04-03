# Selection

This section uses the **basic skeleton** from previous section, but let's rename the **MyAwesomeExtension** to **HandleSelectionExtension**. 

## Create the extension

As each extension should be an separeted JavaScript file, create a file at **/www/js/handleselectionextension.js** and copy the following content (which is the same as the basic skeleton, except with a different name): 

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
    var viewer = this.viewer;

    // prepare to execute the button action
    var myAwesomeToolbarButton = new Autodesk.Viewing.UI.Button('handleSelectionButton');
    myAwesomeToolbarButton.onClick = function (e) {
        
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
    myAwesomeToolbarButton.addClass('handleSelectionToolbarButton');
    myAwesomeToolbarButton.setToolTip('Handle current selection');

    // SubToolbar
    this.subToolbar = new Autodesk.Viewing.UI.ControlGroup('MyAppToolbar');
    this.subToolbar.addControl(myAwesomeToolbarButton);

    viewer.toolbar.addControl(this.subToolbar);
};

HandleSelectionExtension.prototype.unload = function () {
    this.viewer.toolbar.removeControl(this.subToolbar);
    return true;
};

Autodesk.Viewing.theExtensionManager.registerExtension('HandleSelectionExtension', HandleSelectionExtension);
```

And, just like on the basic skeletong, the toolbar button uses a **CSS** styling (see call to `.addClass` on the code). At the **/css/main.css** add the following.

```css
.handleSelectionToolbarButton {
    background-image: url(https://github.com/encharm/Font-Awesome-SVG-PNG/raw/master/white/png/24/object-group.png);
    background-size: 24px;
    background-repeat: no-repeat;
    background-position: center;
}
```

> You can use your own images or from a library, in this case let's use [Font Awesome](https://fontawesome.com/) icons in PNG format.

Finally, [load the extension](/viewer/extensions/skeleton?id=loading-the-extension) using the same code as the **basic skeleton** (of course, adjust the names). At this point the extension should load with a toolbar icon, but it doesn't do anything.

## Implement .onClick function

Now it's time to replace the `Execute an action here` placeholder inside the `.onClick` function. For this sample, let's isolate and change the color of the selection. 

```javascript

```