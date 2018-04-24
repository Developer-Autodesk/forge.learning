# Running & Debugging (Java)

We will need to set our ENV Variables for both **FORGE_CLIENT_ID** and **FORGE_CLIENT_SECRET**

Make sure your Tomcat Server is not running and head over to menu **Run** and select **Run Configurations...**. 

 ![](_media/java/Eclipse_setup_server-env-vars.png) 

 With the Tomcat server selected, go ahead and select the Environment tab and select **New** to add them. We can keep the default settings.

 ![](_media/java/Eclipse_new_env_var.png) 

Finally, click **Apply** on the right bottom and close the dialog.

![](_media/java/Eclipse_new_env_var.png)

Now, we can Start our Tomcat server 

![](_media/java/Eclipse_start_server_final.png) 

Open your browser and go to `http://localhost:8080`

Next: [Deployment](deployment/)