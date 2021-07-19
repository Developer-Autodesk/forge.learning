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
