# プラグインを準備する

デザイン オートメーションは Autodesk App Store と同様に .bundle を使用します。つまり、`PackageContents.xml` と `DLL` (およびその他の必須ファイル)を使用した ZIP を作成する必要があります。作成方法の詳細については、[ Autodesk App Store デベロッパー センター](https://www.autodesk.com/developer-network/app-store)をご覧ください。

このセクションでは、`width` および `height` パラメータを更新する基本プラグインを作成し、結果のファイルを保存します。また、サポート ファイル(`PackageContents.xml`)と、ファイルを配置するフォルダ構造も含まれます。最後に、設計オートメーションにアップロードする準備が整った.ZIPファイルを作成します。

### 前提条件

- **7zip**\: バンドル ファイルを使用して .ZIP を作成する場合は、ここから [をインストールしてください。](https://www.7-zip.org/)このチュートリアルでは、**7zip** が既定のフォルダにインストールされていることを前提としています。_C:\\Program Files\\7-Zip\\7z.exe_.

### 追加の前提条件 

次のセッションでは、ビルド前プラグインを使用できます。または、ビルドする場合は、次が必要になります。

- **Visual Studio**:Visual Studio 2017 以降が必要です。[このリンク](https://visualstudio.microsoft.com/vs/)にアクセスしてください。

- **AutoCAD、Inventor、Revit、3ds Max**:設計オートメーションプラグインを開発、テスト、デバッグするには、次の手順を実行します。[AutoCAD](https://www.autodesk.com/products/autocad/overview) | [Inventor](https://www.autodesk.com/products/inventor/overview) | [Revit](https://www.autodesk.com/products/revit/overview) | [3ds Max](https://www.autodesk.com/products/3ds-max/overview)。

***

次の手順では、**Engine** を選択します。これは、プラグインを実行する Autodesk アプリケーションです。ローカルでコンパイル、デバッグ、テストを行うには、それぞれのアプリケーションをインストールする必要があります。

エンジンを選択します。[AutoCAD](/ja_jp/designautomation/appbundle/engines/autocad) | [Inventor](/ja_jp/designautomation/appbundle/engines/inventor) | [Revit](/ja_jp/designautomation/appbundle/engines/revit) | [3ds Max](/ja_jp/designautomation/appbundle/engines/max)