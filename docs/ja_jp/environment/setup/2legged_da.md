# サーバを作成する

クライアントIDとシークレットは保護し、機密にする必要があります。すべてのファイルがアカウントにバインドされるためです。Webアプリケーションの場合は、サーバに保持します。このセクションでは、ローカル開発サーバの作成方法を説明します。

必要なソフトウェアについては、[ツール](/ja_jp/environment/tools/)セクションを確認してください。

### 前提条件

**ngrok**

設計の自動化がモデルの修正を終了すると、通知が返されます。マシンが Web 上に公開されていないため、[ngrok](https://ngrok.com/) ツールは通知を受け取るための一時的なアドレスを作成します。このツールはローカルでのみ必要です。 

ダウンロードしたら、解凍します。Windows の**コマンド ライン プロンプト**(CMD)を開き、フォルダにナビゲートします。次に、`ngrok http 3000 -host-header="localhost:3000"`を実行します。**forwarding** URL 値を(`http://1ab2c3d4.ngrok.com` の形式で)コピーします

![](/_media/designautomation/ngrok.gif)

> Windows 以外(MacOS など)で実行している場合は、代わりに **Terminal** を開き、同じ手順を実行しますが、プリフィックスを付ける必要があります。 `./`

!> **警告**: `ngrok` 使用中に localhost サーバが Web に公開されます。テストが完了したら、必ずオフにしてください。この開発環境の外部では使用しない

プロジェクトをセットアップ、言語を選択:[Node.js](/ja_jp/environment/setup/nodejs_da) | [.NET Core](/ja_jp/environment/setup/netcore_da)