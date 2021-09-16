# Revit バンドルを準備する

この手順では、Design Automation のための基本的な Revit プラグインを作成します。詳細については、[My First Revit Plugin](https://knowledge.autodesk.com/support/revit-products/learn-explore/caas/simplecontent/content/my-first-revit-plug-overview.html) チュートリアルを参照してください。

> `bundles/` (Node.js)または `/forgeSample/wwwroot/bundles` (.NET Core)に[バンドル ZIP をダウンロード](https://github.com/Autodesk-Forge/learn.forge.designautomation/raw/master/forgesample/wwwroot/bundles/UpdateRVTParam.zip)してある場合は、[このセクションをスキップ](/ja-JP/designautomation/appbundle/common.md)して構いません。

## 新しいプロジェクトを作成する

ソリューションを右クリックし、**Add** >> **New Project** を選択します。**Windows Desktop**、次に **Class Library** を選択し、最後に `UpdateRVTParam` という名前を付けます。 

> .NET Framework 4.8 を選択してください。リストに表示されない場合は、[開発者パック(Developer Pack)](https://dotnet.microsoft.com/download/dotnet-framework/net47) をインストールしてください。

**References** を右クリックし、次に `RevitAPI.dll` (既定では _C:\Program Files\Autodesk\Revit 201x_ folder にあります) の **Add Reference** および **Browse** をクリックします。次に、この **RevitAPI** リファレンスを右クリックし、**Properties** に移動し、**Copy Local** を **False** に設定します。

次に、プロジェクトを右クリックし、**Manage NuGet Packages...** に移動します。**Browse** で **DesignAutomation.Revit** を検索して `Autodesk.Forge.DesignAutomation.Revit` をインストールします(適切な Revit のバージョンを選択してください)。次に、`Newtonsoft.Json` (JSON 形式の入力データを解析するために使用される)を検索してインストールします。 

![](_media/designautomation/revit/new_project.gif)

[package.config](_snippets/modifymodels/engines/revit/package.config ':include :type=code xml')

プロジェクトには `Class1.cs` クラスが含まれている必要があります。ファイルの名前を `Commands.cs` に変更します(整合性を保つため)。 

この時点で、プロジェクトは次のようになります。

![](_media/designautomation/revit/project_files.png)

## Commands.cs

これは、Revit で実行されるメイン コードです。次の内容を `Commands.cs` にコピーします。対象の主なポイントは、アプリケーションの実行準備が整ったときにトリガされる `DesignAutomationReadyEvent` イベントです。`HandleDesignAutomationReadyEvent`は、カスタム コードを実装します。

[Commands.cs](_snippets/modifymodels/engines/revit/Commands.cs ':include :type=code csharp')

## PackageContents.xml

`UpdateRVTParam.bundle` という名前のフォルダを作成し、その中に `PackageContents.xml` という名前のファイルを作成し、次の内容をそのファイルにコピーします。詳細については、「[PackageContents.xml 形式リファレンス](https://knowledge.autodesk.com/search-result/caas/CloudHelp/cloudhelp/2016/ENU/AutoCAD-Customization/files/GUID-BC76355D-682B-46ED-B9B7-66C95EEF2BD0-htm.html)」を参照してください。このファイルは、`.addin` プラグインをロードするよう Revit に指示します。

[PackageContents.xml](_snippets/modifymodels/engines/revit/PackageContents.xml ':include :type=code xml')

## Autodesk.Forge.Sample.DesignAutomation.Revit.addin

`UpdateRVTParam.bundle` フォルダの下に `Contents` という名前のサブフォルダを作成し、このフォルダ内に `Autodesk.Forge.Sample.DesignAutomation.Revit.addin` という名前の新しいファイルを作成します。これにより、プラグインのロード方法が Revit に通知されます。

[Autodesk.Forge.Sample.DesignAutomation.Revit.addin](_snippets/modifymodels/engines/revit/Autodesk.Forge.Sample.DesignAutomation.Revit.addin ':include :type=code xml')

この時点で、プロジェクトは次のようになります。

![](_media/designautomation/revit/bundle_folders.png)

## ビルド後イベント

> Node.js の場合、AppBundle ZIP 出力フォルダを調整する必要があります。

ここで、.bundle フォルダを ZIP で圧縮する必要があります。プロジェクトを右クリックし、**Properties** を選択し、**Build Events** を開いて、次のコードを **Post-build event command line** フィールドにコピーします(下図を参照)。

```
xcopy /Y /F "$(TargetDir)*.dll" "$(ProjectDir)UpdateRVTParam.bundle\Contents\"
del /F "$(ProjectDir)..\forgesample\wwwroot\bundles\UpdateRVTParam.zip"
"C:\Program Files\7-Zip\7z.exe" a -tzip "$(ProjectDir)../forgesample/wwwroot/bundles/UpdateRVTParam.zip" "$(ProjectDir)UpdateRVTParam.bundle\" -xr0!*.pdb
```

これにより、DLL が /bin/debug/ から .bundle/Contents フォルダにコピーされ、[7zip](https://www.7-zip.org/) を使用して zip が作成されます。最後に、ZIP を Web アプリの /bundles フォルダにコピーします。

![](_media/designautomation/revit/post_build.png)

> **ビルド後イベント**でプロジェクト名とフォルダ名がどのように使用されるかに注意してください。この名前を使用していることを確認してください。

`UpdateRVTParam` プロジェクトをビルドすると、**Output** ウィンドウに次のように表示されます。2 つのフォルダと 3 つのファイルが圧縮されていることに注意してください。zip ファイルは、/wwwroot/bundles フォルダに直接作成されます。これは、操作が問題なく実行されていることを意味します。

![](_media/designautomation/revit/build_output.png)

!> ビルド出力に **3 つ以上のフォルダ、6 つ以上のファイル**がコピーされていることが示されている場合は、前に戻って **RevitAPI** リファレンスが **Copy Local**:**False** に設定されていることを確認します。場合によっては、`UpdateRVTParam.bundle/Contents/` フォルダからすべての DLL を削除する必要があります

次の作業:[プラグインをアップロードする](/ja-JP/designautomation/appbundle/common)