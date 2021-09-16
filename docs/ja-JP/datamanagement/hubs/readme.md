# ハブとプロジェクトを一覧表示する(Data Management)

[Data Management API](https://forge.autodesk.com/en/docs/data/v2/overview/) は、BIM 360 Team、Fusion Team (旧 A360 Team)、BIM 360 Docs、A360 Personal の**ハブ**全体でデータにアクセスするための統合された一貫性のある方法を提供します。

![](_media/datamanagement/entities_and_domains.png)

BIM 360 Team、Fusion Team、BIM 360 Docs、A360 Personal、および OSS データにナビゲートしてアクセスするには、次の用語に精通している必要があります。

- `hubs`: BIM 360 Team ハブ、Fusion Team ハブ、BIM 360 Docs アカウント、または A360 Personal ハブ
- `projects`: BIM 360 Team、Fusion Team、BIM 360 Docs、または A360 Personal プロジェクト
- `folders`: プロジェクト内のアイテムを論理的に整理したもの
- `items`: dwg、pdf、または Fusion の設計や図面など、1 つまたは複数のバージョンのファイル
- `versions`: アイテムの特定の状態。ファイルの特定のバージョンに似ています
- `buckets`: グローバルに一意の名前を持つオブジェクトのコンテナ
- `objects`: 特定のバケットに格納されている URN またはキーで識別されるバイナリ データ

> **BIM 360 Docs** の各アカウントは、現在のユーザがアクセスできる 1 つのハブになります。これらのハブを識別するには、`attribute.extension.type` が **hubs:autodesk.bim360:Account** である必要があります。または、**id** の `b.` 接頭語を確認します。 

![](_media/datamanagement/hub_extension_types.png)

このセクションでは、**ハブ**、**プロジェクト**、**フォルダ**、**アイテム**(ファイル)およびそれぞれの**バージョン**(ビューアで表示)の戻り値リストへの端点を作成します。
 
言語を選択:[Node.js](/ja-JP/datamanagement/hubs/nodejs) | [.NET Framework](/ja-JP/datamanagement/hubs/net) | [.NET Core](/ja-JP/datamanagement/hubs/netcore)
