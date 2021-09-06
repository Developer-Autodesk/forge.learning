# ハブとプロジェクトを一覧表示する(.NET Framework)

## DataManagementController.cs

**DataManagementController** という名前の .NET WebAPI コントローラを作成し(「[コントローラの作成方法](/ja-JP/environment/setup/net_controller)」を参照)、次の内容を追加します。

> いくつかのエラーが表示され、直後に修正されます。

[DataManagementController.cs](_snippets/viewhubmodels/net/DataManagementController.1.cs ':include :type=code csharp')

上記は、UI ツリーから要求を受け取ります。`id` パラメータは展開されているノードを示します。`#` はルート ノードを意味し、ハブを一覧表示します。その後、リソースの `href` が含まれるため、1 つの `hub` を展開すると、エンドポイントはハブのプロジェクトを返します。上記のコードは、異なる `get` 関数を呼び出します。これを完了するには、次の内容もファイルにコピーします(同じ `DataManagementController` クラス内)。

[DataManagementController.cs](_snippets/viewhubmodels/net/DataManagementController.2.cs ':include :type=code csharp')

最後の `get` 関数は、各項目(ファイル)の**バージョン**を返します。`.relationships.derivatives.data.id` プロパティには、**ビューア**の `URN` が含まれます。一部の項目は、表示可能な項目(ZIP ファイルや DOCx ファイルなど)がない場合や、まだ変換されていない場合があるため、この属性が使用可能かどうかをテストすることが重要です。

プロパティを介して公開される `Credentials` の再利用方法に注意してください。

次の作業:[ユーザ情報](/ja-JP/oauth/user/readme)