# WorkItem を実行する

指定した入力ファイルを使用して適切な出力ファイルを生成する、指定した Activity を実行するジョブのことです。

Activity と WorkItem の関係は、それぞれ「関数定義」と「関数呼び出し」と考えることができます。Activity は使用する AppBundle を指定し、次に AppBundle は使用するエンジンを指定します。次に、これらの操作を実行するために WorkItem が呼び出されます。

このチュートリアルのサンプルでは、WorkItem で入力ファイルの URL、新しいパラメータ値を持つ入力 JSON データ、出力ファイルの出力先の URL を指定します。このサンプルでは、WorkItem を開始する前に、入力ファイルを OSS バケットにアップロードします。

言語を選択:[Node.js](/ja-JP/designautomation/workitem/nodejs) | [.NET Core](/ja-JP/designautomation/workitem/netcore)