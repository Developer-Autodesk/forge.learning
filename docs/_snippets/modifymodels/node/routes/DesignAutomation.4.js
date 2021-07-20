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
        await new ForgeAPI.ObjectsApi().uploadObject(bucketKey, inputFileNameOSS, req.file.size, contentStream, {}, req.oauth_client, req.oauth_token);
    } catch (ex) {
        console.error(ex);
        return (res.status(500).json({
            diagnostic: 'Failed to upload file for workitem'
        }));
    }

    // prepare workitem arguments
    // 1. input file
    const inputFileArgument = {
        url: `https://developer.api.autodesk.com/oss/v2/buckets/${bucketKey}/objects/${inputFileNameOSS}`,
        headers: {
            Authorization: `Bearer ${req.oauth_token.access_token}`
        }
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
    // const outputFileNameOSS = `${new Date().toISOString().replace (/[-T:\.Z]/gm, '').substring(0, 14)}_output_${_path.basename(req.file.originalname)}`; // avoid overriding
    // const outputFileArgument = {
    //     url: `https://developer.api.autodesk.com/oss/v2/buckets/${bucketKey}/objects/${outputFileNameOSS}`,
    //     verb: dav3.Verb.put,
    //     headers: {
    //         Authorization: `Bearer ${req.oauth_token.access_token}`
    //     }
    // };

    // Better to use a presigned url to avoid the token to expire
    const outputFileNameOSS = `${new Date().toISOString().replace(/[-T:\.Z]/gm, '').substring(0, 14)}_output_${_path.basename(req.file.originalname)}`; // avoid overriding
    let signedUrl = null;
    try {
        // write signed resource requires the object to already exist :(
        await new ForgeAPI.ObjectsApi().copyTo(bucketKey, inputFileNameOSS, outputFileNameOSS, req.oauth_client, req.oauth_token);
        signedUrl = await new ForgeAPI.ObjectsApi().createSignedResource(
            bucketKey,
            outputFileNameOSS, {
            minutesExpiration: 60,
            singleUse: true
        }, {
            access: 'write'
        },
            req.oauth_client, req.oauth_token
        );
        signedUrl = signedUrl.body.signedUrl;
    } catch (ex) {
        console.error(ex);
        return (res.status(500).json({
            diagnostic: 'Failed to create a signed URL for output file'
        }));
    }
    const outputFileArgument = {
        //url: `https://developer.api.autodesk.com/oss/v2/buckets/${bucketKey}/objects/${outputFileNameOSS}`,
        url: signedUrl,
        headers: {
            Authorization: '',
            'Content-type': 'application/octet-stream'
        },
        verb: dav3.Verb.put,
    };

    // prepare & submit workitem
    // the callback contains the connectionId (used to identify the client) and the outputFileName of this workitem
    const callbackUrl = `${config.credentials.webhook_url}/api/forge/callback/designautomation?id=${browerConnectionId}&outputFileName=${outputFileNameOSS}&inputFileName=${inputFileNameOSS}`;
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
