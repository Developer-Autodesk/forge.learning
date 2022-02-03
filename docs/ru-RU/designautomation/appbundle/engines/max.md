# Подготовка 3ds Max bundle

В этом разделе мы создадим базовый плагин 3ds Max для Design Automation. Обратите внимание, что 3ds Max можно автоматизировать с помощью MAXScript, Python, NET API и C ++. 3ds Max .NET API, вероятно, используется для плагинов не очень часто, однако для других продуктов Design Automation это типичный API. Ресурсы 3ds Max для .NET API можно найти здесь (ссылки 2019, но .NET API поддерживается для всех доступных версий движков 3ds Max Design Automation):
* [Writing 3ds Max .NET plugins](http://help.autodesk.com/view/3DSMAX/2019/ENU/?guid=__developer_3ds_max_sdk___the_learning_path_lesson_7_writing__net_plug_ins_html)
* [The 3ds Max .NET SDK](http://help.autodesk.com/view/3DSMAX/2019/ENU/?guid=__developer_3ds_max__net_sdk_html)
* [GetCOREInterface Blog .NET Samples](https://getcoreinterface.typepad.com/blog/2017/10/updated-net-api-samples-for-3ds-max-2018.html)

Помните, что для Design Automation не должно быть UI или promts, которые нельзя автоматизировать. Чтобы автоматизировать движок 3ds Max DA, вы должны предоставить MAXScript. Обычно это очень просто, т.к. большинство настроек можно быстро открыть в MAXScript (см. [function publishing for C++](http://help.autodesk.com/view/3DSMAX/2019/ENU/?guid=__developer_3ds_max_sdk_features_function_publishing_html) и [MAXScript .NET handling](http://help.autodesk.com/view/3DSMAX/2019/ENU/?guid=GUID-779FD7AC-953D-4567-B2A8-60B1D8695B95))

> Вы можете [скачать the Bundle ZIP](https://github.com/Autodesk-Forge/learn.forge.designautomation/raw/master/forgesample/wwwroot/bundles/UpdateMAXParam.zip) в папку `/public/bundles/` (Node.js) или `/forgeSample/wwwroot/bundles` (.NET Core) и [пропустить этот раздел](/ru-RU/designautomation/appbundle/common.md)

## Создание нового проекта .NET

Щелкните правой кнопкой мыши на решение (англ. solution), затем выберите **Add** >> **New Project**. Выберите  **Windows Desktop**, затем **Class Library** и, наконец, назовите его `UpdateMAXParam`. Затем вам нужно будет сослаться на управляемую сборку Autodesk.Max.Dll (основной модуль 3ds Max .NET API). Этот модуль находится в папке 3dsmax.exe, и при обращении к нему не забудьте выключить флажок "Copy Local". Есть несколько других модулей, используемых для поддержки .NET API (см.[The 3ds Max .NET SDK](http://help.autodesk.com/view/3DSMAX/2019/ENU/?guid=__developer_3ds_max__net_sdk_html)), но для этого руководства мы будем использовать только Autodesk.Max.dll. Затем найдите и установите `Newtonsoft.Json` (который используется для анализа входных данных в формате JSON).
 
> Пожалуйста, выберите .NET Framework 4.7. Если его нет в списке, [загрузите Dev Pack](https://dotnet.microsoft.com/download/dotnet-framework/net47).

![](_media/designautomation/max/new_project.gif)

В результате  **package.config** должен выглядеть вот так для модуля Newtonsoft.Json module.

```xml
<?xml version="1.0" encoding="utf-8"?>
<packages>
  <package id="Newtonsoft.Json" version="12.0.1" targetFramework="net47" />
</packages>
```

В проекте должен быть класс `Class1.cs`, давайте изменим название файла на `Command.cs` (для постоянства). 

## Commands.cs

Это основной код, который будет работать с  3ds Max. Скопируйте следующий код в  `Command.cs`. Есть три класса для обработки Design Automation. Во-первых, это `InputParams`, который будет использоваться для взаимодействия с входными данными JSON. Далее идет класс `ParameterChanger`, который используется для итерации сцены и поиска всех Casement Windows (может быть любыми типами объектов, определенными ID классов). Наконец, `RuntimeExecute` используется для ввода и управления автоматизацией. Обратите внимание, что существует специальный файл регистрации (англ logging), который выводит информацию в консоль Design Automation. См. функцию LogTrace. Обратите внимание, что для этого используется управляемый класс 3ds Max `ILogSys`, а флаги, используемые с указанным API `LogEntry`, необходимы для вывода на консоль Design Automation.

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.IO;

using Newtonsoft.Json;

using Autodesk.Max;

namespace Autodesk.Forge.Sample.DesignAutomation.Max
{
    /// <summary>
    /// Used to hold the parameters to change
    /// </summary>
    public class InputParams
    {
        public float Width { get; set; }
        public float Height { get; set; }
    }
    /// <summary>
    /// Changes parameters in automated way. 
    /// Iterate entire scene to get all nodes
    /// In this example we specifically find Casement Windows by object class ID
    /// Then modify the width and height based on inputs.
    /// 
    /// Could be expanded to find other window types, other objects, etc.
    /// </summary>
    static public class ParameterChanger
    {
        static List<IINode> m_sceneNodes = new List<IINode> { };

        /// <summary>
        /// Recursively go through the scene and get all nodes
        /// Use the Autodesk.Max APIs to get the children nodes
        /// </summary>
        static private void GetSceneNodes(IINode node)
        {
            m_sceneNodes.Add(node);

            for (int i = 0; i < node.NumberOfChildren; i++)
                GetSceneNodes(node.GetChildNode(i));
        }

        /// <summary>
        /// Function to specifically update Case Windows with input wedth and height parameters
        /// </summary>
        /// <param name="width">The new Width to set the Window</param>
        /// <param name="height">The new Height to set the Window</param>
        /// <returns>window count</returns>
        static public int UpdateWindowNodes(float width, float height)
        {
            IGlobal globalInterface = Autodesk.Max.GlobalInterface.Instance;
            IInterface14 coreInterface = globalInterface.COREInterface14;

            IINode nodeRoot = coreInterface.RootNode;
            m_sceneNodes.Clear();
            GetSceneNodes(nodeRoot);

            // 3ds Max uses a class ID for all object types. This is easiest way to find specific type.
            // ClassID (1902665597L, 1593788199L) == 0x71685F7D, 0x5EFF4727 for casement window
            IClass_ID cidCasementWindow = globalInterface.Class_ID.Create(0x71685F7D, 0x5EFF4727);

            // Use LINQ to filter for windows only - in case scene has more than one, 
            // but this should still give us at least one for single window scene!
            var sceneWindows = from node in m_sceneNodes
                               where ((node.ObjectRef != null) && // In some cases the ObjectRef can be null for certain node types.
                                      (node.ObjectRef.ClassID.PartA == cidCasementWindow.PartA) && 
                                      (node.ObjectRef.ClassID.PartB == cidCasementWindow.PartB))
                               select node;

            // Iterate the casement windws and update the hight and width parameters.
            foreach (IINode item in sceneWindows)
            {
                // window is using old-style ParamArray rather than newer ParamBlk2
                IIParamArray pb = item.ObjectRef.ParamBlock;
                pb.SetValue(0, coreInterface.Time, height); // window height is at index zero.
                pb.SetValue(1, coreInterface.Time, width); // window width is at index one.
            }

            // If there are windows, save the window updates
            int status;
            if (sceneWindows.Count() > 0)
            {
                // The output file name must match what the Design Automation work item is specifying as output file.
                string full_filename = coreInterface.CurFilePath;
                string filename = coreInterface.CurFileName;
                string new_filename = full_filename.Replace(filename, "outputFile.max");
                status = coreInterface.SaveToFile(new_filename, true, false);
                if (status == 0) //error
                    return -1;
            }

            // return how many windows were modified.
            return sceneWindows.Count();
        }

    }

    /// <summary>
    /// This class is used to execute the automation. Above class could be connected to UI elements, or run by scripts directly.
    /// This class takes the input from JSON input and uses those values. This way it is more cohesive to web development.
    /// </summary>
    static public class RuntimeExecute
    {
        static public int ModifyWindowWidthHeight()
        {
            int count = 0;

            // Run entire code block with try/catch to help determine errors
            try
            {

                // read input parameters from JSON file
                InputParams inputParams = JsonConvert.DeserializeObject<InputParams>(File.ReadAllText("params.json"));

                count = ParameterChanger.UpdateWindowNodes(inputParams.Width, inputParams.Height);

            }
            catch (Exception e)
            {
                LogTrace("Exception Error: " + e.Message);
                return -1; //fail
            }
            
            LogTrace("Changed {0} Window objects.", count);
            return count; // 0+ means success, and how many objects were changed.
        }
        /// <summary>
        /// Information sent to this LogTrace will appear on the Design Automation output
        /// </summary>
        private static void LogTrace(string format, params object[] args)
        {
            System.Reflection.Assembly a = System.Reflection.Assembly.GetExecutingAssembly();
            string output_msg = string.Format("DLL {0} compiled on {1}; {2}",
                System.IO.Path.GetFileName(a.Location),
                File.GetLastWriteTime(a.Location), 
                string.Format(format, args));

            IGlobal globalInterface = Autodesk.Max.GlobalInterface.Instance;
            IInterface14 coreInterface = globalInterface.COREInterface14;
            ILogSys log = coreInterface.Log;
            // Note flags are necessary to produce Design Automation output. This is same as C++:
            // SYSLOG_INFO | SYSLOG_IGNORE_VERBOSITY | SYSLOG_BROADCAST
            log.LogEntry(0x00000004 | 0x00040000 | 0x00010000, false, "", output_msg);
        }
    }
}
```

## PackageContents.xml

Создайте папку с названием `UpdateMAXParam.bundle` и, внутри этой папки, файл с названием `PackageContents.xml`, затем скопируйте туда код ниже. Узнайте больше: [PackageContents.xml Format Reference](https://knowledge.autodesk.com/search-result/caas/CloudHelp/cloudhelp/2016/ENU/AutoCAD-Customization/files/GUID-BC76355D-682B-46ED-B9B7-66C95EEF2BD0-htm.html). Больше информации об упаковке ваших плагинов 3ds Max здесь [Packaging Plugins](http://help.autodesk.com/view/3DSMAX/2019/ENU/?guid=__developer_writing_plug_ins_packaging_plugins_html).

Этот файл сообщит 3ds Max о модулях, которые нужно загрузить (в данном случае создаваемая нами сборка плагина .NET API, но также может включать плагины MAXScripts, Python и/или C ++). Поскольку плагин загружается с помощью этой функции, вам нужно помнить об инструкциях, чтобы запустить вашу работу по автоматизации. Обратите внимание, что для правильной загрузки кода 3ds Max требуется уникальный ID для ProductCode и UpgradeCode. Подробности в документации выше.

```xml
<?xml version="1.0" encoding="utf-8"?>
<ApplicationPackage 
	SchemaVersion="1.0" 
	AutodeskProduct="3ds Max" 
    Name="Sample Design Automation Plugin for 3ds Max"
    Description="A sample package to update parameters of a 3ds Max scene file containing a casement window"
	AppVersion="2019.0.0" 
	FriendlyVersion="2019.0.0" 
	ProductType="Application" 
	SupportedLocales="Enu" 
	AppNameSpace="apps.autodesk.com" 
	Author="Autodesk Forge" 
    ProductCode="{6A8D06F4-C3DD-42DD-A69E-9B9617A7ABC0}"
	UpgradeCode="{CE88CEA5-47F6-423E-B9EC-E9FA683B5228}"
    >

	<CompanyDetails Name="Autodesk"
		Phone=" "
		Url="http://forge.autodesk.com"
		Email="noreply@autodesk.com" />

	<RuntimeRequirements OS="Win64" Platform="3ds Max" SeriesMin="2019" SeriesMax="2021" />
		
	<Components Description="assemblies parts">
		<RuntimeRequirements OS="Win64" Platform="3ds Max" SeriesMin="2019" SeriesMax="2021" />
		<ComponentEntry AppName="UpdateMAXParam" Version="2019.0.0" ModuleName="./Contents/UpdateMAXParam.dll" AppDescription="The Sample Design Automation Plugin managed assembly module" />
	</Components>
  
</ApplicationPackage>
```

Наконец, создайте подпапку `Contents` и оставьте её пустой. К этому моменту проект должен выглядеть так:

![](_media/designautomation/max/bundle_folders.png)

## Post-build event

> Для Node.js необходимо настроить папку вывода ZIP AppBundle.

Теперь нам нужно заархивировать папку .bundle. Щелкните проект правой кнопкой мыши, выберите **Properties**, затем откройте **Build Events** и скопируйте код ниже в поле **Post-build event command line**, как показано на изображении ниже.

```
xcopy /Y /F "$(TargetDir)*.dll" "$(ProjectDir)UpdateMAXParam.bundle\Contents\"
del /F "$(ProjectDir)..\forgesample\wwwroot\bundles\UpdateMAXParam.zip"
"C:\Program Files\7-Zip\7z.exe" a -tzip "$(ProjectDir)../forgesample/wwwroot/bundles/UpdateMAXParam.zip" "$(ProjectDir)UpdateMAXParam.bundle\" -xr0!*.pdb
```

Это скопирует DLL из /bin/debug/ в папку .bundle/Contents, затем используйте [7zip](https://www.7-zip.org/) для создания zip-архива, и затем, наконец, скопируйте ZIP-архив в /bundles. папки веб-приложения.

![](_media/designautomation/max/post_build.png)
> Обратите внимание, как **Post-build event** использует имена проекта и папки. Убедитесь, что вы используете эти имена.

Если вы сейчас собираете проект `UpdateMAXParam` , вы должны увидеть что-то подобное в окне **Output**. Обратите внимание на 2 заархивированные папки и 3 файла. ZIP-файл создается непосредственно в папке /wwwroot/bundles. Это означает, что у вас все отлично!
 
![](_media/designautomation/max/build_output.png)

На этом этапе вы можете протестировать функциональность с помощью 3ds Max batch tool. Он работает аналогично движку 3ds Max Design Automation и является хорошим способом протестировать всю вашу автоматизацию локально перед отправкой задания в облачные сервисы Forge DA. Для создания экземпляров классов .NET в среде MAXScript мы можем использовать функцию MAXScript `dotNetClass`. Для этого проекта код MAXScript будет таким:

```MAXScript
fn UpdateParam =
(
	da = dotNetClass("Autodesk.Forge.Sample.DesignAutomation.Max.RuntimeExecute")
	da.ModifyWindowWidthHeight()
)

UpdateParam()
```

Чтобы запустить это локально, мы могли бы протестировать в командной строке примерно так:

```CommandLine
"%ADSK_3DSMAX_x64_2019%\3dsmaxbatch.exe" -sceneFile <myTestScene>.max da_script.ms
```
Позже в этом руководстве вы увидите, как эти же инструкции отправляются в движок 3ds Max Design Automation.

Далее: [Загрузка плагина](/ru-RU/designautomation/appbundle/common)

[Эта страница на английском языке](https://learnforge.autodesk.io/#/designautomation/appbundle/engines/max).
