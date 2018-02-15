# Create a new project (.NET)

Go to menu File >> New >> New Project and select Web >> Web API. For this sample, let's name it **forgesample**. 

![](_media/net/create_project_webapi.gif) 

Install the Autodesk Forge NuGet package: go to **Tools** >> **NuGet Package Manager** >> **Manage NuGet Package for Solution**, then on **Browse** search for *Autodesk Forge* and install it our **forgesample**. If you prefer, via command line, use:

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

At this point, the webapp is not doing anything. 

Next: [Authenticate](oauth/2legged/)