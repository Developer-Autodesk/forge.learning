# Modify your models

This tutorial will guide you to create a webapp sample that uses Forge Design Automation API. This sample illustrates how we can use this API to modify on the cloud, a model saved in a file, chosing one of the Autodesk products (AutoCAD, Revit, Inventor or 3ds Max). More information about Design Automation API can be found [here](https://forge.autodesk.com/api/design-automation-cover-page/).


## Resize model sample

We will develop a webapp that can upload an input file with a model on it, and change its `width` and `height` parameter. In our case, the model is a Window. The app will save the new resized model in a new output file. 

> Both input and output files are saved in OSS Buckets, you can use [View Models](tutorials/viewmodels) tutorial to view them.

The sample will let you:
- define an AppBundle and an Activity (as an initial configuration) linked to a specific engine (AutoCAD, Revit, Inventor or 3ds Max). This will be possible with the `Configure` option on the top right corner.
- execute the Workitem, task of changing the model size, defining the `width`, `height`, `input` model and the preconfigured `activity`. The process is being logged, and at the end, it will include a link to the resulted output file.

![](_media/tutorials/run_sample_modifymodels.gif)

## Workflow

The sample follows a [typical Design Automation workflow using a custom Activity](https://forge.autodesk.com/en/docs/design-automation/v3/developers_guide/basics/#typical-workflows). Even that some of the Design Automation will be described during the turtorial, you can [here](https://forge.autodesk.com/en/docs/design-automation/v3/developers_guide/basics/) get already familiar with them, or come back to that documentation later.

### Steps

To modify your models, you need:

1. [Create a server](environment/setup/2legged_da) << First time developer? You should start here
2. [Basic app UI](designautomation/html/)
3. [Prepare an AppBundle (plugin)](designautomation/appbundle/)
4. [Define an activity](designautomation/activity/)
5. [Execute workitem](designautomation/workitem/)

If you want to download the project ready to use, visit the following repos:

- [.NET Core](https://github.com/Autodesk-Forge/learn.forge.designautomation)
- [Node.js](https://github.com/Autodesk-Forge/learn.forge.designautomation/tree/nodejs)

> If you want to test the Design Automation API without UI, you have also available a number of [Postman collections](https://github.com/Autodesk-Forge/forge-tutorial-postman) following the same workflow as the sample above, and described in the [API documentation](https://forge.autodesk.com/en/docs/design-automation/v3/tutorials/3dsmax/about_tutorial/)   

Ready to start coding?

Next: [Create a server](environment/setup/2legged_da)