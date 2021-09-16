# サーバを作成する

すべてのファイルがアカウントにバインドされるため、Client ID と Secret を保護し、機密を維持する必要があります。Web アプリケーションの場合は、サーバに保存してください。このセクションでは、ローカル開発サーバを作成するための準備方法を示します。

### 前提条件

**1\.Visual Studio**

Visual Studio 2017 以降が必要です。[こちらのリンク](https://visualstudio.microsoft.com/vs/)にアクセスしてください。

**2\.AutoCAD、Inventor、または Revit**

Design Automation プラグインを開発、テスト、デバッグするには、次の手順を実行します。[AutoCAD](https://www.autodesk.com/products/autocad/overview) | [Inventor](https://www.autodesk.com/products/inventor/overview) | [Revit](https://www.autodesk.com/products/revit/overview)

**3\. ngrok**

Design Automation によるモデルの修正が終了すると、通知が返されます。マシンが Web で公開されていないため、通知を受け取るための一時的なアドレスが [ngrok](https://ngrok.com/) ツールによって作成されます。このツールは、ローカルで使用する場合のみ必要です。 

ダウンロードしたら、解凍します。Windows の**コマンド ライン プロンプト**(CMD)を開き、目的のフォルダに移動します。次に、`ngrok http 3000 -host-header="localhost:3000"` を実行します。**Forwarding** URL の値(`http://1ab2c3d4.ngrok.com` の形式)をコピーします。

![](/_media/designautomation/ngrok.gif)

> Windows 以外(MacOS など)で実行している場合は、代わりに**ターミナル**を開き、同じ手順を実行します。

!> **警告**: `ngrok` は、使用中に localhost サーバを Web に公開します。テストが完了したら、必ずオフにしてください。このツールは、開発環境の外部では使用しなでください。

次のステップ:[プロジェクトをセットアップする](/ja-JP/environment/setup/netcore_da)