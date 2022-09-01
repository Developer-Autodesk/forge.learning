# Загрузка файлов в OSS (.NET Core)

В этом разделе нам нужны 3 функции:

1. Создание бакетов
2. Указание репозиториев данных и объектов (файлов)
3. Загрузка объектов (файлов)

## OSSController.cs

В папке **Controllers** создайте класс с названием **OSSController** в папке классов с тем же именем (`OSSController.cs`) и добавьте следующий код:

```csharp
using Autodesk.Forge;
using Autodesk.Forge.Model;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace forgeSample.Controllers
{
    [ApiController]
    public class OSSController : ControllerBase
    {
        private IWebHostEnvironment _env;
        public OSSController(IWebHostEnvironment env) { _env = env; }
        public string ClientId { get { return OAuthController.GetAppSetting("FORGE_CLIENT_ID").ToLower(); } }

        /// <summary>
        /// Return list of buckets (id=#) or list of objects (id=bucketKey)
        /// </summary>
        [HttpGet]
        [Route("api/forge/oss/buckets")]
        public async Task<IList<TreeNode>> GetOSSAsync(string id)
        {
            IList<TreeNode> nodes = new List<TreeNode>();
            dynamic oauth = await OAuthController.GetInternalAsync();

            if (id == "#") // root
            {
                // in this case, let's return all buckets
                BucketsApi appBckets = new BucketsApi();
                appBckets.Configuration.AccessToken = oauth.access_token;

                // to simplify, let's return only the first 100 buckets
                dynamic buckets = await appBckets.GetBucketsAsync("US", 100);
                foreach (KeyValuePair<string, dynamic> bucket in new DynamicDictionaryItems(buckets.items))
                {
                    nodes.Add(new TreeNode(bucket.Value.bucketKey, bucket.Value.bucketKey.Replace(ClientId + "-", string.Empty), "bucket", true));
                }
            }
            else
            {
                // as we have the id (bucketKey), let's return all 
                ObjectsApi objects = new ObjectsApi();
                objects.Configuration.AccessToken = oauth.access_token;
                var objectsList = objects.GetObjects(id);
                foreach (KeyValuePair<string, dynamic> objInfo in new DynamicDictionaryItems(objectsList.items))
                {
                    nodes.Add(new TreeNode(Base64Encode((string)objInfo.Value.objectId),
                      objInfo.Value.objectKey, "object", false));
                }
            }
            return nodes;
        }

        /// <summary>
        /// Model data for jsTree used on GetOSSAsync
        /// </summary>
        public class TreeNode
        {
            public TreeNode(string id, string text, string type, bool children)
            {
                this.id = id;
                this.text = text;
                this.type = type;
                this.children = children;
            }

            public string id { get; set; }
            public string text { get; set; }
            public string type { get; set; }
            public bool children { get; set; }
        }

        /// <summary>
        /// Create a new bucket 
        /// </summary>
        [HttpPost]
        [Route("api/forge/oss/buckets")]
        public async Task<dynamic> CreateBucket([FromBody]CreateBucketModel bucket)
        {
            BucketsApi buckets = new BucketsApi();
            dynamic token = await OAuthController.GetInternalAsync();
            buckets.Configuration.AccessToken = token.access_token;
            PostBucketsPayload bucketPayload = new PostBucketsPayload(string.Format("{0}-{1}", ClientId, bucket.bucketKey.ToLower()), null,
              PostBucketsPayload.PolicyKeyEnum.Transient);
            return await buckets.CreateBucketAsync(bucketPayload, "US");
        }

        /// <summary>
        /// Input model for CreateBucket method
        /// </summary>
        public class CreateBucketModel
        {
            public string bucketKey { get; set; }
        }

        /// <summary>
        /// Receive a file from the client and upload to the bucket
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [Route("api/forge/oss/objects")]
        public async Task<dynamic> UploadObject([FromForm]UploadFile input)
        {
            // save the file on the server
            var fileSavePath = Path.Combine(_env.WebRootPath, Path.GetFileName(input.fileToUpload.FileName));
            using (var stream = new FileStream(fileSavePath, FileMode.Create))
                await input.fileToUpload.CopyToAsync(stream);


            // get the bucket...
            dynamic oauth = await OAuthController.GetInternalAsync();
            ObjectsApi objects = new ObjectsApi();
            objects.Configuration.AccessToken = oauth.access_token;

            // upload the file/object, which will create a new object
            dynamic uploadedObj;
            using (StreamReader streamReader = new StreamReader(fileSavePath))
            {
                uploadedObj = await objects.UploadObjectAsync(input.bucketKey,
                       Path.GetFileName(input.fileToUpload.FileName), (int)streamReader.BaseStream.Length, streamReader.BaseStream,
                       "application/octet-stream");
            }

            // cleanup
            System.IO.File.Delete(fileSavePath);

            return uploadedObj;
        }

        public class UploadFile
        {
            public string bucketKey { get; set; }
            public IFormFile fileToUpload { get; set; }
        }

        /// <summary>
        /// Base64 enconde a string
        /// </summary>
        public static string Base64Encode(string plainText)
        {
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(plainText);
            return System.Convert.ToBase64String(plainTextBytes);
        }
    }
}
```

Т.к. мы планируем поддерживать [jsTree](https://www.jstree.com/), нашему **GetOSSAsync** необходим `id` в качестве параметра строки запроса (англ. querystring parameter), он возвращает бакеты, если `id=#` и объекты для данного bucketKey переданы как `id=bucketKey`. **CreateBucket** нужен параметр **bucketKey**, чтобы создать бакет. Последнее, но не менее важно, **UploadObject** получает файлы из браузера, временно сохраняет их в **/App_Data/**, а затем загружает в соответствующий бакет. 

!> Загрузка файла из браузера напрямую в Atodesk Forge возможна, но требует предоставления токена доступа **write-enabled**, что **НЕ БЕЗОПАСНО**. 

Далее: [Конвертация файлов](/ru-RU/modelderivative/translate/)

[Эта страница на английском языке](https://learnforge.autodesk.io/#/datamanagement/oss/netcore).
