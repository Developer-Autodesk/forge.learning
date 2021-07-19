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
