# クライアント側ファイル(.NET Framework)

ASP.NETアプリは通常、`.html`の代わりに`.aspx`を使用しますが、このチュートリアルでは、単純にするために`.html`のみを使用します。

.NETサーバは、ルート`/`フォルダからファイルを提供するように設定されています。次のように整理してみましょう。

- `/`: `.html` (または他のプロジェクトの`.aspx`)
- `/js`: `.js`
- `/css`: `.css`

下のイメージは、次のセクションでファイルを作成した後のイメージです

![](_media/net/project_all_files.png)

> `Global.asax` & `packages.config`ファイル、`App_Data`、`App_Start`、`Model`フォルダが既定で作成されます。