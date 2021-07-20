getAllLeafComponents(callback) {
    this.viewer.getObjectTree(function (tree) {
        let leaves = [];
        tree.enumNodeChildren(tree.getRootId(), function (dbId) {
            if (tree.getChildCount(dbId) === 0) {
                leaves.push(dbId);
            }
        }, true);
        callback(leaves);
    });
}
