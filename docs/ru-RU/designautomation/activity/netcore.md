# Определение Activity (.NET Core)

Все перечисленные ниже методы должны быть добавлены в класс `DesignAutomationController`.

**1. EngineAttributes**

Для определения activity нам понадобится исполняемый файл и расширение файла по умолчанию. Эта вспомогательная функция предоставляет его (по названию движка).

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

Определите новую activity с исходным файлом (input file), входными параметрами (input data [JSON]) и результатом на выходе (output file).

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

Нам также понадобится метод для возврата всех заданных activities. Обратите внимание, что возвращаются только те, которые определены вами (мы используем `Forge Client Id` в качестве псевдонима (англ. nick name), который затем появляется как префикс).
 
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

Теперь вы можете нажать на **Configure** (вверху справа), выбрать AppBundle, выбрать Engine и нажать **Define Activity**, что определит и загрузит appbundle и определит activity. На панели результатов (слева) показаны соответствующие ID. **Все остальные кнопки пока не работают** ... давайте продолжим.

![](_media/designautomation/define_activity.gif)

Далее: [Запуск workitem](/ru-RU/designautomation/workitem/)

[Эта страница на английском языке](https://learnforge.autodesk.io/#/designautomation/activity/netcore).
