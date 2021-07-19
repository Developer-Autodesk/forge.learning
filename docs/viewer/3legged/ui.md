# Viewer (client-side)

Let's create the 4 files we need on the client-side:

## Index.html

This is the entry point of your app. For this sample we'll use [jQuery](https://jquery.com) for [DOM](https://www.w3schools.com/js/js_htmldom.asp) manipulation, [Bootstrap](https://getbootstrap.com/) for styling and [jsTree](https://www.jstree.com) to list buckets & objects. All those libraries are coming from [CDN](https://cdnjs.com/) ([Content Delivery Network](https://en.wikipedia.org/wiki/Content_delivery_network)).

And, of course, the Autodesk Forge Viewer libraries: viewer3d.min.js, three.min.js and style.min.css.

Create a **index.html** file with:

<!-- tabs:start -->

#### ** Viewer v7 **

[index.html](_snippets/viewhubmodels/common/index.v7.html ':include :type=code html')

#### ** Viewer v6 **

[index.html](_snippets/viewhubmodels/common/index.v6.html ':include :type=code html')

#### ** Migration Guide **

Please visit the [Forge website](https://forge.autodesk.com/en/docs/viewer/v7/change_history/changelog_v7/migration_guide_v6_to_v7/) for a complete guide for developers who have been using v6 (or older) and are upgrading to v7.

<!-- tabs:end -->

## Main.css

CSS is a language that describes the style of an HTML document. Learn more at [W3Schools](https://www.w3schools.com/css/). For this tutorial, create a **main.css** under `css` folder with:

[main.css](_snippets/viewhubmodels/common/main.css ':include :type=code css')

## ForgeTree.js

This file will handle the tree view that lists **hubs**, **projects**, **projects**, **folder**, **items** and **versions**. Under `js` folder, create a **ForgeTree.js** file with the following content:

[ForgeTree.js](_snippets/viewhubmodels/common/ForgeTree.js ':include :type=code javascript')

## ForgeViewer.js

Now this file will handle the Viewer initialization. Under `js` folder, create a **ForgeViewer.js** file with:

<!-- tabs:start -->

#### ** Viewer v7 **

The following code is based on the Autodesk Forge Viewer [Basic](https://forge.autodesk.com/en/docs/viewer/v7/developers_guide/viewer_basics/initialization/) tutorial.

[ForgeViewer.js](_snippets/viewhubmodels/common/ForgeViewer.v7.js ':include :type=code javascript')

#### ** Viewer v6 **

The following code is based on the Autodesk Forge Viewer [Basic Application](https://forge.autodesk.com/en/docs/viewer/v6/tutorials/basic-application/) tutorial.

[ForgeViewer.js](_snippets/viewhubmodels/common/ForgeViewer.v6.js ':include :type=code javascript')

#### ** Migration Guide **

Please visit the [Forge Migration Guide ](https://forge.autodesk.com/en/docs/viewer/v7/change_history/changelog_v7/migration_guide_v6_to_v7/) for a complete documentation for developers who have been using v6 (or older) and are upgrading to v7.

<!-- tabs:end -->

To summarize: on the UI side your app should have 4 files:
- Index.html
- Main.css
- ForgeTree.js
- ForgeViewer.js

All set? Now it's time to run the app!

Next: [Running your app](environment/rundebug/3legged)
