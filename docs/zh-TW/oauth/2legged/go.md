# 驗證 (Go)


在驗證環境中，我們唯一需要為伺服器做的事，就是公開 `GET /api/forge/oauth/token` 端點，供前端用來請求設有 `viewables:read` 範圍的記號，以便在瀏覽器中顯示您可檢視的項目。

基於此目的，我們只需要一個檔案。

## oauth.go

建立 `/server/oauth.go` 檔案。此檔案將負責公開上述端點。 

[oauth.go](_snippets/viewmodels/go/oauth.go ':include :type=code go')

這將確保凡是對我們 oauth 的 `GET /api/forge/oauth/token` 呼叫，都將以下列形式傳回存取記號：

```json
{
	'access_token': value, 
	'expires_in': value
}
```

接下來：[將檔案上傳到 OSS](/zh-TW/datamanagement/oss/)