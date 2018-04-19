# Extension Skeleton

This step of the tutorial describes the basic skeleton of an extension with a toolbar button, which triggers a code inside `.onClick` function. You may skip to [Handling Selection](viewer/extensions/selection) for a real sample.

## Create the extension

Let's get started, each extension should be a JavaScript file and implement, at least, the `.load` and `.unload` functions. Create a file in the UI folder **/js/myawesomeextension.js** and copy the following content. 

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
  var _this = this;

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

    alert('I am an extension');

  };
  // myAwesomeToolbarButton CSS class should be defined on your .css file
  // you may include icons, below is a sample class:
  myAwesomeToolbarButton.addClass('myAwesomeToolbarButton');
  myAwesomeToolbarButton.setToolTip('My Awesome extension');

  // SubToolbar
  this.subToolbar = (this.viewer.toolbar.getControl("MyAppToolbar") ?
    this.viewer.toolbar.getControl("MyAppToolbar") :
    new Autodesk.Viewing.UI.ControlGroup('MyAppToolbar'));
  this.subToolbar.addControl(myAwesomeToolbarButton);

  this.viewer.toolbar.addControl(this.subToolbar);
};

MyAwesomeExtension.prototype.unload = function () {
  this.viewer.toolbar.removeControl(this.subToolbar);
  return true;
};

Autodesk.Viewing.theExtensionManager.registerExtension('MyAwesomeExtension', MyAwesomeExtension);
```

!> Note that the code above contains a place holder with `Execute an action here` comment, which should be replaced with your custom code.

## Toolbar CSS

The toolbar button uses a **CSS** styling (see call to `.addClass` on the code). At the **/css/main.css** add the following:

```css
.myAwesomeToolbarButton {
    background-image: url(/img/myAwesomeIcon.png);
    background-size: 24px;
    background-repeat: no-repeat;
    background-position: center;
}
```

!> The `background-image` URL should be adjusted for an existing file on your project. Viewer uses 24px images.

## Load the extension

The extension skeleton is ready, now open the **/index.html** file and add the following line (which loads the file):

```html
<script src="/js/myawesomeextension.js"></script>
```

Finally we need to tell the Viewer to load the extension, in the **/www/js/ForgeViewer.js** find the following line:

```javascript
viewerApp.registerViewer(viewerApp.k3D, Autodesk.Viewing.Private.GuiViewer3D);
```

And replace with:

```javascript
viewerApp.registerViewer(viewerApp.k3D, Autodesk.Viewing.Private.GuiViewer3D, { extensions: ['MyAwesomeExtension'] });
```

At this point the extension should load and the toolbar button will show, but it doesn't execute anything (remember there is just a place holder comment on `.onClick` function). This is the basic skeleton you can use to create your extensions. 

!> When creating your own extensions, make sure to rename it, names must be unique. 


Next: [Handling selection](viewer/extensions/selection)
