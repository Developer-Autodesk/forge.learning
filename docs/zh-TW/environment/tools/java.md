# 開發工具及環境準備 (Java)

安裝 [Java SE 開發套件](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)以執行程式碼。 

安裝 [Apache Tomcat](https://tomcat.apache.org/download-90.cgi) 作為伺服器。本自學課程是以 Tomcat 8.5 或 9.0 為背景編寫，如您是使用 Tomcat 10 或更新的版本，那請注意，在該版本裡的 javax.* 套件已被重新命名為 jakarta.* 套件，請參考下面網址裡的解答修改您的 pom.xml，該網址裡有針對 Tomcat 10+、Tomcat 9-、JEE 9+ 和 JEE 8- 等版本提供相關的設定範例：[Tomcat 將 servlet 轉換為 javax.servlet.Servlet，而不是 jakarta.servlet.http.HttpServlet](https://stackoverflow.com/questions/65703840/tomcat-casting-servlets-to-javax-servlet-servlet-instead-of-jakarta-servlet-http/65704617#65704617) 

> 這有篇不錯的 Tomcat 伺服器設定教學：[此處](https://crunchify.com/step-by-step-guide-to-setup-and-install-apache-tomcat-server-in-eclipse-development-environment-ide/)。本自學課程使用的 Tomcat 版本為 Tomcat 8.\*，但相關設定也適用於後續的新版本。 

現在，我們需要 JAVA IDE 來撰寫程式碼。為了建立網頁應用程式，本自學課程將使用 [Eclipse Java EE IDE for Web Developers](http://www.eclipse.org/downloads/packages/eclipse-ide-java-ee-developers/oxygen3) version Oxygen.2 Release (4.7.2)。注意：本自學課程在 2021 年 7 月左右有更新，當時使用的 IDE 版本為 [Eclipse 2021-03 (4.19)](https://www.eclipse.org/downloads/packages/release/2021-03/r)

> 在本自學課程中，將全部使用預設安裝選項。

下一步：[驗證](/zh-TW/oauth/)