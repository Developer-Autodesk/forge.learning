# 用于创建 AppBundle 的代码 (Node Js)


在 `route/` 文件夹内，创建 `DesignAutomation.js` 文件。在此文件中，我们将写入所有 endpoint。

**1. Utils**

在创建 endpoint 之前，我们将添加包含所有实用程序函数的 Utils 类，例如创建 Design Automation SDK 实例、上传文件以及本示例中使用的其他一些有用的函数。

[routes/DesignAutomation.js](_snippets/modifymodels/node/routes/DesignAutomation.1.js ':include :type=code javascript')

**2. AppBundle**

在创建 activity 之前，我们需要定义带有插件的 AppBundle 并选择相应的引擎。在 utils 类后复制并粘贴以下 endpoint：

[routes/DesignAutomation.js](_snippets/modifymodels/node/routes/DesignAutomation.2.js ':include :type=code javascript')

如果您现在运行 Web 应用程序，并单击右上角的 **Configure**，您应该会看到您的 AppBundle 以及所有可用引擎的列表。**按钮仍不起作用**... 我们继续。

![](_media/designautomation/list_engines.png)

下一步：[定义 Activity](/zh-CN/designautomation/activity/)