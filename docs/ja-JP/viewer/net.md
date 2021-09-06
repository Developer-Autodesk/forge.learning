# クライアント側ファイル(.NET Framework)

ASP.NET アプリでは通常、`.html` でなく `.aspx` が使用されますが、このチュートリアルでは分かりやすいように `.html` を使用します。

オートデスクの .NET サーバは、ルートの `/` フォルダのファイルを処理するように設定されています。次のように整理してみましょう。

- `/`: `.html` (他のプロジェクトの場合は `.aspx`)
- `/js`: `.js`
- `/css`: `.css`

以下の図に、次のセクションでファイルを作成した後の内容を示します。

![](_media/net/project_all_files.png)

> `Global.asax` および `packages.config`ファイル、`App_Data`、`App_Start`、および `Model` フォルダが既定で作成されます。