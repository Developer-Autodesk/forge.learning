# 运行和调试 (PHP)

确保 Visual Code 中安装了 **PHP 服务器**和 **PHP 调试**扩展，如果未安装，请先查看[**工具**](/zh-CN/environment/tools/php)部分。

## 启动/停止服务器

从 VS Code 打开命令选项板，运行 **Serve Project With PHP** 命令以在端口 3000 上启动 PHP 服务器，然后运行 **Stop PHP Server** 命令以停止该服务器。

![](_media/php/vs_code_debug.png) 

打开浏览器，然后访问 `http://localhost:3000`


## 调试
要开始调试，请导航到 VS Code 中的 **Debugging** 选项卡。然后按小齿轮图标为 PHP 生成 launch.json 文件，其中包含用于调试的配置。默认情况下，将有如下所示的单个配置：

```javascript
    {
        "name": "Listen for XDebug",
        "type": "php",
        "request": "launch",
        "port": 9000
    },
```
可以通过选择某一行并按 F9，在源代码中设置断点，然后使用此配置开始调试。

如果现在点击特定网页，VS Code 将在指定的断点处进入源代码。然后，您将在左侧窗格中获得有关变量、调用堆栈等的信息。


![](_media/php/vs_code_debug.gif) 


下一步：[Viewer 扩展](/zh-CN/tutorials/extensions)