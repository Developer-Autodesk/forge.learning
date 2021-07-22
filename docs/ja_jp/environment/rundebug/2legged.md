# ローカルで実行してデバッグ

アプリの準備ができました。今すぐ実行しましょう。ここでは、(デバッグを介して)発生する可能性のあるエラーをテストおよびチェックできます。ヒントとテクニックを確認してください。

## サンプルを使用する

次のセクションでは、アプリの実行方法を説明します。ブラウザで開いたら、**New Bucket** をクリックしてバケットを作成します(名前はすべての Forge アカウントで一意である必要があります)。

新しく作成したバケットを右クリックし、** \[ファイルのアップロード]を選択します。**これにより、OSS アップロード プロセスが起動します。

次に、テスト用のサンプル ファイルをいくつか示します: - [AutoCAD (.dwg)](https://knowledge.autodesk.com/support/autocad/downloads/caas/downloads/content/autocad-sample-files.html) - [AutoCAD Mechanical (.dwg)](https://knowledge.autodesk.com/support/autocad-mechanical/downloads/caas/downloads/content/autocad-mechanical-2019-sample-files.html) - [Inventor (.ipt)](https://knowledge.autodesk.com/support/inventor/troubleshooting/caas/downloads/content/inventor-sample-files.html) - [Revit (.rvt)](https://knowledge.autodesk.com/support/revit-products/getting-started/caas/CloudHelp/cloudhelp/2019/ENU/Revit-GetStarted/files/GUID-61EF2F22-3A1F-4317-B925-1E85F138BE88-htm.html)


 次に、バケット ツリー ノードを展開し、ファイルを右クリックして、**移動**を選択します(これにより、モデル派生ジョブがトリガされます)。ファイルの準備が完了した直後に、ファイルを再度クリックしてビューアに表示します。

![](_media/tutorials/run_sample_viewmodels.gif)

準備は?実行しましょう!

言語を選択:[Node.js](/ja_jp/environment/rundebug/nodejs) | [.NET Framework](/ja_jp/environment/rundebug/net) | [.NET Core](/ja_jp/environment/rundebug/netcore) | [Go](/ja_jp/environment/rundebug/go) | [PHP](/ja_jp/environment/rundebug/php) | [Java](/ja_jp/environment/rundebug/java)