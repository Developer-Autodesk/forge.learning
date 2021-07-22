# 延長スケルトン

チュートリアルのこの手順では、ツールバー ボタンを使用して拡張機能の基本スケルトンについて説明します。このスケルトンにより、`.onClick` 関数内のコードがトリガされます。実際のサンプルの[Handling Selection](viewer/extensions/selection) に進むことができます。

## 延長を作成する

それでは、各拡張子は JavaScript ファイルで、少なくとも `.load` 関数と `.unload` 関数を実装する必要があります。UI フォルダ **/js/myawesomeextension.js** にファイルを作成し、次の内容をコピーします。 

[js/myawesomeextension.js](_snippets/extensions/js/myawesomeextension.js ':include :type=code javascript')

!> 上記のコードには、`` コメントでアクションを実行するプレースホルダが含まれています。このアクションはカスタム コードで置き換える必要があります。

## ツールバーCSS

ツールバー ボタンは、**CSS** スタイルを使用します(コードの `.addClass` の呼び出しを参照してください)。**/css/main.css** で、次を追加します。

[css/main.css](_snippets/extensions/css/main.1.css ':include :type=code css')

!> `background-image` URL は、プロジェクトの既存のファイルに合わせて調整する必要があります。ビューアは24ピクセルのイメージを使用します。

## エクステンションをロード

拡張スケルトンの準備ができました。次に **/index.html** ファイルを開き、次の行を追加します(この行はファイルをロードします)。

```html
<script src="/js/myawesomeextension.js"></script>
```

注:-拡張子<scripts>コードをロードする際に、必ずForgeViewer.jsの下にロードしてください 

![](_media/forge/extension_example.png)



最後に、ビューアに拡張機能をロードするように指示する必要があります。**/www/js/ForgeViewer.js** で次の行を探します。

```javascript
viewer = new Autodesk.Viewing.GuiViewer3D(document.getElementById('forgeViewer'));
```

次のように置き換えます。

```javascript
viewer = new Autodesk.Viewing.GuiViewer3D(document.getElementById('forgeViewer'), { extensions: ['MyAwesomeExtension'] });
```

この時点で、エクステンションがロードされ、ツールバー ボタンが表示されますが、何も実行されません(`.onClick` 関数にプレースホルダ コメントのみが存在することに注意してください)。これは、拡張機能を作成するために使用できる基本スケルトンです。 

!>独自の拡張子を作成する場合は、名前を変更してください。名前は一意である必要があります。 


次へ:[選択を処理する](viewer/extensions/selection)
