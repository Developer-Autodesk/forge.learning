# Execute Workitem

A job that executes a specified Activity, using specified input files and generating appropriate output files.

The relationship between an Activity and WorkItem can be thought of as a “function definition” and “function call”, respectively. The Activity specifies the AppBundle(s) to use, which in turn specify the Engine to use. The Workitem is then called to execute those.

In this tutorial sample, the workitem specifies the input file URL, the input JSON data with the new parameter values, and the destination URL for the output file. This sample will upload the input file to a OSS bucket before starting the workitem.

Choose your language: [Node.js](designautomation/workitem/nodejs) | [.NET Core](designautomation/workitem/netcore)