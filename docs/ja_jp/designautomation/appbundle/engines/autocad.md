# AutoCADバンドルを準備する

この手順では、設計の自動化のための基本的なAutoCADプラグインを作成します。詳細については、[My First AutoCAD Plugin](https://knowledge.autodesk.com/support/autocad/learn-explore/caas/simplecontent/content/my-first-autocad-plug-overview.html) チュートリアルを参照してください。

> バンドル ZIP  を [`bundles/` (Node.js) または `/forgeSample/wwwroot/bundles` (.NET Core) フォルダに [このセクションをスキップ](/ja_jp/designautomation/appbundle/common.md)できます

## 新規プロジェクトを作成

ソリューションを右クリックし、**追加 ** >> **新規プロジェクト ** を選択します。**Windows デスクトップ**、次に **クラス ライブラリ**を選択し、最後に `UpdateDWGParam` という名前を付けます。次に、プロジェクトを右クリックして、** NuGet Packages を管理...** に移動し、** Browser** で **AutoCAD.NET を検索して、`AutoCAD.NET.Core` (これも `AutoCAD.NET.Model` をインストール)をインストールします。**次に、`Newtonsoft.Json` (JSON形式の入力データを解析するために使用される)を検索してインストールします。

> .NET Framework 4.7を選択してください。リストに表示されない場合は、[Dev Pack ](https://dotnet.microsoft.com/download/dotnet-framework/net47) をインストールしてください。

![](_media/designautomation/autocad/new_project.gif)

その結果、**package.config** は次のようになります。このサンプルでは、使用可能なすべてのバージョンで動作するバージョン20を使用します。特定のバージョンに合わせて調整することができます。 

[package.config](_snippets/modifymodels/engines/autocad/package.config ':include :type=code xml')

プロジェクトには`Class1.cs`クラスが含まれている必要があります。整合性を保つため、ファイルの名前を`Commands.cs` (meta id="1" />)に変更します。 

## Commands.cs

これは、AutoCADで実行されるメインコードです。次の内容を`Commands.cs`にコピーします。このクラスには、同じ名前のメソッドとして定義された1つのカスタムAutoCADコマンド`UpdateParam`が含まれます。このコマンドは、デザイン オートメーション エンジンによって呼び出され、**Activity** (このチュートリアルの次の手順)で指定されます

[Commands.cs](_snippets/modifymodels/engines/autocad/Commands.cs ':include :type=code csharp')

## PackageContents.xml

`UpdateDWGParam.bundle`という名前のフォルダを作成し、その中に`PackageContents.xml`という名前のファイルを作成し、次の内容をそのフォルダにコピーします。詳細については、[PackageContents.xml 形式リファレンス](https://knowledge.autodesk.com/search-result/caas/CloudHelp/cloudhelp/2016/ENU/AutoCAD-Customization/files/GUID-BC76355D-682B-46ED-B9B7-66C95EEF2BD0-htm.html)を参照してください。このファイルは、設計オートメーションの実行時に呼び出される新しいAutoCADカスタムコマンド`UpdateParam`を定義します。

[PackageContents.xml](_snippets/modifymodels/engines/autocad/PackageContents.xml ':include :type=code xml')

最後に、`Contents`という名前のサブフォルダを作成し、空のままにします。この時点で、プロジェクトは次のようになります。

![](_media/designautomation/autocad/bundle_folders.png)

## ビルド後イベント

> Node.jsの場合、AppBundle ZIP出力フォルダを調整する必要があります。

ここで、.bundleフォルダをZIPで圧縮する必要があります。プロジェクトを右クリックし、**プロパティ**を選択し、**Build Events** を開いて、次のコードを **Post-build event command line** フィールドにコピーします(下図を参照)。

```
xcopy /Y /F "$(TargetDir)*.dll" "$(ProjectDir)UpdateDWGParam.bundle\Contents\"
del /F "$(ProjectDir)..\forgesample\wwwroot\bundles\UpdateDWGParam.zip"
"C:\Program Files\7-Zip\7z.exe" a -tzip "$(ProjectDir)../forgesample/wwwroot/bundles/UpdateDWGParam.zip" "$(ProjectDir)UpdateDWGParam.bundle\" -xr0!*.pdb
```

これにより、DLL が /bin/debug/ から .bundle/Contents フォルダにコピーされ、[7zip](https://www.7-zip.org/) を使用して zip が作成されます。最後に、ZIP を Web アプリの /bundles フォルダにコピーします。

![](_media/designautomation/autocad/post_build.png)

> **ビルド後イベント**ではプロジェクト名とフォルダ名がどのように使用されるかに注意してください。そのため、この名前を使用していることを確認してください。

`UpdateDWGParam` プロジェクトを構築すると、**出力(Output)**ウィンドウに次のように表示されます。2つのフォルダと3つのファイルが圧縮されていることに注意してください。zipファイルは、/wwwroot/bundlesフォルダに直接作成されます。これは、素晴らしいパフォーマンスを実現していることを意味します。

![](_media/designautomation/autocad/build_output.png)

次へ:[プラグインをアップロード](/ja_jp/designautomation/appbundle/common)