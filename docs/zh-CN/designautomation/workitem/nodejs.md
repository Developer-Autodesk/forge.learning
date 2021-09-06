# 执行工作项 (Node.js)

应将以下 API 添加到 `DesignAutomation` js 文件的最后一行 `module.exports = router;` 之前

**1. StartWorkitem**

这是我们真正启动 Design Automation 的地方。此端点还会将输入文件上传到 OSS 存储段，并定义输出应保存在同一存储段中。为了帮助您识别文件，输入和输出使用相同的原始文件名，但带有后缀（`input` 或 `output`）并加上时间戳。 

[routes/DesignAutomation.js](_snippets/modifymodels/node/routes/DesignAutomation.4.js ':include :type=code javascript')

**2. OnCallback**

工作项完成后，Design Automation 将回调我们的应用程序（使用 ngrok 转发 URL）。此函数将处理该回调并将通知推送给客户端（使用 socketIO）。

[routes/DesignAutomation.js](_snippets/modifymodels/node/routes/DesignAutomation.5.js ':include :type=code javascript')

**3. ClearAccount**

最后但同样重要的是，为了帮助您进行测试，此 API 会从您的帐户中删除所有应用程序包和活动。

[routes/DesignAutomation.js](_snippets/modifymodels/node/routes/DesignAutomation.6.js ':include :type=code javascript')

一切就绪！

下一步：[运行和调试](/zh-CN/environment/rundebug/2legged_da)