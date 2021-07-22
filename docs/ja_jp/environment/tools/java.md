# ツール(Java)

[Java SE Development Kit](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) をインストールしてコードを実行します。 

[Apache Tomcat](https://tomcat.apache.org/download-90.cgi) をインストールして、サーバを起動します。このチュートリアルを作成する場合は、Tomcat 9.0または8.5が採用されます。Tomcat 10以降で作業する場合、javax.\*パッケージはjakatus.*パッケージに名前が変更されました。Tomcat 10+、Tomcat 9-、JEE 9+、およびJEE 8-に対する適切なpom.xml宣言の例は、次の回答で示されています。[jakatus.servlet.http.HttpServletではなく、javax.servlet.ServletへのTomcatキャスティングのサーブレット](https://stackoverflow.com/questions/65703840/tomcat-casting-servlets-to-javax-servlet-servlet-instead-of-jakarta-servlet-http/65704617#65704617) 

> Tomcat サーバのセットアップ方法に関するチュートリアルは、[こちらに記載されています。](https://crunchify.com/step-by-step-guide-to-setup-and-install-apache-tomcat-server-in-eclipse-development-environment-ide/)このチュートリアルではTomcatバージョン8を使用していますが、すべての新しいバージョンにも適用されます。 

次に、コードを記述するためのJAVA IDEが必要です。Web アプリケーションを作成するには、このチュートリアルで [Eclipse Java EE IDE for Web Developers](http://www.eclipse.org/downloads/packages/eclipse-ide-java-ee-developers/oxygen3) バージョン Oxygen.2 リリース(4.7.2)を使用します。注: このチュートリアルを 2021 年 7 月に更新する際、Eclipse の IDE は[Eclipse 2021-03 (4.19)](https://www.eclipse.org/downloads/packages/release/2021-03/r)です

> このチュートリアルでは、すべての既定のインストールオプションを使用します。

次へ:[認証](oauth/)