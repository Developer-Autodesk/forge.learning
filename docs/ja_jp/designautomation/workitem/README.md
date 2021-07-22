# 作業アイテムを実行

指定した入力ファイルを使用し、適切な出力ファイルを生成して、指定したアクティビティを実行するジョブ。

ActivityとWorkItemの関係は、それぞれ「関数定義」と「関数呼び出し」と考えることができます。アクティビティは使用するAppBundleを指定し、次に使用するエンジンを指定します。次に、これらの操作を実行するためにWorkitemが呼び出されます。

このチュートリアルのサンプルでは、workitemで入力ファイルのURL、新しいパラメータ値を持つ入力JSONデータ、出力ファイルの出力先のURLを指定します。このサンプルでは、作業アイテムを開始する前に、入力ファイルをOSSバケットにアップロードします。

言語を選択:[Node.js](designautomation/workitem/nodejs) | [.NET Core](designautomation/workitem/netcore)