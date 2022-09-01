# Конвертация файлов (PHP)

Для конвертации файлов нам нужна только одна конечная точка.

## ModelDerivative.php

Создайте файл `/server/modelderivative.php` с кодом ниже:

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

Конечная точка **jobs** получает **bucketKey** и **objectName** и размещает [задание на конвертацию](https://forge.autodesk.com/en/docs/model-derivative/v2/reference/http/job-POST/) для извлечения 2D и 3D-видов модели.

Подводя итог, на этом этапе ваш проект **PHP** должен выглядеть так:

![](_media/php/vs_code_allfiles.png)

Далее: [Отображение файлов в Viewer](/ru-RU/viewer/2legged/)

[Эта страница на английском языке](https://learnforge.autodesk.io/#/modelderivative/translate/php).
