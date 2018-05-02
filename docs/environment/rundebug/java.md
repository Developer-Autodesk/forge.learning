# Running & Debugging (Java)

Go to menu **File** --> **Project Structure**, select [Artifacts], on the right panel, select all [available elements], right click, Extract into WEB-INF/classes. click Apply button and exit the dialog.

 ![](_media/java/IntelliJ-IDEA_add_tomcat_server.png) 


Go to menu **Run** and select **Edit Configuration**. Click the sign **+** on the top left to add **TomCat Server**. We can keep the default settings, while rename the configuraion to 'mytest'. 

 ![](_media/java/IntelliJ-IDEA_tomcat_config.png) 

Finally, click **Fix** on the right bottom. cick [Apply], and exit the dialog.

Now, we can click **Run**-->**Debug**, select the configuraion created above, the project will be launching. 
 ![](_media/java/IntelliJ-IDEA_debug.png) 


Open your browser and go to `http://localhost:3000`

Next: [Viewer extension](tutorials/extensions)