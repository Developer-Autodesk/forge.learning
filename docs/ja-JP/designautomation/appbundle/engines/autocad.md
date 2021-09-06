# AutoCAD バンドルを準備する

この手順では、Design Automation のための基本的な AutoCAD プラグインを作成します。詳細については、[My First AutoCAD Plugin](https://knowledge.autodesk.com/support/autocad/learn-explore/caas/simplecontent/content/my-first-autocad-plug-overview.html) チュートリアルを参照してください。

> `bundles/` (Node.js)または `/forgeSample/wwwroot/bundles` (.NET Core)に[バンドル ZIP をダウンロード](https://github.com/Autodesk-Forge/learn.forge.designautomation/raw/master/forgesample/wwwroot/bundles/UpdateDWGParam.zip)してある場合は、[このセクションをスキップ](/ja-JP/designautomation/appbundle/common.md)して構いません。

## 新しいプロジェクトを作成する

ソリューションを右クリックし、**Add** >> **New Project** を選択します。**Windows Desktop**、次に **Class Library** を選択し、最後に `UpdateDWGParam` という名前を付けます。次に、プロジェクトを右クリックし、**Manage NuGet Packages...** に移動します。**Browse** で **AutoCAD.NET** を検索して `AutoCAD.NET.Core` をインストールします(`AutoCAD.NET.Model` もインストールされます)。次に、`Newtonsoft.Json` (JSON 形式の入力データを解析するために使用される)を検索してインストールします。

> .NET Framework 4.7 を選択してください。リストに表示されない場合は、[Dev Pack](https://dotnet.microsoft.com/download/dotnet-framework/net47) をインストールしてください。

![](_media/designautomation/autocad/new_project.gif)

その結果、**package.config** は次のようになります。このサンプルでは、使用可能なすべてのバージョンで動作するバージョン 20 を使用します。特定のバージョンに合わせて調整することができます。 

[package.config](_snippets/modifymodels/engines/autocad/package.config ':include :type=code xml')

プロジェクトには `Class1.cs` クラスが含まれている必要があります。ファイルの名前を `Commands.cs` に変更します(整合性を保つため)。 

## Commands.cs

これは、AutoCAD で実行されるメイン コードです。次の内容を `Commands.cs` にコピーします。このクラスには、同じ名前のメソッドとして定義された 1 つのカスタム AutoCAD コマンド `UpdateParam` が含まれています。このコマンドは、**アクティビティ**(このチュートリアルの次の手順)で指定されるように、Design Automation エンジンによって呼び出されます。

[Commands.cs](_snippets/modifymodels/engines/autocad/Commands.cs ':include :type=code csharp')

## PackageContents.xml

`UpdateDWGParam.bundle` という名前のフォルダを作成し、その中に `PackageContents.xml` という名前のファイルを作成し、次の内容をそのファイルにコピーします。詳細については、「[PackageContents.xml フォーマットのリファレンス](https://knowledge.autodesk.com/search-result/caas/CloudHelp/cloudhelp/2016/ENU/AutoCAD-Customization/files/GUID-BC76355D-682B-46ED-B9B7-66C95EEF2BD0-htm.html)」を参照してください。このファイルは、Design Automation の実行時に呼び出される新しい AutoCAD カスタム コマンド `UpdateParam` を定義します。

[PackageContents.xml](_snippets/modifymodels/engines/autocad/PackageContents.xml ':include :type=code xml')

最後に、`Contents` という名前のサブフォルダを作成し、空のままにします。この時点で、プロジェクトは次のようになります。

![](_media/designautomation/autocad/bundle_folders.png)

## ビルド後イベント

> Node.js の場合、AppBundle ZIP 出力フォルダを調整する必要があります。

ここで、.bundle フォルダを ZIP で圧縮する必要があります。プロジェクトを右クリックし、**Properties** を選択し、**Build Events** を開いて、次のコードを **Post-build event command line** フィールドにコピーします(下図を参照)。

```
xcopy /Y /F "$(TargetDir)*.dll" "$(ProjectDir)UpdateDWGParam.bundle\Contents\"
del /F "$(ProjectDir)..\forgesample\wwwroot\bundles\UpdateDWGParam.zip"
"C:\Program Files\7-Zip\7z.exe" a -tzip "$(ProjectDir)../forgesample/wwwroot/bundles/UpdateDWGParam.zip" "$(ProjectDir)UpdateDWGParam.bundle\" -xr0!*.pdb
```

これにより、DLL が /bin/debug/ から .bundle/Contents フォルダにコピーされ、[7zip](https://www.7-zip.org/) を使用して zip が作成されます。最後に、ZIP を Web アプリの /bundles フォルダにコピーします。

![](_media/designautomation/autocad/post_build.png)

> **ビルド後イベント**でプロジェクト名とフォルダ名がどのように使用されるかに注意してください。この名前を使用していることを確認してください。

`UpdateDWGParam` プロジェクトをビルドすると、**Output** ウィンドウに次のように表示されます。2 つのフォルダと 3 つのファイルが圧縮されていることに注意してください。zip ファイルは、/wwwroot/bundles フォルダに直接作成されます。これは、操作が問題なく実行されていることを意味します。

![](_media/designautomation/autocad/build_output.png)

次の作業:[プラグインをアップロードする](/ja-JP/designautomation/appbundle/common)