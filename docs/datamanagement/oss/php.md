# Upload file to OSS (PHP)

At this section we actually need 3 features:

1. Create buckets - Note: Technically your bucket name is required to be globally unique across the entire platform - to keep things simple with this tutorial your client ID will be prepended by default to your bucket name and in turn masked by the UI so you only have to make sure your bucket name is unique within your current Forge app.
2. List buckets & objects (files)
3. Upload objects (files)

## OSS.php

Create a `/server/oss.php` file with the following content:

```php
<?php
namespace Autodesk\ForgeServices;
use Autodesk\Forge\Client\Api\BucketsApi;
use Autodesk\Forge\Client\Model\PostBucketsPayload;
use Autodesk\Forge\Client\Api\ObjectsApi;

class DataManagement{
    public function __construct(){
        set_time_limit(0);
    }

    public function createOneBucket(){
         global $twoLeggedAuth;
         $accessToken = $twoLeggedAuth->getTokenInternal();

         // get the request body
         $body = json_decode(file_get_contents('php://input', 'r'), true);

                  $bucketKey = ForgeConfig::$prepend_bucketkey?(strtolower(ForgeConfig::getForgeID()).'_'.$body['bucketKey']):$body['bucketKey']; //Prepend the client ID to the bucket key to avoid conflict with existing buckets

         // $policeKey = $body['policyKey'];
         $policeKey = "transient";

         $apiInstance = new BucketsApi($accessToken);
         $post_bucket = new PostBucketsPayload();
         $post_bucket->setBucketKey($bucketKey);
         $post_bucket->setPolicyKey($policeKey);

         try {
             $result = $apiInstance->createBucket($post_bucket);
             print_r($result);
         } catch (Exception $e) {
             echo 'Exception when calling BucketsApi->createBucket: ', $e->getMessage(), PHP_EOL;
         }
      }


      /////////////////////////////////////////////////////////////////////////
      public function getBucketsAndObjects(){
         global $twoLeggedAuth;
         $accessToken = $twoLeggedAuth->getTokenInternal();

         $id = $_GET['id'];
         try{
             if ($id === '#') {// root
                 $apiInstance = new BucketsApi($accessToken);
                 $result = $apiInstance->getBuckets();
                 $resultArray = json_decode($result, true);
                 $buckets = $resultArray['items'];
                 $bucketsLength = count($buckets);
                 $bucketlist = array();
                 for($i=0; $i< $bucketsLength; $i++){
                     $cbkey = $buckets[$i]['bucketKey'];
                     $cbtext = ForgeConfig::$prepend_bucketkey&&strpos($cbkey, strtolower(ForgeConfig::getForgeID())) === 0? end(explode('_', $cbkey)):$cbkey; //remove the client ID prefix from the displayed bucket key
                     $bucketInfo = array('id'=>$cbkey,
                                         'text'=> $cbtext,
                                         'type'=>'bucket',
                                         'children'=>true
                     );
                     array_push($bucketlist, $bucketInfo);
                 }
                 print_r(json_encode($bucketlist));
             }
             else{
                 $apiInstance = new ObjectsApi($accessToken);
                 $bucket_key = $id;
                 $result = $apiInstance->getObjects($bucket_key);
                 $resultArray = json_decode($result, true);
                 $objects = $resultArray['items'];

                 $objectsLength = count($objects);
                 $objectlist = array();
                 for($i=0; $i< $objectsLength; $i++){
                     $objectInfo = array('id'=>base64_encode($objects[$i]['objectId']),
                                         'text'=>$objects[$i]['objectKey'],
                                         'type'=>'object',
                                         'children'=>false
                     );
                     array_push($objectlist, $objectInfo);
                 }
                 print_r(json_encode($objectlist));
             }
         }catch(Exception $e){
             echo 'Exception when calling ObjectsApi->getObjects: ', $e->getMessage(), PHP_EOL;
         }

      }


      public function uploadFile(){
          global $twoLeggedAuth;
          $accessToken = $twoLeggedAuth->getTokenInternal();

          $body = $_POST;
          $file = $_FILES;

          $apiInstance = new ObjectsApi($accessToken);
          $bucket_key  = $body['bucketKey'];
          $fileToUpload    = $file['fileToUpload'];
          $filePath = $fileToUpload['tmp_name'];
          $content_length = filesize($filePath);

          $fileRead = fread($filePath, $content_length);

          try {
              $result = $apiInstance->uploadObject($bucket_key, $fileRead, $content_length, $filePath );
              print_r($result);
          } catch (Exception $e) {
              echo 'Exception when calling ObjectsApi->uploadObject: ', $e->getMessage(), PHP_EOL;
          }
      }
}
```

As we plan to support the [jsTree](https://www.jstree.com/), our **GET oss/buckets** needs to return handle the `id` querystring parameter and return buckets when `id=#` and objects for a given bucketKey passed as `id=bucketKey`. The upload endpoint still have problem to upload, will check that later.

Note how we reuse the `/server/oauth.php` file to call `.getTokenInternal()` on all functions.


Next: [Translate the file](modelderivative/translate/)