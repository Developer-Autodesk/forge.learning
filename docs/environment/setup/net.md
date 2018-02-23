# Create a new project (.NET)

Go to menu **File** >> **New** >> **Project** and select **Web** >> **ASP.NET Web Application**. For this sample, let's name it **forgesample**. On the next dialog, select **Empty** and select **Web API**. 

Install the Autodesk Forge NuGet package: right-click on the project (**Solution Explorer**), select **Manage NuGet Package**, then on **Browse** search for **Autodesk Forge** and install it our **forgesample**. 

![](_media/net/create_project_webapi.gif) 

!> If **Web** & **ASP.NET** project types are not available, please review [Tools](environment/tools/net) section

## Web.Config

On the **Web.Config** file, add the Forge Client ID & Secret entries (obtained when you created your app). By default, it should already have a `<appSettings></appSettings>` after `<configuration>` and before `</system.web>`, adjust as shown below:

```xml
....
<configuration> <!-- this line is already on your file -->
  <appSettings>
    <add key="FORGE_CLIENT_ID" value="Your client ID here" />
    <add key="FORGE_CLIENT_SECRET" value="Your client secret here" />
  </appSettings>
  <system.web> <!-- this line is already on your file -->
....
```

Last, to make your app consistent with all other **Autodesk Forge** samples, let's change the port to **3000**: go to project **Properties** (right-click on project name), under **Web** tab, then change the **Project URL** to `http://localhost:3000`.

![](_media/net/port.png) 

Project is ready! 

Next: [Authenticate](oauth/2legged/)