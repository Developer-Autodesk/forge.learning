# Workitemを実行(Node.js)

次のapiは、最後の行の前に`DesignAutomation` jsファイルに追加する必要があります `module.exports = router;`

**1\.StartWorkitem**

ここで、設計の自動化を実際に開始します。このエンドポイントは、入力ファイルをOSSバケットにアップロードし、出力を同じバケットに保存するように定義します。ファイルを識別しやすくするために、入力と出力の両方で元のファイル名が同じになりますが、接尾辞(`input`または`output`)とタイムスタンプが付けられます。 

[routes/DesignAutomation.js](_snippets/modifymodels/node/routes/DesignAutomation.4.js ':include :type=code javascript')

**2\.OnCallback**

作業アイテムが完了すると、設計自動化はアプリケーションをコールバックします(ネットワーク転送URLを使用)。この関数は処理し、クライアントに通知をプッシュします(socketIOを使用)。

[routes/DesignAutomation.js](_snippets/modifymodels/node/routes/DesignAutomation.5.js ':include :type=code javascript')

**3\.ClearAccount**

最後に、テストを支援するために、このapiはアカウントからすべてのバンドルとアクティビティを削除します。

[routes/DesignAutomation.js](_snippets/modifymodels/node/routes/DesignAutomation.6.js ':include :type=code javascript')

準備ができました!

次へ:[実行とデバッグ](/ja_jp/environment/rundebug/2legged_da)