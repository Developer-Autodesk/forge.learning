# Viewer (client-side)

Let's create the 4 files we need on the client-side:

## Index.html

This is the entry point of your app. For this sample we'll use [jQuery](https://jquery.com) for [DOM](https://www.w3schools.com/js/js_htmldom.asp) manipulation, [Bootstrap](https://getbootstrap.com/) for styling and [jsTree](https://www.jstree.com) to list buckets & objects. All those libraries are coming from [CDN](https://cdnjs.com/) ([Content Delivery Network](https://en.wikipedia.org/wiki/Content_delivery_network)).

And, of course, the Autodesk Forge Viewer libraries: viewer3d.min.js, three.min.js and style.min.css.

Create a **index.html** file with:

<!-- tabs:start -->

#### ** Viewer v7 **

```html
<!DOCTYPE html>
<html>

<head>
  <title>View Hub Models - Autodesk Forge</title>
  <meta charset="utf-8" />
  <link rel="shortcut icon" href="https://github.com/Autodesk-Forge/learn.forge.viewhubmodels/raw/master/img/favicon.ico">
  <!-- Common packages: jQuery, Bootstrap, jsTree -->
  <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.4.1/js/bootstrap.min.js"></script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/jstree/3.3.7/jstree.min.js"></script>
  <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.4.1/css/bootstrap.min.css">
  <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/jstree/3.3.7/themes/default/style.min.css" />
  <!-- Autodesk Forge Viewer files -->
  <link rel="stylesheet" href="https://developer.api.autodesk.com/modelderivative/v2/viewers/7.*/style.min.css" type="text/css">
  <script src="https://developer.api.autodesk.com/modelderivative/v2/viewers/7.*/viewer3D.min.js"></script>
  <!-- this project files -->
  <link href="css/main.css" rel="stylesheet" />
  <script src="js/ForgeTree.js"></script>
  <script src="js/ForgeViewer.js"></script>
</head>

<body>
  <!-- Fixed navbar by Bootstrap: https://getbootstrap.com/examples/navbar-fixed-top/ -->
  <nav class="navbar navbar-default navbar-fixed-top">
    <div class="container-fluid">
      <ul class="nav navbar-nav left">
        <li>
          <a href="http://developer.autodesk.com" target="_blank">
            <img alt="Autodesk Forge" src="//developer.static.autodesk.com/images/logo_forge-2-line.png" height="20">
          </a>
        </li>
      </ul>
    </div>
  </nav>
  <!-- End of navbar -->
  <div class="container-fluid fill">
    <div class="row fill">
      <div class="col-sm-4 fill">
        <div class="panel panel-default fill">
          <div class="panel-heading" data-toggle="tooltip" style="padding: 0px;">
            <span id="userInfo"></span>
            <span id="refreshHubs" class="glyphicon glyphicon-refresh" style="cursor: pointer; display: none" title="Refresh list of files"></span>
            <span id="signOut" class="glyphicon glyphicon-log-out" style="margin-top:5px;cursor: pointer; float: right; display: none" title="Sign out"> </span>
          </div>
          <div id="userHubs">
            <div style="padding-top: 100px; text-align: center;">
              <button class="btn btn-lg btn-default" id="autodeskSigninButton">
                <img src="https://github.com/Autodesk-Forge/learn.forge.viewhubmodels/raw/master/img/autodesk_text.png"
                  height="20"> Sign in
              </button>
              <br/>
              <br/>
              <br/> You may also need to provision your<br/> BIM 360 Docs account for this app.<br/>
              <a href="https://forge.autodesk.com/blog/bim-360-docs-provisioning-forge-apps">Learn more</a>.
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-8 fill">
        <div id="forgeViewer"></div>
      </div>
    </div>
  </div>
</body>
<iframe id="hiddenFrame" style="visibility: hidden; display:none" />
</html>
```
#### ** Viewer v6 **

```html
<!DOCTYPE html>
<html>

<head>
  <title>View Hub Models - Autodesk Forge</title>
  <meta charset="utf-8" />
  <link rel="shortcut icon" href="https://github.com/Autodesk-Forge/learn.forge.viewhubmodels/raw/master/img/favicon.ico">
  <!-- Common packages: jQuery, Bootstrap, jsTree -->
  <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.4.1/js/bootstrap.min.js"></script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/jstree/3.3.7/jstree.min.js"></script>
  <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.4.1/css/bootstrap.min.css">
  <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/jstree/3.3.7/themes/default/style.min.css" />
  <!-- Autodesk Forge Viewer files -->
  <link rel="stylesheet" href="https://developer.api.autodesk.com/modelderivative/v2/viewers/6.*/style.min.css" type="text/css">
  <script src="https://developer.api.autodesk.com/modelderivative/v2/viewers/6.*/viewer3D.min.js"></script>
  <!-- this project files -->
  <link href="css/main.css" rel="stylesheet" />
  <script src="js/ForgeTree.js"></script>
  <script src="js/ForgeViewer.js"></script>
</head>

<body>
  <!-- Fixed navbar by Bootstrap: https://getbootstrap.com/examples/navbar-fixed-top/ -->
  <nav class="navbar navbar-default navbar-fixed-top">
    <div class="container-fluid">
      <ul class="nav navbar-nav left">
        <li>
          <a href="http://developer.autodesk.com" target="_blank">
            <img alt="Autodesk Forge" src="//developer.static.autodesk.com/images/logo_forge-2-line.png" height="20">
          </a>
        </li>
      </ul>
    </div>
  </nav>
  <!-- End of navbar -->
  <div class="container-fluid fill">
    <div class="row fill">
      <div class="col-sm-4 fill">
        <div class="panel panel-default fill">
          <div class="panel-heading" data-toggle="tooltip" style="padding: 0px;">
            <span id="userInfo"></span>
            <span id="refreshHubs" class="glyphicon glyphicon-refresh" style="cursor: pointer; display: none" title="Refresh list of files"></span>
            <span id="signOut" class="glyphicon glyphicon-log-out" style="margin-top:5px;cursor: pointer; float: right; display: none" title="Sign out"> </span>
          </div>
          <div id="userHubs">
            <div style="padding-top: 100px; text-align: center;">
              <button class="btn btn-lg btn-default" id="autodeskSigninButton">
                <img src="https://github.com/Autodesk-Forge/learn.forge.viewhubmodels/raw/master/img/autodesk_text.png"
                  height="20"> Sign in
              </button>
              <br/>
              <br/>
              <br/> You may also need to provision your<br/> BIM 360 Docs account for this app.<br/>
              <a href="https://forge.autodesk.com/blog/bim-360-docs-provisioning-forge-apps">Learn more</a>.
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-8 fill">
        <div id="forgeViewer"></div>
      </div>
    </div>
  </div>
</body>
<iframe id="hiddenFrame" style="visibility: hidden; display:none" />
</html>
```

#### ** Migration Guide **

Please visit the [Forge website](https://forge.autodesk.com/en/docs/viewer/v7/change_history/changelog_v7/migration_guide_v6_to_v7/) for a complete guide for developers who have been using v6 (or older) and are upgrading to v7.

<!-- tabs:end -->

## Main.css

CSS is a language that describes the style of an HTML document. Learn more at [W3Schools](https://www.w3schools.com/css/). For this tutorial, create a **main.css** under `css` folder with:

```css
html, body{
  min-height: 100%;
  height: 100%;
}

.fill{
  height: calc(100vh - 100px);
}

body {
  padding-top: 60px; /* space for the top nav bar */
  margin-right: 30px;
}

#userHubs {
  overflow: auto;
  width: 100%;
  height: calc(100vh - 150px);
}

#forgeViewer {
  width: 100%;
}
```

## ForgeTree.js

This file will handle the tree view that lists **hubs**, **projects**, **projects**, **folder**, **items** and **versions**. Under `js` folder, create a **ForgeTree.js** file with the following content:

```javascript
$(document).ready(function () {
  // first, check if current visitor is signed in
  jQuery.ajax({
    url: '/api/forge/oauth/token',
    success: function (res) {
      // yes, it is signed in...
      $('#signOut').show();
      $('#refreshHubs').show();

      // prepare sign out
      $('#signOut').click(function () {
        $('#hiddenFrame').on('load', function (event) {
          location.href = '/api/forge/oauth/signout';
        });
        $('#hiddenFrame').attr('src', 'https://accounts.autodesk.com/Authentication/LogOut');
        // learn more about this signout iframe at
        // https://forge.autodesk.com/blog/log-out-forge
      })

      // and refresh button
      $('#refreshHubs').click(function () {
        $('#userHubs').jstree(true).refresh();
      });

      // finally:
      prepareUserHubsTree();
      showUser();
    }
  });

  $('#autodeskSigninButton').click(function () {
    jQuery.ajax({
      url: '/api/forge/oauth/url',
      success: function (url) {
        location.href = url;
      }
    });
  })
});

function prepareUserHubsTree() {
  $('#userHubs').jstree({
    'core': {
      'themes': { "icons": true },
      'multiple': false,
      'data': {
        "url": '/api/forge/datamanagement',
        "dataType": "json",
        'cache': false,
        'data': function (node) {
          $('#userHubs').jstree(true).toggle_node(node);
          return { "id": node.id };
        }
      }
    },
    'types': {
      'default': { 'icon': 'glyphicon glyphicon-question-sign' },
      '#': { 'icon': 'glyphicon glyphicon-user' },
      'hubs': { 'icon': 'https://github.com/Autodesk-Forge/bim360appstore-data.management-nodejs-transfer.storage/raw/master/www/img/a360hub.png' },
      'personalHub': { 'icon': 'https://github.com/Autodesk-Forge/bim360appstore-data.management-nodejs-transfer.storage/raw/master/www/img/a360hub.png' },
      'bim360Hubs': { 'icon': 'https://github.com/Autodesk-Forge/bim360appstore-data.management-nodejs-transfer.storage/raw/master/www/img/bim360hub.png' },
      'bim360projects': { 'icon': 'https://github.com/Autodesk-Forge/bim360appstore-data.management-nodejs-transfer.storage/raw/master/www/img/bim360project.png' },
      'a360projects': { 'icon': 'https://github.com/Autodesk-Forge/bim360appstore-data.management-nodejs-transfer.storage/raw/master/www/img/a360project.png' },      
      'folders': { 'icon': 'glyphicon glyphicon-folder-open' },
      'items': { 'icon': 'glyphicon glyphicon-file' },
      'bim360documents': { 'icon': 'glyphicon glyphicon-file' },
      'versions': { 'icon': 'glyphicon glyphicon-time' },
      'unsupported': { 'icon': 'glyphicon glyphicon-ban-circle' }
    },
    "sort": function (a, b) {
      var a1 = this.get_node(a);
      var b1 = this.get_node(b);
      var parent = this.get_node(a1.parent);
      if (parent.type === 'items') { // sort by version number
        var id1 = Number.parseInt(a1.text.substring(a1.text.indexOf('v') + 1, a1.text.indexOf(':')))
        var id2 = Number.parseInt(b1.text.substring(b1.text.indexOf('v') + 1, b1.text.indexOf(':')));
        return id1 > id2 ? 1 : -1;
      }
      else if (a1.type !== b1.type) return a1.icon < b1.icon ? 1 : -1; // types are different inside folder, so sort by icon (files/folders)
      else return a1.text > b1.text ? 1 : -1; // basic name/text sort
    },
    "plugins": ["types", "state", "sort"],
    "state": { "key": "autodeskHubs" }// key restore tree state
  }).bind("activate_node.jstree", function (evt, data) {
    if (data != null && data.node != null && (data.node.type == 'versions' || data.node.type == 'bim360documents')) {
      // in case the node.id contains a | then split into URN & viewableId
      if (data.node.id.indexOf('|') > -1) {
        var urn = data.node.id.split('|')[1];
        var viewableId = data.node.id.split('|')[2];
        launchViewer(urn, viewableId);
      }
      else {
        launchViewer(data.node.id);
      }
    }
  });
}

function showUser() {
  jQuery.ajax({
    url: '/api/forge/user/profile',
    success: function (profile) {
      var img = '<img src="' + profile.picture + '" height="30px">';
      $('#userInfo').html(img + profile.name);
    }
  });
}
```

## ForgeViewer.js

Now this file will handle the Viewer initialization. Under `js` folder, create a **ForgeViewer.js** file with:

<!-- tabs:start -->

#### ** Viewer v7 **

The following code is based on the Autodesk Forge Viewer [Basic](https://forge.autodesk.com/en/docs/viewer/v7/developers_guide/viewer_basics/initialization/) tutorial.

```javascript
var viewer;

// @urn the model to show
// @viewablesId which viewables to show, applies to BIM 360 Plans folder
function launchViewer(urn, viewableId) {
  var options = {
    env: 'AutodeskProduction',
    getAccessToken: getForgeToken,
    api: 'derivativeV2' + (atob(urn.replace('_', '/')).indexOf('emea') > -1 ? '_EU' : '') // handle BIM 360 US and EU regions
  };

  Autodesk.Viewing.Initializer(options, () => {
    viewer = new Autodesk.Viewing.GuiViewer3D(document.getElementById('forgeViewer'), { extensions: [ 'Autodesk.DocumentBrowser'] });
    viewer.start();
    var documentId = 'urn:' + urn;
    Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
  });

  function onDocumentLoadSuccess(doc) {
    // if a viewableId was specified, load that view, otherwise the default view
    var viewables = (viewableId ? doc.getRoot().findByGuid(viewableId) : doc.getRoot().getDefaultGeometry());
    viewer.loadDocumentNode(doc, viewables).then(i => {
      // any additional action here?
    });
  }

  function onDocumentLoadFailure(viewerErrorCode) {
    console.error('onDocumentLoadFailure() - errorCode:' + viewerErrorCode);
  }
}

function getForgeToken(callback) {
  fetch('/api/forge/oauth/token').then(res => {
    res.json().then(data => {
      callback(data.access_token, data.expires_in);
    });
  });
}
```

#### ** Viewer v6 **

The following code is based on the Autodesk Forge Viewer [Basic Application](https://forge.autodesk.com/en/docs/viewer/v6/tutorials/basic-application/) tutorial.

```javascript
var viewerApp;

function launchViewer(urn) {
  if (viewerApp != null) {
    var thisviewer = viewerApp.getCurrentViewer();
    if (thisviewer) {
      thisviewer.tearDown()
      thisviewer.finish()
      thisviewer = null
      $("#forgeViewer").empty();
    }
  }
  
  var options = {
    env: 'AutodeskProduction',
    getAccessToken: getForgeToken
  };
  var documentId = 'urn:' + urn;
  Autodesk.Viewing.Initializer(options, function onInitialized() {
    viewerApp = new Autodesk.Viewing.ViewingApplication('forgeViewer');
    viewerApp.registerViewer(viewerApp.k3D, Autodesk.Viewing.Private.GuiViewer3D);
    viewerApp.loadDocument(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
  });
}

function onDocumentLoadSuccess(doc) {
  // We could still make use of Document.getSubItemsWithProperties()
  // However, when using a ViewingApplication, we have access to the **bubble** attribute,
  // which references the root node of a graph that wraps each object from the Manifest JSON.
  var viewables = viewerApp.bubble.search({ 'type': 'geometry' });
  if (viewables.length === 0) {
    console.error('Document contains no viewables.');
    return;
  }

  // Choose any of the avialble viewables
  viewerApp.selectItem(viewables[0].data, onItemLoadSuccess, onItemLoadFail);
}

function onDocumentLoadFailure(viewerErrorCode) {
  console.error('onDocumentLoadFailure() - errorCode:' + viewerErrorCode);
}

function onItemLoadSuccess(viewer, item) {
  // item loaded, any custom action?
}

function onItemLoadFail(errorCode) {
  console.error('onItemLoadFail() - errorCode:' + errorCode);
}

function getForgeToken(callback) {
  jQuery.ajax({
    url: '/api/forge/oauth/token',
    success: function (res) {
      callback(res.access_token, res.expires_in)
    }
  });
}
```

#### ** Migration Guide **

Please visit the [Forge Migration Guide ](https://forge.autodesk.com/en/docs/viewer/v7/change_history/changelog_v7/migration_guide_v6_to_v7/) for a complete documentation for developers who have been using v6 (or older) and are upgrading to v7.

<!-- tabs:end -->

To summarize: on the UI side your app should have 4 files:
- Index.html
- Main.css
- ForgeTree.js
- ForgeViewer.js

All set? Now it's time to run the app!

Next: [Running your app](environment/rundebug/3legged)