# Running & Debugging (.NET)

The WebAPI project that we created on Visual Studio came without files, therefore when we start it, nothing runs. As our **forgesample** project now contains a `index.html`, simply right-click on it and select **Set as Start Page**.

Visual Studio should recognize all browsers on the machine and list them to start your project. Just select one and click on the "play" icon. The browser should open with your start page.

![](_media/net/start_debug.png) 

## Troubleshooting

As of February, 2017, the **Autodesk.Forge** package may not work with **RestSharp v106**. If you see an error related to versioing, make sure to "downgrade" to **v105.*** at menu **Tools** >> **NuGet Package Manager** >> **Manage NuGet Package for Solution**, under **Installed** tab. Make sure **Newtonsoft.Json** version is **9.*** or **10.***. 

On older versions of Visual Studio (e.g. Visual Studio 2015) the above fix may not be sufficient. If so, open `web.config` and include a `dependentAssembly` section, as shown below:

```xml
<dependentAssembly>
  <assemblyIdentity name="Newtonsoft.Json" publicKeyToken="30ad4fe6b2a6aeed" culture="neutral" />
  <bindingRedirect oldVersion="0.0.0.0-10.0.0.0" newVersion="9.0.1" />
</dependentAssembly>
```

Next: [Viewer extension](tutorials/extensions)