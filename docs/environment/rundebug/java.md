# Running & Debugging (Java)

We will need to set our ENV Variables for both **FORGE_CLIENT_ID** and **FORGE_CLIENT_SECRET**.

Make sure your Tomcat Server is NOT running and head over to menu **Run** and select **Run Configurations...**. Select the Tomcat server on the left tree, go ahead and select the **Environment** tab and click **New** to add a variable. We can keep the default settings. 

 ![](_media/java/Eclipse_new_env_var.png) 

 > Make sure to add both **FORGE_CLIENT_ID** and **FORGE_CLIENT_SECRET**.

Finally, click **Apply** on the right bottom and close the dialog.

Now, we can Start our Tomcat server 

![](_media/java/Eclipse_start_server_final.png) 

Open your browser and go to `http://localhost:3000`

Next: [Viewer extension](tutorials/extensions)