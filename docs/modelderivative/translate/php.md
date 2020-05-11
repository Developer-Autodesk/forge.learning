# Translate Model (PHP)

To translate a file we just need one endpoint.

## ModelDerivative.php

Create a `/server/modelderivative.php` file with the following content:

```php
<?php

namespace Autodesk\ForgeServices;

use Autodesk\Forge\Client\Api\DerivativesApi;
use Autodesk\Forge\Client\Model\JobPayload;
use Autodesk\Forge\Client\Model\JobPayloadInput;
use Autodesk\Forge\Client\Model\JobPayloadOutput;
use Autodesk\Forge\Client\Model\JobPayloadItem;

class ModelDerivative{
    public function __construct(){
        set_time_limit(0);
    }    

    public function translateFile(){
        global $twoLeggedAuth;
        $accessToken = $twoLeggedAuth->getTokenInternal();

        $body = json_decode(file_get_contents('php://input', 'r'), true);
        $objectId = $body['objectName'];

        $apiInstance = new DerivativesApi($accessToken);
        $job         = new JobPayload(); 

        $jobInput    = new JobPayloadInput();
        $jobInput->setUrn($objectId);

        $jobOutputItem = new JobPayloadItem();
        $jobOutputItem->setType('svf');
        $jobOutputItem->setViews(array('2d','3d'));
        
        $jobOutput   = new JobPayloadOutput();
        $jobOutput->setFormats(array($jobOutputItem));

        $job->setInput($jobInput);
        $job->setOutput($jobOutput);

        $x_ads_force = false; 
        try {
            $result = $apiInstance->translate($job, $x_ads_force);
            print_r($result);
        } catch (Exception $e) {
            echo 'Exception when calling DerivativesApi->translate: ', $e->getMessage(), PHP_EOL;
        }
    }
}
```

The **jobs** endpoint receives the **bucketKey** and **objectName** and post the [translation job](https://forge.autodesk.com/en/docs/model-derivative/v2/reference/http/job-POST/) to extract 2D & 3D views of the model. 

To summarize, at this point your **PHP** project should be like:

![](_media/php/vs_code_allfiles.png)

Next: [Show on Viewer](viewer/2legged/)