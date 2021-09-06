# 驗證 (Node.js)

就基本的 *OAuth* 實作而言，我們需要 2 個檔案。

## routes/oauth.js

建立 `routes/oauth.js` 檔案。此檔案將負責為 OAuth 相關端點建立快速路由器。

[routes/oauth.js](_snippets/viewmodels/node/routes/oauth.js ':include :type=code javascript')

## routes/common/oauth.js

現在，請在 `routes` 資料夾中建立 `common` 子資料夾，然後準備一個會實際向 Forge 請求存取記號的 `routes/common/oauth.js` 檔案。這將會重複用於本自學課程的其他部分。

[routes/common/oauth.js](_snippets/viewmodels/node/routes/common/oauth.js ':include :type=code javascript')

為避免每次一有終端使用者請求，就得取得新的存取記號，造成延遲時間無謂增加，讓我們將這些記號快取在全域變數中。請注意，過了 `expires_in` 秒之後，我們仍需重新整理這些記號。

!> 在此情況下，只能讓使用者共用存取記號，也就是說，所有使用者都會存取相同資訊 (2 腳型)。如果您的應用程式需要使用個別使用者特有的資料 (3 腳型)，**切勿**使用此方法。

接下來：[將檔案上傳到 OSS](/zh-TW/datamanagement/oss/)