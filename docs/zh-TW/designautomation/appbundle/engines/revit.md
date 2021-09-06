# 準備 Revit 組合

此步驟將協助您建立用於 Design Automation 的基本 Revit 外掛程式。如需更多資訊，請造訪[「我的第一個 Revit 外掛程式」](https://knowledge.autodesk.com/support/revit-products/learn-explore/caas/simplecontent/content/my-first-revit-plug-overview.html)自學課程。

> 您可以[下載組合 ZIP](https://github.com/Autodesk-Forge/learn.forge.designautomation/raw/master/forgesample/wwwroot/bundles/UpdateRVTParam.zip) 至 `bundles/` (Node.js) 或 `/forgeSample/wwwroot/bundles` (.NET Core) 資料夾中，並[略過本節](/zh-TW/designautomation/appbundle/common.md)

## 建立新專案

在解決方案上按一下右鍵，選取 **Add** >> **New Project**。選取 **Windows Desktop**，然後選取 **Class Library**，最後將其命名為 `UpdateRVTParam`。 

> 請選取 .NET Framework 4.8。如果未列示，[請安裝開發套件](https://dotnet.microsoft.com/download/dotnet-framework/net47)。

在 **References** 上按一下右鍵，然後按一下 **Add Reference** 和 **Browse** 以尋找 `RevitAPI.dll` (依預設，位於 _C:\Program Files\Autodesk\Revit 201x_ 資料夾下)。然後，在此 **RevitAPI** 參考上按一下右鍵，移往 **Properties**，然後將 **Copy Local** 設定為 **False**。

接著，在專案上按一下右鍵，移往 **Manage NuGet Packages...**，可以在 **Browse** 下搜尋 **DesignAutomation.Revit** 並安裝 `Autodesk.Forge.DesignAutomation.Revit` (選擇您需要的適當 Revit 版本)。然後，搜尋並安裝 `Newtonsoft.Json` (用於剖析 JSON 格式的輸入資料)。 

![](_media/designautomation/revit/new_project.gif)

[package.config](_snippets/modifymodels/engines/revit/package.config ':include :type=code xml')

專案應包含 `Class1.cs` 類別，讓我們將檔案更名為 `Commands.cs` (為確保一致性)。 

此時，專案應如下所示：

![](_media/designautomation/revit/project_files.png)

## Commands.cs

這是將與 Revit 一起執行的主程式碼。將以下內容複製到 `Commands.cs` 中。主要的關注點是 `DesignAutomationReadyEvent` 事件，該事件在應用程式準備執行時觸發。`HandleDesignAutomationReadyEvent` 將實作我們的自訂程式碼。

[Commands.cs](_snippets/modifymodels/engines/revit/Commands.cs ':include :type=code csharp')

## PackageContents.xml

建立名為 `UpdateRVTParam.bundle` 的資料夾，並在其中建立名為 `PackageContents.xml` 的檔案，然後將以下內容複製到該檔案。如需瞭解更多資訊，請參閱[〈PackageContents.xml 格式參考〉](https://knowledge.autodesk.com/search-result/caas/CloudHelp/cloudhelp/2016/ENU/AutoCAD-Customization/files/GUID-BC76355D-682B-46ED-B9B7-66C95EEF2BD0-htm.html)。此檔案會告知 Revit 載入我們的 `.addin` 外掛程式。

[PackageContents.xml](_snippets/modifymodels/engines/revit/PackageContents.xml ':include :type=code xml')

## Autodesk.Forge.Sample.DesignAutomation.Revit.addin

在 `UpdateRVTParam.bundle` 資料夾下，建立名為 `Contents` 的子資料夾，然後在此資料夾內建立名為 `Autodesk.Forge.Sample.DesignAutomation.Revit.addin` 的新檔案。這會告知 Revit 如何載入外掛程式。

[Autodesk.Forge.Sample.DesignAutomation.Revit.addin](_snippets/modifymodels/engines/revit/Autodesk.Forge.Sample.DesignAutomation.Revit.addin ':include :type=code xml')

此時，專案應如下所示：

![](_media/designautomation/revit/bundle_folders.png)

## 建置後事件

> 對於 Node.js，需要調整 AppBundle ZIP 輸出資料夾。

現在，我們需要壓縮 .bundle 資料夾。在專案上按一下右鍵，選取 **Properties**，然後開啟 **Build Events**，並將以下內容複製到 **Post-build event command line** 欄位，如以下影像所示。

```
xcopy /Y /F "$(TargetDir)*.dll" "$(ProjectDir)UpdateRVTParam.bundle\Contents\"
del /F "$(ProjectDir)..\forgesample\wwwroot\bundles\UpdateRVTParam.zip"
"C:\Program Files\7-Zip\7z.exe" a -tzip "$(ProjectDir)../forgesample/wwwroot/bundles/UpdateRVTParam.zip" "$(ProjectDir)UpdateRVTParam.bundle\" -xr0!*.pdb
```

這會將 DLL 從 /bin/debug/ 複製到 .bundle/Contents 資料夾中，然後使用 [7zip](https://www.7-zip.org/) 建立 zip 檔案，最後將 zip 檔案複製到網頁應用程式的 /bundles 資料夾中。

![](_media/designautomation/revit/post_build.png)

> 請注意**建置後事件**如何使用專案和資料夾名稱，以便確保您正在使用此名稱。

如果現在建置 `UpdateRVTParam` 專案，您應該會在 **Output** 視窗中看到類似下面的內容。請注意，已壓縮 2 個資料夾和 3 個檔案。zip 檔案會直接在 /wwwroot/bundles 資料夾中建立。這意味著您做得很好！

![](_media/designautomation/revit/build_output.png)

!> 如果建置輸出展示的已複製項目超過 **2 個資料夾、5 個檔案**，請返回並確保 **RevitAPI** 參考已設定為 **Copy Local**:**False**。您可能需要從 `UpdateRVTParam.bundle/Contents/` 資料夾中移除所有 DLL

接下來：[上傳外掛程式](/zh-TW/designautomation/appbundle/common)