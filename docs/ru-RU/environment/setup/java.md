# Создание нового проекта (JAVA EE)

Откройте [Eclipse Java EE IDE for Web Developers](http://www.eclipse.org/downloads/packages/eclipse-ide-java-ee-developers/oxygen3), создайте простой проект Maven и выберите Workspace location по умолчанию. Нажмите на **Next**.

Выберите архетип Maven (т.е. шаблон нового проекта). Примените фильтр к **Artifact Id**, выбрав **maven-archetype-webapp**, и нажмите на **Next**.

Заполните следующие данные: для этого руководства мы дадим **Group Id** название **com.yourcompany**, а **Artifact Id** - **forgesample**. Нажмите "Finish". На этом этапе создается проект Maven в вашей среде Eclipse, прогресс создания проекта доступен в правом нижнем углу

![](_media/java/eclipse_create_project.gif)

!> Если вы видите ошибку “The superclass “javax.servlet.http.HttpServlet” was not found on the Java Build Path index.jsp `/forgesample/src/main/webapp`, добавьте Apache Tomcat в вашу целевую среду выполнения (англ. Targeted Runtimes). Вы попадаете туда, перейдя в project properties --> Targeted Runtimes, поставьте галочку, как показано ниже.

Теперь настройте **Targeted Runtime** на **Apache Tomcat**, определите сервер, выберите нахождение папки и проект, который нужно запустить. И, наконец, нажмите на **Run as** >> **Run as Server**.

![](_media/java/eclipse_run_tomcat.gif)

!> Если в Markers отображается ошибка Maven, запустите следующую команду **Run As - Maven Clean**

Прежде чем мы продолжим, мы переключим PORT сервера, чтобы сохранить постоянство в работе с руководствами этого курса.

![](_media/java/eclipse_change_server_port.gif)

Eclipse запустит локальную страницу в интегрированной среде разработки с "Hello World!" (или же вы можете перейти по ссылке http://localhost:3000/forgesample/index.jsp, чтобы посмотреть на полученный результат).

Чтобы убедиться, что запущен именно ваш index.jsp, перейдите в **src/main/webapp/index.jsp** и измените текст с Hello World! на Hello Forge!

Все готово, теперь ваш сервер работает успешно. :)

## Setup Pom.xml

Откройте файл `pom.xml`(через **Project Explorer**), скопируйте и вставьте код ниже. Поменяйте [groupId] на строку, которая отображает вашу роль (например, **com.mycompany**).

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <groupId>com.mycompany</groupId>
  <artifactId>forgesample</artifactId>
  <packaging>war</packaging>
  <version>0.0.1-SNAPSHOT</version>
  <name>ForgeSample Maven Webapp</name>
  <url>http://maven.apache.org</url>
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

В ваших Markers появится новая ошибка - нам нужно будет обновить проект Maven, чтобы устранить все новые зависимости, которые мы добавили ранее. Щелкните на проект правой кнопкой мыши, затем нажмите **Maven** >> **Update Project**.

![](_media/java/Eclipse_maven_error.png) 

![](_media/java/Eclipse_maven_update_project.png)

## Файлы и папки

Щелкните правой кнопкой мыши  на папку **src/main**, затем **New** >> **Folder**, назовите ее **java**.

![](_media/java/Eclipse_tree_structure_java_folder.png)

Чтобы создать новый файл класса, щелкните на проект правой кнопкой мыши и выберите **New** >> **Class**. Сначала создадим файл **config.java**.

!> Убедитесь, что для **Source Folder** установлено значение **ForgeSample/src/main/java**, а для пакета установлено значение `forgesample` (название нашего проекта).

![](_media/java/Eclipse_maven_java_class.png)

Скопируйте и вставьте следующий код в файл `config.java`.

```java
package forgesample;

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

> Важно определить ID & Secret как переменные среды, чтобы наш проект мог быть запущен в вебе. Подробнее об этом в разделе **Развертывание**. 

И, наконец, мы видим, что у области действия есть два определения. Эти области дают нашему токену право на использование различных веб-сервисов Forge. Это руководство посвящено использованию Forge Viewer, поэтому нам понадобится только область действия "viewables:read".

Проект готов! На этом этапе он должен иметь: 

 ![](_media/java/Eclipse_config_class.png)

Далее: [Аутентификация](/ru-RU/oauth/2legged/)

[Эта страница на английском языке](https://learnforge.autodesk.io/#/environment/setup/java).
