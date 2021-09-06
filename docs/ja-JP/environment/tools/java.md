# ツール(Java)

[Java SE Development Kit](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) をインストールしてコードを実行します。 

[Apache Tomcat](https://tomcat.apache.org/download-90.cgi) をインストールして、サーバを起動します。このチュートリアルは、Tomcat 9.0 または 8.5 を使用して作成されています。Tomcat 10 以降で作業する場合、javax.* パッケージの名前は jakatus.* パッケージに変更されています。Tomcat 10 以降、Tomcat 9 以前、JEE 9 以降、およびJEE 8 以前に適した pom.xml 宣言の例は、次の回答で示されています: [Tomcat がサーブレットを jakarta.servlet.http.HttpServlet ではなくjavax.servlet.Servlet にキャストする](https://stackoverflow.com/questions/65703840/tomcat-casting-servlets-to-javax-servlet-servlet-instead-of-jakarta-servlet-http/65704617#65704617) 

> Tomcat サーバのセットアップ方法に関するチュートリアルは、[こちら](https://crunchify.com/step-by-step-guide-to-setup-and-install-apache-tomcat-server-in-eclipse-development-environment-ide/)に記載されています。このチュートリアルでは Tomcat バージョン 8 を使用していますが、すべての新しいバージョンにも適用されます。 

次に、コードを記述するための JAVA IDE が必要です。Web アプリケーションを作成するには、このチュートリアルで [Eclipse Java EE IDE for Web Developers](http://www.eclipse.org/downloads/packages/eclipse-ide-java-ee-developers/oxygen3) バージョン Oxygen.2 リリース(4.7.2)を使用します。注: このチュートリアルを 2021 年 7 月に更新する場合、Eclipse の IDE は[Eclipse 2021-03 (4.19)](https://www.eclipse.org/downloads/packages/release/2021-03/r)です

> このチュートリアルでは、すべての既定のインストール オプションを使用します。

次の作業:[認証](oauth/)