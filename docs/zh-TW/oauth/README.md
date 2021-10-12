# OAuth

OAuth (或是 OAuth 2.0)，是一種開放標準，Forge 平台使用它來實作 以 token 為基礎的驗證和授權。

## 2 條腿和 3 條腿

請參閱[「檢視模型」](/zh-TW/tutorials/viewmodels)章節以了解[「2 條腿的 OAuth 工作流程」](https://forge.autodesk.com/en/docs/oauth/v2/tutorials/get-2-legged-token/)的細節，以及參閱[「檢視 BIM 360 和 Fusion 模型」](/zh-TW/tutorials/viewhubmodels)章節了解[「3 條腿的 OAuth 工作流程」](https://forge.autodesk.com/en/docs/oauth/v2/tutorials/get-3-legged-token/)。

## 範圍

範圍是一項設在 token 上的權限，代表該 token 可作用的環境。例如，包含 _data:read_ 範圍的 token 表示該 token 可用來讀取 Forge 平台裡的資料，並可使用於標示需要此範圍的 API endpoint。如您所使用的 Token 沒有包含該 API endpoint 所需的 OAuth 範圍，則該 API 存取將被拒絕(請參閱各 Forge API endpoint 的說明文件瞭解其所需要的 OAuth 範圍)。

範圍具有兩項主要功能：

- **隱私權和控制**：在 3 條腿的環境中，範圍擔任了一種機制，以供請求、保護代表使用者以指定方式行動的權限。
- **安全**：無論是在 2 條腿還是 3 條腿的環境中，範圍都可確保萬一您對自己的token失去控制，該 Token 無法被濫用來存取其原未意欲用來存取的資源。

[瞭解更多](https://forge.autodesk.com/en/docs/oauth/v2/overview/scopes/)

## 公開 token 和內部 token

此自學課程將使用 2 種 access token：公開 token 和內部 token。**公開** token 是用於 Forge Viewer，它是在用戶端的瀏覽器上執行的程式庫，也需要 access token 來存取模型，但我們又不想給予太多存取權限，所以因應這特殊的需求，我們使用 **viewables:read** 這個範圍。 

現在在伺服器端，我們需要有寫入存取權，因此**內部** token 將使用 **bucket:create**、**bucket:read**、**data:read**、**data:create** 與 **data:write** 範圍。

> 不知道該看哪個自學課程來操作嗎？ 
> 
> 請回答以下問題：您要存取及檢視的檔案是位於何處？ 
> 
> 如果是位於您的電腦或其他位置，則為**檢視模型**。如果模型是位於任何 BIM 360 (Team、Design 或 Docs) 或 Fusion Team，則為**檢視 BIM 360 與 Fusion 模型**。
>
> 如果是要修改模型，那不用說，請查看**修改模型**自學課程。

下一步：[檢視您的模型](/zh-TW/tutorials/viewmodels)或[檢視 BIM 360 與 Fusion 模型](/zh-TW/tutorials/viewhubmodels)，或是[修改模型](/zh-TW/tutorials/modifymodels)