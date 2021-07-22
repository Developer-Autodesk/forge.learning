# ハブとプロジェクトをリストする(Node.js)

## routes/datamanagement.js

次の内容で `routes/datamanagement.js` ファイルを作成します。

[routes/datamanagement.js](_snippets/viewhubmodels/node/routes/datamanagement.1.js ':include :type=code javascript')

上記は、UIツリーから要求を受け取ります。`id` パラメータは展開されているノードを示します。`#` はルート ノードを意味し、ハブをリストします。その後、リソースの `href` が含まれるため、1 つの `hub` を展開すると、エンドポイントはハブのプロジェクトを返す必要があります。上記のコードは、異なる `get` 関数を呼び出します。この作業を完了するには、次の内容もファイルにコピーします。

[routes/datamanagement.js](_snippets/viewhubmodels/node/routes/datamanagement.2.js ':include :type=code javascript')

最後の `get` 関数は、各項目(ファイル)の **Versions** を返します。ここで、`.relationships.derivatives.data.id` プロパティには、**Viewer** の `URN` が含まれます。一部の項目に表示可能な項目(ZIPファイルやDOCxファイルなど)がない場合や、まだ翻訳されていない場合があるため、この属性が使用可能かどうかをテストすることが重要です。

ここで、`routes/common/oauth.js` からの認証ヘルパーを再利用する方法に注意してください。

次へ:[ユーザ情報](oauth/user/readme)