# 例

ビューアの拡張機能は自己完結型で、簡単に再利用できます。次の場所にあります。

- [GitHub Repo](https://github.com/Autodesk-Forge/forge-extensions)
- [デモリンク](https://forge-extensions.autodesk.io/)

このスケルトンのアプローチに基づいた拡張機能の例を次に示します。

- [色の変更](https://forge.autodesk.com/blog/happy-easter-setthemingcolor-model-material)\: 3 つのツールバー ボタンを追加して、モデル上で選択した要素の色を変更します。

拡張機能をサーバと通信して、他のJavaScriptコードと同様に、より複雑な機能を実装することができます。次のサンプルで、この機能を説明します。

**Node.js**

- [Share Viewer state](https://forge.autodesk.com/blog/share-viewer-state-websockets)\: websocket を使用して Viewer の 2 つ以上のインスタンス間で状態を共有します。

**.NET**

- [カスタム プロパティ](https://forge.autodesk.com/blog/custom-properties-viewer-net-lambda-dynamodb)\: データベース(AWS DynamoDB)にカスタム プロパティを保存し、REST エンドポイントを介して提供する .NET WebAPI コードを使用します。 

次へ:[配置](/ja_jp/deployment/)