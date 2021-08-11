# 作業項目を実行する(.NETコア)

次のメソッドを`DesignAutomationController`クラスに追加する必要があります。

**1\.StartWorkitem**

ここで、設計の自動化を実際に開始します。`StartWorkitemInput`は単なるデータ構造です。このメソッドは、入力ファイルをOSSバケットにアップロードし、出力を同じバケットに保存するように定義します。ファイルを識別しやすくするために、入力と出力の両方で元のファイル名が同じになりますが、接尾辞(`input`または`output`)とタイムスタンプが付けられます。

[DesignAutomationController.cs](_snippets/modifymodels/netcore/DesignAutomationController.8.cs ':include :type=code csharp')

> `StartWorkitemInput` クラスが  de **DesignAutomationController** 内で **どのように定義されているかに注目してください。これは正しく、`StartWorkitem` メソッドの入力パラメータとして使用されます。

**2\.OnCallback**

作業アイテムが完了すると、設計自動化はアプリケーションをコールバックします(ネットワーク転送URLを使用)。この関数は、この関数を処理し、クライアントに通知をプッシュします(SignalRハブを使用)。

[DesignAutomationController.cs](_snippets/modifymodels/netcore/DesignAutomationController.9.cs ':include :type=code csharp')

**3\.ClearAccount**

最後に、テストを支援するために、この関数はアカウントからすべてのバンドルとアクティビティを削除します。 

[DesignAutomationController.cs](_snippets/modifymodels/netcore/DesignAutomationController.10.cs ':include :type=code csharp')

準備ができました!

次へ:[実行とデバッグ](/ja_jp/environment/rundebug/2legged_da)