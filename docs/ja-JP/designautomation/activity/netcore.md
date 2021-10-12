# Activity を定義する(.NET Core)

次のメソッドを `DesignAutomationController` クラスに追加する必要があります。

**1\.EngineAttributes**

Activity を定義するには、実行可能ファイルと既定のファイル拡張子が必要です。これは、このヘルパー関数が(エンジン名から)提供します。 

[DesignAutomationController.cs](_snippets/modifymodels/netcore/DesignAutomationController.5.cs ':include :type=code csharp')

**2\.CreateActivity**

入力ファイル、入力データ(JSON)、および出力ファイルを使用して、新しい Activity を定義します。

[DesignAutomationController.cs](_snippets/modifymodels/netcore/DesignAutomationController.6.cs ':include :type=code csharp')

**3\.GetDefinedActivities**

また、定義されたすべての Activity を返すメソッドも必要になります。ユーザが定義した名前のみを返すことに注意してください(ニックネームとして `Forge Client Id` を使用します。この名前は接頭語として表示されます)。

[DesignAutomationController.cs](_snippets/modifymodels/netcore/DesignAutomationController.7.cs ':include :type=code csharp')

これで、**環境設定**(右上)をクリックし、AppBundle を選択し、エンジンを選択して **Define Activity** をクリックすることができます。ここで、appbundle を定義してアップロードし、Activity を定義する必要があります。結果パネル(左側)には、それぞれの ID が表示されます。**他のすべてのボタンはまだ機能しません。**先に進みましょう。

![](_media/designautomation/define_activity.gif)

次の作業:[WorkItem を実行する](/ja-JP/designautomation/workitem/)