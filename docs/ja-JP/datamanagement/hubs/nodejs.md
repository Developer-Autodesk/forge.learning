# ハブとプロジェクトを一覧表示する(Node.js)

## routes/datamanagement.js

次の内容を含む `routes/datamanagement.js` ファイルを作成します。

[routes/datamanagement.js](_snippets/viewhubmodels/node/routes/datamanagement.1.js ':include :type=code javascript')

上記は、UI ツリーから要求を受け取ります。`id` パラメータは展開されているノードを示します。`#` はルート ノードを意味し、ハブを一覧表示します。その後、リソースの `href` が含まれるため、1 つの `hub` を展開すると、エンドポイントはハブのプロジェクトを返します。上記のコードは、異なる `get` 関数を呼び出します。この作業を完了するには、次の内容もファイルにコピーします。

[routes/datamanagement.js](_snippets/viewhubmodels/node/routes/datamanagement.2.js ':include :type=code javascript')

最後の `get` 関数は、各項目(ファイル)の**バージョン**を返します。`.relationships.derivatives.data.id` プロパティには、**ビューア**の `URN` が含まれます。一部の項目は、表示可能な項目(ZIP ファイルや DOCx ファイルなど)がない場合や、まだ変換されていない場合があるため、この属性が使用可能かどうかをテストすることが重要です。

ここで、`routes/common/oauth.js` からの認証ヘルパーを再利用する方法に注意してください。

次の作業:[ユーザ情報](oauth/user/readme)