# Execute Workitem (.NET Core)

The following methods should be added to the `DesignAutomationController` class.

**1. StartWorkitem**

This is where we actually start the Design Automation. The `StartWorkitemInput` is just a data structure. This method also uploads the input file to an OSS Bucket and define that the output should be saved at the same bucket. To help you identify the files, both input and output uses the same original file name, but with a suffix (`input` or `output`) plus a time stamp.

[DesignAutomationController.cs](_snippets/modifymodels/netcore/DesignAutomationController.8.cs ':include :type=code csharp')

> Note how the `StartWorkitemInput` class is defined **inside** de **DesignAutomationController**, this is correct and it's used as input parameter for `StartWorkitem` method.

**2. OnCallback**

When the workitem is done, Design Automation will callback our app (using the ngrok forwarding URL). This function will handle it and push a notification to the client (using SignalR Hub).

[DesignAutomationController.cs](_snippets/modifymodels/netcore/DesignAutomationController.9.cs ':include :type=code csharp')

**3. ClearAccount**

Last, but not least, to help you test, this function removes all appbundles and activities from your account. 

[DesignAutomationController.cs](_snippets/modifymodels/netcore/DesignAutomationController.10.cs ':include :type=code csharp')

Everything ready!

Next: [Run & Debug](environment/rundebug/2legged_da)