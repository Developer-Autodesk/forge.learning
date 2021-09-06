# ビューア(クライアント側)

クライアント側で必要な 4 つのファイルを作成してみましょう。

## Index.html

このファイルが、アプリの入り口になります。この例では、[DOM](https://www.w3schools.com/js/js_htmldom.asp) の操作に [jQuery](https://jquery.com)、スタイル設定に [Bootstrap](https://getbootstrap.com/)、バケットとオブジェクトの一覧表示に [jsTree](https://www.jstree.com) を使用します。これらのすべてのライブラリは [CDN](https://cdnjs.com/) ([Content Delivery Network](https://en.wikipedia.org/wiki/Content_delivery_network))から取得されています。

もちろん、Autodesk Forge Viewer ライブラリ(/ja-JP/viewer3d.min.js、three.min.js、style.min.css)も使用されます。

次の内容を含む **index.html** ファイルを作成します。

<!-- tabs:start -->

#### \** Viewer v7 \*\*

[index.html](_snippets/viewhubmodels/common/index.v7.html ':include :type=code html')

#### \** Viewer v6 \*\*

[index.html](_snippets/viewhubmodels/common/index.v6.html ':include :type=code html')

#### \** 移行ガイド \*\*

v6 以前を使用していた開発者が v7 にアップグレードするための完全なガイドについては、[Forge の Web サイト](https://forge.autodesk.com/en/docs/viewer/v7/change_history/changelog_v7/migration_guide_v6_to_v7/)をご覧ください。

<!-- tabs:end -->

## Main.css

CSS は、HTML ドキュメントのスタイルを記述する言語です。詳細については、[W3Schools](https://www.w3schools.com/css/) を参照してください。このチュートリアルでは、`css` フォルダ内に次の内容を含む **main.css** を作成します。

[main.css](_snippets/viewhubmodels/common/main.css ':include :type=code css')

## ForgeTree.js

このファイルで、**ハブ**、**プロジェクト**、**プロジェクト**、**フォルダ**、**項目**、**バージョン**を一覧表示するツリー ビューが処理されます。`js` フォルダ内に、次の内容を含む **ForgeTree.js** ファイルを作成します。

[ForgeTree.js](_snippets/viewhubmodels/common/ForgeTree.js ':include :type=code javascript')

## ForgeViewer.js

このファイルで Viewer の初期化が処理されるようになりました。`js` フォルダ内に、次の内容を含む **ForgeViewer.js** ファイルを作成します。

<!-- tabs:start -->

#### \** Viewer v7 \*\*

次のコードは、Autodesk Forge Viewer [Basic](https://forge.autodesk.com/en/docs/viewer/v7/developers_guide/viewer_basics/initialization/) のチュートリアルに基づいています。

[ForgeViewer.js](_snippets/viewhubmodels/common/ForgeViewer.v7.js ':include :type=code javascript')

#### \** Viewer v6 \*\*

次のコードは、Autodesk Forge Viewer [Basic アプリケーション](https://forge.autodesk.com/en/docs/viewer/v6/tutorials/basic-application/)のチュートリアルに基づいています。

[ForgeViewer.js](_snippets/viewhubmodels/common/ForgeViewer.v6.js ':include :type=code javascript')

#### \** 移行ガイド \*\*

v6 以前を使用していた開発者が v7 にアップグレードするための完全なドキュメントについては、『[Forge 移行ガイド](https://forge.autodesk.com/en/docs/viewer/v7/change_history/changelog_v7/migration_guide_v6_to_v7/)』を参照してください。

<!-- tabs:end -->

要約すると、UI 側では、アプリに Index.html、Main.css、ForgeTree.js、ForgeViewer.js という 4 つのファイルが必要です。

すべての設定が完了したら、アプリを実行できます。

次の作業:[アプリを実行する](/ja-JP/environment/rundebug/3legged)
