# 工具 (Java)

安装 [Java SE 开发工具包](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)以运行代码。 

安装 [Apache Tomcat](https://tomcat.apache.org/download-90.cgi) 以启动服务器。编写本教程时，采用的是 Tomcat 9.0 或 8.5。如果使用 Tomcat 10 及更高版本，则 javax.* 软件包重命名为 jakata.* 软件包。以下答案提供了适用于 Tomcat 10+、Tomcat 9-、JEE 9+ 和 JEE 8- 的正确 pom.xml 声明示例：[Tomcat casting servlets to javax.servlet.Servlet instead of jakarta.servlet.http.HttpServlet](https://stackoverflow.com/questions/65703840/tomcat-casting-servlets-to-javax-servlet-servlet-instead-of-jakarta-servlet-http/65704617#65704617) 

> 有关如何设置 Tomcat 服务器的详尽教程，请参见[此处](https://crunchify.com/step-by-step-guide-to-setup-and-install-apache-tomcat-server-in-eclipse-development-environment-ide/)。本教程使用的是 Tomcat 版本 8，但它也适用于所有较新版本。 

现在，我们需要 JAVA IDE 来编写代码。为了创建 Web 应用程序，本教程将使用 [Eclipse Java EE IDE for Web Developers](http://www.eclipse.org/downloads/packages/eclipse-ide-java-ee-developers/oxygen3) 版本 Oxygen.2 Release (4.7.2)。注意：在 2021 年 7 月左右更新本教程时，Eclipse IDE 为 [Eclipse 2021-03 (4.19)](https://www.eclipse.org/downloads/packages/release/2021-03/r)

> 在本教程中，使用所有默认安装选项。

下一步：[身份验证](/zh-CN/oauth/)