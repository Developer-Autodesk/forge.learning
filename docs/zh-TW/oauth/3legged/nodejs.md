# 驗證 (Node.js)

就基本的 *OAuth* 實作而言，我們需要 2 個檔案。

## routes/oauth.js

建立 `routes/oauth.js` 檔案。此檔案將負責為 OAuth 相關端點建立快速路由器。

[routes/oauth.js](_snippets/viewhubmodels/node/routes/oauth.js ':include :type=code javascript')

## routes/common/oauth.js

現在，請在 `routes` 資料夾中建立 `common` 子資料夾，然後準備一個會實際向 Forge 請求存取記號的 `routes/common/oauth.js` 檔案。這將會重複用於本自學課程的其他部分。

[routes/common/oauth.js](_snippets/viewhubmodels/node/routes/common/oauth.js ':include :type=code javascript')

此程式碼將在階段作業 (Cookie 型) 中儲存這兩種**存取記號**並加上**重新整理記號**和**到期時間**。階段作業到期後，就會使用重新整理記號請求 2 個新的存取記號 (內部記號和公開記號)。 

!> 我們的伺服器僅以 `https` 存取權指定，且 Cookie 只能由用戶端和伺服器讀取。 

接下來：[列出中樞與專案](/zh-TW/datamanagement/hubs/readme)