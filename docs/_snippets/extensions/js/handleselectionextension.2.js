// Get current selection
const selection = this.viewer.getSelection();
this.viewer.clearSelection();
// Anything selected?
if (selection.length > 0) {
    let isolated = [];
    // Iterate through the list of selected dbIds
    selection.forEach((dbId) => {
        // Get properties of each dbId
        this.viewer.getProperties(dbId, (props) => {
            // Output properties to console
            console.log(props);
            // Ask if want to isolate
            if (confirm(`Isolate ${props.name} (${props.externalId})?`)) {
                isolated.push(dbId);
                this.viewer.isolate(isolated);
            }
        });
    });
} else {
    // If nothing selected, restore
    this.viewer.isolate(0);
}
