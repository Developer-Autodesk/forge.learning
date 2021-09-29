# Amazon Web Services (AWS)

首先，创建并激活您的 [AWS 帐户](https://aws.amazon.com/)。

## 前提条件

AWS Toolkit for Visual Studio 是在 Microsoft Windows 上运行的 Microsoft Visual Studio 的扩展，它使开发人员可以更轻松地使用 Amazon Web Services 开发、调试和部署 .NET 应用程序。借助 AWS Toolkit for Visual Studio，您将能够在构建 AWS 应用程序时更快速、更高效地开始。

- [安装 AWS Toolkit for Visual Studio](https://aws.amazon.com/visualstudio/)

## 准备项目

Elastic Beanstalk 无法覆盖您的 `appSettings`，因此我们需要在发布之前将其删除。其实很简单，只需将以下内容添加到 `web.release.config` 文件。下一部分**分步视频**包含说明此操作的视频。

```xml
<appSettings>
  <add key="FORGE_CLIENT_ID" xdt:Transform="Remove" xdt:Locator="Match(key)" />
  <add key="FORGE_CLIENT_SECRET" xdt:Transform="Remove" xdt:Locator="Match(key)" />
</appSettings>
```

## 分步视频

本视频时长为 7 分钟，介绍如何部署到 AWS Elastic Beanstalk。

[视频](https://www.youtube.com/embed/49X4ROI6PWs ':include :type=iframe width=100% height=400px')