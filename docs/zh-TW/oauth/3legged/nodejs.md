# 驗證 (Node.js)

就基本的 *OAuth* 實作而言，我們需要 2 個檔案。

## routes/oauth.js

建立 `routes/oauth.js` 檔案。此檔案將負責為 OAuth 相關 endpoint 建立快速路由器。

[routes/oauth.js](_snippets/viewhubmodels/node/routes/oauth.js ':include :type=code javascript')

## routes/common/oauth.js

現在，請在 `routes` 資料夾中建立 `common` 子資料夾，然後準備一個會實際向 Forge 請求 access token 的 `routes/common/oauth.js` 檔案。這將會重複用於本自學課程的其他部分。

[routes/common/oauth.js](_snippets/viewhubmodels/node/routes/common/oauth.js ':include :type=code javascript')

此程式碼將在階段作業 (Cookie 型) 中儲存這兩種 **access token** 並加上**重新整理 token** 和**到期時間**。階段作業到期後，就會使用重新整理 token 請求 2 個新的 access token (內部 token 和公開 token)。 

!> 我們的伺服器僅以 `https` 存取權指定，且 Cookie 只能由用戶端和伺服器讀取。 

下一步：[列出中樞與專案](/zh-TW/datamanagement/hubs/readme)