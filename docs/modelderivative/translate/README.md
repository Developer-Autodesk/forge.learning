# Translate the file

Check the supported translations [here](https://developer.autodesk.com/en/docs/model-derivative/v2/overview/supported-translations/), or use the [endpoint](https://developer.autodesk.com/en/docs/model-derivative/v2/reference/http/formats-GET/).

To translate a file, first call [POST Job](https://developer.autodesk.com/en/docs/model-derivative/v2/reference/http/job-POST/) to start the process, then call [GET Manifest](https://developer.autodesk.com/en/docs/model-derivative/v2/reference/http/urn-manifest-GET/) to check the progress.

Note that this endpoint is asynchronous and initiates a process that runs in the background, rather than keeping an open HTTP connection until completion. Use the GET :urn/manifest endpoint to poll for the job’s completion.

Choose your language: [NodeJS](modelderivative/translate/nodejs) | [.NET](modelderivative/translate/net)