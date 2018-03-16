# Create a new project (JAVA EE)

Open [IntelliJ Ultimate](https://www.jetbrains.com/idea/), create a JAVA EE web application. Give a name for the project. For this tutorial, let's use **forgesample**. 

![](_media/java/IntelliJ-IDEA_create_web_app.png) 

In this project, right click the project title, select [Add Framework Support]. Next, select [Maven] as the configuration to manage external libraries. an pom.xml file will be generated.

![](_media/java/IntelliJ-IDEA_add_framework.png) 
![](_media/java/IntelliJ-IDEA_add_maven.png) 


Change [groupId] to the string that indicates your role such as **com.mycompany**. And input the configurations to the file:

```xml
<groupId>com.mycompany</groupId>
    <artifactId>forgesample</artifactId>
    <version>1.0-SNAPSHOT</version>

    <prerequisites>
        <maven>2.2.0</maven>
    </prerequisites>

    <build>
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
    <dependencies>

        <!-- JAVA SDK of Autodesk: com-autodesk-client -->

        <dependency>
            <groupId>com.autodesk</groupId>
            <artifactId>com-autodesk-client</artifactId>
            <version>1.0.1</version>
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
            <version>${junit-version}</version>
            <scope>test</scope>
        </dependency>
        <!-- https://mvnrepository.com/artifact/org.mockito/mockito-all -->
        <dependency>
            <groupId>org.mockito</groupId>
            <artifactId>mockito-all</artifactId>
            <version>1.9.5</version>
        </dependency> 

    </dependencies>
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

**IntelliJ** will pop out a message to ask you to [Import Changes], click it, all repositries will be imported. We can also set [Auto-Import]. 
![](_media/java/IntelliJ-IDEA_import_lib.png) 


Now, open **File**-->**Project Structure**, the repositries are listed at **Project Setting**-->**Libraries**.
![](_media/java/IntelliJ-IDEA_libs.png) 


Go to **Project Setting**-->**Modules**. Click the sign **+**, to add **TomCat**as some repositries are available with **TomCat**.
 ![](_media/java/IntelliJ-IDEA_modules.png) 
 ![](_media/java/IntelliJ-IDEA_add_tomcat_module.png) 


## Files and Folders

To create a new class file, right-click on the "src-->main-->java" folder on the left and select **New**--> **JAVA Class**. Let's create the **config.java** file firstly.

For consitency with other Forge samples, create a **/server/** folder for all server-side files and a **/www/** for all client-side files.
  

!> Note you need to enter your **Forge Client ID & Secret** at the indicated space of **config.java** file.

```java
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

 ![](_media/java/IntelliJ-IDEA_add_config_file.png) 

> The **.idea** was created by [IntelliJ Ultimate](https://www.jetbrains.com/idea/), don't worry :wink: 

Next: [Authenticate](oauth/2legged/)