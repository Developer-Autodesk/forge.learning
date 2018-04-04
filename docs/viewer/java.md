# Client-side files (.NET)

Our JAVA server is configured to serve files from root `/forgesample` but we want to change it to serve from `/` folder. Let's fix that with the following steps:

Setting the path to nothing in the Eclipse web modules edit dialog enabled me to access the project without any path component in the URL (i.e. ROOT)

You can reach the web modules edit dialog by pressing F3 if you select Tomcat in the "Servers" view or by double clicking on it.

![](_media/java/Eclipse_server_root.png)


![](_media/java/Eclipse_web_module.png)


![](_media/java/Eclipse_root_empty.png)



JAVA EE web app usually generates an entry file `.jsp` instead `.html`, but for this tutorial let's just use `.html` for simplicity.

- `/`: `.html` (or `.jsp` for other projects)
- `/js`: `.js`
- `/css`: `.css`

The image below show it (after creating files on the next section)

![](_media/java/Eclipse_client_side.png)

Next: [Viewer (client-side)](viewer/viewer)