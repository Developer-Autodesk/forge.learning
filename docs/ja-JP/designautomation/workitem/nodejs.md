# WorkItem を実行する(Node.js)

次の api は、`DesignAutomation` js ファイルの最後の行 `module.exports = router;` の前に追加する必要があります。

**1\.StartWorkitem**

ここで、Design Automation を実際に開始します。また、このエンドポイントは、入力ファイルを OSS バケットにアップロードし、出力を同じバケットに保存するように定義します。ファイルを識別しやすくするために、入力と出力の両方で元のファイル名が同じになりますが、接尾辞(`input` または `output`)とタイムスタンプが付けられます。 

[routes/DesignAutomation.js](_snippets/modifymodels/node/routes/DesignAutomation.4.js ':include :type=code javascript')

**2\.OnCallback**

WorkItem が完了すると、Design Automation はアプリケーションをコールバックします(ngrok Forwarding URL を使用)。この関数がこれを処理し、クライアントに通知をプッシュします(socketIO を使用)。

[routes/DesignAutomation.js](_snippets/modifymodels/node/routes/DesignAutomation.5.js ':include :type=code javascript')

**3\.ClearAccount**

最後に、テストを支援するために、この api はアカウントからすべての AppBundle と Activity を削除します。

[routes/DesignAutomation.js](_snippets/modifymodels/node/routes/DesignAutomation.6.js ':include :type=code javascript')

準備が完了しました!

次の作業:[実行とデバッグ](/ja-JP/environment/rundebug/2legged_da)