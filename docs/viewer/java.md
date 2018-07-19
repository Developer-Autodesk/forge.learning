# Client-side files (Java)

Our Java server is configured to serve files from `/forgesample` but we want to change it to serve from `/` folder. Let's fix by setting the path to nothing in the Eclipse web modules, which enables access the project without any path component in the URL (i.e. ROOT). You can reach the web modules edit dialog by double clicking on it.

![](_media/java/eclipse_webmodules_path.gif)

Java EE web app usually generates an entry file `.jsp` instead `.html`, but for this tutorial let's just use `.html` for simplicity.

- `/`: `.html` (or `.jsp` for other projects)
- `/js`: `.js`
- `/css`: `.css`

Create these folders under `webapp` folder, the image below show it (after creating files on the next section)

![](_media/java/Eclipse_client_side.png)