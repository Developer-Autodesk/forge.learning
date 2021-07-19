// Check if the panel is created or not
if (this._panel == null) {
    this._panel = new ModelSummaryPanel(this.viewer, this.viewer.container, 'modelSummaryPanel', 'Model Summary');
}
// Show/hide docking panel
this._panel.setVisible(!this._panel.isVisible());

// If panel is NOT visible, exit the function
if (!this._panel.isVisible())
    return;

// First, the viewer contains all elements on the model, including
// categories (e.g. families or part definition), so we need to enumerate
// the leaf nodes, meaning actual instances of the model. The following
// getAllLeafComponents function is defined at the bottom
this.getAllLeafComponents((dbIds) => {
    // Now for leaf components, let's get some properties and count occurrences of each value
    const filteredProps = ['PropertyNameA', 'PropertyNameB'];
    // Get only the properties we need for the leaf dbIds
    this.viewer.model.getBulkProperties(dbIds, filteredProps, (items) => {
        // Iterate through the elements we found
        items.forEach((item) => {
            // and iterate through each property
            item.properties.forEach(function (prop) {
                // Use the filteredProps to store the count as a subarray
                if (filteredProps[prop.displayName] === undefined)
                    filteredProps[prop.displayName] = {};
                // Start counting: if first time finding it, set as 1, else +1
                if (filteredProps[prop.displayName][prop.displayValue] === undefined)
                    filteredProps[prop.displayName][prop.displayValue] = 1;
                else
                    filteredProps[prop.displayName][prop.displayValue] += 1;
            });
        });
        // Now ready to show!
        // The PropertyPanel has the .addProperty that receives the name, value
        // and category, that simple! So just iterate through the list and add them
        filteredProps.forEach((prop) => {
            if (filteredProps[prop] === undefined) return;
            Object.keys(filteredProps[prop]).forEach((val) => {
                this._panel.addProperty(val, filteredProps[prop][val], prop);
            });
        });
    });
});
