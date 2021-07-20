# Code for creating App Bundle (Node Js)


Inside `route/` folder create `DesignAutomation.js` file. In this file we will write all the endpoints.

**1. Utils**

Before creating endpoints, we will add Utils class consisting of all the utility functions like creating design automation SDK instance, uploading file and few more helpfull functions which are used in this sample.

[routes/DesignAutomation.js](_snippets/modifymodels/node/routes/DesignAutomation.1.js ':include :type=code javascript')

**2. App Bundle**

Before creating activity, we need to define app bundle with plugin and selecting the appropriate engine. Copy & paste the following endpoint after the utils class:

[routes/DesignAutomation.js](_snippets/modifymodels/node/routes/DesignAutomation.2.js ':include :type=code javascript')

If you run the webapp now and click on **Configure** (top-right), you should see your AppBundle and a list of all available engines. **Buttons do not work yet**... let's move forward.

![](_media/designautomation/list_engines.png)

Next: [Define an Activity](designautomation/activity/)