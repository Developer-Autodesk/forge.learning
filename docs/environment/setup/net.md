# Create a new project (.NET)

Go to menu File >> New >> New Project and select Web >> Web API. For this sample, let's name it **forgesample**. 

![](_media/net/create_project_webapi.gif) 

Install the Autodesk Forge NuGet package: right-click on the project (**Solution Explorer**), select **Manage NuGet Package**, then on **Browse** search for **Autodesk Forge** and install it our **forgesample**. If you prefer, via command line, use:

```
PM> Install-Package Autodesk.Forge
```

## Web.Config

On the **Web.Config** file, add the Forge Client ID & Secret entries. By default, it should already have a `<appSettings></appSettings>`, so make sure it is after `</system.web>` and before `<system.webServer>`, as shown below:

```xml
....
</system.web> <!-- this line is already on your file -->
<appSettings>
  <add key="FORGE_CLIENT_ID" value="Your client ID here" />
  <add key="FORGE_CLIENT_SECRET" value="Your client secret here" />
</appSettings>
<system.webServer> <!-- this line is already on your file -->
....
```

Last, to make your app consistent with all other **Autodesk Forge** samples, let's change the port to **3000**: go to project **Properties** (right-click on project name), under **Web** tab, then change the **Project URL** to `http://localhost:3000`.

![](_media/net/port.png) 

Project is ready! 

Next: [Authenticate](oauth/2legged/)