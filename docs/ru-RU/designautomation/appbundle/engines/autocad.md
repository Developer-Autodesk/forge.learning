# Подготовка AutoCAD bundle

В этом разделе мы создадим базовый плагин AutoCAD для Design Automation. Чтобы узнать больше информации, перейдите на сайт [My First AutoCAD Plugin](https://knowledge.autodesk.com/support/autocad/learn-explore/caas/simplecontent/content/my-first-autocad-plug-overview.html). 

> Вы можете [скачать Bundle ZIP](https://github.com/Autodesk-Forge/learn.forge.designautomation/raw/master/forgesample/wwwroot/bundles/UpdateDWGParam.zip) в папку `/public/bundles/` (Node.js) или `/forgeSample/wwwroot/bundles` (.NET Core) и [пропустить этот раздел](/ru-RU/designautomation/appbundle/common.md)

## Создание нового проекта

Щелкните правой кнопкой мыши на решение (англ. solution), затем выберите **Add** >> **New Project**. Выберите  **Windows Desktop**, затем **Class Library** и, наконец, назовите его `UpdateDWGParam`. Затем щелкните проект правой кнопкой мыши, выберите **Manage NuGet Packages...**, в разделе **Browser** вы можете выполнить поиск  **AutoCAD.NET** и установить `AutoCAD.NET.Core`  (который также устанавливает `AutoCAD.NET.Model`). Затем найдите и установите `Newtonsoft.Json` (который используется для анализа входных данных в формате JSON).

> Пожалуйста, выберите .NET Framework 4.7. Если его нет в списке, [загрузите Dev Pack](https://dotnet.microsoft.com/download/dotnet-framework/net47).

![](_media/designautomation/autocad/new_project.gif)

В результате **package.config** должен выглядеть вот так. В этом примере используется версия 20, которая должна работать во всех доступных версиях. Вы можете отрегулировать под конкретную версию.

```xml
<?xml version="1.0" encoding="utf-8"?>
<packages>
  <package id="AutoCAD.NET.Core" version="20.0.0" targetFramework="net47" />
  <package id="AutoCAD.NET.Model" version="20.0.0" targetFramework="net47" />
  <package id="Newtonsoft.Json" version="12.0.1" targetFramework="net47" />
</packages>
```

В проекте должен быть класс `Class1.cs`, давайте изменим название файла на `Commands.cs` (для постоянства). 

## Commands.cs

Это основной код, который будет работать с AutoCAD. Скопируйте следующий код в `Commands.cs`. Класс содержит одну настраиваемую команду AutoCAD, `UpdateParam`, определенную как метод с тем же именем. Эта команда вызывается движком Design Automation, как будет указано в **Activity** (следующий шаг этого руководства).

```csharp
using Autodesk.AutoCAD.ApplicationServices.Core;
using Autodesk.AutoCAD.DatabaseServices;
using Autodesk.AutoCAD.Runtime;
using Newtonsoft.Json;
using System.IO;

[assembly: CommandClass(typeof(UpdateDWGParam.Commands))]
[assembly: ExtensionApplication(null)]

namespace UpdateDWGParam
{
    public class Commands
    {
        [CommandMethod("UpdateParam", CommandFlags.Modal)]
        public static void UpdateParam()
        {
            //Get active document of drawing with Dynamic block
            var doc = Application.DocumentManager.MdiActiveDocument;
            var db = doc.Database;

            // read input parameters from JSON file
            InputParams inputParams = JsonConvert.DeserializeObject<InputParams>(File.ReadAllText("params.json"));

            using (Transaction t = db.TransactionManager.StartTransaction())
            {
                var bt = t.GetObject(db.BlockTableId, OpenMode.ForRead) as BlockTable;

                foreach (ObjectId btrId in bt)
                {
                    //get the blockDef and check if is anonymous
                    BlockTableRecord btr = (BlockTableRecord)t.GetObject(btrId, OpenMode.ForRead);
                    if (btr.IsDynamicBlock)
                    {
                        //get all anonymous blocks from this dynamic block
                        ObjectIdCollection anonymousIds = btr.GetAnonymousBlockIds();
                        ObjectIdCollection dynBlockRefs = new ObjectIdCollection();
                        foreach (ObjectId anonymousBtrId in anonymousIds)
                        {
                            //get the anonymous block
                            BlockTableRecord anonymousBtr = (BlockTableRecord)t.GetObject(anonymousBtrId, OpenMode.ForRead);
                            //and all references to this block
                            ObjectIdCollection blockRefIds = anonymousBtr.GetBlockReferenceIds(true, true);
                            foreach (ObjectId id in blockRefIds)
                            {
                                dynBlockRefs.Add(id);
                            }
                        }
                        if (dynBlockRefs.Count > 0)
                        {
                            //Get the first dynamic block reference, we have only one Dyanmic Block reference in Drawing
                            var dBref = t.GetObject(dynBlockRefs[0], OpenMode.ForWrite) as BlockReference;
                            UpdateDynamicProperties(dBref, inputParams);
                        }
                    }
                }
                t.Commit();
            }
            LogTrace("Saving file...");
            db.SaveAs("outputFile.dwg", DwgVersion.Current);
        }

        /// <summary>
        /// This updates the Dyanmic Blockreference with given Width and Height
        /// The initial parameters of Dynamic Blockrefence, Width =20.00 and Height =40.00
        /// </summary>
        /// <param Editor="ed"></param>
        /// <param BlockReference="br"></param>
        /// <param String="name"></param>
        private static void UpdateDynamicProperties(BlockReference br, InputParams inputParams)
        {
            // Only continue is we have a valid dynamic block
            if (br != null && br.IsDynamicBlock)
            {
                // Get the dynamic block's property collection
                DynamicBlockReferencePropertyCollection pc = br.DynamicBlockReferencePropertyCollection;
                foreach (DynamicBlockReferenceProperty prop in pc)
                {
                    switch (prop.PropertyName)
                    {
                        case "Width":
                            prop.Value = inputParams.Width;
                            break;
                        case "Height":
                            prop.Value = inputParams.Height;
                            break;
                        default:
                            break;
                    }
                }
            }
        }

        /// <summary>
        /// This will appear on the Design Automation output
        /// </summary>
        private static void LogTrace(string format, params object[] args) { Application.DocumentManager.MdiActiveDocument.Editor.WriteMessage(format, args); }
    }

    public class InputParams
    {
        public double Width { get; set; }
        public double Height { get; set; }
    }
}
```

## PackageContents.xml

Создайте папку с названием `UpdateDWGParam.bundle` и, внутри этой папки, файл с названием `PackageContents.xml`, затем скопируйте туда код ниже. Узнайте больше [PackageContents.xml Format Reference](https://help.autodesk.com/view/ACD/2023/ENU/?guid=GUID-BC76355D-682B-46ED-B9B7-66C95EEF2BD0). Этот файл определяет новую пользовательскую команду AutoCAD `UpdateParam`, которая будет вызываться при работе Design Automation. 

```xml
<?xml version="1.0" encoding="utf-8" ?>
<ApplicationPackage SchemaVersion="1.0" Version="1.0" ProductCode="{F11EA57A-1E7E-4B6D-8E81-986B071E3E07}" Name="AutoCADDesignAutomation" Description="Sample Plugin for AutoCAD" Author="learnforge.autodesk.io>">
  <CompanyDetails Name="Autodesk, Inc" Url="http://learnforge.autodesk.io" Email="forge.help@autodesk.com"/>
  <Components>
    <RuntimeRequirements OS="Win64" Platform="AutoCAD"/>
    <ComponentEntry AppName="UpdateWindowParameters" ModuleName="./Contents/UpdateDWGParam.dll" AppDescription="AutoCAD .NET App to update parameters of Dynamic blockreference in AutoCAD Drawing" LoadOnCommandInvocation="True" LoadOnAutoCADStartup="True">
      <Commands GroupName="FPDCommands">
        <Command Global="UpdateParam" Local="UpdateParam"/>
      </Commands>
    </ComponentEntry>
  </Components>
</ApplicationPackage>
```

Наконец, создайте подпапку `Contents` и оставьте её пустой. К этому моменту проект должен выглядеть так:

![](_media/designautomation/autocad/bundle_folders.png)

## Событие после сборки (англ. Post-build event)

> Для Node.js необходимо настроить папку вывода ZIP AppBundle.

Теперь нам нужно заархивировать папку .bundle. Щелкните проект правой кнопкой мыши, выберите **Properties**, затем откройте **Build Events** и скопируйте код ниже в поле **Post-build event command line**, как показано на изображении ниже.

```
xcopy /Y /F "$(TargetDir)*.dll" "$(ProjectDir)UpdateDWGParam.bundle\Contents\"
del /F "$(ProjectDir)..\forgesample\wwwroot\bundles\UpdateDWGParam.zip"
"C:\Program Files\7-Zip\7z.exe" a -tzip "$(ProjectDir)../forgesample/wwwroot/bundles/UpdateDWGParam.zip" "$(ProjectDir)UpdateDWGParam.bundle\" -xr0!*.pdb
```

Это скопирует DLL из /bin/debug/ в папку .bundle/Contents, затем используйте [7zip](https://www.7-zip.org/) для создания zip-архива, и затем, наконец, скопируйте ZIP-архив в /bundles. папки веб-приложения.

![](_media/designautomation/autocad/post_build.png)

> Обратите внимание, как **Post-build event** использует имена проекта и папки. Убедитесь, что вы используете эти имена.

Если вы сейчас собираете проект `UpdateDWGParam`, вы должны увидеть что-то подобное в окне **Output**. Обратите внимание на 2 заархивированные папки и 3 файла. ZIP-файл создается непосредственно в папке /wwwroot/bundles. Это означает, что у вас все отлично!

![](_media/designautomation/autocad/build_output.png)

Далее: [Загрузка плагина](/ru-RU/designautomation/appbundle/common)

[Эта страница на английском языке](https://learnforge.autodesk.io/#/designautomation/appbundle/engines/autocad).
