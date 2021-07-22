# アマゾンウェブサービス(AWS)

まず、[AWS アカウント](https://aws.amazon.com/)を作成し、アクティベーションします。

## 前提条件

AWS Toolkit for Visual Studioは、Microsoft Windows上で実行されるMicrosoft Visual Studioの拡張機能です。開発者は、アマゾンウェブサービスを使用して.NETアプリケーションの開発、デバッグ、およびデプロイを簡単に行うことができます。AWS Toolkit for Visual Studioを使用すると、AWSアプリケーションを構築する際に、より早く開始して生産性を高めることができます。

- [AWS Toolkit for Visual Studioをインストールする](https://aws.amazon.com/visualstudio/)

## プロジェクトを準備する

Elastic Beanstalk は `appSettings` をオーバーライドできないため、パブリッシュする前に削除する必要があります。実際には、`web.release.config` ファイルに次のコードを追加すると非常に簡単です。次のセクション、**段階的**には、これを説明するビデオが含まれています。

```xml
<appSettings>
  <add key="FORGE_CLIENT_ID" xdt:Transform="Remove" xdt:Locator="Match(key)" />
  <add key="FORGE_CLIENT_SECRET" xdt:Transform="Remove" xdt:Locator="Match(key)" />
</appSettings>
```

## ステップバイステップ方式のビデオ

これは、AWS Elastic Beanstalkにデプロイする方法に関する7分のビデオです。

[Video](https://www.youtube.com/embed/49X4ROI6PWs ':include :type=iframe width=100% height=400px')