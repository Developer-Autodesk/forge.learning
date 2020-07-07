# Execute Workitem (Node.js)

The following apis should be added to the `DesignAutomation` js file before the last line `module.exports = router;`

**1. StartWorkitem**

This is where we actually start the Design Automation. This endpoint also uploads the input file to an OSS Bucket and define that the output should be saved at the same bucket. To help you identify the files, both input and output uses the same original file name, but with a suffix (`input` or `output`) plus a time stamp. 

```javascript
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
```

**2. OnCallback**

When the workitem is done, Design Automation will callback our app (using the ngrok forwarding URL). This function will handle it and push a notification to the client (using socketIO).

```javascript
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
				socketIO.emit('downloadResult', signedUrl.body.signedUrl);
			} catch (ex) {
				console.error(ex);
				socketIO.emit('onComplete', 'Failed to create presigned URL for outputFile.\nYour outputFile is available in your OSS bucket.');
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
```

**3. ClearAccount**

Last, but not least, to help you test, this api removes all appbundles and activities from your account.

```javascript
/// <summary>
/// Clear the accounts (for debugging purpouses)
/// </summary>
router.delete('/forge/designautomation/account', async /*ClearAccount*/ (req, res) => {
	let api = await Utils.dav3API(req.oauth_token);
	// clear account
	await api.deleteForgeApp('me');
	res.status(200).end();
});
```

Everything ready!

Next: [Run & Debug](environment/rundebug/2legged_da)