# ツール(.NET Core)

.NET エンジンは Windows マシンに組み込まれた機能で、.NET Core は Visual Studio と一緒にインストールされます。

## Visual Studio Community 2019

[Visual Studio](https://visualstudio.microsoft.com/vs/) の任意フレーバー。このチュートリアルでは、**Community** エディションを使用します。[インストーラをダウンロード](https://visualstudio.microsoft.com/vs/)し、その手順に従い、「**ASP.NET および Web 開発**」および「**.NET デスクトップ開発**」を選択してください(「**モデルを修正する**」チュートリアルで必須)。

!> より良いエクスペリエンスを得るには、このチュートリアルでビジュアル コードを使用しないでください。

![](_media/net/workloads_2019.png)


## 他のフレーバーと旧バージョン

> このチュートリアルでは、プロフェッショナル機能やエンタープライズ機能は必要ありません

!> .NET Core は Visual Studio 2015 ではサポート**されていません**。.NET Core 3.0 は Visual Studio 2017 ではサポート**されていません**。

より良いエクスペリエンスを得るには、2019 バージョンを使用してください。インストール済みの古いバージョン(Visual Studio Professional 2017 など)を使用する必要がある場合は、\[Add or remove programs] >> \[Apps & Features]に移動し、「Visual Studio Community」を検索して\[Modify]をクリックし、ワークロードを選択します(次に示します)。「**モデルを修正する**」チュートリアルには、「**.NET デスクトップ開発**」が必要です。

![](_media/net/workloads_2017.png)

> [.NET Core 3.0 SDK](https://dotnet.microsoft.com/download) がインストールされていることを確認します。

## ビジュアル コード(MacOS/Linux)

別の解決策として、[Visual Code](https://code.visualstudio.com/) を使用することもできます。これには、**C#** 拡張子が必要です。必ず [.NET Core 3.0 SDK およびランタイム](https://dotnet.microsoft.com/download)をインストールしてください。 

> 「**モデルを修正する**」チュートリアルのプラグインをコンパイルするには、Visual Studio (Windows 版)が必要です。

![](_media/net/csharp_extension.png)

次の作業:[認証](oauth/)