# 用戶端檔案 (.NET Framework)

ASP.NET 應用程式通常使用 `.aspx`，而不是 `.html`，但就此自學課程而言，為了簡便，我們使用 `.html` 即可。

我們的 .NET 伺服器規劃為從 `/` 根資料夾提供檔案。讓我們組織整理如下：

- `/`：`.html` (其他專案可以用 `.aspx`)
- `/js`：`.js`
- `/css`：`.css`

下圖展示了這樣的組織 (在下一節建立了檔案之後)

![](_media/net/project_all_files.png)

> `Global.asax` 與 `packages.config` 檔案以及 `App_Data`、`App_Start` 與 `Model` 資料夾是預設建立的。