# OAuth

OAuth (特別是 OAuth2) 是整個 Forge 平台為了進行記號型驗證與授權而使用的開放式標準。

## 2 腳型與 3 腳型

進一步瞭解[檢視模型](/zh-TW/tutorials/viewmodels)自學課程中所使用的 [2 層工作流程](https://forge.autodesk.com/en/docs/oauth/v2/tutorials/get-2-legged-token/)，還有[檢視 BIM 360 與 Fusion 模型](/zh-TW/tutorials/viewhubmodels)自學課程中所使用的 [3 層工作流程](https://forge.autodesk.com/en/docs/oauth/v2/tutorials/get-3-legged-token/)。

## 範圍

範圍是一項設在記號上的權限，代表該記號可作用的環境。例如，設有 _data:read_ 範圍的記號可以讀取 Forge 生態系統內的資料，因此可用於需要該範圍的端點。未設該範圍的記號則會被拒絕存取此類端點。(個別端點參考頁面會列出所需的範圍。)

範圍具有兩項主要功能：

- **隱私權和控制**：在 3 腳型環境中，範圍擔任了一種機制，以供請求、保護代表使用者以指定方式行動的權限。
- **安全**：無論是在 2 腳型還是 3 腳型環境中，範圍都可確保萬一您對自己的記號失去控制，該記號無法被濫用來存取其原未意欲用來存取的資源。

[瞭解更多](https://forge.autodesk.com/en/docs/oauth/v2/overview/scopes/)

## 公開記號和內部記號

此自學課程將使用 2 種存取記號：公開記號和內部記號。**公開**記號是用在 Forge Viewer 中，因該程式在用戶端上執行，需要有存取記號。對於此情況，有個特殊的範圍：**viewables:read**。 

現在在伺服器端，我們需要有寫入存取權，因此**內部**記號將使用 **bucket:create**、**bucket:read**、**data:read**、**data:create** 與 **data:write** 範圍。

> 不知道該看哪個自學課程來操作嗎？ 
> 
> 請回答以下問題：您要存取及檢視的檔案是位於何處？ 
> 
> 如果是位於您的電腦或其他位置，則為**檢視模型**。如果模型是位於任何 BIM 360 (Team、Design 或 Docs) 或 Fusion Team，則為**檢視 BIM 360 與 Fusion 模型**。
>
> 如果是要修改模型，那不用說，請查看**修改模型**自學課程。

接下來：[檢視您的模型](/zh-TW/tutorials/viewmodels)或[檢視 BIM 360 與 Fusion 模型](/zh-TW/tutorials/viewhubmodels)，或是[修改模型](/zh-TW/tutorials/modifymodels)