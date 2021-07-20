# List hubs & projects (Node.js)

## routes/datamanagement.js

Create a `routes/datamanagement.js` file with the following content:

[routes/datamanagement.js](_snippets/viewhubmodels/node/routes/datamanagement.1.js ':include :type=code javascript')

The above receives the request from the UI tree. The `id` parameter indicates the node that is being expanded: `#` means root node, so list hubs. After that it contains the `href` of the resource, so when expanding one `hub` the endpoint should return the projects for the hub. The above code calls different `get` functions. To complete it, also copy the following content to the file:

[routes/datamanagement.js](_snippets/viewhubmodels/node/routes/datamanagement.2.js ':include :type=code javascript')

The last `get` function returns the **Versions** for each item (file), where the `.relationships.derivatives.data.id` property contains the `URN` for the **Viewer**. It's important to test if this attribute is available as some items may not have viewables (e.g. a ZIP or DOCx file) or may not have being translated yet.

Note how we reuse the auth helpers from `routes/common/oauth.js` here.

Next: [User information](oauth/user/readme)