# 準備 AutoCAD 組合

此步驟將協助您建立用於 Design Automation 的基本 AutoCAD 外掛程式。如需更多資訊，請造訪[「我的第一個 AutoCAD 外掛程式」](https://knowledge.autodesk.com/support/autocad/learn-explore/caas/simplecontent/content/my-first-autocad-plug-overview.html)自學課程。

> 您可以[下載組合 ZIP](https://github.com/Autodesk-Forge/learn.forge.designautomation/raw/master/forgesample/wwwroot/bundles/UpdateDWGParam.zip) 至 `bundles/` (Node.js) 或 `/forgeSample/wwwroot/bundles` (.NET Core) 資料夾中，並[略過本節](/zh-TW/designautomation/appbundle/common.md)

## 建立新專案

在解決方案上按一下右鍵，選取 **Add** >> **New Project**。選取 **Windows Desktop**，然後選取 **Class Library**，最後將其命名為 `UpdateDWGParam`。然後，在專案上按一下右鍵，移往 **Manage NuGet Packages...**，可以在 **Browse** 下搜尋 **AutoCAD.NET** 並安裝 `AutoCAD.NET.Core` (一併安裝 `AutoCAD.NET.Model`)。然後，搜尋並安裝 `Newtonsoft.Json` (用於剖析 JSON 格式的輸入資料)。

> 請選取 .NET Framework 4.7。如果未列示，[請安裝開發套件](https://dotnet.microsoft.com/download/dotnet-framework/net47)。

![](_media/designautomation/autocad/new_project.gif)

這樣一來，**package.config** 應如下所示。此範例使用的是版本 20，它應適用於所有可用版本。您可以調整至特定版本。 

[package.config](_snippets/modifymodels/engines/autocad/package.config ':include :type=code xml')

專案應包含 `Class1.cs` 類別，讓我們將檔案更名為 `Commands.cs` (為確保一致性)。 

## Commands.cs

這是將與 AutoCAD 一起執行的主程式碼。將以下內容複製到 `Commands.cs` 中。該類別包含一個自訂 AutoCAD 指令 `UpdateParam`，已定義為具有相同名稱的方法。此指令由 Design Automation 引擎呼叫，將在**「活動」**(本自學課程的下一步) 中指定

[Commands.cs](_snippets/modifymodels/engines/autocad/Commands.cs ':include :type=code csharp')

## PackageContents.xml

建立名為 `UpdateDWGParam.bundle` 的資料夾，並在其中建立名為 `PackageContents.xml` 的檔案，然後將以下內容複製到該檔案。如需瞭解更多資訊，請參閱[〈PackageContents.xml 格式參考〉](https://knowledge.autodesk.com/search-result/caas/CloudHelp/cloudhelp/2016/ENU/AutoCAD-Customization/files/GUID-BC76355D-682B-46ED-B9B7-66C95EEF2BD0-htm.html)。此檔案用於定義新的 AutoCAD 自訂指令 `UpdateParam`，該指令將在 Design Automation 執行時呼叫。

[PackageContents.xml](_snippets/modifymodels/engines/autocad/PackageContents.xml ':include :type=code xml')

最後，建立名為 `Contents` 的子資料夾並將其保留空白。此時，專案應如下所示：

![](_media/designautomation/autocad/bundle_folders.png)

## 建置後事件

> 對於 Node.js，需要調整 AppBundle ZIP 輸出資料夾。

現在，我們需要壓縮 .bundle 資料夾。在專案上按一下右鍵，選取 **Properties**，然後開啟 **Build Events**，並將以下內容複製到 **Post-build event command line** 欄位，如以下影像所示。

```
xcopy /Y /F "$(TargetDir)*.dll" "$(ProjectDir)UpdateDWGParam.bundle\Contents\"
del /F "$(ProjectDir)..\forgesample\wwwroot\bundles\UpdateDWGParam.zip"
"C:\Program Files\7-Zip\7z.exe" a -tzip "$(ProjectDir)../forgesample/wwwroot/bundles/UpdateDWGParam.zip" "$(ProjectDir)UpdateDWGParam.bundle\" -xr0!*.pdb
```

這會將 DLL 從 /bin/debug/ 複製到 .bundle/Contents 資料夾中，然後使用 [7zip](https://www.7-zip.org/) 建立 zip 檔案，最後將 zip 檔案複製到網頁應用程式的 /bundles 資料夾中。

![](_media/designautomation/autocad/post_build.png)

> 請注意**建置後事件**如何使用專案和資料夾名稱，以便確保您正在使用此名稱。

如果現在建置 `UpdateDWGParam` 專案，您應該會在 **Output** 視窗中看到類似下面的內容。請注意，已壓縮 2 個資料夾和 3 個檔案。zip 檔案會直接在 /wwwroot/bundles 資料夾中建立。這意味著您做得很好！

![](_media/designautomation/autocad/build_output.png)

接下來：[上傳外掛程式](/zh-TW/designautomation/appbundle/common)