# 3ds Maxバンドルを準備する

この手順は、設計の自動化のための基本的な3ds Maxプラグインを作成する場合に役立ちます。3ds Maxのプラグインを含むチュートリアル全体では、Microsoft .NETフレームワークを使用します。3ds Maxは、MAXScript、Python、NET API、およびC++によって自動化できます。3ds Max .NET APIはプラグインで最も使用されるとは限りませんが、他のDesign Automatio製品では一般的なAPIです。.NET API 用 3ds Max リソースは、次の場所にあります(2019 のリンクですが、.NET API は 3ds Max Design Automation エンジンの使用可能なバージョンすべてに対応しています)。 * [3ds Max .NET プラグインの作成](http://help.autodesk.com/view/3DSMAX/2019/ENU/?guid=__developer_3ds_max_sdk___the_learning_path_lesson_7_writing__net_plug_ins_html) * [3ds Max .NET SDK](http://help.autodesk.com/view/3DSMAX/2019/ENU/?guid=__developer_3ds_max__net_sdk_html) * [GetCOREINTERFACE ブログNET サンプル ](https://getcoreinterface.typepad.com/blog/2017/10/updated-net-api-samples-for-3ds-max-2018.html)

設計の自動化では、自動化できないUIやプロンプトは表示されないことに注意してください。3ds Max DAエンジンを自動化するには、MAXScriptをいくつか指定する必要があります。ほとんどのカスタマイズは MAXScript にすばやく公開できるため、通常これは非常に簡単です([C++](http://help.autodesk.com/view/3DSMAX/2019/ENU/?guid=__developer_3ds_max_sdk_features_function_publishing_html) および [MAXScript .NET の処理](http://help.autodesk.com/view/3DSMAX/2019/ENU/?guid=GUID-779FD7AC-953D-4567-B2A8-60B1D8695B95)を参照)

> バンドル ZIP  を [`bundles/` (Node.js) または `/forgeSample/wwwroot/bundles` (.NET Core) フォルダに [このセクションをスキップ](/ja_jp/designautomation/appbundle/common.md)できます

## 新しい.NETプロジェクトを作成する

ソリューションを右クリックし、**追加 ** >> **新規プロジェクト ** を選択します。**Windows デスクトップ**、次に **クラス ライブラリ**を選択し、最後に `UpdateMAXParam` という名前を付けます。その後、Autodesk.Max.Dllマネージアセンブリ(3ds Max .NET APIコアモジュール)を参照する必要があります。このモジュールは3dsmax.exeフォルダにあります。参照時には、「Copy Local」フラグをオフにしてください。.NET API のサポートに使用されるその他のモジュールがいくつかあります([3ds Max .NET SDK](http://help.autodesk.com/view/3DSMAX/2019/ENU/?guid=__developer_3ds_max__net_sdk_html) を参照)が、このチュートリアルでは Autodesk.Max.dll のみを使用します。次に、`Newtonsoft.Json` (JSON形式の入力データを解析するために使用される)を検索してインストールします。

> .NET Framework 4.7を選択してください。リストに表示されない場合は、[Dev Pack ](https://dotnet.microsoft.com/download/dotnet-framework/net47) をインストールしてください。

![](_media/designautomation/max/new_project.gif)

その結果、**package.config** は Newtonsoft.Json モジュールでは次のようになります。

[package.config](_snippets/modifymodels/engines/max/package.config ':include :type=code xml')

プロジェクトには`Class1.cs`クラスが含まれている必要があります。整合性を保つため、ファイルの名前を`Command.cs` (meta id="1" />)に変更します。 

## Commands.cs

これは3ds Maxで実行されるメインコードです。次の内容を`Command.cs`にコピーします。設計オートメーション処理を処理するクラスは3つあります。1つは、JSON入力データとのインタフェースに使用される`InputParams`です。次に、シーンの反復とすべての開き窓の検索に使用される`ParameterChanger`クラスです(ただし、クラスIDで識別される任意のオブジェクトタイプも可能です)。最後に、`RuntimeExecute`を使用して入力を取得し、自動化を駆動します。また、設計オートメーションコンソールに情報を出力する専用のログ機能もあります。LogTrace関数を参照してください。この場合、`ILogSys` 3ds Maxマネージクラスが使用されます。また、示された`LogEntry` APIで使用されるフラグは、出力をデザインオートメーションコンソールに表示するために必要です。 

[Commands.cs](_snippets/modifymodels/engines/max/Commands.cs ':include :type=code csharp')

## PackageContents.xml

`UpdateMAXParam.bundle`という名前のフォルダを作成し、このフォルダ内に`PackageContents.xml`という名前のファイルを追加します。XMLセクションに以下にリストされているコンテンツをPackageContents.xmlファイルにコピーします。詳細については、[PackageContents.xml 形式リファレンス](https://knowledge.autodesk.com/search-result/caas/CloudHelp/cloudhelp/2016/ENU/AutoCAD-Customization/files/GUID-BC76355D-682B-46ED-B9B7-66C95EEF2BD0-htm.html)を参照してください。3ds Max プラグインのパッケージ化に関する 3ds Max 固有の情報の詳細については、[パッケージ プラグイン](http://help.autodesk.com/view/3DSMAX/2019/ENU/?guid=__developer_writing_plug_ins_packaging_plugins_html)を参照してください

このファイルは、ロードするモジュールを3ds Maxに指示します(この場合、作成している.NET APIプラグインアセンブリですが、MAXScript、Python、C++プラグインを含めることもできます)。 プラグインはこの機能を介してロードされるため、自動化ジョブをトリガするための指示に注意するだけで済みます。3ds Maxでコードを正しくロードするには、ProductCodeとUpgradeCodeの両方に対して一意のIDが必要です。詳細については、上記のドキュメントを参照してください。

[PackageContents.xml](_snippets/modifymodels/engines/max/PackageContents.xml ':include :type=code xml')

最後に、`Contents`という名前のサブフォルダを作成し、空のままにします。この時点で、プロジェクトは次のようになります。

![](_media/designautomation/max/bundle_folders.png)

## ビルド後イベント

> Node.jsの場合、AppBundle ZIP出力フォルダを調整する必要があります。

ここで、.bundleフォルダをZIPで圧縮する必要があります。プロジェクトを右クリックし、**プロパティ**を選択し、**Build Events** を開いて、次のコードを **Post-build event command line** フィールドにコピーします(下図を参照)。

```
xcopy /Y /F "$(TargetDir)*.dll" "$(ProjectDir)UpdateMAXParam.bundle\Contents\"
del /F "$(ProjectDir)..\forgesample\wwwroot\bundles\UpdateMAXParam.zip"
"C:\Program Files\7-Zip\7z.exe" a -tzip "$(ProjectDir)../forgesample/wwwroot/bundles/UpdateMAXParam.zip" "$(ProjectDir)UpdateMAXParam.bundle\" -xr0!*.pdb
```

これにより、DLL が /bin/debug/ から .bundle/Contents フォルダにコピーされ、[7zip](https://www.7-zip.org/) を使用して zip が作成されます。最後に、ZIP を Web アプリの /bundles フォルダにコピーします。

![](_media/designautomation/max/post_build.png)
> **ビルド後イベント**ではプロジェクト名とフォルダ名がどのように使用されるかに注意してください。したがって、これらの名前を使用していることを確認してください。

`UpdateMAXParam` プロジェクトを構築すると、**出力(Output)**ウィンドウに次のように表示されます。2つのフォルダと3つのファイルが圧縮されていることに注意してください。zipファイルは、/wwwroot/bundlesフォルダに直接作成されます。これは、素晴らしいパフォーマンスを実現していることを意味します。

![](_media/designautomation/max/build_output.png)

この時点で、3ds Maxバッチツールを使用して機能をテストすることができます。3ds Max Designオートメーションエンジンと同様に動作し、Forge DAクラウドサービスにジョブを送信する前に、すべての自動化をローカルでテストする場合に適しています。MAXScript環境で.NETクラスをインスタンス化するには、`dotNetClass` MAXScript関数を使用します。このサンプルプロジェクトでは、MAXScriptコードは次のようになります。

```MAXScript
fn UpdateParam =
(
	da = dotNetClass("Autodesk.Forge.Sample.DesignAutomation.Max.RuntimeExecute")
	da.ModifyWindowWidthHeight()
)

UpdateParam()
```

これをローカルで実行するには、次のようなコマンドラインプロンプトをテストします。
```CommandLine
"%ADSK_3DSMAX_x64_2019%\3dsmaxbatch.exe" -sceneFile <myTestScene>.max da_script.ms
```
このチュートリアルの後半では、3ds Max Designオートメーションエンジンに送信されるのと同じ手順を確認します。

次へ:[プラグインをアップロード](/ja_jp/designautomation/appbundle/common)