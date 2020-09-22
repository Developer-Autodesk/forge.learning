# Learn Forge

### To view tutorials, please visit [learnforge.autodesk.io](http://learnforge.autodesk.io). 

This repository is for creating the tutorials.

***********

### Adding a new language

**View Models sample** (2-legged)

Create a project in the programming language that supports the UI described on [Viewer](viewer/readme.md) front-end. In summary, the back should implement:

 - GET **/api/forge/oauth/token**: return a valid **viewables:read** access token in the form of `{'access_token':value, 'expires_in':value}`
 - POST **/api/forge/oss/buckets**: create a new bucket, receive input in the form of `{'bucketKey': 'theKey'}` and return 200.
 - GET **/api/forge/oss/buckets**: return all buckets or objects in form of list of nodes: 

```json
[
  {
   "id": "bucketKey | objectNameAsURNBase64",
   "text": "bucketKey | objectName",
   "type": "bucket | object",
   "children": "true | false"
  }
]
```
It receives a querystring with `id`: if **#** return all buckets, if a **bucketKey** all objects for the bucket.

 - POST **/api/forge/oss/objects**: receive a file with key `fileToUpload` and `bucketKey` as a `multipart/form-data`. For simplicity, non-resumable.
 - POST **/api/forge/modelderivative/jobs**: translate the file, receive input in the form of `{'bucketKey': 'theKey', 'objectName': 'theName'}`

For reference, when adding a new language, replicate all `net.md` for the new language. The **Viewer** section should be the same for all languages.

**View Hub Models sample** (3-legged)

 - GET **/api/forge/datamanagement** receives `#` to return list of hubs, or `href` of projects/folders/items to return topfolders, folder contents or versions (respectively). The response should be an array with:
 ```json
[
  {
   "id": "href id of the hub/project/folder/item or base64 urn for versions (Viewable)",
   "text": "name",
   "type": "hubs/projects/folders/items/versions",
   "children": "false for versions, true for others"
  }
]
```
 - GET **/api/forge/callback/oauth** as the OAuth callback, receives `code` from Autodesk and redirect to `/` 
 - GET **/api/forge/oauth/url** return the sign-in URL (text) so the UI can redirect
 - GET **/api/forge/oauth/signout** to finish current session and redirect to `/` 
 - GET **/api/forge/oauth/token** return a valid **viewables:read** access token in the form of `{'access_token':value, 'expires_in':value}`
 - GET **/api/forge/user/profile** returns the user information in the form of `{'name':'user name', 'picture': 'http://profilepictureurl'}`

 For reference, when adding a new language, replicate all `nodejs.md`/`net.md` for the new language. The **Viewer** section should be the same for all languages.

### Creating a project

`FORK` from `/autodesk-forge/learn.forge.viewmodels` (or `viewhubmodels`) and rename: `learn.forge.TUTORIAL.LANGUAGE`, for example: `learn.forge.viewmodels.net` or `learn.forge.viewmodels.nodejs`. According to each language standards, move files to appropriate folders.

If the UI changes, first [add remote upstream](https://help.github.com/articles/configuring-a-remote-for-a-fork/):

```bash
git remote add upstream https://github.com/autodesk.forge/learn.forge.viewmodels  (or viewhubmodels)
```

Then, [sync fork](https://help.github.com/articles/syncing-a-fork/):

```bash
git fetch upstream
git checkout master
git merge upstream/master
```

Now sync all changes.

When sample is ready, create a **pull request** for the branch of the language (e.g. `net`, `node.js`). 

### Variables

Use convention:

- PORT: 3000
- FORGE\_CLIENT\_ID
- FROGE\_CLIENT\_SECRET
- FORGE\_CALLBACK\_URL: default `http://localhost:3000/api/forge/callback/oauth`

> This is importat so developers can reuse this with other samples on **Autodesk-Forge** Github.

### Animated GIFs

Whenwhere applicable, use animaged GIF to demonstrate a complex setup. Good results with [EZGIF](https://ezgif.com/video-to-gif) in 5FPS (smaller).

### Readme

Tutorial project should be ready to use and include a readme with instructions to setup & run.

# Running locally

Install `docsify`:

```bash
npm i docsify-cli -g
```

Clone this project.

Now serve the `/docs` folder:

```bash
docsify serve ./docs
```

Open `http://localhost:3000`

# License

This sample is licensed under the terms of the [MIT License](http://opensource.org/licenses/MIT). Please see the [LICENSE](LICENSE) file for full details.