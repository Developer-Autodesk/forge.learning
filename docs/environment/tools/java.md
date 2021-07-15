# Tools (Java)

Install [Java SE Development Kit](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) to run your code. 

Install [Apache Tomcat](https://tomcat.apache.org/download-90.cgi) to launch the server. When writing this tutorial, Tomcat 9.0 or 8.5 is adopted. If working with Tomcat 10 and above, the javax.* package has been renamed to jakarta.* package. The examples of proper pom.xml declarations for Tomcat 10+, Tomcat 9-, JEE 9+ and JEE 8- is available in this answer: [Tomcat casting servlets to javax.servlet.Servlet instead of jakarta.servlet.http.HttpServlet](https://stackoverflow.com/questions/65703840/tomcat-casting-servlets-to-javax-servlet-servlet-instead-of-jakarta-servlet-http/65704617#65704617) 

> A good tutorial on how to setup your Tomcat server can be found [here.](https://crunchify.com/step-by-step-guide-to-setup-and-install-apache-tomcat-server-in-eclipse-development-environment-ide/) This tutorial is using Tomcat version 8 but it will apply for all newer versions as well. 

Now we need a JAVA IDE to write the code. In order to create a web application, this tutorial will use [Eclipse Java EE IDE for Web Developers](http://www.eclipse.org/downloads/packages/eclipse-ide-java-ee-developers/oxygen3) version Oxygen.2 Release (4.7.2). 
Note: when updating this tutorial around July, 2021, the IDE of Eclipse is [Eclipse 2021-03 (4.19)](https://www.eclipse.org/downloads/packages/release/2021-03/r)

> For this tutorial, use all default install options.

Next: [Authentication](oauth/)