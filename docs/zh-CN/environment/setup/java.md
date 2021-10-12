# 创建新项目 (JAVA EE)

打开 [Eclipse Java EE IDE for Web Developers](http://www.eclipse.org/downloads/packages/eclipse-ide-java-ee-developers/oxygen3)。编写本教程时，IDE 版本为 [Eclipse 2021-03 (4.19)](https://www.eclipse.org/downloads/packages/release/2021-03/r)

创建一个简单的 Maven 项目，并选择默认工作空间位置。单击 **Next**。选择“maven archetype”。在列表中，使用 **maven-archetype-webapp** 过滤 **Artifact Id**，选择 **org.apache.maven.archetypes**，然后单击 **Next**。

填写以下详细信息：在本教程中，我们在 **Group Id** 中输入 **com.yourcompany**，在 **Artifact Id** 中输入 **forgesample**。单击“Finish”。在右下角查看创建进度。此步骤将在 Eclipse 环境中创建 Maven 项目。 

![](_media/java/eclipse_create_project.gif)

!> 如果您看到错误“The superclass "javax.servlet.http.HttpServlet" was not found on the Java Build Path index.jsp `/forgesample/src/main/webapp`”，请将 Apache Tomcat 添加到“Targeted Runtimes”。依次转到项目属性和“Targeted Runtimes”，然后选中相应的复选框，如下所示。

![](_media/java/eclipse_HttpServlet.png)

![](_media/java/eclipse_target_runtime.png)


现在，将 **Targeted Runtimes** 设置为 **Apache Tomcat**，然后定义服务器，选择文件夹位置和要运行的项目。最后，依次选择 **Run as** >> **Run as Server**。（如果尚未安装 **Apache Tomcat**，请从 [Apache Tomcat](https://tomcat.apache.org/download-90.cgi) 下载）

![](_media/java/eclipse_run_tomcat.gif)

!> 如果 Markers 中显示 Maven 错误，请运行以下 **Run As - Maven Clean**

在继续操作之前，我们将切换服务器的端口，以便与后续教程保持相似。 

![](_media/java/eclipse_change_server_port.gif)

Eclipse 将在 IDE 中运行一个本地页面，其中显示“Hello World!”，您也可以随时访问 http://localhost:3000/forgesample/index.jsp 查看结果。

![](_media/java/eclipse_helloworld_default.png)

要确保运行的是您的 index.jsp，请转到 **src/main/webapp/index.jsp**，然后将文本从“Hello World!”更改为“Hello Forge!”

## 更改默认主机 URL
执行完上述步骤后，我们的 Java 服务器配置为从 `/forgesample` 提供文件，因此默认主机 URL 为 http://localhost:3000/forgesample/。在构建 HTTP endpoint 的步骤中，连接 URL 将被映射为如下格式：http://localhost:3000/api/forge/oauth/token、http://localhost:3000/api/forge/oss/buckets，默认主机 URL 需要更新为 http://localhost:3000。

因此，我们通过在 Eclipse Web 模块中将路径设置为空路径来解决问题，这样就可以在 URL 中不包含任何路径组成部分的情况下访问项目（即 ROOT）。找到 Tomcat 服务器页面，单击页面左下角的 **Modules** 选项卡。在 **Web Modules** 列表中，选择“forgesample”。接下来，单击 __Edit__。在弹出对话框中，将路径更改为“/”。单击“OK”并保存更新。

![](_media/java/eclipse_webmodules_path.gif)

![](_media/java/eclipse_server_default_host.png)

现在，单击此 Maven 项目，依次选择 **Run as** >> **Run as Server**。Eclipse 将在 IDE 中运行一个本地页面，其中显示“Hello World!”，您也可以随时访问 http://localhost:3000/index.jsp 查看结果。

![](_media/java/eclipse_helloworld_default_new_host.png)


现已准备就绪，您的服务器成功运行。:)

## 设置 Pom.xml

打开 `pom.xml` 文件（通过 **Project Explorer**），复制并粘贴以下内容。将 \[groupId] 更改为指示您的角色的字符串，例如 **com.mycompany**。

Maven 3.0 及更高版本已弃用 LATEST 和 RELEASE metaversion（[请参见此讨论](https://stackoverflow.com/questions/30571/how-do-i-tell-maven-to-use-the-latest-version-of-a-dependency)），如果您需要最新版本的 **Forge JAVA SDK**，请查看 [Maven Center](https://search.maven.org/search?q=a:forge-java-sdk)，并相应地更新为特定版本号。 
  ```
    <dependency>
            <groupId>com.autodesk</groupId>
            <artifactId>forge-java-sdk</artifactId> 
            <version> input the latest version if needed </version>
    </dependency>
  ```

!> 注意：编写本教程时，采用的是 Tomcat 9.0 或 8.5。如果使用 Tomcat 10 及更高版本，则 javax.* 软件包重命名为 jakata.* 软件包。以下答案提供了适用于 Tomcat 10+、Tomcat 9-、JEE 9+ 和 JEE 8- 的正确 pom.xml 声明示例：[Tomcat 将 servlet 转换为 javax.servlet.Servlet 而不是 jakarta.servlet.http.HttpServlet](https://stackoverflow.com/questions/65703840/tomcat-casting-servlets-to-javax-servlet-servlet-instead-of-jakarta-servlet-http/65704617#65704617) 

[pom.xml](_snippets/viewmodels/java/pom.xml ':include :type=code xml')

Markers 中将弹出新错误，我们需要更新 Maven 项目以处理之前添加的所有新依存关系。在项目上单击鼠标右键，然后依次单击 **Maven** >> **Update Project**。

![](_media/java/Eclipse_maven_error.png) 

![](_media/java/Eclipse_maven_update_project.png)

## 文件和文件夹

在 **src/main** 文件夹上单击鼠标右键，然后依次单击 **New** >> **Folder**，将其命名为 **java**。

![](_media/java/Eclipse_tree_structure_java_folder.png)

要创建新的类文件，请在项目上单击鼠标右键，然后依次选择 **New** >> **Class**。首先创建 **config.java** 文件。

!> 请确保 **Source Folder** 设置为 **ForgeSample/src/main/java**，并且“Package”设置为 `forgesample`（我们的项目名称）。

![](_media/java/Eclipse_maven_java_class.png)

将以下内容复制并粘贴到 `config.java` 文件。

[config.java](_snippets/viewmodels/java/config.java ':include :type=code java')

> 请务必将 **ID 和 Secret** 定义为环境变量，以便日后可以在线部署项目。稍后将在**部署**中详细介绍此内容。

最后，我们看到有 2 个有关范围的定义。这些范围为 token 提供适当权限，以使用 Forge Web 服务的不同服务。本教程专门介绍 Viewer 的使用，我们只需要“viewables:read”范围。

项目已准备就绪！此时，项目应如下所示：

 ![](_media/java/Eclipse_config_class.png)

下一步：[身份验证](/zh-CN/oauth/2legged/)