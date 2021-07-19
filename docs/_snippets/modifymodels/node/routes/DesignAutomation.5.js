/// <summary>
/// Callback from Design Automation Workitem (onProgress or onComplete)
/// </summary>
router.post('/forge/callback/designautomation', async /*OnCallback*/ (req, res) => {
    // your webhook should return immediately! we could use Hangfire to schedule a job instead
    // ALWAYS return ok (200)
    res.status(200).end();

    try {
        const socketIO = require('../server').io;

        // your webhook should return immediately! we can use Hangfire to schedule a job
        const bodyJson = req.body;
        socketIO.to(req.query.id).emit('onComplete', bodyJson);

        http.get(
            bodyJson.reportUrl,
            response => {
                //socketIO.to(req.query.id).emit('onComplete', response);
                response.setEncoding('utf8');
                let rawData = '';
                response.on('data', (chunk) => {
                    rawData += chunk;
                });
                response.on('end', () => {
                    socketIO.to(req.query.id).emit('onComplete', rawData);
                });
            }
        );
        //socketIO.to(req.query.id).emit('downloadReport', bodyJson.reportUrl);

        const objectsApi = new ForgeAPI.ObjectsApi();
        const bucketKey = Utils.NickName.toLowerCase() + '-designautomation';
        if (bodyJson.status === 'success') {
            try {
                // generate a signed URL to download the result file and send to the client
                const signedUrl = await objectsApi.createSignedResource(
                    bucketKey,
                    req.query.outputFileName, {
                    minutesExpiration: 10,
                    singleUse: false
                }, {
                    access: 'read'
                },
                    req.oauth_client, req.oauth_token
                );
                socketIO.to(req.query.id).emit('downloadResult', signedUrl.body.signedUrl);
            } catch (ex) {
                console.error(ex);
                socketIO.to(req.query.id).emit('onComplete', 'Failed to create presigned URL for outputFile.\nYour outputFile is available in your OSS bucket.');
            }
        }

        // delete the input file (we do not need it anymore)
        try {
            /*await*/
            objectsApi.deleteObject(bucketKey, req.query.inputFileName, req.oauth_client, req.oauth_token);
        } catch (ex) {
            console.error(ex);
        }

    } catch (ex) {
        console.error(ex);
    }
});
