# Amazon Web Services (AWS)

首先，建立並啟用您的 [AWS 帳號](https://aws.amazon.com/)。

## 事前准备

AWS Toolkit for Visual Studio 是在 Microsoft Windows 上執行的 Microsoft Visual Studio 的擴充功能，可讓開發人員更輕鬆地使用 Amazon Web Services 開發、除錯和部署 .NET 應用程式。藉由 AWS Toolkit for Visual Studio，您將能夠在建置 AWS 應用程式時更快地開始並提高工作效率。

- [安裝 AWS Toolkit for Visual Studio](https://aws.amazon.com/visualstudio/)

## 準備專案

Elastic Beanstalk 無法取代您的 `appSettings`，因此我們需要在發佈前將其移除。實際上，透過將以下內容加入 `web.release.config` 檔案相當容易。下一節**「逐步操作」**中包括說明該內容的影片。

```xml
<appSettings>
  <add key="FORGE_CLIENT_ID" xdt:Transform="Remove" xdt:Locator="Match(key)" />
  <add key="FORGE_CLIENT_SECRET" xdt:Transform="Remove" xdt:Locator="Match(key)" />
</appSettings>
```

## 逐步操作影片

這是一個時長為 7 分鐘的影片，將說明如何部署到 AWS Elastic Beanstalk。

[影片](https://www.youtube.com/embed/49X4ROI6PWs ':include :type=iframe width=100% height=400px')