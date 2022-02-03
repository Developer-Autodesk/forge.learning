# Подготовка Inventor bundle

В этом разделе мы создадим базовый плагин Inventor для Design Automation. Чтобы узнать больше информации, перейдите на сайт [My First Inventor Plugin](https://knowledge.autodesk.com/support/inventor-products/learn-explore/caas/simplecontent/content/my-first-inventor-plug-overview.html). Версия на русском языке: [Моя первая программа для Autodesk Inventor](https://www.autodesk.ru/autodesk-developer-network/api-trainings/my-first-plugin/my-first-program).

> Вы можете [скачать Bundle ZIP](https://github.com/Autodesk-Forge/learn.forge.designautomation/raw/master/forgesample/wwwroot/bundles/UpdateIPTParam.zip) в папку `/public/bundles/` (Node.js) или `/forgeSample/wwwroot/bundles` (.NET Core) и [пропустить этот раздел](/ru-RU/designautomation/appbundle/common.md)

## Требования

- Шаблон **Design Automation for Inventor**: перейдите на Visual Studio Market Place, скачайте и откройте его [по ссылке](https://marketplace.visualstudio.com/items?itemName=Autodesk.DesignAutomation), потом следуйте инструкциям для загрузки.

![](_media/designautomation/inventor/da4inventor_template.png)

## Создание нового проекта

Щелкните правой кнопкой мыши на решение (англ. solution), затем выберите **Add** >> **New Project**. Найдите шаблоны **Inventor**, затем **Plugin project** и, наконец, назовите его `UpdateIPTParam`. Щелкните проект правой кнопкой мыши, перейдите в **Manage NuGet Packages...**, в разделе **Browse** вы можете выбрать `Newtonsoft.Json` и обновить (этот пакет уже находится в решении, если нет - установите его)

> Пожалуйста, выберите .NET Framework 4.7. Если его нет в списке,  [загрузите Dev Pack](https://dotnet.microsoft.com/download/dotnet-framework/net47).

![](_media/designautomation/inventor/new_project.gif)

## SampleAutomation.cs

Откройте файл `SampleAutomation.cs` и скопируйте код ниже. Здесь параметры обновляются методом `Run`.

```csharp
using Inventor;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Runtime.InteropServices;
using System.Threading;

namespace UpdateIPTParam
{
    [ComVisible(true)]
    public class SampleAutomation
    {
        private InventorServer m_server;
        public SampleAutomation(InventorServer app) { m_server = app; }

        public void Run(Document doc)
        {
            try
            {
                // update parameters in the doc
               ChangeParameters(doc);

                // generate outputs
                var docDir = System.IO.Path.GetDirectoryName(doc.FullFileName);

                // save output file
                var documentType = doc.DocumentType;
                if (documentType == DocumentTypeEnum.kPartDocumentObject)
                {
                    // the name must be in sync with OutputIpt localName in Activity
                    var fileName = System.IO.Path.Combine(docDir, "outputFile.ipt");

                    // save file                                                                
                    doc.SaveAs(fileName, false);
                }
            }
            catch (Exception e) { LogTrace("Processing failed: {0}", e.ToString()); }
        }

        /// <summary>
        /// Change parameters in Inventor document.
        /// </summary>
        /// <param name="doc">The Inventor document.</param>
        /// <param name="json">JSON with changed parameters.</param>
        public void ChangeParameters(Document doc)
        {
            var theParams = GetParameters(doc);

            Dictionary<string, string> parameters = JsonConvert.DeserializeObject<Dictionary<string, string>>(System.IO.File.ReadAllText("params.json"));
            foreach (KeyValuePair<string, string> entry in parameters)
            {
                try
                {
                    Parameter param = theParams[entry.Key.ToLower()];
                    param.Expression = entry.Value;
                }
                catch (Exception e) { LogTrace("Cannot update {0}: {1}", entry.Key, e.Message); }
            }
            doc.Update();
        }

        /// <summary>
        /// Get parameters for the document.
        /// </summary>
        /// <returns>Parameters. Throws exception if parameters are not found.</returns>
        private static Parameters GetParameters(Document doc)
        {
            var docType = doc.DocumentType;
            switch (docType)
            {
                case DocumentTypeEnum.kAssemblyDocumentObject:
                    var asm = doc as AssemblyDocument;
                    return asm.ComponentDefinition.Parameters;
                case DocumentTypeEnum.kPartDocumentObject:
                    var ipt = doc as PartDocument;
                    return ipt.ComponentDefinition.Parameters;
                default:
                    throw new ApplicationException(string.Format("Unexpected document type ({0})", docType));
            }
        }

        /// <summary>
        /// This will appear on the Design Automation output
        /// </summary>
        private static void LogTrace(string format, params object[] args) { Trace.TraceInformation(format, args); }
    }
}
```

## Событие после сборки (англ. Post-build event)

> Для Node.js необходимо настроить папку вывода ZIP AppBundle.

Теперь нам нужно заархивировать папку .bundle. Щелкните проект правой кнопкой мыши, выберите **Properties**, затем откройте **Build Events** и скопируйте код ниже в поле **Post-build event command line**, как показано на изображении ниже.

```
xcopy /Y /F "$(ProjectDir)PackageContents.xml" "$(TargetDir)\Bundle\$(MSBuildProjectName).bundle\"
xcopy /Y /F "$(TargetDir)*.*" "$(TargetDir)\Bundle\$(MSBuildProjectName).bundle\Contents\"
del /F "$(ProjectDir)..\forgesample\wwwroot\bundles\UpdateIPTParam.zip"
"C:\Program Files\7-Zip\7z.exe" a -tzip "$(ProjectDir)../forgesample/wwwroot/bundles/UpdateIPTParam.zip" "$(TargetDir)\bundle\$(MSBuildProjectName).bundle\" -xr0!*.pdb
```

Это скопирует DLL из /bin/debug/ в папку .bundle/Contents, затем используйте [7zip](https://www.7-zip.org/) для создания zip-архива, и затем, наконец, скопируйте ZIP-архив в /bundles. папки веб-приложения.

![](_media/designautomation/inventor/post_build.png)

Если вы сейчас собираете проект `UpdateIPTParam`, вы должны увидеть что-то подобное в окне **Output**. Обратите внимание на 2 заархивированные папки. ZIP-файл создается непосредственно в папке /wwwroot/bundles. Это означает, что у вас все отлично!

![](_media/designautomation/inventor/build_output.png)

Далее: [Загрузка плагина](/ru-RU/designautomation/appbundle/common)

[Эта страница на английском языке](https://learnforge.autodesk.io/#/designautomation/appbundle/engines/inventor).
