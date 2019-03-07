# Basic app UI

Let's start with the UI (HTML and JavaScript) files. Under **wwwroot** folder, create **bundles** and **js** folder.

## index.html

Under **wwwroot** folder create the **index.html** file with the following content:

```html
<!DOCTYPE html>
<html>

<head>
    <title>Autodesk Forge - Design Automation</title>
    <meta charset="utf-8" />
    <link rel="shortcut icon" href="https://github.com/Autodesk-Forge/learn.forge.viewhubmodels/raw/master/img/favicon.ico">
    <!-- Common packages: jQuery, Bootstrap -->
    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.4.1/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.4.1/css/bootstrap.min.css">
    <!-- .NET SignalR -->
    <script src="//unpkg.com/@aspnet/signalr@1.1.0/dist/browser/signalr.min.js"></script>
    <!-- Files for this project -->
    <script src="/js/ForgeDesignAutomation.js"></script>
</head>

<body style="height: 100%;">
    <!-- Fixed navbar by Bootstrap: https://getbootstrap.com/examples/navbar-fixed-top/ -->
    <nav class="navbar navbar-default navbar-fixed-top">
        <div class="container-fluid">
            <ul class="nav navbar-nav left">
                <li>
                    <a href="http://developer.autodesk.com" target="_blank">
                        <img alt="Autodesk Forge" src="//developer.static.autodesk.com/images/logo_forge-2-line.png"
                            height="20">
                    </a>
                </li>
            </ul>
            <div style="float: right; margin-top: 15px; cursor: pointer;">
                <span style="padding-right: 5px;" data-toggle="modal" data-target="#defineActivityModal" title="Configura AppBundle & Activity"><span
                        class="glyphicon glyphicon-cog glyphiconTop mlink"> </span> Configure</span>
            </div>
        </div>
    </nav>
    <!-- End of navbar -->
    <div class="container-fluid" style="margin-top: 70px;">
        <div class="row">
            <div class="col-sm-4">
                <div class="form-group">
                    <label for="width">Width:</label>
                    <input type="number" class="form-control" id="width" placeholder="Enter new width value">
                </div>
                <div class="form-group">
                    <label for="height">Height:</label>
                    <input type="number" class="form-control" id="height" placeholder="Enter new height value">
                </div>

                <div class="form-group">
                    <label for="inputFile">Input file</label>
                    <input type="file" class="form-control-file" id="inputFile">
                </div>
                <div class="form-group">
                    <label for="activity">Existing activities</label>
                    <select class="form-control" id="activity"> </select>
                </div>
                <center><button class="btn btn-primary" id="startWorkitem">Start workitem</button></center><br />
            </div>
            <div class="col-sm-8">
                <pre id="outputlog" style="height: calc(100vh - 120px);; overflow-y: scroll;"></pre>
            </div>
        </div>
    </div>
    <!-- Modal Define AppBundle & Activity -->
    <div class="modal fade" id="defineActivityModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Cancel"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="myModalLabel">Create/Update AppBundle & Activity</h4>
                </div>
                <div class="modal-body">
                  <div class="alert alert-warning"><center>Define AppBundle &amp; Activity only once.<br />Redefine only when your plugin code change (creates a new version).</center></div>
                    <div class="form-group">
                        <label for="localBundles">Select a local AppBundle:</label>
                        <select class="form-control" id="localBundles"> </select>
                        <b>Tip:</b> Make sure .ZIP bundles are placed at <b>/bundles/</b> folder
                    </div>
                    <div class="form-group">
                        <label for="engines">Select engine:</label>
                        <select class="form-control" id="engines"> </select>
                    </div>
                    For this sample the .ZIP name is used as suffix to define <b>AppBundle</b> and <b>Activity</b>
                    names. Activities will have file and params input, and file output.
                </div>
                <div class="modal-footer">
                    <button class="btn btn-danger" id="clearAccount">Clear account</button>
                    <button type="button" class="btn btn-primary" id="createAppBundleActivity">Create/Update</button>
                </div>
            </div>
        </div>
    </div>
</body>

</html>
```

## ForgeDesignAutomation.js

Under **wwwroot/js** folder create the **ForgeDesignAutomation.js** file with the following content:

```javascript
$(document).ready(function () {
    prepareLists();

    $('#clearAccount').click(clearAccount);
    $('#defineActivityShow').click(defineActivityModal);
    $('#createAppBundleActivity').click(createAppBundleActivity);
    $('#startWorkitem').click(startWorkitem);

    startConnection();
});

function prepareLists() {
    list('activity', '/api/forge/designautomation/activities');
    list('engines', '/api/forge/designautomation/engines');
    list('localBundles', '/api/appbundles');
}

function list(control, endpoint) {
    $('#' + control).find('option').remove().end();
    jQuery.ajax({
        url: endpoint,
        success: function (list) {
            if (list.length === 0)
                $('#' + control).append($('<option>', { disabled: true, text: 'Nothing found' }));
            else
                list.forEach(function (item) { $('#' + control).append($('<option>', { value: item, text: item })); })
        }
    });
}

function clearAccount() {
    if (!confirm('Clear existing activities & appbundles before start. ' +
        'This is useful if you believe there are wrong settings on your account.' +
        '\n\nYou cannot undo this operation. Proceed?')) return;

    jQuery.ajax({
        url: 'api/forge/designautomation/account',
        method: 'DELETE',
        success: function () {
            prepareLists();
            writeLog('Account cleared, all appbundles & activities deleted');
        }
    });
}

function defineActivityModal() {
    $("#defineActivityModal").modal();
}

function createAppBundleActivity() {
    startConnection(function () {
        writeLog("Defining appbundle and activity for " + $('#engines').val());
        $("#defineActivityModal").modal('toggle');
        createAppBundle(function () {
            createActivity(function () {
                prepareLists();
            })
        });
    });
}

function createAppBundle(cb) {
    jQuery.ajax({
        url: 'api/forge/designautomation/appbundles',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            zipFileName: $('#localBundles').val(),
            engine: $('#engines').val()
        }),
        success: function (res) {
            writeLog('AppBundle: ' + res.appBundle + ', v' + res.version);
            if (cb) cb();
        }
    });
}

function createActivity(cb) {
    jQuery.ajax({
        url: 'api/forge/designautomation/activities',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            zipFileName: $('#localBundles').val(),
            engine: $('#engines').val()
        }),
        success: function (res) {
            writeLog('Activity: ' + res.activity);
            if (cb) cb();
        }
    });
}

function startWorkitem() {
    var inputFileField = document.getElementById('inputFile');
    if (inputFileField.files.length === 0) { alert('Please select an input file'); return; }
    if ($('#activity').val() === null) { alert('Please select an activity'); return };
    var file = inputFileField.files[0];
    startConnection(function () {
        var formData = new FormData();
        formData.append('inputFile', file);
        formData.append('data', JSON.stringify({
            width: $('#width').val(),
            height: $('#height').val(),
            activityName: $('#activity').val(),
            browerConnectionId: connectionId
        }));
        writeLog('Uploading input file...');
        $.ajax({
            url: 'api/forge/designautomation/workitems',
            data: formData,
            processData: false,
            contentType: false,
            type: 'POST',
            success: function (res) {
                writeLog('Workitem started: ' + res.workItemId);
            }
        });
    });
}

function writeLog(text) {
  $('#outputlog').append('<div style="border-top: 1px dashed #C0C0C0">' + text + '</div>');
  var elem = document.getElementById('outputlog');
  elem.scrollTop = elem.scrollHeight;
}

var connection;
var connectionId;

function startConnection(onReady) {
    if (connection && connection.connectionState) { if (onReady) onReady(); return; }
    connection = new signalR.HubConnectionBuilder().withUrl("/api/signalr/designautomation").build();
    connection.start()
        .then(function () {
            connection.invoke('getConnectionId')
                .then(function (id) {
                    connectionId = id; // we'll need this...
                    if (onReady) onReady();
                });
        });

    connection.on("downloadResult", function (url) {
        writeLog('<a href="' + url +'">Download result file here</a>');
    });

    connection.on("onComplete", function (message) {
        writeLog(message);
    });
}
```

The final result should look like:

![](_media/designautomation/netcore/basefiles.png)

At this point you can run your project, just hit **play**, the HTML interface should open, indicating that your project was created correctly. None of the buttons should work... let's move forward.

![](_media/net/start_debug.png) 

Next: [Prepare a plugin](designautomation/appbundle/)