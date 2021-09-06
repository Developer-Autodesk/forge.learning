# 拡張スケルトン

チュートリアルのこの手順では、`.onClick` 関数内でコードをトリガするツールバー ボタンが配置された拡張機能の基本スケルトンについて説明します。「[選択を処理する](/ja-JP/viewer/extensions/selection)」に進んで、実際の例を確認することができます。

## 拡張機能を作成する

まず、各拡張機能は JavaScript ファイルであり、少なくとも `.load` 関数と `.unload` 関数を実装する必要があります。UI フォルダ **/js/myawesomeextension.js** にファイルを作成し、次の内容をコピーします。 

[js/myawesomeextension.js](_snippets/extensions/js/myawesomeextension.js ':include :type=code javascript')

!>上記のコードには `Execute an action here` コメントを含むプレースホルダが格納されていて、このコメントをカスタム コードに置き換える必要があります。

## ツールバー CSS

ツールバー ボタンには **CSS** スタイルが使用されます(コードでの `.addClass` の呼び出しを参照)。**/css/main.css** に次の内容を追加します。

[css/main.css](_snippets/extensions/css/main.1.css ':include :type=code css')

!> `background-image` URL は、プロジェクトの既存のファイルに合わせて調整する必要があります。ビューアでは 24 ピクセルのイメージが使用されます。

## 拡張機能をロードする

拡張スケルトンの準備ができたので、**/index.html** ファイルを開き、次の行を追加します(この行でファイルがロードされます)。

```html
<script src="/js/myawesomeextension.js"></script>
```

注: 拡張機能 <scripts> コードをロードする場合は、必ず ForgeViewer.js の下にロードしてください 

![](_media/forge/extension_example.png)



最後に、拡張機能をロードするようビューアに指示する必要があります。**/www/js/ForgeViewer.js** で次の行を検索します。

```javascript
viewer = new Autodesk.Viewing.GuiViewer3D(document.getElementById('forgeViewer'));
```

この行を以下の行に置き換えます。

```javascript
viewer = new Autodesk.Viewing.GuiViewer3D(document.getElementById('forgeViewer'), { extensions: ['MyAwesomeExtension'] });
```

この時点で拡張機能がロードされ、ツールバー ボタンが表示されますが、ボタンをクリックしても何も実行されません(`.onClick` 関数にプレースホルダのコメントのみが含まれていることに注意してください)。これは、拡張機能を作成するために使用できる基本スケルトンです。 

!> 独自の拡張機能を作成する場合は、名前を変更してください。名前は一意である必要があります。 


次の作業:[選択を処理する](/ja-JP/viewer/extensions/selection)
