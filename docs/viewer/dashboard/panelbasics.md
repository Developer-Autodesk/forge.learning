# Prepare the data

The Viewer contains a lot of data from the model, but we need to filter and adjust to our dashboard. The following class will help on that.

There are several ways to organize data, like [Arrays](https://www.w3schools.com/js/js_arrays.asp), for this sample let's use JavaScript object (as a hash table). In essence it would be something like:

```javascript
var data = {};
data['key'] = someValue;
```

But we have multiple leves, like:

```javascript
var data = {};
data['key'] = {};
data['key']['subkey'] = someValue;
```

Using that approach, let's store the property name, property value and an array of dbIds with that value. For instance:

```javascript
data['Category']['Walls'] = [123, 456, 789];
```

The following code will prepare that data.

## DashboardPanel.js

Let's reuse the [getAllLeafComponents](viewer/extensions/panel?id=enumerate-leaf-nodes) method (from the Viewer Extension tutorial) to find all the visible dbIds on the model, then use `getProperties` to get the information. That is raw data. 

Under `/js/dashboard/` folder, create a new **DashboardPanel.js** with the following content:

[js/DashboardPanel.js](_snippets/dashboard/js/DashboardPanel.js ':include :type=code javascript')

At the **index.html** add a `<script>` for this new file. This should go inside the `<head>` and after the **Dashboard.js**:

```html
<script src="js/Dashboard/DashboardPanel.js"></script>  
```

Next: [Add charts](viewer/dashboard/charts)