# Inventor バンドルを準備する

この手順は、基本的な Inventor プラグインを作成する場合に役立ちます。詳細については、[My First Inventor Plugin](https://knowledge.autodesk.com/support/inventor-products/learn-explore/caas/simplecontent/content/my-first-inventor-plug-overview.html) チュートリアルを参照してください。

> `bundles/` (Node.js)または `/forgeSample/wwwroot/bundles` (.NET Core)に[バンドル ZIP をダウンロード](https://github.com/Autodesk-Forge/learn.forge.designautomation/raw/master/forgesample/wwwroot/bundles/UpdateIPTParam.zip)してある場合は、[このセクションをスキップ](designautomation/appbundle/common.md)して構いません。

## 前提条件

- **Design Automation for Inventor** テンプレート: Visual Studio Market Place に移動し、[このリンク](https://marketplace.visualstudio.com/items?itemName=Autodesk.DesignAutomation)からダウンロードして開き、インストール手順に従って実行します。

![](_media/designautomation/inventor/da4inventor_template.png)

## 新しいプロジェクトを作成する

ソリューションを右クリックし、**Add** >> **New Project** を選択します。**Inventor** テンプレートを検索し、次に **Plugin project** を検索して、最後に `UpdateIPTParam` という名前を付けます。プロジェクトを右クリックし、**Manage NuGet Packages...** に移動します。**Browse** で `Newtonsoft.Json` を選択して更新します(このパッケージは既にソリューション内にありますが、ない場合は、インストールします)。

> .NET Framework 4.7 を選択してください。リストに表示されない場合は、[Dev Pack](https://dotnet.microsoft.com/download/dotnet-framework/net47) をインストールしてください。

![](_media/designautomation/inventor/new_project.gif)

## SampleAutomation.cs

`SampleAutomation.cs` ファイルを開き、次の内容をコピーします。ここで、`Run` メソッドの下でパラメータが更新されます。

[SampleAutomation.cs](_snippets/modifymodels/engines/inventor/SampleAutomation.cs ':include :type=code csharp')

## ビルド後イベント

> Node.js の場合、AppBundle ZIP 出力フォルダを調整する必要があります。

ここで、.bundle フォルダを ZIP で圧縮する必要があります。プロジェクトを右クリックし、**Properties** を選択し、**Build Events** を開いて、次のコードを **Post-build event command line** フィールドにコピーします(下図を参照)。

```
xcopy /Y /F "$(ProjectDir)PackageContents.xml" "$(TargetDir)\Bundle\$(MSBuildProjectName).bundle\"
xcopy /Y /F "$(TargetDir)*.*" "$(TargetDir)\Bundle\$(MSBuildProjectName).bundle\Contents\"
del /F "$(ProjectDir)..\forgesample\wwwroot\bundles\UpdateIPTParam.zip"
"C:\Program Files\7-Zip\7z.exe" a -tzip "$(ProjectDir)../forgesample/wwwroot/bundles/UpdateIPTParam.zip" "$(TargetDir)\bundle\$(MSBuildProjectName).bundle\" -xr0!*.pdb
```

これにより、DLL が /bin/debug/ から .bundle/Contents フォルダにコピーされ、[7zip](https://www.7-zip.org/) を使用して zip が作成されます。最後に、ZIP を Web アプリの /bundles フォルダにコピーします。

![](_media/designautomation/inventor/post_build.png)

`UpdateIPTParam` プロジェクトをビルドすると、**Output** ウィンドウに次のように表示されます。2 つのフォルダと複数のファイルが圧縮されていることに注意してください。zip ファイルは、/wwwroot/bundles フォルダに直接作成されます。これは、操作が問題なく実行されていることを意味します。

![](_media/designautomation/inventor/build_output.png)

次の作業:[プラグインをアップロードする](designautomation/appbundle/common)