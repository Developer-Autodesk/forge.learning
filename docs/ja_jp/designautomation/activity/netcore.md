# アクティビティを定義する(.NET Core)

次のメソッドを `DesignAutomationController` クラスに追加する必要があります。

**1\.EngineAttributes**

アクティビティを定義するには、実行可能ファイルと既定のファイル拡張子が必要です。このヘルパー関数はエンジン名から提供します。 

[DesignAutomationController.cs](_snippets/modifymodels/netcore/DesignAutomationController.5.cs ':include :type=code csharp')

**2\.CreateActivity**

入力ファイル、入力データ(JSON)、および出力ファイルを使用して、新しいアクティビティを定義します。

[DesignAutomationController.cs](_snippets/modifymodels/netcore/DesignAutomationController.6.cs ':include :type=code csharp')

**3\.GetDefinedActivities**

また、定義されたすべてのアクティビティを返すメソッドも必要になります。ユーザが定義した名前のみを返します(ニック名として `Forge Client Id` を使用し、プリフィックスとして表示されます)。

[DesignAutomationController.cs](_snippets/modifymodels/netcore/DesignAutomationController.7.cs ':include :type=code csharp')

これで、**環境設定 ** (右上)をクリックし、AppBundle を選択し、エンジンを選択して**アクティビティの定義**をクリックすることができます。この場合、Appbundle を定義してアップロードし、アクティビティを定義する必要があります。結果パネル(左側)には、それぞれのIDが表示されます。**他のすべてのボタンはまだ機能しません。**先に進みましょう。

![](_media/designautomation/define_activity.gif)

次へ:[作業アイテムを実行](designautomation/workitem/)