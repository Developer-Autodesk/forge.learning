# Amazon Web Services (AWS)

まず、[AWS アカウント](https://aws.amazon.com/)を作成し、アクティブにします。

## 前提条件

AWS Toolkit for Visual Studio は、Microsoft Windows 上で実行される Microsoft Visual Studio の拡張機能です。これにより、開発者は、Amazon Web Services を使用して .NET アプリケーションの開発、デバッグ、および配置を簡単に行うことができます。AWS Toolkit for Visual Studio を使用すると、AWS アプリケーションを構築する際に、より迅速に開始して生産性を高めることができます。

- [AWS Toolkit for Visual Studio をインストールする](https://aws.amazon.com/visualstudio/)

## プロジェクトを準備する

Elastic Beanstalk は `appSettings` をオーバーライドできないため、パブリッシュする前に削除する必要があります。実際に、`web.release.config` ファイルに以下を追加すると非常に簡単です。次のセクション、「**操作手順**」にはこれを説明するビデオが含まれています。

```xml
<appSettings>
  <add key="FORGE_CLIENT_ID" xdt:Transform="Remove" xdt:Locator="Match(key)" />
  <add key="FORGE_CLIENT_SECRET" xdt:Transform="Remove" xdt:Locator="Match(key)" />
</appSettings>
```

## 操作手順のビデオ

これは、AWS Elastic Beanstalk に配置する方法に関する 7 分間のビデオです。

[ビデオ](https://www.youtube.com/embed/49X4ROI6PWs ':include :type=iframe width=100% height=400px')