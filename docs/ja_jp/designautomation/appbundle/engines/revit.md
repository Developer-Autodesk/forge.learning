# Revitバンドルを準備する

この手順では、設計の自動化に使用する基本的なRevitプラグインを作成します。詳細については、[My First Revit Plugin](https://knowledge.autodesk.com/support/revit-products/learn-explore/caas/simplecontent/content/my-first-revit-plug-overview.html) チュートリアルをご覧ください。

> バンドル ZIP  を [`bundles/` (Node.js) または `/forgeSample/wwwroot/bundles` (.NET Core) フォルダに [このセクションをスキップ](/ja_jp/designautomation/appbundle/common.md)できます

## 新規プロジェクトを作成

ソリューションを右クリックし、**追加 ** >> **新規プロジェクト ** を選択します。**Windows デスクトップ**、次に **クラス ライブラリ**を選択し、最後に `UpdateRVTParam` という名前を付けます。 

> .NET Framework 4.8を選択してください。リストに表示されない場合は、[Dev Pack ](https://dotnet.microsoft.com/download/dotnet-framework/net47) をインストールしてください。

**参照**を右クリックし、**参照の追加(Add Reference)**および**参照(Browse)**をクリックして、`RevitAPI.dll` (既定では _C:\Program Files\Autodesk\Revit 201x_ folder) を参照します。次に、この **RevitAPI** リファレンスを右クリックし、**Properties** に移動し、**Copy Local** を **False** に設定します。

次に、プロジェクトを右クリックして、** NuGet Packages を管理...** に移動し、**Browser** で **DesignAutomation.Revit** を検索して `Autodesk.Forge.DesignAutomation.Revit` をインストールします(必要な適切な Revit バージョンを選択します)。次に、`Newtonsoft.Json` (JSON形式の入力データを解析するために使用される)を検索してインストールします。 

![](_media/designautomation/revit/new_project.gif)

[package.config](_snippets/modifymodels/engines/revit/package.config ':include :type=code xml')

プロジェクトには`Class1.cs`クラスが含まれている必要があります。整合性を保つため、ファイルの名前を`Commands.cs` (meta id="1" />)に変更します。 

この時点で、プロジェクトは次のようになります。

![](_media/designautomation/revit/project_files.png)

## Commands.cs

これは、Revitで実行されるメインコードです。次の内容を`Commands.cs`にコピーします。対象の主なポイントは、アプリケーションの実行準備が整ったときにトリガされる`DesignAutomationReadyEvent`イベントです。`HandleDesignAutomationReadyEvent`は、カスタムコードを実装します。

[Commands.cs](_snippets/modifymodels/engines/revit/Commands.cs ':include :type=code csharp')

## PackageContents.xml

`UpdateRVTParam.bundle`という名前のフォルダを作成し、その中に`PackageContents.xml`という名前のファイルを作成し、次の内容をそのフォルダにコピーします。詳細については、[PackageContents.xml 形式リファレンス](https://knowledge.autodesk.com/search-result/caas/CloudHelp/cloudhelp/2016/ENU/AutoCAD-Customization/files/GUID-BC76355D-682B-46ED-B9B7-66C95EEF2BD0-htm.html)を参照してください。このファイルは、`.addin`プラグインをロードするようRevitに指示します。

[PackageContents.xml](_snippets/modifymodels/engines/revit/PackageContents.xml ':include :type=code xml')

## Autodesk.Forge.Sample.DesignAutomation.Revit.addin

`UpdateRVTParam.bundle`フォルダの下に`Contents`という名前のサブフォルダを作成し、このフォルダ内に`Autodesk.Forge.Sample.DesignAutomation.Revit.addin`という名前の新しいファイルを作成します。これにより、プラグインのロード方法がRevitに通知されます。

[Autodesk.Forge.Sample.DesignAutomation.Revit.addin](_snippets/modifymodels/engines/revit/Autodesk.Forge.Sample.DesignAutomation.Revit.addin ':include :type=code xml')

この時点で、プロジェクトは次のようになります。

![](_media/designautomation/revit/bundle_folders.png)

## ビルド後イベント

> Node.jsの場合、AppBundle ZIP出力フォルダを調整する必要があります。

ここで、.bundleフォルダをZIPで圧縮する必要があります。プロジェクトを右クリックし、**プロパティ**を選択し、**Build Events** を開いて、次のコードを **Post-build event command line** フィールドにコピーします(下図を参照)。

```
xcopy /Y /F "$(TargetDir)*.dll" "$(ProjectDir)UpdateRVTParam.bundle\Contents\"
del /F "$(ProjectDir)..\forgesample\wwwroot\bundles\UpdateRVTParam.zip"
"C:\Program Files\7-Zip\7z.exe" a -tzip "$(ProjectDir)../forgesample/wwwroot/bundles/UpdateRVTParam.zip" "$(ProjectDir)UpdateRVTParam.bundle\" -xr0!*.pdb
```

これにより、DLL が /bin/debug/ から .bundle/Contents フォルダにコピーされ、[7zip](https://www.7-zip.org/) を使用して zip が作成されます。最後に、ZIP を Web アプリの /bundles フォルダにコピーします。

![](_media/designautomation/revit/post_build.png)

> **ビルド後イベント**ではプロジェクト名とフォルダ名がどのように使用されるかに注意してください。そのため、この名前を使用していることを確認してください。

`UpdateRVTParam` プロジェクトを構築すると、**出力(Output)**ウィンドウに次のように表示されます。2つのフォルダと3つのファイルが圧縮されていることに注意してください。zipファイルは、/wwwroot/bundlesフォルダに直接作成されます。これは、素晴らしいパフォーマンスを実現していることを意味します。

![](_media/designautomation/revit/build_output.png)

!> ビルド出力に **2 フォルダ以上のファイル ** が表示される場合は、前に戻って **RevitAPI** リファレンスが **Copy Local**:**False** に設定されていることを確認してください。場合によっては、`UpdateRVTParam.bundle/Contents/`フォルダからすべてのDLLを削除する必要があります

次へ:[プラグインをアップロード](/ja_jp/designautomation/appbundle/common)