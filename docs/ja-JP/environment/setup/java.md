# 新規プロジェクトを作成する(JAVA EE)

[Eclipse Java EE IDE for Web Developers](http://www.eclipse.org/downloads/packages/eclipse-ide-java-ee-developers/oxygen3) を開きます。このチュートリアルを作成している時点の IDE のバージョンは [Eclipse 2021-03 (4.19)](https://www.eclipse.org/downloads/packages/release/2021-03/r)です

単純な Maven プロジェクトを作成し、既定のワークスペースの場所を選択します。**Next** をクリックします。maven の原型を選択します。リストの **Artifact Id** を **maven-archaitype-webapp** でフィルタし、**org.apache.maven.archaectypes** を選択して **Next** をクリックします。

以下の詳細を入力します。このチュートリアルでは、**Group Id** に **com.yourcompany**、**Artifact Id** に **forgesample** という名前を付けます。Finish をクリックします。右下に表示される作成の進行状況を確認します。これで、Eclipse 環境内に Maven プロジェクトが作成されました。 

![](_media/java/eclipse_create_project.gif)

!> 「スーパークラス"javax.servlet.http.HttpServlet"がJava Build Path index.jsp `/forgesample/src/main/webapp`で見つかりませんでした」というエラーが表示された場合は、Targeted Runtimes に Apache Tomcat を追加してください。次のように、プロジェクトのプロパティに移動してから、Targeted Runtimes に移動して、チェック ボックスをオンにします。

![](_media/java/eclipse_HttpServlet.png)

![](_media/java/eclipse_target_runtime.png)


ここで、**Targeted Runtime** を **Apache Tomcat** に設定してから、サーバを定義し、実行するフォルダの場所とプロジェクトを選択します。最後に **Run as** >> **Run as Server** の順に選択します。(まだ **Apache Tomcat** をインストールしていない場合は、[Apache Tomcat](https://tomcat.apache.org/download-90.cgi) からダウンロードしてください)

![](_media/java/eclipse_run_tomcat.gif)

!> マーカーに Maven エラーが表示された場合は、次の **Run As - Maven Clean** を実行します

続行する前に、サーバの PORT を切り替えて、将来のチュートリアルとの類似性を維持します。 

![](_media/java/eclipse_change_server_port.gif)

Eclipse は IDE でローカル ページを実行し、Hello World! を表示します。http://localhost:3000/forgesample/index.jsp にアクセスして結果を確認することもできます。

![](_media/java/eclipse_helloworld_default.png)

index.jsp が実行中であることを確認するには、**src/main/webapp/index.jsp** に移動し、Hello World! のテキストを Hello Forge! に変更します。

## 既定のホスト URL を変更する
上記の手順では、`/forgesample` からファイルを提供するように Java サーバが設定されているため、既定のホスト URL は http://localhost:3000/forgesample/ になります。HTTP エンドポイントの構築手順では、接続 URL はhttp://localhost:3000/api/forge/oauth/token や http://localhost:3000/api/forge/oss/buckets などの形式にマッピングされます。既定のホスト URL を http://localhost:3000 に更新する必要があります。

修正するときに、Eclipse Web モジュール内の場所を示すパスを設定から外してみましょう。こうすることで、URL に ROOT などのパス コンポーネントが含まれていない場合も、プロジェクトにアクセスできるようになります。Tomcat サーバーのページを探し、ページの左下にある **Modules** タブをクリックします。**Web Modules** リストで、forgesample を選択します。次に、 __Edit__ をクリックします。ポップアップ ダイアログで、パスを「/」のみに変更します。OK をクリックして、更新内容を保存します。

![](_media/java/eclipse_webmodules_path.gif)

![](_media/java/eclipse_server_default_host.png)

次に、この Maven プロジェクトをクリックし、**Run as** >> **Run as Server** の順に選択します。Eclipse は IDE でローカル ページを実行し、Hello World! を表示します。http://localhost:3000/index.jsp にアクセスして結果を確認することもできます。

![](_media/java/eclipse_helloworld_default_new_host.png)


設定はすべて完了しました。サーバは正常に動作しています。

## Pom.xml をセットアップする

**Project Explorer** を使用して `pom.xml` ファイルを開き、以下の内容をコピーして貼り付けます。groupId を **com.mycompany** などのロールを示す文字列に変更します。

Maven 3.0 以降の非推奨の最新のリリース メタバージョン([このドキュメントを参照](https://stackoverflow.com/questions/30571/how-do-i-tell-maven-to-use-the-latest-version-of-a-dependency))。最新バージョンの **Forge JAVA SDK** が必要な場合は、[Maven Center](https://search.maven.org/search?q=a:forge-java-sdk) で確認し、特定のバージョン番号を使用して適切に更新してください。 
  ```
    <dependency>
            <groupId>com.autodesk</groupId>
            <artifactId>forge-java-sdk</artifactId> 
            <version> input the latest version if needed </version>
    </dependency>
  ```

!> 注:このチュートリアルは、Tomcat 9.0 または 8.5 を使用して作成されています。Tomcat 10 以降で作業する場合、javax.* パッケージの名前は jakatus.* パッケージに変更されています。Tomcat 10 以降、Tomcat 9 以前、JEE 9 以降、およびJEE 8 以前に適した pom.xml 宣言の例は、次の回答で示されています: [Tomcat がサーブレットを jakarta.servlet.http.HttpServlet ではなくjavax.servlet.Servlet にキャストする](https://stackoverflow.com/questions/65703840/tomcat-casting-servlets-to-javax-servlet-servlet-instead-of-jakarta-servlet-http/65704617#65704617) 

[pom.xml](_snippets/viewmodels/java/pom.xml ':include :type=code xml')

マーカーに新しいエラーがポップアップします。以前に追加した新しい依存関係をすべて解決するには、Maven プロジェクトを更新する必要があります。プロジェクトを右クリックし、**Maven** >> **Update Project** の順に選択します。

![](_media/java/Eclipse_maven_error.png) 

![](_media/java/Eclipse_maven_update_project.png)

## ファイルとフォルダ

**src/main** フォルダを右クリックし、**New** >> **Folder** の順に選択して、フォルダに **java** という名前を付けます。

![](_media/java/Eclipse_tree_structure_java_folder.png)

新しいクラス ファイルを作成するには、プロジェクトを右クリックして、**New** >> **Class** の順に選択します。まず、**config.java** ファイルを作成しましょう。

!> **Source Folder** が **ForgeSample/src/main/java** に、パッケージが `forgesample` (プロジェクト名)に設定されていることを確認してください。

![](_media/java/Eclipse_maven_java_class.png)

次の内容をコピーして `config.java` ファイルに貼り付けます。

[config.java](_snippets/viewmodels/java/config.java ':include :type=code java')

> 後でプロジェクトをオンラインで配置できるように、**ID とシークレット**を環境変数として定義することが重要です。詳細については、「**配置**」を参照してください。

最後に、スコープに関する 2 つの定義があります。これらのスコープは、トークンに、Forge Web サービスのさまざまなサービスを使用するのに適した権限を付与します。このチュートリアルはビューアの使用に特化しています。必要なのは、「viewables:read」スコープのみです。

プロジェクトの準備ができました!この時点で、プロジェクトには以下が設定されています。

 ![](_media/java/Eclipse_config_class.png)

次の作業:[認証する](oauth/2legged/)