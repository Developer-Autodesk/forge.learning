# Extension Skeleton

An extension should implement the `.load` and `.unload` functions. To make a little more interesting, let's also create a toolbar button to trigger this extension code inside `.onClick` function. 

Each extension should be a JavaScript file. Create a file at **/www/js/myawesomeextension.js** and copy the following content. 

```javascript
// *******************************************
// My Awesome Extension
// *******************************************
function MyAwesomeExtension(viewer, options) {
    Autodesk.Viewing.Extension.call(this, viewer, options);
}

MyAwesomeExtension.prototype = Object.create(Autodesk.Viewing.Extension.prototype);
MyAwesomeExtension.prototype.constructor = MyAwesomeExtension;

MyAwesomeExtension.prototype.load = function () {
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

MyAwesomeExtension.prototype.onToolbarCreated = function () {
    this.viewer.removeEventListener(av.TOOLBAR_CREATED_EVENT, this.onToolbarCreatedBinded);
    this.onToolbarCreatedBinded = null;
    this.createUI();
};

MyAwesomeExtension.prototype.createUI = function () {
    var viewer = this.viewer;

    // prepare to execute the button action
    var myAwesomeToolbarButton = new Autodesk.Viewing.UI.Button('runMyAwesomeCode');
    myAwesomeToolbarButton.onClick = function (e) {
        
        // **********************
        //
        //
        // Execute an action here
        //
        //
        // **********************

    };
    // myAwesomeToolbarButton CSS class should be defined on your .css file
    // you may include icons, below is a sample class:
    myAwesomeToolbarButton.addClass('myAwesomeToolbarButton');
    myAwesomeToolbarButton.setToolTip('My Awesome extension');

    // SubToolbar
    this.subToolbar = new Autodesk.Viewing.UI.ControlGroup('MyAwesomeAppToolbar');
    this.subToolbar.addControl(myAwesomeToolbarButton);

    viewer.toolbar.addControl(this.subToolbar);
};

MyAwesomeExtension.prototype.unload = function () {
    this.viewer.toolbar.removeControl(this.subToolbar);
    return true;
};

Autodesk.Viewing.theExtensionManager.registerExtension('MyAwesomeExtension', MyAwesomeExtension);
```

> Note that the code above contains  a place holder with `Execute an action here` comment, which should be replaced with your custom code.

The toolbar button uses a **CSS** styling (see call to `.addClass` on the code). At the **/css/main.css** add the following:

```css
.myAwesomeToolbarButton {
    background-image: url(/img/myAwesomeIcon.png);
    background-size: 24px;
    background-repeat: no-repeat;
    background-position: center;
}
```

## Loading the extension

The extension skeleton is ready, now open the **/index.html** file and add the following line (which loads the file):

```html
<script src="/js/myawesomeextension.js"></script>
```

Finally we need to tell the Viewer to load the extension. At the **/www/js/ForgeViewer.js** find the following line:

```javascript
viewerApp.registerViewer(viewerApp.k3D, Autodesk.Viewing.Private.GuiViewer3D);
```

And replace with:

```javascript
viewerApp.registerViewer(viewerApp.k3D, Autodesk.Viewing.Private.GuiViewer3D, { extensions: ['MyAwesomeExtension'] });
```

At this point the extension should load and the toolbar button will show, but it doesn't execute anything. This is the basic skeleton you can use to create your extensions. 

!> When creating your own extensions, make sure to rename it: names must be unique. 


Next: [Handling selection](viewer/extensions/selection)
