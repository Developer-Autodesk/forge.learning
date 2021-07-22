# ビューア(クライアント側)

クライアント側で必要な4つのファイルを作成します。

## Index.html

これは、アプリケーションのエントリポイントです。このサンプルでは、[jQuery](https://jquery.com) を [DOM](https://www.w3schools.com/js/js_htmldom.asp) 操作、[Bootstrap](https://getbootstrap.com/) をスタイル設定用に、[jsTree](https://www.jstree.com) を使用してバケットとオブジェクトをリストします。これらのライブラリはすべて [CDN](https://cdnjs.com/) ([Content Delivery Network](https://en.wikipedia.org/wiki/Content_delivery_network))から取得されています。

そして、Autodesk Forgeビューアライブラリは、viewer3d.min.js、three.min.js、style.min.cssです。

**index.html** ファイルを作成します。

<!-- tabs:start -->

#### \** Viewer v7 \*\*

[index.html](_snippets/viewmodels/common/index.v7.html ':include :type=code html')

#### \** Viewer v6 \*\*

[index.html](_snippets/viewmodels/common/index.v6.html ':include :type=code html')

#### \*\*マイグレーションガイド**

v6 (またはそれ以前)を使用していて v7 にアップグレードする開発者のための完全なガイドについては、[Forge の Web サイト ](https://forge.autodesk.com/en/docs/viewer/v7/change_history/changelog_v7/migration_guide_v6_to_v7/) をご覧ください。

<!-- tabs:end -->


## Main.css

CSSは、HTMLドキュメントのスタイルを説明する言語です。詳細については、[W3Schools](https://www.w3schools.com/css/) をご覧ください。このチュートリアルでは、`css` フォルダの下に **main.css** を作成し、次の内容を指定します。

[main.css](_snippets/viewmodels/common/main.css ':include :type=code css')

## ForgeTree.js

このファイルは、すべてのバケットを一覧表示するツリービューを処理します。`js` フォルダの下に、次の内容で **ForgeTree.js** ファイルを作成します。

[ForgeTree.js](_snippets/viewmodels/common/ForgeTree.js ':include :type=code javascript')

## ForgeViewer.js

このファイルはビューアの初期化を処理するようになりました。`js` フォルダで、次のファイルを使用して **ForgeViewer.js** ファイルを作成します。

<!-- tabs:start -->

#### \** Viewer v7 \*\*

次のコードは、Autodesk Forge Viewer [基本](https://forge.autodesk.com/en/docs/viewer/v7/developers_guide/viewer_basics/initialization/)チュートリアルに基づいています。

[ForgeViewer.js](_snippets/viewmodels/common/ForgeViewer.v7.js ':include :type=code javascript')

#### \** Viewer v6 \*\*

次のコードは、Autodesk Forge Viewer [基本アプリケーション](https://forge.autodesk.com/en/docs/viewer/v6/tutorials/basic-application/)のチュートリアルに基づいています。

[ForgeViewer.js](_snippets/viewmodels/common/ForgeViewer.v6.js ':include :type=code javascript')

#### \*\*マイグレーションガイド**

v6 (またはそれ以前)を使用していて v7 にアップグレードしようとしている開発者の詳細なドキュメントについては、[Forge Migration Guide](https://forge.autodesk.com/en/docs/viewer/v7/change_history/changelog_v7/migration_guide_v6_to_v7/) を参照してください。

<!-- tabs:end -->

要約すると、UI側では、アプリに4つのファイルが必要です: - Index.html - Main.css - ForgeTree.js - ForgeViewer.js

準備は?アプリを実行する時間が来ました。

次へ:[アプリを実行する](/ja_jp/environment/rundebug/2legged)
