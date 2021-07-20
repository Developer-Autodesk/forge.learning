/// <summary>
/// Return a list of available engines
/// </summary>
[HttpGet]
[Route("api/forge/designautomation/engines")]
public async Task<List<string>> GetAvailableEngines()
{
    dynamic oauth = await OAuthController.GetInternalAsync();
    List<string> allEngines = new List<string>();
    // define Engines API
    string paginationToken = null;
    while (true)
    {
        Page<string> engines = await _designAutomation.GetEnginesAsync(paginationToken);
        allEngines.AddRange(engines.Data);
        if (engines.PaginationToken == null)
            break;
        paginationToken = engines.PaginationToken;
    } 
    allEngines.Sort();
    return allEngines; // return list of engines
}
