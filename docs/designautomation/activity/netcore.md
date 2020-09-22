# Define an Activity (.NET Core)

The following methods should be added to the `DesignAutomationController` class.

**1. EngineAttributes**

To define the activity we'll need the executable and the default file extension. This helper function provides it (from the engine name). 

```csharp
/// <summary>
/// Helps identify the engine
/// </summary>
private dynamic EngineAttributes(string engine)
{
    if (engine.Contains("3dsMax")) return new { commandLine = "$(engine.path)\\3dsmaxbatch.exe -sceneFile \"$(args[inputFile].path)\" $(settings[script].path)", extension = "max", script = "da = dotNetClass(\"Autodesk.Forge.Sample.DesignAutomation.Max.RuntimeExecute\")\nda.ModifyWindowWidthHeight()\n" };
    if (engine.Contains("AutoCAD")) return new { commandLine = "$(engine.path)\\accoreconsole.exe /i \"$(args[inputFile].path)\" /al \"$(appbundles[{0}].path)\" /s $(settings[script].path)", extension = "dwg", script = "UpdateParam\n" };
    if (engine.Contains("Inventor")) return new { commandLine = "$(engine.path)\\inventorcoreconsole.exe /i \"$(args[inputFile].path)\" /al \"$(appbundles[{0}].path)\"", extension = "ipt", script = string.Empty };
    if (engine.Contains("Revit")) return new { commandLine = "$(engine.path)\\revitcoreconsole.exe /i \"$(args[inputFile].path)\" /al \"$(appbundles[{0}].path)\"", extension = "rvt", script = string.Empty };
    throw new Exception("Invalid engine");
}
```

**2. CreateActivity**

Define a new activity with an input file, input data (JSON) and an output file.

```csharp
/// <summary>
/// Define a new activity
/// </summary>
[HttpPost]
[Route("api/forge/designautomation/activities")]
public async Task<IActionResult> CreateActivity([FromBody]JObject activitySpecs)
{
    // basic input validation
    string zipFileName = activitySpecs["zipFileName"].Value<string>();
    string engineName = activitySpecs["engine"].Value<string>();

    // standard name for this sample
    string appBundleName = zipFileName + "AppBundle";
    string activityName = zipFileName + "Activity";

    // 
    Page<string> activities = await _designAutomation.GetActivitiesAsync();
    string qualifiedActivityId = string.Format("{0}.{1}+{2}", NickName, activityName, Alias);
    if (!activities.Data.Contains(qualifiedActivityId))
    {
        // define the activity
        // ToDo: parametrize for different engines...
        dynamic engineAttributes = EngineAttributes(engineName);
        string commandLine = string.Format(engineAttributes.commandLine, appBundleName);
        Activity activitySpec = new Activity()
        {
            Id = activityName,
            Appbundles = new List<string>() { string.Format("{0}.{1}+{2}", NickName, appBundleName, Alias) },
            CommandLine = new List<string>() { commandLine },
            Engine = engineName,
            Parameters = new Dictionary<string, Parameter>()
            {
                { "inputFile", new Parameter() { Description = "input file", LocalName = "$(inputFile)", Ondemand = false, Required = true, Verb = Verb.Get, Zip = false } },
                { "inputJson", new Parameter() { Description = "input json", LocalName = "params.json", Ondemand = false, Required = false, Verb = Verb.Get, Zip = false } },
                { "outputFile", new Parameter() { Description = "output file", LocalName = "outputFile." + engineAttributes.extension, Ondemand = false, Required = true, Verb = Verb.Put, Zip = false } }
            },
            Settings = new Dictionary<string, ISetting>()
            {
                { "script", new StringSetting(){ Value = engineAttributes.script } }
            }
        };
        Activity newActivity = await _designAutomation.CreateActivityAsync(activitySpec);

        // specify the alias for this Activity
        Alias aliasSpec = new Alias() { Id = Alias, Version = 1 };
        Alias newAlias = await _designAutomation.CreateActivityAliasAsync(activityName, aliasSpec);

        return Ok(new { Activity = qualifiedActivityId });
    }

    // as this activity points to a AppBundle "dev" alias (which points to the last version of the bundle),
    // there is no need to update it (for this sample), but this may be extended for different contexts
    return Ok(new { Activity = "Activity already defined" });
}
```

**3. GetDefinedActivities**

We'll also need a method to return all defined activities. Note that returns only those defined by you (we use the `Forge Client Id` as nick name, which then appears as a prefix).

```csharp
/// <summary>
/// Get all Activities defined for this account
/// </summary>
[HttpGet]
[Route("api/forge/designautomation/activities")]
public async Task<List<string>> GetDefinedActivities()
{
    // filter list of 
    Page<string> activities = await _designAutomation.GetActivitiesAsync();
    List<string> definedActivities = new List<string>();
    foreach (string activity in activities.Data)
        if (activity.StartsWith(NickName) && activity.IndexOf("$LATEST") == -1)
            definedActivities.Add(activity.Replace(NickName + ".", String.Empty));

    return definedActivities;
}
```

Now you can click on **Configure** (top-right), select the AppBundle, select the Engine and click on **Define Activity**, which should define and upload the appbundle and define the activity. The results panel (left-side) shows the respective ids. **All other buttons do not work yet**... let's move forward.

![](_media/designautomation/define_activity.gif)

Next: [Execute workitem](designautomation/workitem/)