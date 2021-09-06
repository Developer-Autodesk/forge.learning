# OAuth

OAuth、特に OAuth2 は、トークンベースの認証および承認のために Forge プラットフォーム全体で使用されるオープンな標準です。

## 2-legged と 3-legged

[2-legged ワークフロー](https://forge.autodesk.com/en/docs/oauth/v2/tutorials/get-2-legged-token/)(「[モデルを表示する](tutorials/viewmodels)」チュートリアルで使用)および [3-legged ワークフロー](https://forge.autodesk.com/en/docs/oauth/v2/tutorials/get-3-legged-token/)(「[BIM 360 と Fusion のモデルを表示する](tutorials/viewhubmodels)」チュートリアルで使用)の詳細について説明します。

## スコープ

スコープとは、トークンに設定される権限のことで、そのトークンが機能できるコンテキストを表します。たとえば、_data:read_ スコープを持つトークンは、Forge エコシステム内のデータの読み取りが許可されていて、そのスコープを必要とするエンドポイントで使用できます。このスコープを持たないトークンは、このようなエンドポイントにアクセスしようとしても拒否されます。(個々のエンドポイント リファレンス ページに、必要なスコープが一覧表示されています。)

スコープは、次の 2 つの主要な機能を提供します。

- **プライバシーとコントロール**:3-legged のコンテキストでは、エンド ユーザに代わって指定した方法で動作する権限の要求および保護メカニズムとして機能します。
- **セキュリティ**2-legged および 3-legged のコンテキストでは、トークンのコントロールが失われても、トークンが誤って使用され、意図していないリソースへのアクセスが生じることはありません。

[詳細情報](https://forge.autodesk.com/en/docs/oauth/v2/overview/scopes/)

## パブリック トークンと内部トークン

このチュートリアルでは、パブリックと内部の 2 種類のアクセス トークンを使用します。**パブリック** トークンは Forge Viewer で使用されます。アクセス トークンが必要となり、クライアントで実行されます。このシナリオには、**viewables:read** という特別なスコープがあります。 

サーバ側では書き込みアクセスが必要なため、**内部**トークンは **bucket:create**、**bucket:read**、**data:read**、**data:create**、**data:write** のスコープを使用します。

> どのチュートリアルに従ったらよいか分かりません 
> 
> この質問に対する回答: アクセスして表示するファイルは、どこにありますか? 
> 
> コンピュータまたは他の場所にある場合は、**モデルを表示**します。モデルが BIM 360 (Team、Design、Docs)または Fusion Team である場合は、**BIM 360 と Fusion のモデルを表示**します。
>
> モデルを変更する場合は、「**モデルを修正する**」というチュートリアルを確認してください。

次の作業:[モデルを表示する](tutorials/viewmodels)、[BIM 360 と Fusion モデルを表示する](tutorials/viewhubmodels)、[モデルを修正する](tutorials/modifymodels)