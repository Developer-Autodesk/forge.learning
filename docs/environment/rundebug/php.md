# Running & Debugging (PHP)

Make sure **PHP Server** & **PHP Debug** extensions are installed in Visual Code, if not, please check the [**Tools**](environment/tools/php) section first.

## Start/Stop server

Open the Command Palette from VS Code, and run the command **Serve Project With PHP**, it will start PHP server at port 3000, and run **Stop PHP Server** command to stop the server.

![](_media/php/vs_code_debug.png) 

Open your browser and go to `http://localhost:3000`


## Debug
To start debugging, and navigate to the **Debugging** tab in VS Code. Then press the little gear icon to generate the launch.json file for PHP, which will contain the configurations for debugging. By default, there would be a single configuration as below:

```javascript
    {
        "name": "Listen for XDebug",
        "type": "php",
        "request": "launch",
        "port": 9000
    },
```
You can set breakpoints in your source code by selecting a line and pressing F9, and start debugging with this configuration.

If you now hit the specific web page, VS Code will break into your source code at the specified breakpoint. You’ll then get information about variables, call stack, etc. in the left hand pane.


![](_media/php/vs_code_debug.gif) 


Next: [Viewer extension](tutorials/extensions)