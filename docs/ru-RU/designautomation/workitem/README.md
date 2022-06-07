# Запуск Workitem

Workitem - это процессы по обработке данных, задание, которое выполняет Activity, используя указанные входные параметры и генерируя соответствующие выходные файлы.

Связь между Activity и WorkItem можно рассматривать как *"определение функции"* и *"вызов функции"* соответственно. Activity определяет, какой AppBundle использовать, которые, в свою очередь, определяют движок (англ. Engine). Затем вызывается Workitem для выполнения задания.

В этом руководстве workitem указывает URL-адрес входного файла, исходные данные JSON с новыми значениями параметров и целевой URL-адрес для выходного файла. Этот пример загрузит исходный файл в бакет OSS перед запуском workitem.

Выберите язык: [Node.js](/ru-RU/designautomation/workitem/nodejs) | [.NET Core](/ru-RU/designautomation/workitem/netcore)

[Эта страница на английском языке](https://learnforge.autodesk.io/#/designautomation/workitem/).