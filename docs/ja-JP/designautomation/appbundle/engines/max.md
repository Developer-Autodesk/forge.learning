# 3ds Max バンドルを準備する

この手順では、Design Automation のための基本的な 3ds Max プラグインを作成します。3ds Max のプラグインを含むチュートリアル全体で、Microsoft .NET Framework を使用します。3ds Max は、MAXScript、Python、NET API、および C++ によって自動化できます。3ds Max .NET API はプラグインで最も使用されているとは限りませんが、他の Design Automation 製品では一般的な API です。.NET API 用 3ds Max リソースは、次の場所にあります(2019 のリンクですが、.NET API は 3ds Max Design Automation エンジンの使用可能なバージョンすべてに対応しています)。 * [3ds Max .NET プラグインの作成](http://help.autodesk.com/view/3DSMAX/2019/ENU/?guid=__developer_3ds_max_sdk___the_learning_path_lesson_7_writing__net_plug_ins_html) * [3ds Max .NET SDK](http://help.autodesk.com/view/3DSMAX/2019/ENU/?guid=__developer_3ds_max__net_sdk_html) * [GetCOREInterface Blog .NET サンプル](https://getcoreinterface.typepad.com/blog/2017/10/updated-net-api-samples-for-3ds-max-2018.html)

Design Automation の場合、自動化できない UI やプロンプトがないようにする必要があります。3ds Max DA エンジンを自動化するには、いくつかの MAXScript を指定する必要があります。ほとんどのカスタマイズは MAXScript にすばやく公開できるため、通常これは非常に簡単です(「[C++ の関数の公開](http://help.autodesk.com/view/3DSMAX/2019/ENU/?guid=__developer_3ds_max_sdk_features_function_publishing_html)」および「[MAXScript .NET の処理](http://help.autodesk.com/view/3DSMAX/2019/ENU/?guid=GUID-779FD7AC-953D-4567-B2A8-60B1D8695B95)」を参照)

> `bundles/` (Node.js)または `/forgeSample/wwwroot/bundles` (.NET Core)に[バンドル ZIP をダウンロード](https://github.com/Autodesk-Forge/learn.forge.designautomation/raw/master/forgesample/wwwroot/bundles/UpdateMAXParam.zip)してある場合は、[このセクションをスキップ](/ja-JP/designautomation/appbundle/common.md)して構いません。

## 新しい .NET プロジェクトを作成する

ソリューションを右クリックし、**Add** >> **New Project** を選択します。**Windows Desktop**、次に **Class Library** を選択し、最後に `UpdateMAXParam` という名前を付けます。次に、Autodesk.Max.Dll で管理されるアセンブリ(3ds Max .NET API コア モジュール)を参照する必要があります。このモジュールは 3dsmax.exe フォルダにあります。参照時には、「Copy Local」フラグをオフにしてください。.NET API のサポートに使用されるその他のモジュールがいくつかあります(「[3ds Max .NET SDK](http://help.autodesk.com/view/3DSMAX/2019/ENU/?guid=__developer_3ds_max__net_sdk_html)」を参照)。ただし、このチュートリアルでは Autodesk.Max.dll のみを使用します。次に、`Newtonsoft.Json` (JSON 形式の入力データを解析するために使用される)を検索してインストールします。

> .NET Framework 4.7 を選択してください。リストに表示されない場合は、[Dev Pack](https://dotnet.microsoft.com/download/dotnet-framework/net47) をインストールしてください。

![](_media/designautomation/max/new_project.gif)

その結果、**package.config** は Newtonsoft.Json モジュールでは次のようになります。

[package.config](_snippets/modifymodels/engines/max/package.config ':include :type=code xml')

プロジェクトには `Class1.cs` クラスが含まれている必要があります。ファイルの名前を `Command.cs` に変更します(整合性を保つため)。 

## Commands.cs

これは 3ds Max で実行されるメイン コードです。次の内容を `Command.cs` にコピーします。Design Automation 処理を扱うクラスは 3 つあります。まず、JSON 入力データとのインタフェースに使用される `InputParams` です。次に、シーンの反復とすべての開き窓の検索に使用される `ParameterChanger` クラスです(ただし、クラス ID で識別される任意のオブジェクトタイプも可能です)。最後に、入力を取得し自動化を駆動する `RuntimeExecute` です。また、Design Automation コンソールに情報を出力する特殊なログ機能もあります。LogTrace 関数を参照してください。この場合、`ILogSys` 3ds Max で管理されるクラスが使用されます。また、出力を Design Automation コンソールに表示するためには、示された `LogEntry` API で使用されるフラグが必要です。 

[Commands.cs](_snippets/modifymodels/engines/max/Commands.cs ':include :type=code csharp')

## PackageContents.xml

`UpdateMAXParam.bundle` という名前のフォルダを作成し、このフォルダ内に `PackageContents.xml` という名前のファイルを追加します。XML セクションで以下にリストされているコンテンツを PackageContents.xml ファイルにコピーします。詳細については、「[PackageContents.xml フォーマットのリファレンス](https://knowledge.autodesk.com/search-result/caas/CloudHelp/cloudhelp/2016/ENU/AutoCAD-Customization/files/GUID-BC76355D-682B-46ED-B9B7-66C95EEF2BD0-htm.html)」を参照してください。3ds Max プラグインのパッケージに関する 3ds Max 固有の情報の詳細については、「[パッケージ プラグイン](http://help.autodesk.com/view/3DSMAX/2019/ENU/?guid=__developer_writing_plug_ins_packaging_plugins_html)」を参照してください

このファイルは、ロードするモジュールを 3ds Max に指示します(この場合は、作成している .NET API プラグイン アセンブリですが、MAXScript、Python、C++ プラグインを含めることもできます)。 プラグインはこの機能を介してロードされるため、自動化ジョブをトリガするための指示に注意すれば十分です。3ds Max でコードを正しくロードするには、ProductCode と UpgradeCode の両方に対して一意の ID が必要です。詳細については、上記のドキュメントを参照してください。

[PackageContents.xml](_snippets/modifymodels/engines/max/PackageContents.xml ':include :type=code xml')

最後に、`Contents` という名前のサブフォルダを作成し、空のままにします。この時点で、プロジェクトは次のようになります。

![](_media/designautomation/max/bundle_folders.png)

## ビルド後イベント

> Node.js の場合、AppBundle ZIP 出力フォルダを調整する必要があります。

ここで、.bundle フォルダを ZIP で圧縮する必要があります。プロジェクトを右クリックし、**Properties** を選択し、**Build Events** を開いて、次のコードを **Post-build event command line** フィールドにコピーします(下図を参照)。

```
xcopy /Y /F "$(TargetDir)*.dll" "$(ProjectDir)UpdateMAXParam.bundle\Contents\"
del /F "$(ProjectDir)..\forgesample\wwwroot\bundles\UpdateMAXParam.zip"
"C:\Program Files\7-Zip\7z.exe" a -tzip "$(ProjectDir)../forgesample/wwwroot/bundles/UpdateMAXParam.zip" "$(ProjectDir)UpdateMAXParam.bundle\" -xr0!*.pdb
```

これにより、DLL が /bin/debug/ から .bundle/Contents フォルダにコピーされ、[7zip](https://www.7-zip.org/) を使用して zip が作成されます。最後に、ZIP を Web アプリの /bundles フォルダにコピーします。

![](_media/designautomation/max/post_build.png)
> **ビルド後イベント**でプロジェクト名とフォルダ名がどのように使用されるかに注意してください。これらの名前を使用していることを確認してください。

`UpdateMAXParam` プロジェクトをビルドすると、**Output** ウィンドウに次のように表示されます。2 つのフォルダと 3 つのファイルが圧縮されていることに注意してください。zip ファイルは、/wwwroot/bundles フォルダに直接作成されます。これは、操作が問題なく実行されていることを意味します。

![](_media/designautomation/max/build_output.png)

この時点で、3ds Max バッチ ツールを使用して機能をテストすることができます。3ds Max Design Automation エンジンと同様に動作し、Forge DA クラウド サービスにジョブを送信する前に、すべての自動化をローカルでテストする場合に適しています。MAXScript 環境で .NET クラスをインスタンス化するには、`dotNetClass` MAXScript 関数を使用します。このサンプル プロジェクトでは、MAXScript コードは次のようになります。

```MAXScript
fn UpdateParam =
(
	da = dotNetClass("Autodesk.Forge.Sample.DesignAutomation.Max.RuntimeExecute")
	da.ModifyWindowWidthHeight()
)

UpdateParam()
```

これをローカルで実行するには、次のようなコマンドライン プロンプトをテストすることができます。
```CommandLine
"%ADSK_3DSMAX_x64_2019%\3dsmaxbatch.exe" -sceneFile <myTestScene>.max da_script.ms
```
このチュートリアルの後半では、3ds Max Design Automation エンジンに送信されるのと同じこれらの手順を確認します。

次の作業:[プラグインをアップロードする](/ja-JP/designautomation/appbundle/common)