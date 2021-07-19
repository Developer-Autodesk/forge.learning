# Docking Panel

This section uses the **basic skeleton** from previous section, but let's rename the **MyAwesomeExtension** to **ModelSummaryExtension**. 

## Create the extension

As each extension should be a separeted JavaScript file, create a file in the UI folder **/js/modelsummaryextension.js** and copy the following content (which is same as the basic skeleton, except with a different name): 

[js/modelsummaryextension.js](_snippets/extensions/js/modelsummaryextension.1.js ':include :type=code javascript')

## Toolbar CSS

Just like in the basic skeleton, the toolbar button uses a **CSS** styling (see call to `.addClass` on the code). In the **/css/main.css** add the following:

[css/main.css](_snippets/extensions/css/main.3.css ':include :type=code css')

## Load the extension

Finally, [load the extension](/viewer/extensions/skeleton?id=loading-the-extension) using the same code as the **basic skeleton** (of course, adjust the names). For your reference, here are the 2 changes needed: include the `<script>` on **index.html** and include the extension on viewer creation:

```html
<script src="/js/modelsummaryextension.js"></script>
```

```javascript
viewer = new Autodesk.Viewing.GuiViewer3D(document.getElementById('forgeViewer'), { extensions: ['ModelSummaryExtension'] });
```

> Note how `extensions` is an array, so you can load multiple extensions! For instance, to load the previous selection sample and this, just use `['HandleSelectionExtension', 'ModelSummaryExtension']` instead! Cool, right?

At this point the extension should load with a toolbar icon, but it doesn't do anything.

## Enumerate leaf nodes

The Viewer contains all elements on the model, including categories (e.g. families or part definition), so we need to enumerate the leaf nodes, meaning actual instances on the model. The following `getAllLeafComponents()` function should be added to our extension class. This is based on [this blog post](https://forge.autodesk.com/blog/enumerating-leaf-nodes-viewer). 

[js/modelsummaryextension.js](_snippets/extensions/js/modelsummaryextension.2.js ':include :type=code javascript')

## Docking panel

The extension will show the results on a Viewer [property panel](https://forge.autodesk.com/en/docs/viewer/v7/reference/UI/PropertyPanel/). Copy the content to your extension **.js** file (anywhere on the file, outside other functions).

[js/modelsummaryextension.js](_snippets/extensions/js/modelsummaryextension.3.js ':include :type=code javascript')

## Implement .onClick function

Now it's time to replace the `Execute an action here` placeholder inside the `onClick` function. For this sample, let's first show the property panel, then enumerate leaf nodes, then get a specific set of properties for leaf nodes, finally count ocurrences of those properties and show results on the panel. 

!> In the code below you **MUST** adjust `filteredProps` to the property names that applies to your models. For instance, as **Material** exists on almost all models, you can try with `const filteredProps = ['Material'];`

Copy the following content to your extension **.js** file inside the `onClick` function of the extension's button:

[js/modelsummaryextension.js](_snippets/extensions/js/modelsummaryextension.4.js ':include :type=code javascript')

## Conclusion

At this point the extension should load and show a toolbar button. Click on the button and the panel should appear. The following video demonstrate its behaviour.

![](_media/javascript/js_dockingpanel.gif)

> As mentioned, you need to define the **filteredProps** appropriate for your models. The above video used `['Material', 'Design Status', 'Type Name'];` which works for both models.

Key learning points:

- **.getObjectTree()** gives access to the model hierarchy and with **.getChildCount()** and **.enumNodeChildren()** is possible to recursively iterate the tree
- **.getBulkProperties()** is an asynchronous method that returns a specific set of properties for an array of dbIds via callback, which is widelly used on Viewer, [learn more about callbacks](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function)
- **.addProperty()** panel method adds properties (name, value) on a category

Additional learning points:

- **.forEach()** to iterate through a collection, this is a JavaScript feature, [learn more](https://www.w3schools.com/jsref/jsref_forEach.asp)

Next: [Examples](viewer/extensions/examples)