# 示例

我们为 Viewer 构建了自包含的扩展，可轻松重用这些扩展，并且可在以下位置找到它们：

- [GitHub 样例库](https://github.com/Autodesk-Forge/forge-extensions)
- [演示链接](https://forge-extensions.autodesk.io/)

以下是基于此框架方法的另外几个扩展示例：

- [更改颜色](https://forge.autodesk.com/blog/happy-easter-setthemingcolor-model-material)：添加 3 个工具栏按钮，用于更改模型上选定元素的颜色。

与任何其他 JavaScript 代码一样，该扩展可以与服务器通信以实现更复杂的功能。以下示例演示了该功能：

**Node.js**

- [共享 Viewer 状态](https://forge.autodesk.com/blog/share-viewer-state-websockets)：使用 websocket 在 Viewer 的 2 个以上实例之间共享状态。

**.NET**

- [自定义属性](https://forge.autodesk.com/blog/custom-properties-viewer-net-lambda-dynamodb)：将自定义属性存储在数据库 (AWS DynamoDB) 中，并使用 .NET WebAPI 代码通过 REST endpoint 提供这些属性。 

下一步：[部署](/zh-CN/deployment/)