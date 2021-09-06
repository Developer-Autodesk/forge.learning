# 準備外掛程式

Design Automation 正如 Autodesk App Store 一樣使用 .bundle，這意味著您需要建立 `PackageContents.xml` 和包含 `DLL` (以及其他所需檔案) 的 ZIP 檔。如需有關如何建立這些檔案的詳細資訊，請造訪 [Autodesk App Store 開發中心](https://www.autodesk.com/developer-network/app-store)。

在本節中，我們將建立用於更新 `width` 和 `height` 參數的基本外掛程式，並儲存產生的檔案。還有支援檔案 (`PackageContents.xml`) 和放置這些檔案的資料夾結構。最後，建立一個可以上傳至 Design Automation 的 .ZIP 檔案。

### 必備條件

- **7zip**：用於建立包含組合檔案的 .ZIP，請[從此處](https://www.7-zip.org/)進行安裝。本自學課程假設 **7zip** 安裝在預設資料夾中：_C:\\Program Files\\7-Zip\\7z.exe_。

### 其他必備條件 

在下一個階段作業中，您可以使用建置前外掛程式。或者，如果您決定建置它，您將需要：

- **Visual Studio**：需要 Visual Studio 2017 或更新版本，請造訪[此連結](https://visualstudio.microsoft.com/vs/)。

- **AutoCAD、Inventor、Revit 或 3ds Max**：為了對 Design Automation 外掛程式進行開發、測試和除錯：[AutoCAD](https://www.autodesk.com/products/autocad/overview) | [Inventor](https://www.autodesk.com/products/inventor/overview) | [Revit](https://www.autodesk.com/products/revit/overview) | [3ds Max](https://www.autodesk.com/products/3ds-max/overview)。

***

在下一步中，選擇 **Engine**，這是將執行外掛程式的 Autodesk 應用程式。您將需要安裝相應的應用程式，才能在本端進行編譯、除錯和測試。

選擇引擎：[AutoCAD](/zh-TW/designautomation/appbundle/engines/autocad) | [Inventor](/zh-TW/designautomation/appbundle/engines/inventor) | [Revit](/zh-TW/designautomation/appbundle/engines/revit) | [3ds Max](/zh-TW/designautomation/appbundle/engines/max)