# ツール(.NET Core)

.NETエンジンはWindowsマシンに組み込まれた機能で、.NET CoreはVisual Studioと一緒にインストールされます。

## Visual Studio Community 2019

[Visual Studio](https://visualstudio.microsoft.com/vs/) の任意の種類のチュートリアルでは、**Community** エディションを使用します。[インストーラをダウンロードし、](https://visualstudio.microsoft.com/vs/)その手順に従い、**ASP.NET および Web 開発**および **.NET デスクトップ開発**を選択してください(**モデルの修正**チュートリアルで必須)。

!>より良いエクスペリエンスを得るには、このチュートリアルでビジュアルコードを使用しないでください。

![](_media/net/workloads_2019.png)


## その他の種類と旧バージョン

> このチュートリアルでは、プロフェッショナル機能やエンタープライズ機能は必要ありません

!> .NET コアは Visual Studio 2015 では <スパン ID="1">サポートされていません。 .NET Core 3.0 は Visual Studio 2017 では <スパン ID="2">サポートされていません。

より良いエクスペリエンスを得るには、2019バージョンを使用してください。インストール済みの古いバージョン(Visual Studio Professional 2017 など)を使用する必要がある場合は、\[プログラムの追加または削除] > \[アプリと機能]に移動し、Visual Studio Community を検索して\[修正]をクリックし、ワークロードを選択します(次に示します)。**モデルの修正**チュートリアルには、<span id="1" がが必要です。

![](_media/net/workloads_2017.png)

> [.NET Core 3.0 SDK](https://dotnet.microsoft.com/download) がインストールされていることを確認します。

## ビジュアルコード(MacOS/Linux)

別の解決策として、[Visual Code](https://code.visualstudio.com/) を使用することもできます。これには、**C#** 拡張子が必要です。必ず [.NET Core 3.0 SDK およびランタイム ](https://dotnet.microsoft.com/download) をインストールしてください。 

> Visual Studio (Windows の場合)は、** モデルの修正**チュートリアル用のプラグインをコンパイルする必要があります。

![](_media/net/csharp_extension.png)

次へ:[認証](/ja_jp/oauth/)