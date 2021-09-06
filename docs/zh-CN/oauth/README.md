# OAuth

OAuth（尤其是 OAuth2）是 Forge 平台上用于基于代币的身份验证和授权的开放标准。

## 两条腿与三条腿

详细了解[查看模型](/zh-CN/tutorials/viewmodels)教程中使用的[两条腿工作流](https://forge.autodesk.com/en/docs/oauth/v2/tutorials/get-2-legged-token/)，以及[查看 BIM 360 和 Fusion 模型](/zh-CN/tutorials/viewhubmodels)教程中使用的[三条腿工作流](https://forge.autodesk.com/en/docs/oauth/v2/tutorials/get-3-legged-token/)。

## 范围

范围是在代币上设置的权限，代币可以在其中起作用的上下文。例如，范围为 _data:read_ 的代币允许读取 Forge 生态系统中的数据，并且可以在需要该范围的端点上使用。没有该范围的代币将被拒绝访问此类端点。（各个端点参考页面会列出所需的范围。）

范围有两个主要功能：

- **隐私和控制**：在三条腿上下文中，它们充当一种机制，用于请求和保护以指定方式代表最终用户进行操作的权限。
- **安全**：在两条腿和三条腿上下文中，它们可确保在您失去对代币的控制时，无法将其错误地用于访问不适用的资源。

[了解更多信息](https://forge.autodesk.com/en/docs/oauth/v2/overview/scopes/)

## 公共代币和内部代币

本教程将使用两种类型的访问代币：公共代币和内部代币。**公共**代币用于 Forge Viewer，它在客户端上运行并需要访问代币。这种情况有一个特殊范围：**viewables:read**。 

现在，在服务器端，我们需要写入访问权限，因此**内部**代币将使用 **bucket:create**、**bucket:read**、**data:read**、**data:create** 和 **data:write** 范围。

> 不知道要参考哪个教程？ 
> 
> 回答此问题：要访问和查看的文件位于何处？ 
> 
> 如果在您的计算机上或其他位置，请参考**查看模型**教程。如果模型位于任何 BIM 360（Team、Design 或 Docs）或者 Fusion Team 上，请参考**查看 BIM 360 和 Fusion 模型**。
>
> 如果要修改模型，那么毫无疑问，请参考**修改模型**教程。

下一步：[查看模型](/zh-CN/tutorials/viewmodels)、[查看 BIM 360 和 Fusion 模型](/zh-CN/tutorials/viewhubmodels)、[修改模型](/zh-CN/tutorials/modifymodels)