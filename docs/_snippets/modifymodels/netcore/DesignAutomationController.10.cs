/// <summary>
/// Clear the accounts (for debugging purposes)
/// </summary>
[HttpDelete]
[Route("api/forge/designautomation/account")]
public async Task<IActionResult> ClearAccount()
{
    // clear account
    await _designAutomation.DeleteForgeAppAsync("me");
    return Ok();
}
