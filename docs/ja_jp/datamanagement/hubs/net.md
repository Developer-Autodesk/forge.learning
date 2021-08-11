# ハブとプロジェクトをリストする(.NET Framework)

## DataManagementController.cs

**DataManagementController** という名前の .NET WebAPI コントローラを作成し([コントローラの作成方法](/ja_jp/environment/setup/net_controller)を参照)、次の内容を追加します。

> エラーが少し表示され、直後に修正されます。

[DataManagementController.cs](_snippets/viewhubmodels/net/DataManagementController.1.cs ':include :type=code csharp')

上記は、UIツリーから要求を受け取ります。`id`パラメータは展開されているノードを示します。`#`はルートノードを意味するため、ハブをリストします。その後、リソースの`href`が含まれるため、1つの`hub`を展開すると、エンドポイントはハブのプロジェクトを返す必要があります。上記のコードは、異なる`get`関数を呼び出します。これを完了するには、次の内容もファイルにコピーします(同じ`DataManagementController`クラス内)。

[DataManagementController.cs](_snippets/viewhubmodels/net/DataManagementController.2.cs ':include :type=code csharp')

最後の `get` 関数は、各項目(ファイル)の **バージョン ** を返します。`.relationships.derivatives.data.id` プロパティには、**Viewer** の `URN` が含まれます。一部の項目に表示可能な項目(ZIPファイルやDOCxファイルなど)がない場合や、まだ翻訳されていない場合があるため、この属性が使用可能かどうかをテストすることが重要です。

プロパティによって公開される`Credentials`の再利用方法に注意してください。

次へ:[ユーザ情報](/ja_jp/oauth/user/readme)