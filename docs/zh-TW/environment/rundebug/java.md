# 執行和除錯 (Java)

我們將需要為 **FORGE_CLIENT_ID** 和 **FORGE_CLIENT_SECRET** 設定 ENV 變數。

確定 Tomcat 伺服器「未」在執行，並前往 **Run** 功能表，然後選取 **Run Configurations...**。在左側樹狀目錄中選取 Tomcat 伺服器，然後在右側選取 **Environment** 頁籤，然後按一下 **New** 加入變數。我們可以保留預設設定。 

 ![](_media/java/Eclipse_new_env_var.png) 

 > 請務必加入 **FORGE_CLIENT_ID** 和 **FORGE_CLIENT_SECRET**。

最後，按一下右下方的 **Apply**，然後關閉對話方塊。

現在，我們可以啟動我們的 Tomcat 伺服器 

![](_media/java/Eclipse_start_server_final.png) 

開啟您的瀏覽器，然後移往 `http://localhost:3000`

接下來：[Viewer 延伸](/zh-TW/tutorials/extensions)