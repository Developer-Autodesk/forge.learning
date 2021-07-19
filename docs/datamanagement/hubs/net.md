# List hubs & projects (.NET Framework)

## DataManagementController.cs

Create a .NET WebAPI Controller named **DataManagementController** (see [how to create a controller](environment/setup/net_controller)) and add the following content:

> Note that a few errors will appear, to be fixed right after.

[DataManagementController.cs](_snippets/viewhubmodels/net/DataManagementController.1.cs ':include :type=code csharp')

The above receives the request from the UI tree. The `id` parameter indicates the node that is being expanded: `#` means root node, so list hubs. After that it contains the `href` of the resource, so when expanding one `hub` the endpoint should return the projects for the hub. The above code calls different `get` functions. To complete it, also copy the following content to the file (inside the same `DataManagementController` class).

[DataManagementController.cs](_snippets/viewhubmodels/net/DataManagementController.2.cs ':include :type=code csharp')

The last `get` function returns the **Versions** for each item (file), where the `.relationships.derivatives.data.id` property contains the `URN` for the **Viewer**. It's important to test if this attribute is available as some items may not have viewables (e.g. a ZIP or DOCx file) or may not have being translated yet.

Note how we reuse the `Credentials` exposed via property.

Next: [User information](oauth/user/readme)