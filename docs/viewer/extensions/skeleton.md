# Extension Skeleton

This step of the tutorial describes the basic skeleton of an extension with a toolbar button, which triggers a code inside `.onClick` function. You may skip to [Handling Selection](viewer/extensions/selection) for a real sample.

## Create the extension

Let's get started, each extension should be a JavaScript file and implement, at least, the `.load` and `.unload` functions. Create a file in the UI folder **/js/myawesomeextension.js** and copy the following content. 

[js/myawesomeextension.js](_snippets/extensions/js/myawesomeextension.js ':include :type=code javascript')

!> Note that the code above contains a place holder with `Execute an action here` comment, which should be replaced with your custom code.

## Toolbar CSS

The toolbar button uses a **CSS** styling (see call to `.addClass` on the code). At the **/css/main.css** add the following:

[css/main.css](_snippets/extensions/css/main.1.css ':include :type=code css')

!> The `background-image` URL should be adjusted for an existing file on your project. Viewer uses 24px images.

## Load the extension

The extension skeleton is ready, now open the **/index.html** file and add the following line (which loads the file):

```html
<script src="/js/myawesomeextension.js"></script>
```

Note :-   Make sure while loading the extensions <scripts> code, load it below the ForgeViewer.js 

![](_media/forge/extension_example.png)



Finally we need to tell the Viewer to load the extension, in the **/www/js/ForgeViewer.js** find the following line:

```javascript
viewer = new Autodesk.Viewing.GuiViewer3D(document.getElementById('forgeViewer'));
```

And replace with:

```javascript
viewer = new Autodesk.Viewing.GuiViewer3D(document.getElementById('forgeViewer'), { extensions: ['MyAwesomeExtension'] });
```

At this point the extension should load and the toolbar button will show, but it doesn't execute anything (remember there is just a place holder comment on `.onClick` function). This is the basic skeleton you can use to create your extensions. 

!> When creating your own extensions, make sure to rename it, names must be unique. 


Next: [Handling selection](viewer/extensions/selection)
