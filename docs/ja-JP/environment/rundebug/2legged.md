# ローカルに実行してデバッグする

アプリの準備ができたので、実行してみましょう。ここで、(デバッグを使用して)発生する可能性のあるエラーをテストおよびチェックできます。ヒントとテクニックを確認してください。

## サンプルを使用する

次のセクションでは、アプリの実行方法を示します。ブラウザでアプリを開いたら、**New Bucket** をクリックしてバケットを作成します(名前はすべての Forge アカウントで一意である必要があります)。

新しく作成したバケットを右クリックし、**Upload file** を選択します(OSS アップロード プロセスが起動します)。

テスト用のサンプル ファイルは、次のとおりです。- [AutoCAD (.dwg)](https://knowledge.autodesk.com/support/autocad/downloads/caas/downloads/content/autocad-sample-files.html) - [AutoCAD Mechanical (.dwg)](https://knowledge.autodesk.com/support/autocad-mechanical/downloads/caas/downloads/content/autocad-mechanical-2019-sample-files.html) - [Inventor (.ipt)](https://knowledge.autodesk.com/support/inventor/troubleshooting/caas/downloads/content/inventor-sample-files.html) - [Revit (.rvt)](https://knowledge.autodesk.com/support/revit-products/getting-started/caas/CloudHelp/cloudhelp/2019/ENU/Revit-GetStarted/files/GUID-61EF2F22-3A1F-4317-B925-1E85F138BE88-htm.html)


 次に、バケット ツリー ノードを展開し、ファイルを右クリックして、**\[Translate]**を選択します(Model Derivative ジョブが起動します)。ファイルの準備が完了したら、、ファイルを再クリックしてビューアに表示します。

![](_media/tutorials/run_sample_viewmodels.gif)

準備ができたら、実行してみましょう!

言語を選択:[Node.js](environment/rundebug/nodejs) | [.NET Framework](environment/rundebug/net) | [.NET Core](environment/rundebug/netcore) | [Go](environment/rundebug/go) | [PHP](environment/rundebug/php) | [Java](environment/rundebug/java)