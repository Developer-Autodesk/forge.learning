/// <summary>
/// Clear the accounts (for debugging purpouses)
/// </summary>
router.delete('/forge/designautomation/account', async /*ClearAccount*/ (req, res) => {
    let api = await Utils.dav3API(req.oauth_token);
    // clear account
    await api.deleteForgeApp('me');
    res.status(200).end();
});
