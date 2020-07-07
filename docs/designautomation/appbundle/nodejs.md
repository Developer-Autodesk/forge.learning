# Code for creating App Bundle (Node Js)


Inside `route/` folder create `DesignAutomation.js` file. In this file we will write all the endpoints.

**1. Utils**

Before creating endpoints, we will add Utils class consisting of all the utility functions like creating design automation SDK instance, uploading file and few more helpfull functions which are used in this sample.

```javascript
const _path = require('path');
const _fs = require('fs');
const _url = require('url');
const express = require('express');
const http = require('https');
const formdata = require('form-data');
const bodyParser = require('body-parser');
const multer = require('multer');
const router = express.Router();
const {
	getClient,
	getInternalToken
} = require('./common/oauth');
const config = require('../config');
const dav3 = require('autodesk.forge.designautomation');
const ForgeAPI = require('forge-apis');

router.use(bodyParser.json());

// Middleware for obtaining a token for each request.
router.use(async (req, res, next) => {
	req.oauth_client = await getClient(/*config.scopes.internal*/);
	req.oauth_token = req.oauth_client.getCredentials();
	next();
});

// Static instance of the DA API
let dav3Instance = null;

class Utils {

	static async Instance () {
		if (dav3Instance === null) {
			// Here it is ok to not await since we awaited in the call router.use()
			dav3Instance = new dav3.AutodeskForgeDesignAutomationClient(config.client);
			let FetchRefresh = async (data) => { // data is undefined in a fetch, but contains the old credentials in a refresh
				let client = await getClient();
				let credentials = client.getCredentials();
				return (credentials);
			};
			dav3Instance.authManager.authentications['2-legged'].fetchToken = FetchRefresh;
			dav3Instance.authManager.authentications['2-legged'].refreshToken = FetchRefresh;
		}
		return (dav3Instance);
	}

	/// <summary>
	/// Returns the directory where bindles are stored on the local machine.
	/// </summary>
	static get LocalBundlesFolder () {
		return (_path.resolve(_path.join(__dirname, '../', 'public/bundles')));
	}

	/// <summary>
	/// Prefix for AppBundles and Activities
	/// </summary>
	static get NickName () {
		return (config.credentials.client_id);
	}

	/// <summary>
	/// Alias for the app (e.g. DEV, STG, PROD). This value may come from an environment variable
	/// </summary>
	static get Alias () {
		return ('dev');
	}

	/// <summary>
	/// Search files in a folder and filter them.
	/// </summary>
	static async findFiles (dir, filter) {
		return (new Promise((fulfill, reject) => {
			_fs.readdir(dir, (err, files) => {
				if (err)
					return (reject(err));
				if (filter !== undefined && typeof filter === 'string')
					files = files.filter((file) => {
						return (_path.extname(file) === filter);
					});
				else if (filter !== undefined && typeof filter === 'object')
					files = files.filter((file) => {
						return (filter.test(file));
					});
				fulfill(files);
			});
		}));
	}

	/// <summary>
	/// Create a new DAv3 client/API with default settings
	/// </summary>
	static async dav3API (oauth2) {
		// Auto-Refresh feature
		let apiClient = await Utils.Instance();
		return (new dav3.AutodeskForgeDesignAutomationApi(apiClient));
	}

	/// <summary>
	/// Helps identify the engine
	/// </summary>
	static EngineAttributes (engine) {
		if (engine.includes('3dsMax'))
			return ({
				commandLine: '$(engine.path)\\3dsmaxbatch.exe -sceneFile $(args[inputFile].path) $(settings[script].path)',
				extension: 'max',
				script: "da = dotNetClass(\'Autodesk.Forge.Sample.DesignAutomation.Max.RuntimeExecute\')\nda.ModifyWindowWidthHeight()\n"
			});
		if (engine.includes('AutoCAD'))
			return ({
				commandLine: '$(engine.path)\\accoreconsole.exe /i $(args[inputFile].path) /al $(appbundles[{0}].path) /s $(settings[script].path)',
				extension: 'dwg',
				script: "UpdateParam\n"
			});
		if (engine.includes('Inventor'))
			return ({
				commandLine: '$(engine.path)\\InventorCoreConsole.exe /i $(args[inputFile].path) /al $(appbundles[{0}].path)',
				extension: 'ipt',
				script: ''
			});
		if (engine.includes('Revit'))
			return ({
				commandLine: '$(engine.path)\\revitcoreconsole.exe /i $(args[inputFile].path) /al $(appbundles[{0}].path)',
				extension: 'rvt',
				script: ''
			});

		throw new Error('Invalid engine');
	}

	static FormDataLength (form) {
		return (new Promise((fulfill, reject) => {
			form.getLength((err, length) => {
				if (err)
					return (reject(err));
				fulfill(length);
			});
		}));
	}

	/// <summary>
	/// Upload a file
	/// </summary>
	static uploadFormDataWithFile (filepath, endpoint, params = null) {
		return (new Promise(async (fulfill, reject) => {
			const fileStream = _fs.createReadStream(filepath);

			const form = new formdata();
			if (params) {
				const keys = Object.keys(params);
				for (let i = 0; i < keys.length; i++)
					form.append(keys[i], params[keys[i]]);
			}
			form.append('file', fileStream);

			let headers = form.getHeaders();
			headers['Cache-Control'] = 'no-cache';
			headers['Content-Length'] = await Utils.FormDataLength(form);

			const urlinfo = _url.parse(endpoint);
			const postReq = http.request({
				host: urlinfo.host,
				port: (urlinfo.port || (urlinfo.protocol === 'https:' ? 443 : 80)),
				path: urlinfo.pathname,
				method: 'POST',
				headers: headers
			},
				response => {
					fulfill(response.statusCode);
				},
				err => {
					reject(err);
				}
			);

			form.pipe(postReq);
		}));
	}
}
```

**2. App Bundle**

Before creating activity, we need to define app bundle with plugin and selecting the appropriate engine. Copy & paste the following endpoint after the utils class:

```javascript
/// <summary>
/// Names of app bundles on this project
/// </summary>
router.get('/appbundles', async /*GetLocalBundles*/ (req, res) => {
	// this folder is placed under the public folder, which may expose the bundles
	// but it was defined this way so it be published on most hosts easily
	let bundles = await Utils.findFiles(Utils.LocalBundlesFolder, '.zip');
	bundles = bundles.map((fn) => _path.basename(fn, '.zip'));
	res.json(bundles);
});

/// <summary>
/// Return a list of available engines
/// </summary>
router.get('/forge/designautomation/engines', async /*GetAvailableEngines*/ (req, res) => {
	let that = this;
	try {
		const api = await Utils.dav3API(req.oauth_token);
		let engines = await api.getEngines();
		res.json(engines.data.sort()); // return list of engines
	} catch (ex) {
		console.error(ex);
		res.json([]);
	}

});

/// <summary>
/// Define a new appbundle
/// </summary>
router.post('/forge/designautomation/appbundles', async /*CreateAppBundle*/ (req, res) => {
	const appBundleSpecs = req.body;

	// basic input validation
	const zipFileName = appBundleSpecs.zipFileName;
	const engineName = appBundleSpecs.engine;

	// standard name for this sample
	const appBundleName = zipFileName + 'AppBundle';

	// check if ZIP with bundle is here
	const packageZipPath = _path.join(Utils.LocalBundlesFolder, zipFileName + '.zip');

	// get defined app bundles
	const api = await Utils.dav3API(req.oauth_token);
	let appBundles = null;
	try {
		appBundles = await api.getAppBundles();
	} catch (ex) {
		console.error(ex);
		return (res.status(500).json({
			diagnostic: 'Failed to get the Bundle list'
		}));
	}
	// check if app bundle is already define
	let newAppVersion = null;
	const qualifiedAppBundleId = `${Utils.NickName}.${appBundleName}+${Utils.Alias}`;
	if (!appBundles.data.includes(qualifiedAppBundleId)) {
		const appBundleSpec = dav3.AppBundle.constructFromObject({
			package: appBundleName,
			engine: engineName,
			id: appBundleName,
			description: `Description for ${appBundleName}`
		});
		try {
			newAppVersion = await api.createAppBundle(appBundleSpec);
		} catch (ex) {
			console.error(ex);
			return (res.status(500).json({
				diagnostic: 'Cannot create new app'
			}));
		}

		// create alias pointing to v1
		const aliasSpec = 
		{
			id: Utils.Alias,
			version: 1
		};
		try {
			const newAlias = await api.createAppBundleAlias(appBundleName, aliasSpec);
		} catch (ex) {
			console.error(ex);
			return (res.status(500).json({
				diagnostic: 'Failed to create an alias'
			}));
		}
	} else {
		// create new version
		const appBundleSpec = 
		{
			engine: engineName,
			description: appBundleName
		};
		try {
			newAppVersion = await api.createAppBundleVersion(appBundleName, appBundleSpec);
		} catch (ex) {
			console.error(ex);
			return (res.status(500).json({
				diagnostic: 'Cannot create new version'
			}));
		}

		// update alias pointing to v+1
		const aliasSpec = 
		{
			version: newAppVersion.Version
		};
		try {
			const newAlias = await api.modifyAppBundleAlias(appBundleName, Utils.Alias, aliasSpec);
		} catch (ex) {
			console.error(ex);
			return (res.status(500).json({
				diagnostic: 'Failed to create an alias'
			}));
		}
	}

	// upload the zip with .bundle
	try {
		// The ‘file’ field must be at the end, all fields after ‘file’ will be ignored.
		await Utils.uploadFormDataWithFile(
			packageZipPath,
			newAppVersion.uploadParameters.endpointURL,
			newAppVersion.uploadParameters.formData
		);
	} catch (ex) {
		console.error(ex);
		return (res.status(500).json({
			diagnostic: 'Failed to upload bundle on s3'
		}));
	}

	res.status(200).json({
		appBundle: qualifiedAppBundleId,
		version: newAppVersion.version
	});
});

module.exports = router;
```

If you run the webapp now and click on **Configure** (top-right), you should see your AppBundle and a list of all available engines. **Buttons do not work yet**... let's move forward.

![](_media/designautomation/list_engines.png)

Next: [Define an Activity](designautomation/activity/)