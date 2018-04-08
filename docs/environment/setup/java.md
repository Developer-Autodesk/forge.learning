# Create a new project (JAVA EE)

Open [Eclipse Java EE IDE for Web Developers](http://www.eclipse.org/downloads/packages/eclipse-ide-java-ee-developers/oxygen3), create a simple Maven project and select default Workspace location. 

![](_media/java/Eclipse_new_maven_project.png) 


Select the maven archetype as: **maven-archetype-webapp** and click on next

![](_media/java/Eclipse_maven_archetype.png) 

Fill out below details and click Finish. This step creates Maven Project in your Eclipse Environment. For this tutorial, we will name it **forgesample**.  

![](_media/java/Eclipse_new_maven_project_name.png) 

If you see error “The superclass “javax.servlet.http.HttpServlet” was not found on the Java Build Path index.jsp `/forgesample/src/main/webapp` add Apache Tomcat to your Targeted Runtimes. You get there by going to the project properties and then Targeted Runtimes, check the box as indicated below.

![](_media/java/Eclipse_apache_tomcat_targeted_runtime.png) 


Your Maven Project should look like this.

![](_media/java/Eclipse_tree_structure.png) 

Now build project with “Maven Clean Install” to check there isn’t any dependency issue with project. 

![](_media/java/Eclipse_maven_build_select.png) 

![](_media/java/Eclipse_maven_build_configuration.png) 

![](_media/java/Eclipse_build_success.png) 


Deploy Application on Apache Tomcat Server.

Steps:


![](_media/java/Eclipse_run_as_server.png) 

![](_media/java/Eclipse_setup_server.png) 



When done, click Finish. Eclipse will run a local page in your IDE showing you Hello World! or you can always visit http://localhost:8080/forgesample/index.jsp to see your result.

To make sure it is your index.jsp the one running, go src/main/webapp/index.jsp and change the text from Hello World! to Hello Forge!

![](_media/java/Eclipse_hello_forge.png) 

You are all set, your Server is running succesfully now. :)

## Setup Pom.xml


Change [groupId] to the string that indicates your role such as **com.mycompany**. And input the configurations to the file:

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <groupId>com.mycompany</groupId>
  <artifactId>ForgeSample</artifactId>
  <packaging>war</packaging>
  <version>0.0.1-SNAPSHOT</version>
  <name>ForgeSample Maven Webapp</name>
  <url>http://maven.apache.org</url>
  <dependencies>
      <!-- JAVA SDK of Autodesk: com-autodesk-client -->
        <dependency>
            <groupId>com.autodesk</groupId>
            <artifactId>com-autodesk-client</artifactId>
            <version>1.0.0</version>
        </dependency>
        <dependency>
            <groupId>com.sun.jersey</groupId>
            <artifactId>jersey-json</artifactId>
            <version>1.18.1</version>
        </dependency>
        <dependency>
            <groupId>com.owlike</groupId>
            <artifactId>genson</artifactId>
            <version>0.99</version>
        </dependency>
        <!-- https://mvnrepository.com/artifact/commons-fileupload/commons-fileupload -->
        <dependency>
            <groupId>commons-fileupload</groupId>
            <artifactId>commons-fileupload</artifactId>
            <version>1.3</version>
        </dependency>
        <dependency>
            <groupId>io.swagger</groupId>
            <artifactId>swagger-annotations</artifactId>
            <version>${swagger-annotations-version}</version>
        </dependency>
        <!-- HTTP client: jersey-client -->
        <dependency>
            <groupId>com.sun.jersey</groupId>
            <artifactId>jersey-client</artifactId>
            <version>${jersey-version}</version>
        </dependency>
        <dependency>
            <groupId>com.sun.jersey.contribs</groupId>
            <artifactId>jersey-multipart</artifactId>
            <version>${jersey-version}</version>
        </dependency>
        <!-- JSON processing: jackson -->
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-core</artifactId>
            <version>${jackson-version}</version>
        </dependency>
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-annotations</artifactId>
            <version>${jackson-version}</version>
        </dependency>
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-databind</artifactId>
            <version>${jackson-version}</version>
        </dependency>
        <dependency>
            <groupId>com.fasterxml.jackson.jaxrs</groupId>
            <artifactId>jackson-jaxrs-json-provider</artifactId>
            <version>${jackson-version}</version>
        </dependency>
        <dependency>
            <groupId>com.fasterxml.jackson.datatype</groupId>
            <artifactId>jackson-datatype-joda</artifactId>
            <version>${jackson-version}</version>
        </dependency>
        <dependency>
            <groupId>joda-time</groupId>
            <artifactId>joda-time</artifactId>
            <version>${jodatime-version}</version>
        </dependency>
        <!-- Base64 encoding that works in both JVM and Android -->
        <dependency>
            <groupId>com.brsanthu</groupId>
            <artifactId>migbase64</artifactId>
            <version>2.2</version>
        </dependency>
        <dependency>
            <groupId>com.googlecode.json-simple</groupId>
            <artifactId>json-simple</artifactId>
            <version>1.1</version>
        </dependency>
        <!-- http://mvnrepository.com/artifact/org.apache.httpcomponents/httpclient -->
        <dependency>
            <groupId>org.apache.httpcomponents</groupId>
            <artifactId>httpclient</artifactId>
            <version>4.5</version>
        </dependency>
        <dependency>
            <groupId>org.json</groupId>
            <artifactId>json</artifactId>
            <version>20160212</version>
        </dependency>

        <!-- test dependencies -->
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>3.8.1</version>
            <scope>test</scope>
        </dependency>
        <!-- https://mvnrepository.com/artifact/org.mockito/mockito-all -->
        <dependency>
            <groupId>org.mockito</groupId>
            <artifactId>mockito-all</artifactId>
            <version>1.9.5</version>
        </dependency> 
    <dependency>
     <groupId>javax.servlet</groupId>
     <artifactId>javax.servlet-api</artifactId>
     <version>3.1.0</version>
    </dependency>
  </dependencies>
  <build>
    <finalName>ForgeSample</finalName>
    <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-surefire-plugin</artifactId>
                <version>2.12</version>
                <configuration>
                    <systemProperties>
                        <property>
                            <name>loggerPath</name>
                            <value>conf/log4j.properties</value>
                        </property>
                    </systemProperties>
                    <argLine>-Xms512m -Xmx1500m</argLine>
                    <parallel>methods</parallel>
                    <forkMode>pertest</forkMode>
                </configuration>
            </plugin>
            <plugin>
                <artifactId>maven-dependency-plugin</artifactId>
                <executions>
                    <execution>
                        <phase>package</phase>
                        <goals>
                            <goal>copy-dependencies</goal>
                        </goals>
                        <configuration>
                            <outputDirectory>${project.build.directory}/lib</outputDirectory>
                        </configuration>
                    </execution>
                </executions>
            </plugin>

            <!-- attach test jar -->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-jar-plugin</artifactId>
                <version>2.2</version>
                <executions>
                    <execution>
                        <goals>
                            <goal>jar</goal>
                            <goal>test-jar</goal>
                        </goals>
                    </execution>
                </executions>
                <configuration>
                </configuration>
            </plugin>

            <plugin>
                <groupId>org.codehaus.mojo</groupId>
                <artifactId>build-helper-maven-plugin</artifactId>
                <version>1.10</version>
                <executions>
                    <execution>
                        <id>add_sources</id>
                        <phase>generate-sources</phase>
                        <goals>
                            <goal>add-source</goal>
                        </goals>
                        <configuration>
                            <sources>
                                <source>src/main/java</source>
                            </sources>
                        </configuration>
                    </execution>
                    <execution>
                        <id>add_test_sources</id>
                        <phase>generate-test-sources</phase>
                        <goals>
                            <goal>add-test-source</goal>
                        </goals>
                        <configuration>
                            <sources>
                                <source>src/test/java</source>
                            </sources>
                        </configuration>
                    </execution>
                </executions>
            </plugin>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>2.3.2</version>
                <configuration>
                    <source>1.7</source>
                    <target>1.7</target>
                </configuration>
            </plugin>
        </plugins>
  </build>
  <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <swagger-annotations-version>1.5.8</swagger-annotations-version>
        <jersey-version>1.19.1</jersey-version>
        <jackson-version>2.7.5</jackson-version>
        <jodatime-version>2.9.4</jodatime-version>
        <maven-plugin-version>1.0.0</maven-plugin-version>
        <junit-version>4.12</junit-version>
  </properties> 
</project>
```

A new Error will pop up in your Markers, we will need to update the MAven project to address all the new dependencies we have previously added. 

![](_media/java/Eclipse_maven_error.png)


![](_media/java/Eclipse_maven_update_select.png)


![](_media/java/Eclipse_maven_update_project.png)

## Files and Folders

To create a new class file, right-click on the "src-->main-->java" folder on the left and select **New**--> **JAVA Class**. Let's create the **config.java** file firstly.

!> Note you need to enter your **Forge Client ID & Secret** at the indicated space of **config.java** file.

```java
import java.util.ArrayList;

public class config {

    // set environment variables or hard-code here 
    public static class credentials{
        public static String client_id = System.getenv("FORGE_CLIENT_ID");
        public static String client_secret = System.getenv("FORGE_CLIENT_SECRET");
    }; 

    // Required scopes for your application on server-side
    public static ArrayList<String> scopeInternal = new ArrayList<String>() {{
        add("bucket:create");
        add("bucket:read");
        add("data:read");
        add("data:create");
        add("data:write");
    }};

    // Required scope of the token sent to the client
    public static ArrayList<String> scopePublic = new ArrayList<String>() {{
        add("viewables:read");
    }};

}
```

> It's important to define **ID & Secret** as environment variables so our project can, later, be deployed online. More on this later, on **Deployment**.

The purpouse of this file is to ensure our running server is what we expect. More on this later. 

Last we see there are 2 definitions about scopes. These scopes give our Token the right permission for the use of the different services of the Forge We Services. This tutorial is dedicated to the use of the Viewer only, we will only need the "viewables:read" scope.

Project is ready! At this point your project should have:

 ![](_media/java/Eclipse_config_class.png)

Next: [Authenticate](oauth/2legged/)