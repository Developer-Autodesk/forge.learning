# Amazon Web Services (AWS)

First, create and activate your [AWS account](https://aws.amazon.com/).

## Prerequisites

The AWS Toolkit for Visual Studio is an extension for Microsoft Visual Studio running on Microsoft Windows that makes it easier for developers to develop, debug, and deploy .NET applications using Amazon Web Services. With the AWS Toolkit for Visual Studio, you'll be able to get started faster and be more productive when building AWS applications.

- [Install AWS Toolkit for Visual Studio](https://aws.amazon.com/visualstudio/)

## Prepare your project

Elastic Beanstalk cannot override your `appSettings`, so we need to remove it before publish. In fact is quite easy by adding the following to your `web.release.config` file. The next section, **Step-by-step** includes a video explaining it.

```xml
<appSettings>
  <add key="FORGE_CLIENT_ID" xdt:Transform="Remove" xdt:Locator="Match(key)" />
  <add key="FORGE_CLIENT_SECRET" xdt:Transform="Remove" xdt:Locator="Match(key)" />
</appSettings>
```

## Step-by-step video

This is a 7 minutes video on how to deploy to AWS Elastic Beanstalk.

[Video](https://www.youtube.com/embed/49X4ROI6PWs ':include :type=iframe width=100% height=400px')