# ハブとプロジェクトをリストする(データ管理)

[データ管理 API](https://forge.autodesk.com/en/docs/data/v2/overview/) は、BIM 360 Team、Fusion Team (旧 A360 Team)、BIM 360 Docs、A360 Personal の **ハブ**全体でデータにアクセスするための統合された一貫した方法を提供します。

![](_media/datamanagement/entities_and_domains.png)

BIM 360 Team、Fusion Team、BIM 360 Docs、A360 Personal、およびOSSデータにナビゲートしてアクセスするには、次の用語に精通している必要があります。

- `ハブ`\: BIM 360 Team ハブ、Fusion Team ハブ、BIM 360 Docs アカウント、または A360 Personal ハブ
- `プロジェクト`\: BIM 360 Team、Fusion Team、BIM 360 Docs、または A360 Personal プロジェクト
- `folders`\: プロジェクト内の項目の論理組織
- `items`\: dwg、pdf、Fusion の設計や図面など、1 つまたは複数のバージョンのファイルです
- `versions`\: アイテムの特定の状態。ファイルの特定のバージョンに類似
- `buckets`\: グローバルに一意な名前を持つオブジェクトのコンテナ
- `objects`\: URN またはキーで識別され、特定のバケットに格納されているバイナリ データ

> 各 **BIM 360 Docs** アカウントは、現在のユーザがアクセスできる 1 つのハブになります。これらのハブを識別するには、`attribute.extension.type` を **hub:autodesk.bim360:Account** にする必要があります。または、**id** の`b.接頭辞をチェックします。` 

![](_media/datamanagement/hub_extension_types.png)

このセクションでは、**ハブ**、**プロジェクト**、**フォルダ**、**項目**(ファイル)およびそれぞれの **バージョン**(ビューアで表示)のリストを返すエンドポイントを作成します。
 
言語を選択:[Node.js](datamanagement/hubs/nodejs) | [.NET Framework](datamanagement/hubs/net) | [.NET Core](datamanagement/hubs/netcore)
