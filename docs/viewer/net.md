# Client-side files (.NET Framework)

ASP.NET apps usually uses `.aspx` instead of `.html`, but for this tutorial let's just use `.html` for simplicity.

Our .NET server is configured to serve files from root `/` folder. Let's organize like this:

- `/`: `.html` (or `.aspx` for other projects)
- `/js`: `.js`
- `/css`: `.css`

The image below show it (after creating files on the next section)

![](_media/net/project_all_files.png)

> `Global.asax` & `packages.config` files, `App_Data`, `App_Start` & `Model` folders are created by default.