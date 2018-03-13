# Client-side files (.NET)

JAVA apps usually uses `.jsp` instead `.html`, but for this tutorial let's just use `.html` for simplicity.

Our JAVA server is configured to serve files from root `/` folder. Let's organize like this:

- `/`: `.html` (or `.jsp` for other projects)
- `/js`: `.js`
- `/css`: `.css`

The image below show it (after creating files on the next section)

![](_media/java/IntelliJ-IDEA-project_all_files_client.png)

> `web.xml` & `index.jsp-` files, `src` folders are created by JAVA EE by [IntelliJ IDEA](https://www.jetbrains.com/idea/). `index.jsp` is created by default as the main page, but for this tutorial, we use `index.html`. So make the `index.jsp` to `index.jsp-` to reserve in case of use.

Next: [Viewer (client-side)](viewer/viewer)