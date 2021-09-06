# 工具 (Java)

安裝 [Java SE 開發套件](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)以執行程式碼。 

安裝 [Apache Tomcat](https://tomcat.apache.org/download-90.cgi) 以啟動伺服器。編寫此自學課程時，會採用 Tomcat 9.0 或 8.5。如果使用 Tomcat 10 及更高版本，則 javax.* 套件已更名為 jakarta.* 套件。以下答案提供了 Tomcat 10+、Tomcat 9-、JEE 9+ 和 JEE 8- 的適當 pom.xml 宣告範例：[Tomcat 將 servlet 轉換為 javax.servlet.Servlet，而不是jakarta.servlet.http.HttpServlet](https://stackoverflow.com/questions/65703840/tomcat-casting-servlets-to-javax-servlet-servlet-instead-of-jakarta-servlet-http/65704617#65704617) 

> 有關如何設置 Tomcat 伺服器的不錯的自學課程，請參閱[此處](https://crunchify.com/step-by-step-guide-to-setup-and-install-apache-tomcat-server-in-eclipse-development-environment-ide/)。本自學課程使用的是 Tomcat 版本 8，但它也適用於所有較新的版本。 

現在，我們需要 JAVA IDE 來撰寫程式碼。為了建立網頁應用程式，本自學課程將使用 [Eclipse Java EE IDE for Web Developers](http://www.eclipse.org/downloads/packages/eclipse-ide-java-ee-developers/oxygen3) 版本 Oxygen.2 Release (4.7.2)。注意：在 2021 年 7 月左右更新本自學課程時，Eclipse 的 IDE 為 [Eclipse 2021-03 (4.19)](https://www.eclipse.org/downloads/packages/release/2021-03/r)

> 在本自學課程中，將全部使用預設安裝選項。

接下來：[驗證](/zh-TW/oauth/)