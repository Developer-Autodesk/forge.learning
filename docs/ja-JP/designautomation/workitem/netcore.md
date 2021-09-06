# 作業項目を実行する(.NET Core)

次のメソッドを `DesignAutomationController` クラスに追加する必要があります。

**1\.StartWorkitem**

ここで、Design Automation を実際に開始します。`StartWorkitemInput` は単なるデータ構造です。また、このメソッドは、入力ファイルを OSS バケットにアップロードし、出力を同じバケットに保存するように定義します。ファイルを識別しやすくするために、入力と出力の両方で元のファイル名が同じになりますが、接尾辞(`input` または `output`)とタイムスタンプが付けられます。

[DesignAutomationController.cs](_snippets/modifymodels/netcore/DesignAutomationController.8.cs ':include :type=code csharp')

> `StartWorkitemInput` クラスが **DesignAutomationController** の**内部**でどのように定義されているかに注目してください。これは正しく、`StartWorkitem` メソッドの入力パラメータとして使用されます。

**2\.OnCallback**

作業項目が完了すると、Design Automation はアプリケーションをコールバックします(ngrok 転送 URL を使用)。この関数がこれを処理し、クライアントに通知をプッシュします(SignalR を使用)。

[DesignAutomationController.cs](_snippets/modifymodels/netcore/DesignAutomationController.9.cs ':include :type=code csharp')

**3\.ClearAccount**

最後に、テストを支援するために、この関数はアカウントからすべての AppBundle とアクティビティを削除します。 

[DesignAutomationController.cs](_snippets/modifymodels/netcore/DesignAutomationController.10.cs ':include :type=code csharp')

準備が完了しました!

次の作業:[実行とデバッグ](environment/rundebug/2legged_da)