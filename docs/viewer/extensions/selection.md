# Selection

This section uses the **basic skeleton** from previous section, but let's rename the **MyAwesomeExtension** to **HandleSelectionExtension**. 

## Create the extension

As each extension should be a separeted JavaScript file, create a file in the UI folder **/js/handleselectionextension.js** and copy the following content (which is same as the basic skeleton, except with a different name): 

[js/handleselectionextension.js](_snippets/extensions/js/handleselectionextension.1.js ':include :type=code javascript')

## Toolbar CSS

Just like in the basic skeleton, the toolbar button uses a **CSS** styling. In the **/css/main.css** add the following:

[css/main.css](_snippets/extensions/css/main.2.css ':include :type=code css')

> You can use your own images or from a library, in this case let's use [Font Awesome](https://fontawesome.com/) icons in PNG format.

## Load the extension

Finally, [load the extension](/viewer/extensions/skeleton?id=loading-the-extension) using the same code as the **basic skeleton** (of course, adjust the names). For your reference, here are the 2 changes needed: include the `<script>` on **index.html** and include the extension on viewer creation:

 Open the **/index.html** file and add the following line :

```html
<script src="/js/handleselectionextension.js"></script>
```

In the **/www/js/ForgeViewer.js** find the following line:

```javascript
viewer = new Autodesk.Viewing.GuiViewer3D(document.getElementById('forgeViewer'));
```

And replace with:

```javascript
viewer = new Autodesk.Viewing.GuiViewer3D(document.getElementById('forgeViewer'), { extensions: ['HandleSelectionExtension'] });
```

Note :- If one extension is already loaded then HandleSelectionExtension can be added using **comma (',')**  in an array:

```javascript
viewer = new Autodesk.Viewing.GuiViewer3D(document.getElementById('forgeViewer'), { extensions: ['MyAwesomeExtension','HandleSelectionExtension'] }); 
```

At this point the extension should load with a toolbar icon, but it doesn't do anything.

## Implement .onClick function

Now it's time to replace the `Execute an action here` placeholder inside the `.onClick` function. For this sample, let's isolate the selection. Copy the following content to your extension **.js** file inside the `.onClick` function:

[js/handleselectionextension.js](_snippets/extensions/js/handleselectionextension.2.js ':include :type=code javascript')

## Conclusion

At this point the extension should load and show a toolbar button. Select one or more object and click on the button, confirm which elements to isolate. The following video demonstrate its behaviour.

![](_media/javascript/js_isolate.gif)

> The browser console is essential for web development and debug. Learn more on how to use it for [Chrome](https://developers.google.com/web/tools/chrome-devtools/console/), [Edge](https://docs.microsoft.com/en-us/microsoft-edge/devtools-guide/console), [Firefox](https://developer.mozilla.org/en-US/docs/Tools/Web_Console/Opening_the_Web_Console) and [Safari](https://developer.apple.com/safari/tools/).

Key learning points:

- **.getSelection()** returns an array of **dbId** from the model, and **.clearSelection()**
- **.getProperties()** is an asynchronous method that returns all properties for a given dbId via callback, which is widelly used on Viewer, [learn more about callbacks](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function)
- **.isolate()** method makes all other elements transparent ("ghosted")

Additional learning points:

- **.forEach()** to iterate through a collection, this is a JavaScript feature, [learn more](https://www.w3schools.com/jsref/jsref_forEach.asp)
- **.push()** to to include items on an array, [learn more](https://www.w3schools.com/jsref/jsref_push.asp)

Next: [Docking panel](viewer/extensions/panel)