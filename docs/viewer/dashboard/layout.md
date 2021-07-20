# Adjust layout

This step of the tutorial uses the basic layout of your app, but adds an extra column for charts.

Let's create a new `Dashboard` folder under `/js/` to place the new files.

## Dashboard.js

This code will adjust the page layout, watch the **Viewer** and load the charts when the model date is loaded. It uses [JavaScript classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes).

Create a new **Dashboard.js** file under `/js/dashboard/` folder with the following content:

[js/Dashboard.js](_snippets/dashboard/js/Dashboard.js ':include :type=code javascript')

At the **index.html** add a `<script>` for this new file. This should go inside the `<head>`:

```html
<!-- dashboard files -->
<script src="js/Dashboard/Dashboard.js"></script>  
```

## Adjust the main.css

Let's also add a couple extra CSS classes to help on the layout. Add the following to your `/css/main.css` file:

[css/main.css](_snippets/dashboard/css/main.css ':include :type=code css')

Next: [Panel basics](viewer/dashboard/panelbasics)