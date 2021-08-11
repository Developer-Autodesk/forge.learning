# ハブとプロジェクトをリストする(データ管理)

[データ管理 API](https://forge.autodesk.com/en/docs/data/v2/overview/) は、BIM 360 Team、Fusion Team (旧 A360 Team)、BIM 360 Docs、A360 Personal の **ハブ**全体でデータにアクセスするための統合された一貫した方法を提供します。

![](_media/datamanagement/entities_and_domains.png)

BIM 360 Team、Fusion Team、BIM 360 Docs、A360 Personal、およびOSSデータにナビゲートしてアクセスするには、次の用語に精通している必要があります。

- `hubs`: BIM 360 Teamハブ、Fusion Teamハブ、BIM 360 Docsアカウント、またはA360パーソナルハブ
- `projects`: BIM 360 Team、Fusion Team、BIM 360 Docs、またはA360パーソナルプロジェクト
- `folders`:プロジェクト内の項目の論理組織
- `items`: dwg、pdf、Fusionの設計や図面など、1つまたは複数のバージョンのファイル
- `versions`:アイテムの特定の状態。ファイルの特定のバージョンに類似
- `buckets`:グローバルに一意の名前を持つオブジェクトのコンテナ
- `objects`:特定のバケットに格納されているURNまたはキーで識別されるバイナリデータ

> 各 **BIM 360 Docs** アカウントは、現在のユーザがアクセスできる 1 つのハブになります。これらのハブを識別するには、`attribute.extension.type` が **hub:autodesk.bim360:Account** である必要があります。または、**id** の `b.` 接頭辞を確認します。 

![](_media/datamanagement/hub_extension_types.png)

このセクションでは、**ハブ**、**プロジェクト**、**フォルダ**、**項目**(ファイル)およびそれぞれの **バージョン**(ビューアで表示)のリストを返すエンドポイントを作成します。
 
言語を選択:[Node.js](/ja_jp/datamanagement/hubs/nodejs) | [.NET Framework](/ja_jp/datamanagement/hubs/net) | [.NET Core](/ja_jp/datamanagement/hubs/netcore)
