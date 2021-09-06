# 準備 3ds Max 組合

此步驟將協助您建立用於 Design Automation 的基本 3ds Max 外掛程式。整個自學課程均使用 Microsoft .NET Framework，包括 3ds Max 外掛程式。請注意，3ds Max 可以透過 MAXScript、Python、NET API 和 C++ 自動執行。3ds Max .NET API 可能不是外掛程式最常用的 API，但是，對於其他設計自動化產品，它是典型的 API。可在此處找到 .NET API 的 3ds Max 資源 (2019 連結，但 3ds Max Design Automation 引擎的所有可用版本均支援 .NET API)：* [編寫 3ds Max .NET 外掛程式](http://help.autodesk.com/view/3DSMAX/2019/ENU/?guid=__developer_3ds_max_sdk___the_learning_path_lesson_7_writing__net_plug_ins_html) * [3ds Max .NET SDK](http://help.autodesk.com/view/3DSMAX/2019/ENU/?guid=__developer_3ds_max__net_sdk_html) * [GetCOREInterface 部落格 .NET 範例](https://getcoreinterface.typepad.com/blog/2017/10/updated-net-api-samples-for-3ds-max-2018.html)

請記住，對於 Design Automation，不應有無法自動執行的使用者介面或提示。若要自動執行 3ds Max DA 引擎，則必須提供一些 MAXScript。這通常非常容易，因為大多數自訂可以快速向 MAXScript 公開 (請參閱 [C++ 函式發佈](http://help.autodesk.com/view/3DSMAX/2019/ENU/?guid=__developer_3ds_max_sdk_features_function_publishing_html)和 [MAXScript .NET 處理](http://help.autodesk.com/view/3DSMAX/2019/ENU/?guid=GUID-779FD7AC-953D-4567-B2A8-60B1D8695B95))

> 您可以[下載組合 ZIP](https://github.com/Autodesk-Forge/learn.forge.designautomation/raw/master/forgesample/wwwroot/bundles/UpdateMAXParam.zip) 至 `bundles/` (Node.js) 或 `/forgeSample/wwwroot/bundles` (.NET Core) 資料夾中，並[略過本節](/zh-TW/designautomation/appbundle/common.md)

## 建立新 .NET 專案

在解決方案上按一下右鍵，選取 **Add** >> **New Project**。選取 **Windows Desktop**，然後選取 **Class Library**，最後將其命名為 `UpdateMAXParam`。然後，您將需要參考 Autodesk.Max.Dll 管理的組合 (3ds Max .NET API 核心模組)。此模組位於 3dsmax.exe 資料夾中，參考時，請務必關閉「Copy Local」旗標。還有一些其他模組用於 .NET API 支援 (請參閱 [3ds Max .NET SDK ](http://help.autodesk.com/view/3DSMAX/2019/ENU/?guid=__developer_3ds_max__net_sdk_html))，但在此自學課程中我們將僅使用 Autodesk.Max.dll。然後，搜尋並安裝 `Newtonsoft.Json` (用於剖析 JSON 格式的輸入資料)。

> 請選取 .NET Framework 4.7。如果未列示，[請安裝開發套件](https://dotnet.microsoft.com/download/dotnet-framework/net47)。

![](_media/designautomation/max/new_project.gif)

這樣一來，對於 Newtonsoft.Json 模組，**package.config** 應如下所示。

[package.config](_snippets/modifymodels/engines/max/package.config ':include :type=code xml')

專案應包含 `Class1.cs` 類別，讓我們將檔案更名為 `Command.cs` (為確保一致性)。 

## Commands.cs

這是將與 3ds Max 一起執行的主程式碼。將以下內容複製到 `Command.cs` 中。有三個類別用於進行 Design Automation 處理。第一個是 `InputParams`，將用於與 JSON 輸入資料進行連接。接下來是 `ParameterChanger` 類別，用於迭代場景，並尋找所有推開窗 (但可以是由類別 ID 識別的任何物件類型)。最後一個類別是 `RuntimeExecute`，用於取得輸入並推動自動化。另請注意，有專用記錄會將資訊輸出至 Design Automation 主控台。請參閱 LogTrace 函式。請注意，`ILogSys` 3ds Max 管理類別將用於此函數，而且需要與指示的 `LogEntry` API 一起使用的旗標，才能在 Design Automation 主控台中展示輸出。 

[Commands.cs](_snippets/modifymodels/engines/max/Commands.cs ':include :type=code csharp')

## PackageContents.xml

建立名為 `UpdateMAXParam.bundle` 的資料夾，並在此資料夾內加入名為 `PackageContents.xml` 的檔案。將 XML 區段中列示的內容複製到 PackageContents.xml 檔案中。如需瞭解更多資訊，請參閱[〈PackageContents.xml 格式參考〉](https://knowledge.autodesk.com/search-result/caas/CloudHelp/cloudhelp/2016/ENU/AutoCAD-Customization/files/GUID-BC76355D-682B-46ED-B9B7-66C95EEF2BD0-htm.html)。若要取得有關封裝 3ds Max 外掛程式的更多 3ds Max 特定資訊，請參閱[〈封裝外掛程式〉](http://help.autodesk.com/view/3DSMAX/2019/ENU/?guid=__developer_writing_plug_ins_packaging_plugins_html)

此檔案會告知 3ds Max 要載入的模組 (在此範例中即為我們正在建立的 .NET API 外掛程式組合，但也可以包括 MAXScript、Python 和/或 C++ 外掛程式)。 由於外掛程式是透過此功能載入的，因此您只需要關注指令觸發自動化工作即可。請注意，需要有 ProductCode 和 UpgradeCode 的唯一 ID，3ds Max 才能正確載入程式碼。請參閱上述文件以取得詳細資料。

[PackageContents.xml](_snippets/modifymodels/engines/max/PackageContents.xml ':include :type=code xml')

最後，建立名為 `Contents` 的子資料夾並將其保留空白。此時，專案應如下所示：

![](_media/designautomation/max/bundle_folders.png)

## 建置後事件

> 對於 Node.js，需要調整 AppBundle ZIP 輸出資料夾。

現在，我們需要壓縮 .bundle 資料夾。在專案上按一下右鍵，選取 **Properties**，然後開啟 **Build Events**，並將以下內容複製到 **Post-build event command line** 欄位，如以下影像所示。

```
xcopy /Y /F "$(TargetDir)*.dll" "$(ProjectDir)UpdateMAXParam.bundle\Contents\"
del /F "$(ProjectDir)..\forgesample\wwwroot\bundles\UpdateMAXParam.zip"
"C:\Program Files\7-Zip\7z.exe" a -tzip "$(ProjectDir)../forgesample/wwwroot/bundles/UpdateMAXParam.zip" "$(ProjectDir)UpdateMAXParam.bundle\" -xr0!*.pdb
```

這會將 DLL 從 /bin/debug/ 複製到 .bundle/Contents 資料夾中，然後使用 [7zip](https://www.7-zip.org/) 建立 zip 檔案，最後將 zip 檔案複製到網頁應用程式的 /bundles 資料夾中。

![](_media/designautomation/max/post_build.png)
> 請注意**建置後事件**如何使用專案和資料夾名稱，以便確保您正在使用這些名稱。

如果現在建置 `UpdateMAXParam` 專案，您應該會在 **Output** 視窗中看到類似下面的內容。請注意，已壓縮 2 個資料夾和 3 個檔案。zip 檔案會直接在 /wwwroot/bundles 資料夾中建立。這意味著您做得很好！

![](_media/designautomation/max/build_output.png)

此時，可以使用 3ds Max 批次工具測試功能。其運作方式與 3ds Max Design Automation 引擎類似，這是一個將工作傳送至 Forge DA 雲端服務之前在本端測試所有自動化的好方法。對於要在 MAXScript 環境中具現化的 .NET 類別，我們可以使用 `dotNetClass` MAXScript 函式。對於此範例專案，MAXScript 程式碼如下所示：

```MAXScript
fn UpdateParam =
(
	da = dotNetClass("Autodesk.Forge.Sample.DesignAutomation.Max.RuntimeExecute")
	da.ModifyWindowWidthHeight()
)

UpdateParam()
```

若要在本端執行此函數，我們可以在指令行提示中使用類似以下的內容執行測試：
```CommandLine
"%ADSK_3DSMAX_x64_2019%\3dsmaxbatch.exe" -sceneFile <myTestScene>.max da_script.ms
```
稍後在此自學課程中，您將看到這些相同的指令會傳送至 3ds Max Design Automation 引擎。

接下來：[上傳外掛程式](/zh-TW/designautomation/appbundle/common)