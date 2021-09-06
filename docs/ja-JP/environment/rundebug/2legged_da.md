# ローカルに実行してデバッグする

アプリの準備ができたので、実行してみましょう。ここで、(デバッグを使用して)発生する可能性のあるエラーをテストおよびチェックできます。

## サンプルを使用する

右上にある **Configure** をクリックして AppBundle とアクティビティを定義します。この操作は一度だけ行う必要があります。左側のパネルで新しい`width` と `height` を指定し、`input file` を選択して `Start workitem` をクリックします。右側のパネルに結果が表示されます。

[サンプル ファイルはこちら](https://github.com/Developer-Autodesk/learn.forge.designautomation/tree/master/sample%20files)にあります。

!> プラグイン コードが変更された場合は、新しい AppBundle をアップロードしてバージョンを(v1 から v2 などに)引き上げる必要があります。このサンプルでは、新しい AppBundle をアップロードするたびに新しいバージョンが作成されます。

> 入力ファイルと出力ファイルの両方が OSS バケットに保存されます。これらを表示するには、「[モデルを表示する](tutorials/viewmodels)」のチュートリアルを使用してください。

![](_media/tutorials/run_sample_modifymodels.gif)

## トラブルシューティング

**1\.結果パネルに情報全体が表示されない**

**ngrok** が実行されていて、期限が切れていないことを確認します。環境変数で ngrok アドレスが正しく指定されていることを確認します。

**2\.作業項目は実行されるが、予期した結果にならない**

**Clear Account** ボタンを使用することを検討してください。これを試用すると、アカウント上のすべての AppBundles とアクティビティが削除されます。削除後、これれらを再度定義します。

**3\.Configuration フォームに AppBundle が表示されない**

対応するプラグインをビルドすると、ZIP バンドルが `wwwroot/bundles` にコピーされます。ビルド後に `Post-build` イベントが正しく定義されて、実行されることを確認します。

**4\.正しい DLL がアップロードされたことを確認する**

正しい DLL が Design Automation にアップロードされたことを簡単に確認するには、アップロードの日付を確認します。[この質問に対する StackOverflow の回答](https://stackoverflow.com/a/1600990)には、リンカー日(DLL がコンパイルされた日付)の取得方法が示さています。この方法で、コードの先頭に日付を示することができます。日付はサーバのタイム ゾーンの日付であることに注意してください。

> プラグインは、サーバ言語に関係なく `C#` で記述されています。
 
```csharp
LogTrace("DLL {0} compiled on {1}",
    System.IO.Path.GetFileName(System.Reflection.Assembly.GetExecutingAssembly().Location),
    GetLinkerTime(System.Reflection.Assembly.GetExecutingAssembly()));
```

準備ができたら、実行してみましょう!

言語を選択:[Node.js](environment/rundebug/nodejs_da) | [.NET Core](environment/rundebug/netcore)