# プラグインを準備する

Design Automation は、Autodesk App Store と同じように .bundle を使用します。つまり、`DLL` (およびその他の必要なファイル)を使用して `PackageContents.xml` と ZIP を作成する必要があります。作成方法の詳細については、[Autodesk App Store デベロッパー センター](https://www.autodesk.com/developer-network/app-store)にアクセスしてください。

このセクションでは、`width` および `height` パラメータを更新する基本プラグインを作成し、結果のファイルを保存します。また、サポート ファイル(`PackageContents.xml`)と、それらを配置するフォルダ構造も含まれます。最後に、Design Automation にアップロードする準備が整った .ZIP ファイルを作成します。

### 前提条件

- **7zip**\: バンドル ファイルを使用して .ZIP を作成するために使用します。[ここから](https://www.7-zip.org/)インストールしてください。このチュートリアルでは、**7zip** が既定のフォルダにインストールされていることを前提としています。_C:\\Program Files\\7-Zip\\7z.exe_.

### 追加の前提条件 

次のセッションでは、ビルド前プラグインを使用できます。または、ビルドする場合は、次が必要になります。

- **Visual Studio**:Visual Studio 2017 以降が必要です。[こちらのリンク](https://visualstudio.microsoft.com/vs/)にアクセスしてください。

- **AutoCAD、Inventor、Revit、3ds Max**:Design Automation プラグインを開発、テスト、デバッグするには、次の手順を実行します。[AutoCAD](https://www.autodesk.com/products/autocad/overview) | [Inventor](https://www.autodesk.com/products/inventor/overview) | [Revit](https://www.autodesk.com/products/revit/overview) | [3ds Max](https://www.autodesk.com/products/3ds-max/overview)

***

次の手順では、**Engine** を選択します。これは、プラグインを実行する Autodesk アプリケーションです。ローカルでコンパイル、デバッグ、テストを行うには、それぞれのアプリケーションをインストールする必要があります。

エンジンを選択します。[AutoCAD](/designautomation/appbundle/engines/autocad) | [Inventor](/designautomation/appbundle/engines/inventor) | [Revit](/designautomation/appbundle/engines/revit) | [3ds Max](/designautomation/appbundle/engines/max)