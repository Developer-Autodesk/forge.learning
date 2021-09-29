# 準備 Inventor 組合

此步驟將協助您建立基本 Inventor 外掛程式。如需更多資訊，請造訪[「我的第一個 Inventor 外掛程式」](https://knowledge.autodesk.com/support/inventor-products/learn-explore/caas/simplecontent/content/my-first-inventor-plug-overview.html)自學課程。

> 您可以[下載組合 ZIP](https://github.com/Autodesk-Forge/learn.forge.designautomation/raw/master/forgesample/wwwroot/bundles/UpdateIPTParam.zip) 至 `bundles/` (Node.js) 或 `/forgeSample/wwwroot/bundles` (.NET Core) 資料夾中，並[略過本節](/zh-TW/designautomation/appbundle/common.md)

## 事前准备

- **Design Automation for Inventor** 樣板：移往 Visual Studio 市場，從[此連結](https://marketplace.visualstudio.com/items?itemName=Autodesk.DesignAutomation)下載並開啟它，然後遵循步驟進行安裝。

![](_media/designautomation/inventor/da4inventor_template.png)

## 建立新專案

在解決方案上按一下右鍵，選取 **Add** >> **New Project**。搜尋 **Inventor** 樣板，然後搜尋 **Plugin project**，最後將其命名為 `UpdateIPTParam`。在專案上按一下右鍵，移往 **Manage NuGet Packages...**，可以在 **Browse** 下選取 `Newtonsoft.Json` 並更新 (此套件已在解決方案中，若非如此，則進行安裝)

> 請選取 .NET Framework 4.7。如果未條列，[請安裝開發套件](https://dotnet.microsoft.com/download/dotnet-framework/net47)。

![](_media/designautomation/inventor/new_project.gif)

## SampleAutomation.cs

開啟 `SampleAutomation.cs` 檔案，並將以下內容複製到該檔案。將會在此處按照 `Run` 方法更新參數。

[SampleAutomation.cs](_snippets/modifymodels/engines/inventor/SampleAutomation.cs ':include :type=code csharp')

## 建置後事件

> 對於 Node.js，需要調整 AppBundle ZIP 輸出資料夾。

現在，我們需要壓縮 .bundle 資料夾。在專案上按一下右鍵，選取 **Properties**，然後開啟 **Build Events**，並將以下內容複製到 **Post-build event command line** 欄位，如以下影像所示。

```
xcopy /Y /F "$(ProjectDir)PackageContents.xml" "$(TargetDir)\Bundle\$(MSBuildProjectName).bundle\"
xcopy /Y /F "$(TargetDir)*.*" "$(TargetDir)\Bundle\$(MSBuildProjectName).bundle\Contents\"
del /F "$(ProjectDir)..\forgesample\wwwroot\bundles\UpdateIPTParam.zip"
"C:\Program Files\7-Zip\7z.exe" a -tzip "$(ProjectDir)../forgesample/wwwroot/bundles/UpdateIPTParam.zip" "$(TargetDir)\bundle\$(MSBuildProjectName).bundle\" -xr0!*.pdb
```

這會將 DLL 從 /bin/debug/ 複製到 .bundle/Contents 資料夾中，然後使用 [7zip](https://www.7-zip.org/) 建立 zip 檔案，最後將 zip 檔案複製到網頁應用程式的 /bundles 資料夾中。

![](_media/designautomation/inventor/post_build.png)

如果現在建置 `UpdateIPTParam` 專案，您應該會在 **Output** 視窗中看到類似下面的內容。請注意，已壓縮 2 個資料夾和數個檔案。zip 檔案會直接在 /wwwroot/bundles 資料夾中建立。這意味著您做得很好！

![](_media/designautomation/inventor/build_output.png)

下一步：[上傳外掛程式](/zh-TW/designautomation/appbundle/common)