# Define an Activity (.NET Core)

The following methods should be added to the `DesignAutomationController` class.

**1. EngineAttributes**

To define the activity we'll need the executable and the default file extension. This helper function provides it (from the engine name). 

[DesignAutomationController.cs](_snippets/modifymodels/netcore/DesignAutomationController.5.cs ':include :type=code csharp')

**2. CreateActivity**

Define a new activity with an input file, input data (JSON) and an output file.

[DesignAutomationController.cs](_snippets/modifymodels/netcore/DesignAutomationController.6.cs ':include :type=code csharp')

**3. GetDefinedActivities**

We'll also need a method to return all defined activities. Note that returns only those defined by you (we use the `Forge Client Id` as nick name, which then appears as a prefix).

[DesignAutomationController.cs](_snippets/modifymodels/netcore/DesignAutomationController.7.cs ':include :type=code csharp')

Now you can click on **Configure** (top-right), select the AppBundle, select the Engine and click on **Define Activity**, which should define and upload the appbundle and define the activity. The results panel (left-side) shows the respective ids. **All other buttons do not work yet**... let's move forward.

![](_media/designautomation/define_activity.gif)

Next: [Execute workitem](designautomation/workitem/)