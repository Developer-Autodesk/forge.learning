# Forge Learning

To view tutorials, please visit [forgetutorials.autodesk.io](http://forgetutorials.autodesk.io). This repository is for creating the tutorials.

# Adding a new language

Create a project in the programming language that supports the UI described on [Viewer](/viewer/readme.md) front-end. In summary, the back should implement:

 - GET **/api/forge/oauth/token**: return a valid access token in the form of `{'access_token':value, 'expires_in':value}`
 - POST **/api/forge/oss**: create a new bucket
 - GET **/api/forge/oss**: return all buckets or objects
 - POST **/api/forge/oss/upload**: receive a file
 - POST **/api/forge/modelderivate/translate**: translate the file

# Running locally

Install `docsify`:

```bash
npm i docsify-cli -g
```

Clone this project.

Now serve the `/docs` folder:

```
docsify serve ./docs
```

Open `http://localhost:3000`

# License

This sample is licensed under the terms of the [MIT License](http://opensource.org/licenses/MIT). Please see the [LICENSE](LICENSE) file for full details.