# Execute Workitem (Node.js)

The following apis should be added to the `DesignAutomation` js file before the last line `module.exports = router;`

**1. StartWorkitem**

This is where we actually start the Design Automation. This endpoint also uploads the input file to an OSS Bucket and define that the output should be saved at the same bucket. To help you identify the files, both input and output uses the same original file name, but with a suffix (`input` or `output`) plus a time stamp. 

[routes/DesignAutomation.js](_snippets/modifymodels/node/routes/DesignAutomation.4.js ':include :type=code javascript')

**2. OnCallback**

When the workitem is done, Design Automation will callback our app (using the ngrok forwarding URL). This function will handle it and push a notification to the client (using socketIO).

[routes/DesignAutomation.js](_snippets/modifymodels/node/routes/DesignAutomation.5.js ':include :type=code javascript')

**3. ClearAccount**

Last, but not least, to help you test, this api removes all appbundles and activities from your account.

[routes/DesignAutomation.js](_snippets/modifymodels/node/routes/DesignAutomation.6.js ':include :type=code javascript')

Everything ready!

Next: [Run & Debug](environment/rundebug/2legged_da)