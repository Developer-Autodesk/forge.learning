# 新規プロジェクトの作成(JAVA EE)

[Eclipse Java EE IDE for Web Developers](http://www.eclipse.org/downloads/packages/eclipse-ide-java-ee-developers/oxygen3) を開きます。このチュートリアルを書いている間、IDE のバージョンは [Eclipse 2021-03 (4.19)](https://www.eclipse.org/downloads/packages/release/2021-03/r)です

単純なMavenプロジェクトを作成し、既定の作業スペースの場所を選択します。**次の**をクリックします。指定した原型を選択します。リストで、**Artifact Id** を **maven-archaitype-webapp** でフィルタし、**org.apache.maven.archaectypes** を選択して、**Next** をクリックします。

以下の詳細を入力してください。このチュートリアルでは、**Group Id** に **com.yourcompany** と名前を付け、**Artifact Id** に **forgesample** と名前を付けます。\[完了]をクリックします。右下の作成進行状況を確認します。この手順により、Eclipse環境でMavenプロジェクトが作成されます。 

![](_media/java/eclipse_create_project.gif)

!>エラー「スーパークラス"javax.servlet.http.HttpServlet"がJava Build Path index.jsp `/forgesample/src/main/webapp`で見つからなかった」が表示された場合は、Apache Tomcatをターゲットのランタイムに追加してください。プロジェクトのプロパティに移動し、次に示すようにTargeted Runtimesに移動して、チェックボックスをオンにします。

![](_media/java/eclipse_HttpServlet.png)

![](_media/java/eclipse_target_runtime.png)


ここで、**Targeted Runtime** を **Apache Tomcat** に設定し、サーバを定義し、実行するフォルダの場所とプロジェクトを選択します。最後に **** >> **Run as Server** として実行します。(まだ **Apache Tomcat** をインストールしていない場合は、[Apache Tomcat](https://tomcat.apache.org/download-90.cgi) からダウンロードしてください)

![](_media/java/eclipse_run_tomcat.gif)

!> マーカーに Maven エラーが表示された場合は、次の **Run As - Maven Clean ** を実行します

続行する前に、サーバのPORTを切り替えて、将来のチュートリアルとの類似性を維持します。 

![](_media/java/eclipse_change_server_port.gif)

Eclipseは、Hello World!を示すローカルページをIDEで実行します。または、http://localhost:3000/forgesample/index.jspにアクセスして結果を確認することもできます。

![](_media/java/eclipse_helloworld_default.png)

index.jsp が実行中であることを確認するには、**src/main/webapp/index.jsp** に移動し、テキストを Hello World! から Hello Forge! に変更します。

## 既定のホストURLを変更
上記の手順では、`/forgesample`からファイルを提供するようにJavaサーバが設定されているため、既定のホストURLはhttp://localhost:3000/forgesample/です。HTTPエンドポイントを構築する手順では、接続URLはhttp://localhost:3000/api/forge/oauth/tokenやhttp://localhost:3000/api/forge/oss/bucketsなどの形式にマッピングされます。既定のホストURLはhttp://localhost:3000に更新する必要があります。

そこで、Eclipse Webモジュール内のパスを何も設定せずに、URL(ルート)内のパスコンポーネントを持たないプロジェクトにアクセスできるように、パスを設定して修正します。Tomcat サーバーのページを探し、ページの左下にある **Modules** タブをクリックします。**Web モジュール**のリストで、forgesample を選択します。次に、__編集 __ をクリックします。ポップアップダイアログで、パスを「/」のみに変更します。\[OK]をクリックして、更新を保存します。

![](_media/java/eclipse_webmodules_path.gif)

![](_media/java/eclipse_server_default_host.png)

次に、この Maven プロジェクトをクリックします。**名前を付けて実行 >> **サーバーとして実行**Eclipseは、Hello World!を示すローカルページをIDEで実行します。または、http://localhost:3000/index.jspにアクセスして結果を確認することもできます。

![](_media/java/eclipse_helloworld_default_new_host.png)


設定がすべて完了しました。サーバは正常に動作しています。:)

## Pom.xmlを設定

`pom.xml` ファイル(**プロジェクト エクスプローラ**を介して)を開き、以下のコンテンツをコピーして貼り付けます。\[groupId] を**com.mycompany** などのロールを示す文字列に変更します。

Maven 3.0 以降の非推奨の最新バージョンおよびリリース メタバージョン([この説明を参照](https://stackoverflow.com/questions/30571/how-do-i-tell-maven-to-use-the-latest-version-of-a-dependency)]。最新バージョンの **Forge JAVA SDK** が必要な場合は、[Maven Center](https://search.maven.org/search?q=a:forge-java-sdk) を確認し、それに応じて特定のバージョン番号で更新してください。 
  ```
    <dependency>
            <groupId>com.autodesk</groupId>
            <artifactId>forge-java-sdk</artifactId> 
            <version> input the latest version if needed </version>
    </dependency>
  ```

!>注:このチュートリアルを作成する場合は、Tomcat 9.0または8.5が採用されます。Tomcat 10以降で作業する場合、javax.\*パッケージはjakatus.*パッケージに名前が変更されました。Tomcat 10+、Tomcat 9-、JEE 9+、およびJEE 8-に対する適切なpom.xml宣言の例は、次の回答で示されています。[jakatus.servlet.http.HttpServletではなく、javax.servlet.ServletへのTomcatキャスティングのサーブレット](https://stackoverflow.com/questions/65703840/tomcat-casting-servlets-to-javax-servlet-servlet-instead-of-jakarta-servlet-http/65704617#65704617) 

[pom.xml](_snippets/viewmodels/java/pom.xml ':include :type=code xml')

マーカーに新しいエラーがポップアップし、以前に追加したすべての新しい依存関係に対処するために、Mavenプロジェクトを更新する必要があります。プロジェクトを右クリックし、**Maven ** >> **プロジェクトの更新(Update Project)**を選択します。

![](_media/java/Eclipse_maven_error.png) 

![](_media/java/Eclipse_maven_update_project.png)

## ファイルとフォルダ

**src/main** フォルダを右クリックし、**新規** >> **Folder** を右クリックして、**java** という名前を付けます。

![](_media/java/Eclipse_tree_structure_java_folder.png)

新しいクラス ファイルを作成するには、プロジェクトを右クリックして、**New** >> **Class** を選択します。まず、**config.java** ファイルを作成します。

!> **ソース フォルダ ** が **ForgeSample/src/main/java** に設定され、パッケージが `forgesample` (プロジェクト名)に設定されていることを確認します。

![](_media/java/Eclipse_maven_java_class.png)

次の内容をコピーして`config.java`ファイルに貼り付けます。

[config.java](_snippets/viewmodels/java/config.java ':include :type=code java')

> 後でプロジェクトをオンラインで配置できるように、環境変数として **ID & Secret** を定義することが重要です。詳細については、**配置**を参照してください。

最後に、スコープに関する2つの定義があります。これらのスコープは、Forge Weサービスのさまざまなサービスを使用するための適切な権限をトークンに与えます。このチュートリアルは、ビューアのみを使用する場合に使用します。必要なのは「viewables:read」スコープのみです。

プロジェクトの準備ができました。この時点で、プロジェクトには次の条件が設定されています。

 ![](_media/java/Eclipse_config_class.png)

次へ:[認証](/ja_jp/oauth/2legged/)