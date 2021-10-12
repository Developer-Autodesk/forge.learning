# Amazon Web Services (AWS)

まず、[AWS アカウント](https://aws.amazon.com/)を作成し、アクティブにします。

## 前提条件

AWS Toolkit for Visual Studio は、Microsoft Windows 上で実行される Microsoft Visual Studio のエクステンションです。これにより、開発者は、Amazon Web Services を使用して .NET アプリケーションの開発、デバッグ、およびデプロイを簡単に行うことができます。AWS Toolkit for Visual Studio を使用すると、AWS アプリケーションを構築する際に、より迅速に開始して生産性を高めることができます。

- [AWS Toolkit for Visual Studio をインストールする](https://aws.amazon.com/visualstudio/)

## プロジェクトを準備する

Elastic Beanstalk は `appSettings` をオーバーライドできないため、パブリッシュする前に削除する必要があります。実際に、`web.release.config` ファイルに以下を追加すると非常に簡単です。次のセクション、「**操作手順**」にはこれを説明する動画が含まれています。

```xml
<appSettings>
  <add key="FORGE_CLIENT_ID" xdt:Transform="Remove" xdt:Locator="Match(key)" />
  <add key="FORGE_CLIENT_SECRET" xdt:Transform="Remove" xdt:Locator="Match(key)" />
</appSettings>
```

## 操作手順の動画

これは、AWS Elastic Beanstalk にデプロイする方法に関する 7 分間の動画です。

[動画](https://www.youtube.com/embed/49X4ROI6PWs ':include :type=iframe width=100% height=400px')