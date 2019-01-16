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
    if (engine.Contains("3dsMax")) return new { executable = "3dsmaxbatch.exe", extension = "max" };
    if (engine.Contains("AutoCAD")) return new { executable = "accoreconsole.exe", extension = "dwg" };
    if (engine.Contains("Inventor")) return new { executable = "InventorCoreConsole.exe", extension = "ipt" };
    if (engine.Contains("Revit")) return new { executable = "revitcoreconsole.exe", extension = "rvt" };
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

    // define Activities API
    dynamic oauth = await OAuthController.GetInternalAsync();
    ActivitiesApi activitiesApi = new ActivitiesApi();
    activitiesApi.Configuration.AccessToken = oauth.access_token;

    // standard name for this sample
    string appBundleName = zipFileName + "AppBundle";
    string activityName = zipFileName + "Activity";

    // 
    PageString activities = await activitiesApi.ActivitiesGetItemsAsync();
    string qualifiedActivityId = string.Format("{0}.{1}+{2}", NickName, activityName, Alias);
    if (!activities.Data.Contains(qualifiedActivityId))
    {
        // define the activity
        // ToDo: parametrize for different engines...
        dynamic engineAttributes = EngineAttributes(engineName);
        string commandLine = string.Format(@"$(engine.path)\\{0} /i $(args[inputFile].path) /al $(appbundles[{1}].path) /s $(settings[script].path)", engineAttributes.executable, appBundleName);
        ModelParameter inputFile = new ModelParameter(false, false, ModelParameter.VerbEnum.Get, "input file", true, "$(inputFile)");
        ModelParameter inputJson = new ModelParameter(false, false, ModelParameter.VerbEnum.Get, "input json", false, "params.json");
        ModelParameter outputFile = new ModelParameter(false, false, ModelParameter.VerbEnum.Put, "output file", true, "outputFile." + engineAttributes.extension);
        Activity activitySpec = new Activity(
            new List<string>() { commandLine },
            new Dictionary<string, ModelParameter>() {
            { "inputFile", inputFile },
            { "inputJson", inputJson },
            { "outputFile", outputFile }
            },
            engineName, new List<string>() { string.Format("{0}.{1}+{2}", NickName, appBundleName, Alias) },
            new Dictionary<string, dynamic>() { { "script", new { value = "UpdateParam\n" }  } },
            string.Format("Description for {0}", activityName), null, activityName);
            Activity newActivity = await activitiesApi.ActivitiesCreateItemAsync(activitySpec);
 
        // specify the alias for this Activity
        Alias aliasSpec = new Alias(1, null, Alias);
        Alias newAlias = await activitiesApi.ActivitiesCreateAliasAsync(activityName, aliasSpec);

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
    dynamic oauth = await OAuthController.GetInternalAsync();

    // define Activities API
    ActivitiesApi activitiesApi = new ActivitiesApi();
    activitiesApi.Configuration.AccessToken = oauth.access_token; ;

    // filter list of 
    PageString activities = await activitiesApi.ActivitiesGetItemsAsync();
    List<string> definedActivities = new List<string>();
    foreach (string activity in activities.Data)
        if (activity.StartsWith(NickName) && activity.IndexOf("$LATEST") == -1)
            definedActivities.Add(activity.Replace(NickName + ".", String.Empty));

    return definedActivities;
}
```

Next: [Execute workitem](designautomation/workitem/)