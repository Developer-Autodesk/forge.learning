# Подготовка Revit bundle

В этом разделе мы создадим базовый плагин Revit для Design Automation. Чтобы узнать больше информации, перейдите на сайт [My First Revit Plugin](https://knowledge.autodesk.com/support/revit-products/learn-explore/caas/simplecontent/content/my-first-revit-plug-overview.html). Версия на русском языке: [Моя первая программа для Autodesk Revit](https://www.autodesk.ru/autodesk-developer-network/api-trainings/my-first-plugin/first-prog-adsk-revit).

> Вы можете [скачать Bundle ZIP](https://github.com/Autodesk-Forge/learn.forge.designautomation/raw/master/forgesample/wwwroot/bundles/UpdateRVTParam.zip) в папку `/public/bundles/` (Node.js) или `/forgeSample/wwwroot/bundles` (.NET Core) и [пропустить этот раздел](/ru-RU/designautomation/appbundle/common.md)

## Создание нового проекта

Щелкните правой кнопкой мыши на решение (англ. solution), затем выберите **Add** >> **New Project**. Выберите  **Windows Desktop**, затем **Class Library** и, наконец, назовите его `UpdateRVTParam`. 

> Пожалуйста, выберите .NET Framework 4.8. Если его нет в списке, [загрузите Dev Pack](https://dotnet.microsoft.com/download/dotnet-framework/net47).

Щелкните правой кнопкой мыши **References**, затем **Add Reference** и **Browse** для `RevitAPI.dll` (по умолчанию в папку _C:\Program Files\Autodesk\Revit 201x\_ ). кликните правой кнопкой мыши на **RevitAPI** reference, перейдите в **Properties** и настройте **Copy Local** как **False**.

Правой кнопкой мыши нажмите на проект, перейдите в **Manage NuGet Packages...**, в разделе **Browser** вы можете выполнить поиск **DesignAutomation.Revit** и установить `Autodesk.Forge.DesignAutomation.Revit` (выберите необходимую версию Revit). Затем найдите и загрузите `Newtonsoft.Json` (который используется для анализа входных данных в формате JSON). 

![](_media/designautomation/revit/new_project.gif)

```xml
<?xml version="1.0" encoding="utf-8"?>
<packages>
  <package id="Autodesk.Forge.DesignAutomation.Revit" version="2021.0.0" targetFramework="net48" />
  <package id="Microsoft.CSharp" version="4.5.0" targetFramework="net48" />
  <package id="Newtonsoft.Json" version="12.0.1" targetFramework="net48" />
</packages>
```

В проекте должен быть класс `Class1.cs`, давайте изменим название файла на`Commands.cs` (для постоянства). 

К этому моменту проект должен выглядеть вот так:

![](_media/designautomation/revit/project_files.png)

## Commands.cs

Это основной код, который будет работать с  Revit. Скопируйте следующий код в`Commands.cs`. Основной интерес представляет здесь событие `DesignAutomationReadyEvent`, которое начинает работать, когда приложение готово к запуску. `HandleDesignAutomationReadyEvent` реализует наш собственный код.

```csharp
using Autodesk.Revit.ApplicationServices;
using Autodesk.Revit.Attributes;
using Autodesk.Revit.DB;
using DesignAutomationFramework;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;

namespace Autodesk.Forge.Sample.DesignAutomation.Revit
{
    [Transaction(TransactionMode.Manual)]
    [Regeneration(RegenerationOption.Manual)]
    public class Commands : IExternalDBApplication
    {
        //Path of the project(i.e)project where your Window family files are present
        string OUTPUT_FILE = "OutputFile.rvt";

        public ExternalDBApplicationResult OnStartup(ControlledApplication application)
        {
            DesignAutomationBridge.DesignAutomationReadyEvent += HandleDesignAutomationReadyEvent;
            return ExternalDBApplicationResult.Succeeded;
        }

        private void HandleDesignAutomationReadyEvent(object sender, DesignAutomationReadyEventArgs e)
        {
            LogTrace("Design Automation Ready event triggered...");
            e.Succeeded = true;
            EditWindowParametersMethod(e.DesignAutomationData.RevitDoc);
        }

        private void EditWindowParametersMethod(Document doc)
        {
            InputParams inputParameters = JsonConvert.DeserializeObject<InputParams>(File.ReadAllText("params.json"));

            //Modifying the window parameters
            //Open transaction
            using (Transaction trans = new Transaction(doc))
            {
                trans.Start("Update window parameters");

                //Filter for windows
                FilteredElementCollector WindowCollector = new FilteredElementCollector(doc).OfCategory(BuiltInCategory.OST_Windows).WhereElementIsNotElementType();
                IList<ElementId> windowIds = WindowCollector.ToElementIds() as IList<ElementId>;

                foreach (ElementId windowId in windowIds)
                {
                    Element Window = doc.GetElement(windowId);
                    FamilyInstance FamInst = Window as FamilyInstance;
                    FamilySymbol FamSym = FamInst.Symbol;
                    SetElementParameter(FamSym, BuiltInParameter.WINDOW_HEIGHT, inputParameters.Height);
                    SetElementParameter(FamSym, BuiltInParameter.WINDOW_WIDTH, inputParameters.Width);
                }

                //To save all the changes commit the transaction 
                trans.Commit();
            }

            //Save the updated file by overwriting the existing file
            ModelPath ProjectModelPath = ModelPathUtils.ConvertUserVisiblePathToModelPath(OUTPUT_FILE);
            SaveAsOptions SAO = new SaveAsOptions();
            SAO.OverwriteExistingFile = true;

            //Save the project file with updated window's parameters
            LogTrace("Saving file...");
            doc.SaveAs(ProjectModelPath, SAO);
        }

        public ExternalDBApplicationResult OnShutdown(ControlledApplication application)
        {
            return ExternalDBApplicationResult.Succeeded;
        }

        private void SetElementParameter(FamilySymbol FamSym, BuiltInParameter paraMeter, double parameterValue)
        {
            FamSym.get_Parameter(paraMeter).Set(parameterValue);
        }

        public class InputParams
        {
            public double Width { get; set; }
            public double Height { get; set; }
        }

        /// <summary>
        /// This will appear on the Design Automation output
        /// </summary>
        private static void LogTrace(string format, params object[] args) { System.Console.WriteLine(format, args); }
    }
}
```

## PackageContents.xml

Создайте папку с названием `UpdateRVTParam.bundle` и, внутри этой папки, файл с названием `PackageContents.xml`,  затем скопируйте туда код ниже. Узнайте больше: [PackageContents.xml Format Reference](https://help.autodesk.com/view/ACD/2023/ENU/?guid=GUID-BC76355D-682B-46ED-B9B7-66C95EEF2BD0). Этот файл сообщит Revit, что нужно загрузить наш плагин `.addin`.

```xml
<?xml version="1.0" encoding="utf-8" ?>
<ApplicationPackage Name="RevitDesignAutomation" Description="Sample Plugin for Revit" Author="learnforge.autodesk.io">
  <CompanyDetails Name="Autodesk, Inc" Url="http://learnforge.autodesk.io" Email="forge.help@autodesk.com"/>
  <Components Description="Modify window parameters">
    <RuntimeRequirements SeriesMax="R2021" SeriesMin="R2019" Platform="Revit" OS="Win64"/>
    <ComponentEntry LoadOnRevitStartup="True" LoadOnCommandInvocation="False" AppDescription="Modify Window Parameters" ModuleName="./Contents/Autodesk.Forge.Sample.DesignAutomation.Revit.addin" Version="1.0.0" AppName="Modify Window Parameters"/>
  </Components>
</ApplicationPackage>
```

## Autodesk.Forge.Sample.DesignAutomation.Revit.addin

В папке `UpdateRVTParam.bundle` создайте подпапку с названием `Contents`  и, внутри этой папки, файл с названием `Autodesk.Forge.Sample.DesignAutomation.Revit.addin`. Это указывает Revit, как загружать плагин.

```xml
<?xml version="1.0" encoding="utf-8" standalone="no"?>
<RevitAddIns>
  <AddIn Type="DBApplication">
    <Name>Modify Window Parameters</Name>
    <FullClassName>Autodesk.Forge.Sample.DesignAutomation.Revit.Commands</FullClassName>
    <Text>Revit for Design Automation</Text>
    <Description>Revit for Design Automation</Description>
    <VisibilityMode>AlwaysVisible</VisibilityMode>
    <Assembly>.\UpdateRVTParam.dll</Assembly>
    <AddInId>000BD853-36E4-461f-9171-C5ACEDA4E723</AddInId>
    <VendorId>ADSK</VendorId>
    <VendorDescription>Autodesk, Inc, www.autodesk.com</VendorDescription>
  </AddIn>
</RevitAddIns>
```

К этому моменту проект должен выглядеть вот так:

![](_media/designautomation/revit/bundle_folders.png)

## Событие после сборки (англ. Post-build event)

> Для Node.js необходимо настроить папку вывода ZIP AppBundle.

Теперь нам нужно заархивировать папку .bundle. Щелкните проект правой кнопкой мыши, выберите **Properties**, затем откройте **Build Events** и скопируйте код ниже в поле **Post-build event command line**, как показано на изображении ниже.

```
xcopy /Y /F "$(TargetDir)*.dll" "$(ProjectDir)UpdateRVTParam.bundle\Contents\"
del /F "$(ProjectDir)..\forgesample\wwwroot\bundles\UpdateRVTParam.zip"
"C:\Program Files\7-Zip\7z.exe" a -tzip "$(ProjectDir)../forgesample/wwwroot/bundles/UpdateRVTParam.zip" "$(ProjectDir)UpdateRVTParam.bundle\" -xr0!*.pdb
```

Это скопирует DLL из /bin/debug/ в папку .bundle/Contents, затем используйте [7zip](https://www.7-zip.org/) для создания zip-архива, и затем, наконец, скопируйте ZIP-архив в /bundles. папки веб-приложения.

![](_media/designautomation/revit/post_build.png)

> Обратите внимание, как **Post-build event** использует имена проекта и папки. Убедитесь, что вы используете эти имена.

Если вы работаете над проектом `UpdateRVTParam`, вы должны увидеть что-то подобное в окне **Output**. Обратите внимание на 2 заархивированные папки и 3 файла. ZIP-файл создается непосредственно в папке /wwwroot/bundles. Это означает, что у вас все отлично!

![](_media/designautomation/revit/build_output.png)

!> Если после сборки output содержит скопированные **2 папки, 5 файлов**, вернитесь и убедитесь, что **RevitAPI** reference настроено таким образом: **Copy Local**:**False**. Возможно, вам придется удалить все DLL в папке `UpdateRVTParam.bundle/Contents/`.

Далее: [Загрузка плагина](/ru-RU/designautomation/appbundle/common)

[Эта страница на английском языке](https://learnforge.autodesk.io/#/designautomation/appbundle/engines/revit).

