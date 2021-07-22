# クライアント側ファイル(.NET Framework)

ASP.NET アプリは通常、`.html` の代わりに `.aspx` を使用しますが、このチュートリアルでは、わかりやすくするために `.html` を使用します。

.NET サーバは、ルート `/` フォルダからファイルを提供するように設定されています。次のように整理してみましょう。

- `/`: `.html` (または他のプロジェクトの場合は `.aspx`)
- `/js`: `.js`
- `/css`: `.css`

下のイメージは、次のセクションでファイルを作成した後のイメージです

![](_media/net/project_all_files.png)

> `Global.asax ` & `packages.config` ファイル、`App_Data`、`App_Start` および `Model` フォルダは既定で作成されます。