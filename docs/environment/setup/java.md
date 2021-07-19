# Create a new project (JAVA EE)

Open [Eclipse Java EE IDE for Web Developers](http://www.eclipse.org/downloads/packages/eclipse-ide-java-ee-developers/oxygen3). While writing this tutorial, the IDE version is [Eclipse 2021-03 (4.19)](https://www.eclipse.org/downloads/packages/release/2021-03/r)

Create a simple Maven project and select default Workspace location. Click on **Next**. Select the maven archetype. On the list, filter **Artifact Id** with **maven-archetype-webapp** ,select **org.apache.maven.archetypes** and click on **Next**.

Fill out below details: for this tutorial, we will name **Group Id** as **com.yourcompany** and **Artifact Id** as **forgesample**. Click Finish. Check the creation progress on the bottom right. This step creates Maven Project in your Eclipse Environment. 

![](_media/java/eclipse_create_project.gif)

!> If you see error “The superclass “javax.servlet.http.HttpServlet” was not found on the Java Build Path index.jsp `/forgesample/src/main/webapp`, please add Apache Tomcat to your Targeted Runtimes. You get there by going to the project properties and then Targeted Runtimes, check the box as indicated below.

![](_media/java/eclipse_HttpServlet.png)

![](_media/java/eclipse_target_runtime.png)


Now set **Targeted Runtime** to **Apache Tomcat**, then define server, select folder location and project to run. Finally **Run as** >> **Run as Server**. (If you have not installed **Apache Tomcat**, please download it from [Apache Tomcat](https://tomcat.apache.org/download-90.cgi))

![](_media/java/eclipse_run_tomcat.gif)

!> If a Maven error is display in the Markers, run the following **Run As - Maven Clean**

Before we continue, we will switch the PORT of the server to maintain similarity with future tutorials. 

![](_media/java/eclipse_change_server_port.gif)

Eclipse will run a local page in your IDE showing you Hello World! or you can always visit http://localhost:3000/forgesample/index.jsp to see your result.

![](_media/java/eclipse_helloworld_default.png)

To make sure it is your index.jsp the one running, go to **src/main/webapp/index.jsp** and change the text from Hello World! to Hello Forge!

## Change Default Host URL
With the steps above, our Java server is configured to serve files from `/forgesample`, so the default host url is http://localhost:3000/forgesample/. In the steps with building the HTTP endpoints, the connection url will be mapped to the format like http://localhost:3000/api/forge/oauth/token, http://localhost:3000/api/forge/oss/buckets, the default host url will needed to be updated to http://localhost:3000.

So, let's fix by setting the path to nothing in the Eclipse web modules, which enables access the project without any path component in the URL (i.e. ROOT). Locate Tomcat Server page, click **Modules** tab at the bottom-left of the page. In the list of **Web Modules**, select forgesample. Next click __Edit__. In the popup dialog, change the path to '/' only. Click OK and save the update.

![](_media/java/eclipse_webmodules_path.gif)

![](_media/java/eclipse_server_default_host.png)

Now, click this Maven project, **Run as** >> **Run as Server**. Eclipse will run a local page in your IDE showing you Hello World! or you can always visit http://localhost:3000/index.jsp to see your result.

![](_media/java/eclipse_helloworld_default_new_host.png)


You are all set, your Server is running succesfully now. :)

## Setup Pom.xml

Open the `pom.xml` file (via **Project Explorer**), copy & paste the content below. Change [groupId] to the string that indicates your role such as **com.mycompany**.

Maven 3.0 and above deprecated LATEST and RELEASE metaversions ([see this discussion](https://stackoverflow.com/questions/30571/how-do-i-tell-maven-to-use-the-latest-version-of-a-dependency)], if you need latest version of **Forge JAVA SDK**, please check on [Maven Center](https://search.maven.org/search?q=a:forge-java-sdk) and update with the specific version number accordingly. 
  ```
    <dependency>
            <groupId>com.autodesk</groupId>
            <artifactId>forge-java-sdk</artifactId> 
            <version> input the latest version if needed </version>
    </dependency>
  ```

!> Note:  When writing this tutorial, Tomcat 9.0 or 8.5 is adopted. If working with Tomcat 10 and above, the javax.* package has been renamed to jakarta.* package. The examples of proper pom.xml declarations for Tomcat 10+, Tomcat 9-, JEE 9+ and JEE 8- is available in this answer: [Tomcat casting servlets to javax.servlet.Servlet instead of jakarta.servlet.http.HttpServlet](https://stackoverflow.com/questions/65703840/tomcat-casting-servlets-to-javax-servlet-servlet-instead-of-jakarta-servlet-http/65704617#65704617) 

[pom.xml](_snippets/viewmodels/java/pom.xml ':include :type=code xml')

A new Error will pop up in your Markers, we will need to update the Maven project to address all the new dependencies we have previously added. Right-click on the project, then **Maven** >> **Update Project**.

![](_media/java/Eclipse_maven_error.png) 

![](_media/java/Eclipse_maven_update_project.png)

## Files and Folders

Right-click **src/main** folder, then **New** >> **Folder**, name it **java**.

![](_media/java/Eclipse_tree_structure_java_folder.png)

To create a new class file, right-click on the project and select **New** >> **Class**. Let's create the **config.java** file firstly.

!> Make sure the **Source Folder** is set to **ForgeSample/src/main/java** and the package is set to `forgesample` (our project name).

![](_media/java/Eclipse_maven_java_class.png)

Copy & paste the following content to the `config.java` file.

[config.java](_snippets/viewmodels/java/config.java ':include :type=code java')

> It's important to define **ID & Secret** as environment variables so our project can, later, be deployed online. More on this later, on **Deployment**.

Last we see there are 2 definitions about scopes. These scopes give our Token the right permission for the use of the different services of the Forge We Services. This tutorial is dedicated to the use of the Viewer only, we will only need the "viewables:read" scope.

Project is ready! At this point your project should have:

 ![](_media/java/Eclipse_config_class.png)

Next: [Authenticate](oauth/2legged/)