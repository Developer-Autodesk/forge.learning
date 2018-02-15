# Viewer

The Viewer is a client-side library, therefore is pure `HTML5` and `JavaScript`. 


But there are a few tips for each server-side implementation:

- **NodeJS**: create `.html` files under `/www/` folder, `.js` files under `/www/js` and, following the same logic, `.css` files under `/www/css`.
- **.NET**: ASP.NET apps usually uses `.aspx` instead `.html`, but for this tutorial let's just use `.html` on the project root folder, `.js` files under `/js/` folder and `.css` files under `/css/` folder.

To view models we need some files:

## Index.html

This is the entry point of your app. Create a **index.html** file at your root location with:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Autodesk Forge Tutorial</title>
  <meta charset="utf-8" />
  <!-- Common packages: jQuery, Bootstrap, jsTree -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jstree/3.2.1/jstree.min.js"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jstree/3.2.1/themes/default/style.min.css" />
  <!-- Autodesk Forge Viewer files -->
  <link rel="stylesheet" href="https://developer.api.autodesk.com/modelderivative/v2/viewers/style.min.css" type="text/css">
  <script src="https://developer.api.autodesk.com/modelderivative/v2/viewers/three.min.js"></script>
  <script src="https://developer.api.autodesk.com/modelderivative/v2/viewers/viewer3D.min.js"></script>
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
            <img alt="Autodesk Forge" src="https://developer.static.autodesk.com/images/logo_forge-2-line.png" height="20">
          </a>
        </li>
      </ul>
    </div>
  </nav>
  <!-- End of navbar -->
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-4">
        <div class="panel panel-default">
          <div class="panel-heading" data-toggle="tooltip">
            Buckets &amp; Objects
            [<span id="refreshBuckets" style="vertical-align: top; cursor: pointer">Refresh</span>]
            <button class="btn btn-xs btn-info" style="float: right" id="showFormCreateBucket" data-toggle="modal" data-target="#createBucketModal">
              <span class="glyphicon glyphicon-folder-close"></span> New bucket
            </button>
          </div>
          <div id="appBuckets" class="foldertree">
            tree here
          </div>
        </div>
      </div>
      <div class="col-sm-8">
        <div id="forgeViewer" class="forgeViewer"></div>
      </div>
    </div>
  </div>
  <footer class="footer">
    <div style="float:right;"><img src="/Images/github-logo.png" height="20" /> <a href="https://github.com/Developer-Autodesk/">Source code</a></div>
  </footer>
  <form id="uploadFile" method='post' enctype="multipart/form-data">
    <input id="hiddenUploadField" type="file" name="theFile" style="visibility:hidden" />
  </form>
  <!-- Modal Create Bucket -->
  <div class="modal fade" id="createBucketModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Cancel"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="myModalLabel">Create new bucket</h4>
        </div>
        <div class="modal-body">
          <input type="text" id="newBucketKey" class="form-control">
          For demonstration purpouses, objects (files) are NOT automatically translated. After you upload, right click on the object and select "Translate".
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-primary" id="createNewBucket">Go ahead, create the bucket</button>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
```

## Main.css

CSS is a language that describes the style of an HTML document. Learn more at [W3Schools](https://www.w3schools.com/css/). For this tutorial, create a **main.css** under `/css/` folder with:

```css
html {
    position: relative;
    min-height: 100%;
}

body {
    padding-top: 60px; /* space for the top nav bar */
    margin-bottom: 60px; /* Margin bottom by footer height */
    margin-right: 30px;
}

.footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    /* Set the fixed height of the footer here */
    height: 30px;
}

div.foldertree {
    overflow: auto;
    height: 500px;
}

img.gray {
    filter: gray; /* IE6-9 */
    filter: grayscale(1); /* Microsoft Edge and Firefox 35+ */
    -webkit-filter: grayscale(1); /* Google Chrome, Safari 6+ & Opera 15+ */
}

/* Disable grayscale on hover */
img.gray:hover {
    filter: none;
    -webkit-filter: grayscale(0);
}

div.forgeViewer {
    height: 540px;
    width: 100%;
}
```

## ForgeTree.js

This file will handle the tree view that lists all your buckets. Under `/js/` folder, create a **ForgeTree.js** file with the following content:

```javascript
$(document).ready(function () {
  prepareAppBucketTree();
  $('#refreshBuckets').click(function () {
    $('#appBuckets').jstree(true).refresh();
  });

  $('#createNewBucket').click(function () {
    createNewBucket();
  });

  $('#createBucketModal').on('shown.bs.modal', function () {
    $("#newBucketKey").focus();
  })
});

function createNewBucket() {
  var bucketKey = $('#newBucketKey').val();
  var policyKey = $('#newBucketPolicyKey').val();
  jQuery.post({
    url: '/api/forge/oss',
    data: { 'bucketKey': bucketKey, 'policyKey': policyKey },
    success: function (res) {
      $('#appBuckets').jstree(true).refresh();
      $('#createBucketModal').modal('toggle');
    },
  });
}

function prepareAppBucketTree() {
  $('#appBuckets').jstree({
    'core': {
      'themes': { "icons": true },
      'data': {
        "url": '/api/forge/oss',
        "dataType": "json",
        'multiple': false,
        "data": function (node) {
          return { "id": node.id };
        }
      }
    },
    'types': {
      'default': {
        'icon': 'glyphicon glyphicon-question-sign'
      },
      '#': {
        'icon': 'glyphicon glyphicon-cloud'
      },
      'bucket': {
        'icon': 'glyphicon glyphicon-folder-open'
      },
      'object': {
        'icon': 'glyphicon glyphicon-file'
      }
    },
    "plugins": ["types", "state", "sort", "contextmenu"],
    contextmenu: { items: autodeskCustomMenu }
  }).on('loaded.jstree', function () {
    $('#appBuckets').jstree('open_all');
  }).bind("activate_node.jstree", function (evt, data) {
    if (data != null && data.node != null && data.node.type == 'object') {
      launchViewer(data.node.id);
    }
  });
}

function autodeskCustomMenu(autodeskNode) {
  var items;

  switch (autodeskNode.type) {
    case "bucket":
      items = {
        uploadFile: {
          label: "Upload file",
          action: function () {
            var treeNode = $('#appBuckets').jstree(true).get_selected(true)[0];
            uploadFile(treeNode);
          }
        }
      };
      break;
    case "object":
      items = {
        translateFile: {
          label: "Translate",
          action: function () {
            var treeNode = $('#appBuckets').jstree(true).get_selected(true)[0];
            translateObject(treeNode);
          }
        }
      };
      break;
  }

  return items;
}

function uploadFile(node) {
  $('#hiddenUploadField').click();
  $('#hiddenUploadField').change(function () {
    var file = this.files[0];
    switch (node.type) {
      case 'bucket':
        var formData = new FormData();
        formData.append('fileToUpload', file);
        formData.append('bucketKey', node.id);

        $.ajax({
          url: '/api/forge/oss/upload',
          data: formData,
          processData: false,
          contentType: false,
          type: 'POST',
          success: function (data) {
            $('#appBuckets').jstree(true).refresh_node(node);
          }
        });
        break;
    }
  });
}

function translateObject(node) {
  var bucketKey = node.parents[0];
  var objectKey = node.id;
  jQuery.post({
    url: '/api/forge/modelderivative/translate',
    data: { 'bucketKey': bucketKey, 'objectName': objectKey },
    success: function (res) {

    },
  });
}
```

## ForgeViewer.js

Now this file will handle the Viewer initialization. The following code is based on the Autodesk Forge Viewer [Basic Application](https://developer.autodesk.com/en/docs/viewer/v2/tutorials/basic-application/). Under `/js/` folder, create a **ForgeViewer.js** file with:

```javascript
var viewerApp;

function launchViewer(urn) {
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

var viewer;

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
}

function onItemLoadSuccess(viewer, item) {
}

function onItemLoadFail(errorCode) {
}

function getForgeToken(callback) {
  jQuery.ajax({
    url: '/api/forge/oauth/token',
    success: function (res) {
      console.log('res de token client', res);
      callback(res.access_token, res.expires_in)
    }
  });
}
```

All set, now run your app!

Next: [Running your app](environment/rundebug/)