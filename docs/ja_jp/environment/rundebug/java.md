# 実行とデバッグ(Java)

**FORGE_CLIENT_ID** と **FORGE_CLIENT_SECRET** の両方に対して ENV 変数を設定する必要があります。

Tomcat サーバが実行されていないことを確認し、**Run** メニューに移動して、**Run Configurations...** を選択します。左のツリーで Tomcat サーバを選択し、次に **Environment** タブを選択して、**New** をクリックして変数を追加します。既定の設定をそのまま使用できます。 

 ![](_media/java/Eclipse_new_env_var.png) 

 > 必ず **FORGE_CLIENT_ID** と **FORGE_CLIENT_SECRET** の両方を追加してください。

最後に、右側の**適用**をクリックし、ダイアログを閉じます。

これで、Tomcatサーバを起動できます 

![](_media/java/Eclipse_start_server_final.png) 

ブラウザを開き、`http://localhost:3000` に移動します。

次へ:[ビューアの拡張機能](/ja_jp/tutorials/extensions)