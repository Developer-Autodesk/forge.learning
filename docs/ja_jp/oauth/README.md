# OAuth

OAuth、特にOAuth2は、トークンベースの認証および承認のためにForgeプラットフォーム全体で使用されるオープンな標準です。

## 2本足と3本足

[2 本足のワークフロー](https://forge.autodesk.com/en/docs/oauth/v2/tutorials/get-2-legged-token/)([モデルの表示](/ja_jp/tutorials/viewmodels)チュートリアルで使用)および [3 本足のワークフロー](https://forge.autodesk.com/en/docs/oauth/v2/tutorials/get-3-legged-token/)([BIM 360 および Fusion モデルの表示](/ja_jp/tutorials/viewhubmodels)チュートリアルで使用)の詳細を学習します。

## スコープ

スコープは、トークンに設定される権限です。トークンは、そのトークンが動作するコンテキストです。たとえば、_data:read_ スコープを持つトークンは、Forge エコシステム内のデータの読み取りを許可され、そのスコープを必要とするエンドポイントで使用することができます。このスコープを持たないトークンは、そのようなエンドポイントへのアクセスが拒否されます。(個々のエンドポイント参照ページには、必要なスコープがリストされます)。

スコープは、次の2つの主要な機能を提供します。

- **プライバシーとコントロール**:3本足のコンテキストでは、エンドユーザに代わって特定の方法で行動する権限を要求し、保護する’メカニズムとして機能します。
- **セキュリティ**:2本足および3本足のコンテキストでは、トークンのコントロールが失われた場合に、意図しないリソースにアクセスするために誤って使用されないようにすることができます。

[詳細はこちら](https://forge.autodesk.com/en/docs/oauth/v2/overview/scopes/)

## パブリックおよび内部トークン

このチュートリアルでは、パブリックと内部の2種類のアクセストークンを使用します。**public** トークンは、クライアントでアクセス トークンを必要とし、実行する Forge Viewer に対して使用されます。このシナリオには特別なスコープがあります: **viewables:read**。 

サーバ側では書き込みアクセスが必要になるため、**internal** トークンは **bucket:create**、**bucket:read**、**data:read**、**data:create**、**data:write** のスコープを使用します。

> どのチュートリアルを実行すべきか分からないか 
> 
> 回答:アクセスして表示するファイルはどこにありますか? 
> 
> コンピュータまたはその他の場所にある場合は、**モデルを表示します。**モデルが BIM 360 (Team、Design、Docs)または Fusion Team 上にある場合は、** BIM 360 および Fusion モデルを表示**します。
>
> モデルを変更する場合は、**「モデルを変更する」チュートリアルを確認してください。**

次へ:[モデルを表示](/ja_jp/tutorials/viewmodels)または [BIM 360 と Fusion モデルを表示](/ja_jp/tutorials/viewhubmodels)または [モデルを修正](/ja_jp/tutorials/modifymodels)