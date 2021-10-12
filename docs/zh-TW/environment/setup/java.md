# 建立新專案 (JAVA EE)

開啟 [Eclipse Java EE IDE for Web Developers](http://www.eclipse.org/downloads/packages/eclipse-ide-java-ee-developers/oxygen3)。編寫此自學課程時，IDE 版本為 [Eclipse 2021-03 (4.19)](https://www.eclipse.org/downloads/packages/release/2021-03/r)

建立簡單的 Maven 專案，然後選取預設工作區位置。按一下 **Next**。選取 Maven 原型。在清單中，篩選具有 **maven-archetype-webapp** 的 **Artifact Id**，選取 **org.apache.maven.archetypes**，然後按一下 **Next**。

填寫以下詳細資料：對於此自學課程，我們將 **Group ID** 命名為 **com.yourcompany**，將 **Artifact ID** 命名為 **forgesample**。按一下 Finish。檢查右下角的建立進度。此步驟會在 Eclipse 環境中建立 Maven 專案。 

![](_media/java/eclipse_create_project.gif)

!> 如果在 Java 建置路徑 index.jsp `/forgesample/src/main/webapp` 上出現錯誤「The superclass "javax.servlet.http.HttpServlet"」，請將 Apache Tomcat 加入 Targeted Runtimes。可以透過以下操作來完成：移往專案性質，然後移往 Targeted Runtimes，按照以下指示勾選方塊。

![](_media/java/eclipse_HttpServlet.png)

![](_media/java/eclipse_target_runtime.png)


現在，將 **Targeted Runtime** 設定為 **Apache Tomcat**，然後定義伺服器，選取要執行的資料夾位置和專案。最後，按一下 **Run as** >> **Run as Server**。(如果尚未安裝 **Apache Tomcat**，請從 [Apache Tomcat](https://tomcat.apache.org/download-90.cgi) 進行下載)

![](_media/java/eclipse_run_tomcat.gif)

!> 如果在 Markers 中顯示 Maven 錯誤，請執行以下操作：**Run As - Maven Clean**

繼續之前，我們將切換伺服器的連接埠，以保持與未來自學課程的相似性。 

![](_media/java/eclipse_change_server_port.gif)

Eclipse 將在 IDE 中執行一個本端頁面以向您展示 Hello World!，或者，您也可以始終造訪 http://localhost:3000/forgesample/index.jsp 查看結果。

![](_media/java/eclipse_helloworld_default.png)

若要確保正在執行的是 index.jsp，請移往 **src/main/webapp/index.jsp**，並將文字從 Hello World! 變更為 Hello Forge!

## 變更預設主機 URL
在上述步驟中，Java 伺服器已設定為從 `/forgesample` 提供檔案，因此預設主機 URL 為 http://localhost:3000/forgesample/。在建置 HTTP endpoint 的步驟中，連接 URL 將對映至 http://localhost:3000/api/forge/oauth/token、http://localhost:3000/api/forge/oss/buckets 等格式，預設主機 URL 將需要更新為 http://localhost:3000。

因此，讓我們將 Eclipse Web 模組中的路徑設定為無以進行修正，這樣便能在 URL 中沒有任何路徑元件的情況下存取專案 (即 ROOT)。找到 Tomcat 伺服器頁面，按一下頁面左下角的 **Modules** 頁籤。在 **Web Modules** 清單中，選取 forgesample。下一步，按一下 __Edit__。在彈出對話方塊中，將路徑變更為僅「/」。按一下 OK 以儲存更新。

![](_media/java/eclipse_webmodules_path.gif)

![](_media/java/eclipse_server_default_host.png)

現在，按一下此 Maven 專案，選取 **Run as** >> **Run as Server**。Eclipse 將在 IDE 中執行一個本端頁面以向您展示 Hello World!，或者，您也可以始終造訪 http://localhost:3000/index.jsp 查看結果。

![](_media/java/eclipse_helloworld_default_new_host.png)


一切已就緒，伺服器現已成功執行。:)

## 設定 Pom.xml

開啟 `pom.xml` 檔案 (透過**專案總管**)，複製並貼上下方的內容。將 \[groupId] 變更為指示您的角色的字串，例如 **com.mycompany**。

Maven 3.0 及更高版本已棄用 LATEST 和 RELEASE 中繼版本 ([請參閱此討論](https://stackoverflow.com/questions/30571/how-do-i-tell-maven-to-use-the-latest-version-of-a-dependency))，如果您需要 **Forge JAVA SDK** 的最新版本，請查看 [Maven 中心](https://search.maven.org/search?q=a:forge-java-sdk)並相應地更新特定版本號碼。 
  ```
    <dependency>
            <groupId>com.autodesk</groupId>
            <artifactId>forge-java-sdk</artifactId> 
            <version> input the latest version if needed </version>
    </dependency>
  ```

!> 注意：本自學課程是以 Tomcat 8.5 或 9.0 為背景編寫，如您是使用 Tomcat 10 或更新的版本，那請注意，在該版本裡的 javax.* 套件已被重新命名為 jakarta.* 套件，請參考下面網址裡的解答修改您的 pom.xml，該網址裡有針對 Tomcat 10+、Tomcat 9-、JEE 9+ 和 JEE 8- 等版本提供相關的設定範例：[Tomcat 將 servlet 轉換為 javax.servlet.Servlet，而不是 jakarta.servlet.http.HttpServlet](https://stackoverflow.com/questions/65703840/tomcat-casting-servlets-to-javax-servlet-servlet-instead-of-jakarta-servlet-http/65704617#65704617) 

[pom.xml](_snippets/viewmodels/java/pom.xml ':include :type=code xml')

這時在您的 Markers 會跳出一個新錯誤，我們需要更新 Maven 專案以解決先前加入的所有新相依性。在專案上按一下右鍵，然後按一下 **Maven** >> **Update Project**。

![](_media/java/Eclipse_maven_error.png) 

![](_media/java/Eclipse_maven_update_project.png)

## 檔案和資料夾

在 **src/main** 資料夾上按一下右鍵，然後按一下 **New** >> **Folder**，將其命名為 **java**。

![](_media/java/Eclipse_tree_structure_java_folder.png)

若要建立新類別檔案，請在專案上按一下右鍵，然後選取 **New** >> **Class**。接下來先建立 **config.java** 檔案。

!> 確保將 **Source Folder** 設定為 **ForgeSample/src/main/java** 並將套件設定為 `forgesample` (我們的專案名稱)。

![](_media/java/Eclipse_maven_java_class.png)

將以下內容複製並貼到 `config.java` 檔案。

[config.java](_snippets/viewmodels/java/config.java ':include :type=code java')

> 將您的 **Client ID 和 Secret** 定義為環境變數很重要，這樣我們的專案稍後就可以在線上部署。稍後可在**「部署」**章節中瞭解更多相關資訊。

最後，我們看到有 2 種關於範圍的定義。這些範圍為 Token 提供了使用 Forge Web Services 不同服務的適當權限。本自學課程僅專門介紹 Viewer 的使用，我們將僅需要「viewables:read」範圍。

專案已準備就緒！此時，您的專案應具有以下結構：

 ![](_media/java/Eclipse_config_class.png)

下一步：[驗證](/zh-TW/oauth/2legged/)