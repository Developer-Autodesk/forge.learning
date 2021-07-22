# ローカルで実行してデバッグ

アプリの準備ができました。今すぐ実行しましょう。ここでは、(デバッグを介して)発生する可能性のあるエラーをテストおよびチェックできます。

## サンプルを使用する

右上で、**Configure** をクリックして AppBundle と Activity を定義します。これは一度だけ行う必要があります。新しい `width` と `height` を左側のパネルで指定し、`入力ファイル`を選択して、`Start workitem` をクリックします。右側のパネルに結果が表示されます。

[のサンプル ファイルは、](https://github.com/Developer-Autodesk/learn.forge.designautomation/tree/master/sample%20files)こちらにあります。

!>プラグインコードが変更された場合は、新しいAppBundleをアップロードしてバージョン(v1からv2など)を増やす必要があります。このサンプルでは、新しいAppBundleがアップロードされるたびに新しいバージョンが作成されます。

> 入力ファイルと出力ファイルの両方が OSS バケットに保存されています。[モデルの表示](/ja_jp/tutorials/viewmodels)チュートリアルを使用して、これらを表示することができます。

![](_media/tutorials/run_sample_modifymodels.gif)

## トラブルシューティング

**1\.結果パネルには情報全体は表示されません**

**ngrok** が実行されていて、期限が切れていないことを確認します。環境変数でNGROKアドレスが正しく指定されていることを確認します。

**2\.作業アイテムが実行されましたが、結果が期待どおりではありません**

**アカウントのクリア(Clear Account)**ボタンを使用することを検討してください。これにより、アカウント上のすべてのAppBundlesとアクティビティが削除されます。次に、それらを再度定義します。

**3\.環境設定フォームにAppBundleが表示されません**

ZIP バンドルは、それぞれのプラグインをビルドした後、`wwwroot/bundles` にコピーされます。`ビルド後`イベントが正しく定義され、ビルド後に実行されていることを確認してください。

**4\.正しいDLLがアップロードされたことを確認する**

正しいDLLが設計オートメーションにアップロードされたことを確認するための簡単な方法は、その日付を確認することです。[この StackOverflow の答えは、リンカーの日付(つまり DLL がコンパイルされた場合)を取得する方法を示しています。この日付は、コードの先頭に表示されます。](https://stackoverflow.com/a/1600990)日付はサーバのタイムゾーンに設定されています。

> プラグインは、サーバ言語に関係なく、`C#` で記述されます。
 
```csharp
LogTrace("DLL {0} compiled on {1}",
    System.IO.Path.GetFileName(System.Reflection.Assembly.GetExecutingAssembly().Location),
    GetLinkerTime(System.Reflection.Assembly.GetExecutingAssembly()));
```

準備は?実行しましょう!

言語を選択:[Node.js](/ja_jp/environment/rundebug/nodejs_da) | [.NET Core](/ja_jp/environment/rundebug/netcore)