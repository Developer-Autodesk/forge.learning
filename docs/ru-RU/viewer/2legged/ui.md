# Viewer (со стороны клиента)

Давайте создадим 4 файла, которые нам нужны с клиентской стороны (англ. client-side):

## Index.html

Это точка входа в ваше приложение. В этом примере мы будем использовать [jQuery](https://jquery.com) для работы с [DOM](https://www.w3schools.com/js/js_htmldom.asp), [Bootstrap](https://getbootstrap.com/) для стилизации и [jsTree](https://www.jstree.com) для указания бакетов и объектов. Все эти библиотеки поступают с [CDN](https://cdnjs.com/) ([Content Delivery Network](https://en.wikipedia.org/wiki/Content_delivery_network)).

И, конечно, библиотеки Autodesk Forge Viewer: viewer3d.min.js, three.min.js and style.min.css.

Создайте файл **index.html** с:

<!-- tabs:start -->

#### ** Viewer v7 **

```html
<!DOCTYPE html>
<html>
<head>
  <title>View Models - Autodesk Forge</title>
  <meta charset="utf-8" />
  <link rel="shortcut icon" href="https://github.com/Autodesk-Forge/learn.forge.viewmodels/raw/master/img/favicon.ico">
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
          <div class="panel-heading" data-toggle="tooltip">
            Buckets &amp; Objects
            <span id="refreshBuckets" class="glyphicon glyphicon-refresh" style="cursor: pointer"></span>
            <button class="btn btn-xs btn-info" style="float: right" id="showFormCreateBucket" data-toggle="modal" data-target="#createBucketModal">
              <span class="glyphicon glyphicon-folder-close"></span> New bucket
            </button>
          </div>
          <div id="appBuckets">
            tree here
          </div>
        </div>
      </div>
      <div class="col-sm-8 fill">
        <div id="forgeViewer"></div>
      </div>
    </div>
  </div>
  <form id="uploadFile" method='post' enctype="multipart/form-data">
    <input id="hiddenUploadField" type="file" name="theFile" style="visibility:hidden" />
  </form>
  <!-- Modal Create Bucket -->
  <div class="modal fade" id="createBucketModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Cancel">
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 class="modal-title" id="myModalLabel">Create new bucket</h4>
        </div>
        <div class="modal-body">
          <input type="text" id="newBucketKey" class="form-control"> For demonstration purposes, objects (files) are 
          NOT automatically translated. After you upload, right click on
          the object and select "Translate". Bucket keys must be of the form [-_.a-z0-9]{3,128}
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

#### ** Viewer v6 **

```html
<!DOCTYPE html>
<html>
<head>
  <title>View Models - Autodesk Forge</title>
  <meta charset="utf-8" />
  <link rel="shortcut icon" href="https://github.com/Autodesk-Forge/learn.forge.viewmodels/raw/master/img/favicon.ico">
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
          <div class="panel-heading" data-toggle="tooltip">
            Buckets &amp; Objects
            <span id="refreshBuckets" class="glyphicon glyphicon-refresh" style="cursor: pointer"></span>
            <button class="btn btn-xs btn-info" style="float: right" id="showFormCreateBucket" data-toggle="modal" data-target="#createBucketModal">
              <span class="glyphicon glyphicon-folder-close"></span> New bucket
            </button>
          </div>
          <div id="appBuckets">
            tree here
          </div>
        </div>
      </div>
      <div class="col-sm-8 fill">
        <div id="forgeViewer"></div>
      </div>
    </div>
  </div>
  <form id="uploadFile" method='post' enctype="multipart/form-data">
    <input id="hiddenUploadField" type="file" name="theFile" style="visibility:hidden" />
  </form>
  <!-- Modal Create Bucket -->
  <div class="modal fade" id="createBucketModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Cancel">
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 class="modal-title" id="myModalLabel">Create new bucket</h4>
        </div>
        <div class="modal-body">
          <input type="text" id="newBucketKey" class="form-control"> For demonstration purposes, objects (files) are 
          NOT automatically translated. After you upload, right click on
          the object and select "Translate". Bucket keys must be of the form [-_.a-z0-9]{3,128}
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

#### ** Migration Guide **

Перейдите на [сайт Autodesk Forge](https://forge.autodesk.com/en/docs/viewer/v7/change_history/changelog_v7/migration_guide_v6_to_v7/) для получения полного руководства для разработчиков, которые использовали v6 (или более старую версию) и обновляются до v7.

<!-- tabs:end -->


## Main.css

CSS - это язык, описывающий стиль HTML-документов. Узнайте больше по ссылке [W3Schools](https://www.w3schools.com/css/). Для этого руководства создайте **main.css** в папке `css` со следующим кодом:

```css
html, body {
  min-height: 100%;
  height: 100%;
}

.fill {
  height: calc(100vh - 100px);
}

body {
  padding-top: 60px; /* space for the top nav bar */
  margin-right: 30px;
}

#appBuckets {
  overflow: auto;
  width: 100%;
  height: calc(100vh - 150px);
}

#forgeViewer {
  width: 100%;
}
```

## ForgeTree.js

Этот файл будет обрабатывать дерево (англ. tree view), в котором перечислены все ваши бакеты. В папке `js` создайте файл **ForgeTree.js** со следующим кодом:

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

  $('#hiddenUploadField').change(function () {
    var node = $('#appBuckets').jstree(true).get_selected(true)[0];
    var _this = this;
    if (_this.files.length == 0) return;
    var file = _this.files[0];
    switch (node.type) {
      case 'bucket':
        var formData = new FormData();
        formData.append('fileToUpload', file);
        formData.append('bucketKey', node.id);

        $.ajax({
          url: '/api/forge/oss/objects',
          data: formData,
          processData: false,
          contentType: false,
          type: 'POST',
          success: function (data) {
            $('#appBuckets').jstree(true).refresh_node(node);
            _this.value = '';
          }
        });
        break;
    }
  });
});

function createNewBucket() {
  var bucketKey = $('#newBucketKey').val();
  jQuery.post({
    url: '/api/forge/oss/buckets',
    contentType: 'application/json',
    data: JSON.stringify({ 'bucketKey': bucketKey }),
    success: function (res) {
      $('#appBuckets').jstree(true).refresh();
      $('#createBucketModal').modal('toggle');
    },
    error: function (err) {
      if (err.status == 409)
        alert('Bucket already exists - 409: Duplicated')
      console.log(err);
    }
  });
}

function prepareAppBucketTree() {
  $('#appBuckets').jstree({
    'core': {
      'themes': { "icons": true },
      'data': {
        "url": '/api/forge/oss/buckets',
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
      $("#forgeViewer").empty();
      var urn = data.node.id;
      getForgeToken(function (access_token) {
        jQuery.ajax({
          url: 'https://developer.api.autodesk.com/modelderivative/v2/designdata/' + urn + '/manifest',
          headers: { 'Authorization': 'Bearer ' + access_token },
          success: function (res) {
            if (res.status === 'success') launchViewer(urn);
            else $("#forgeViewer").html('The translation job still running: ' + res.progress + '. Please try again in a moment.');
          },
          error: function (err) {
            var msgButton = 'This file is not translated yet! ' +
              '<button class="btn btn-xs btn-info" onclick="translateObject()"><span class="glyphicon glyphicon-eye-open"></span> ' +
              'Start translation</button>'
            $("#forgeViewer").html(msgButton);
          }
        });
      })
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
            uploadFile();
          },
          icon: 'glyphicon glyphicon-cloud-upload'
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
          },
          icon: 'glyphicon glyphicon-eye-open'
        }
      };
      break;
  }

  return items;
}

function uploadFile() {
  $('#hiddenUploadField').click();
}

function translateObject(node) {
  $("#forgeViewer").empty();
  if (node == null) node = $('#appBuckets').jstree(true).get_selected(true)[0];
  var bucketKey = node.parents[0];
  var objectKey = node.id;
  jQuery.post({
    url: '/api/forge/modelderivative/jobs',
    contentType: 'application/json',
    data: JSON.stringify({ 'bucketKey': bucketKey, 'objectName': objectKey }),
    success: function (res) {
      $("#forgeViewer").html('Translation started! Please try again in a moment.');
    },
  });
}
```

## ForgeViewer.js

Теперь этот файл будет обрабатывать запуск Viewer. В папке `js` создайте файл **ForgeViewer.js** с:

<!-- tabs:start -->

#### ** Viewer v7 **

Следующий код основан на [базовом руководстве](https://forge.autodesk.com/en/docs/viewer/v7/developers_guide/viewer_basics/initialization/) по Autodesk Forge Viewer.

```javascript
var viewer;

function launchViewer(urn) {
  var options = {
    env: 'AutodeskProduction',
    getAccessToken: getForgeToken
  };

  Autodesk.Viewing.Initializer(options, () => {
    viewer = new Autodesk.Viewing.GuiViewer3D(document.getElementById('forgeViewer'), { extensions: [ 'Autodesk.DocumentBrowser'] });
    viewer.start();
    var documentId = 'urn:' + urn;
    Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
  });
}

function onDocumentLoadSuccess(doc) {
  var viewables = doc.getRoot().getDefaultGeometry();
  viewer.loadDocumentNode(doc, viewables).then(i => {
    // documented loaded, any action?
  });
}

function onDocumentLoadFailure(/ru-RU/viewerErrorCode) {
  console.error('onDocumentLoadFailure() - errorCode:' + viewerErrorCode);
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

Следующий код основан на [базовом приложении](https://forge.autodesk.com/en/docs/viewer/v6/tutorials/basic-application/) Autodesk Forge Viewer.

```javascript
var viewerApp;

function launchViewer(urn) {
  if (/ru-RU/viewerApp != null) {
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
    viewerApp.registerViewer(/ru-RU/viewerApp.k3D, Autodesk.Viewing.Private.GuiViewer3D);
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

  // Choose any of the available viewables
  viewerApp.selectItem(viewables[0].data, onItemLoadSuccess, onItemLoadFail);
}

function onDocumentLoadFailure(/ru-RU/viewerErrorCode) {
  console.error('onDocumentLoadFailure() - errorCode:' + viewerErrorCode);
}

function onItemLoadSuccess(/ru-RU/viewer, item) {
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

Перейдите на [Forge Migration Guide ](https://forge.autodesk.com/en/docs/viewer/v7/change_history/changelog_v7/migration_guide_v6_to_v7/) для получения полного руководства для разработчиков, которые использовали v6 (или более позднюю версию) и обновляются до v7.

<!-- tabs:end -->

Подводя итог, на стороне пользовательского интерфейса ваше приложение должно иметь 4 файла:
- Index.html
- Main.css
- ForgeTree.js
- ForgeViewer.js

Всё готово? Настало время запускать приложение!

Далее: [Запуск вашего приложения](/ru-RU/environment/rundebug/2legged)

[Эта страница на английском языке](https://learnforge.autodesk.io/#/viewer/2legged/ui).
