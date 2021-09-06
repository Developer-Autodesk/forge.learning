# データ管理(OSS)

Forge OSS (オブジェクト ストレージ サービス)では、ファイルはオブジェクトとしてバケットに格納されます。広範な Forge エコシステムからデータをダウンロードする機能をアプリに提供するだけでなく、アプリ独自のバケットとオブジェクト(作成、リスト、削除、アップロード、ダウンロードなど)を管理する機能も提供します。

各バケットには、オブジェクトの保持期間を決定する[保持ポリシー](https://forge.autodesk.com/en/docs/data/v2/overview/retention-policy/)もあります。

 - **transient**:24 時間しか保持されないキャッシュのようなストレージで、一時的なオブジェクトに最適です。**このチュートリアルでは、このポリシーを使用しましょう。**
 - **temporary**:30 日間保持されるストレージです。
 - **persistent**:削除されるまで保持されるストレージ。

このセクションでは、バケットを作成し、ファイルをアップロードし、バケットとオブジェクトをリストするためのエンドポイントをいくつか作成します。

> このチュートリアル コードでは、バケット キーの先頭に Forge Client ID を透過的に付加します。これにより、名前の重複を回避できます。

!> バケット キーの形式は\[-_.a-z0-9]{3,128}である必要があります
 
言語を選択:[Node.js](datamanagement/oss/nodejs) | [.NET Framework](datamanagement/oss/net) | [.NET Core](datamanagement/oss/netcore) | [Go](datamanagement/oss/go) | [PHP](datamanagement/oss/php) | [Java](datamanagement/oss/java)

