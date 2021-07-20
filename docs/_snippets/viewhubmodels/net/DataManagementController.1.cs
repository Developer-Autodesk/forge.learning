using Autodesk.Forge;
using Autodesk.Forge.Model;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;

namespace forgesample.Controllers
{
  public class DataManagementController : ApiController
  {
    /// <summary>
    /// Credentials on this request
    /// </summary>
    private Credentials Credentials { get; set; }

    /// <summary>
    /// GET TreeNode passing the ID
    /// </summary>
    [HttpGet]
    [Route("api/forge/datamanagement")]
    public async Task<IList<jsTreeNode>> GetTreeNodeAsync([FromUri]string id)
    {
      Credentials = await Credentials.FromSessionAsync();
      if (Credentials == null)
      {
        return null;
      }

      IList<jsTreeNode> nodes = new List<jsTreeNode>();

      if (id == "#") // root
        return await GetHubsAsync();
      else
      {
        string[] idParams = id.Split('/');
        string resource = idParams[idParams.Length - 2];
        switch (resource)
        {
          case "hubs": // hubs node selected/expanded, show projects
            return await GetProjectsAsync(id);
          case "projects": // projects node selected/expanded, show root folder contents
            return await GetProjectContents(id);
          case "folders": // folders node selected/expanded, show folder contents
            return await GetFolderContents(id);
          case "items":
            return await GetItemVersions(id);
        }
      }

      return nodes;
    }
  }
}
