# 範例

我們為 Viewer 打造了可輕鬆重複使用的獨立擴充功能，可在以下位置找到這些擴充功能：

- [GitHub Repo](https://github.com/Autodesk-Forge/forge-extensions)
- [示範連結](https://forge-extensions.autodesk.io/)

以下是其他幾個以此骨架方法為基礎的擴充功能範例：

- [變更顏色](https://forge.autodesk.com/blog/happy-easter-setthemingcolor-model-material)：加入 3 個工具列按鈕，用以變更模型上所選元素的顏色。

就像任何其他 JavaScript 程式碼，擴充功能可以與伺服器進行通訊，以便實作更複雜的功能。以下範例示範了此特點：

**Node.js**

- [共用 Viewer 狀態](https://forge.autodesk.com/blog/share-viewer-state-websockets)：使用網路通訊端，以在 2 個以上的 Viewer 例證之間共用狀態。

**.NET**

- [自訂性質](https://forge.autodesk.com/blog/custom-properties-viewer-net-lambda-dynamodb)：將自訂性質儲存在資料庫 (AWS DynamoDB) 上，然後使用 .NET WebAPI 程式碼透過 REST endpoint 提供服務。 

下一步：[部署](/zh-TW/deployment/)