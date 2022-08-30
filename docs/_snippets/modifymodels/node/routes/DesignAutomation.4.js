/// <summary>
/// Direct To S3
/// </summary>
const prepareInputUrl = async (bucketKey, objectKey, opts, oAuthClient, oAuthToken) => {
    let objectS3Download = await new ForgeAPI.ObjectsApi().getS3DownloadURL(bucketKey, objectKey,
        opts,
        oAuthClient, oAuthToken);
    return (objectS3Download.body.url);

}
const prepareOutputUrl = async (bucketKey, objectKey, opts, oAuthClient, oAuthToken) => {

    let objectS3Upload = await new ForgeAPI.ObjectsApi().getS3UploadURL(bucketKey, objectKey,
        opts,
        oAuthClient, oAuthToken);
    return ({
        outputUrl: objectS3Upload.body.urls[0],
        uploadKey: objectS3Upload.body.uploadKey
    });
}

/// <summary>
/// Start a new workitem
/// </summary>
router.post('/forge/designautomation/workitems', multer({
    dest: 'uploads/'
}).single('inputFile'), async /*StartWorkitem*/ (req, res) => {
    const input = req.body;

    // basic input validation
    const workItemData = JSON.parse(input.data);
    const widthParam = parseFloat(workItemData.width);
    const heigthParam = parseFloat(workItemData.height);
    const activityName = `${Utils.NickName}.${workItemData.activityName}`;
    const browerConnectionId = workItemData.browerConnectionId;

    // save the file on the server
    const ContentRootPath = _path.resolve(_path.join(__dirname, '../..'));
    const fileSavePath = _path.join(ContentRootPath, _path.basename(req.file.originalname));
    //const stream = _fs.createReasStream(fileSavePath, FileMode.Create)) await input.inputFile.CopyToAsync(stream);

    // upload file to OSS Bucket
    // 1. ensure bucket existis
    const bucketKey = Utils.NickName.toLowerCase() + '-designautomation';
    try {
        let payload = new ForgeAPI.PostBucketsPayload();
        payload.bucketKey = bucketKey;
        payload.policyKey = 'transient'; // expires in 24h
        await new ForgeAPI.BucketsApi().createBucket(payload, {}, req.oauth_client, req.oauth_token);
    } catch (ex) {
        // in case bucket already exists
    }
    // 2. upload inputFile
    const inputFileNameOSS = `${new Date().toISOString().replace(/[-T:\.Z]/gm, '').substring(0, 14)}_input_${_path.basename(req.file.originalname)}`; // avoid overriding
    try {
        let contentStream = _fs.createReadStream(req.file.path);
        await new ForgeAPI.ObjectsApi().uploadResources(
            bucketKey,
            {
                objectKey: inputFileNameOSS,
                data: contentStream,
                length: req.file.size
            },
            {
                useAcceleration: false,
                minutesExpiration: 20,
                onUploadProgress: (data) => console.warn(data)
            },
            req.oauth_client, req.oauth_token,
        );
    } catch (ex) {
        console.error(ex);
        return (res.status(500).json({
            diagnostic: 'Failed to upload file for workitem'
        }));
    }

    // prepare workitem arguments
    // 1. input file
    const inputFileArgument = {
        url: await prepareInputUrl(bucketKey, inputFileNameOSS,
            {
                useAcceleration: false,
                minutesExpiration: 60/*intentionaly kept max duration, this url will be sent to DA service*/
            },
            req.oauth_client, req.oauth_token)
    };
    // 2. input json
    const inputJson = {
        width: widthParam,
        height: heigthParam
    };
    const inputJsonArgument = {
        url: "data:application/json, " + JSON.stringify(inputJson).replace(/"/g, "'")
    };
    // 3. output file

    // Better to use a presigned url to avoid the token to expire
    const outputFileNameOSS = `${new Date().toISOString().replace(/[-T:\.Z]/gm, '').substring(0, 14)}_output_${_path.basename(req.file.originalname)}`; // avoid overriding
    let signedUrl = null;
    let s3UploadObject = null;
    try {
        // write signed resource requires the object to already exist :(
        s3UploadObject = await prepareOutputUrl(bucketKey, outputFileNameOSS,
            {
                useAcceleration: false,
                minutesExpiration: 60/*intentionaly kept max duration, this url will be sent to DA service*/
            },
            req.oauth_client, req.oauth_token);
        signedUrl = s3UploadObject.outputUrl;
    } catch (ex) {
        console.error(ex);
        return (res.status(500).json({
            diagnostic: 'Failed to create a signed URL for output file'
        }));
    }
    const outputFileArgument = {
        url: signedUrl,
        verb: dav3.Verb.put,
    };

    // prepare & submit workitem
    // the callback contains the connectionId (used to identify the client) and the outputFileName of this workitem
    const callbackUrl = `${config.credentials.webhook_url}/api/forge/callback/designautomation?id=${browerConnectionId}&outputFileName=${outputFileNameOSS}&inputFileName=${inputFileNameOSS}&uploadKey=${s3UploadObject.uploadKey}`;
    const workItemSpec = {
        activityId: activityName,
        arguments: {
            inputFile: inputFileArgument,
            inputJson: inputJsonArgument,
            outputFile: outputFileArgument,
            onComplete: {
                verb: dav3.Verb.post,
                url: callbackUrl
            }
        }
    };
    let workItemStatus = null;
    try {
        const api = await Utils.dav3API(req.oauth_token);
        workItemStatus = await api.createWorkItem(workItemSpec);
    } catch (ex) {
        console.error(ex);
        return (res.status(500).json({
            diagnostic: 'Failed to create a workitem'
        }));
    }
    res.status(200).json({
        workItemId: workItemStatus.id
    });
});
